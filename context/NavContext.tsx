import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
    useMemo
} from 'react';
import matter from 'gray-matter';
import lunr from 'lunr';
import type { NavItem, NavLink, NavSection, SearchDocument } from '../types';
import { GITHUB_CONFIG, DOCS_CONFIG, VERSION_CONFIG, I18N_CONFIG } from '../constants';
import { useI18n } from './I18nContext';
import { useVersion } from './VersionContext';

interface SecondaryNavLink {
    name: string;
    path: string;
}

interface SearchData {
    index: lunr.Index | null;
    store: { [key: string]: SearchDocument };
}

export interface RateLimitInfo {
    limit: number;
    remaining: number;
    reset: number; // UTC epoch seconds
    used: number;
}


interface NavContextType {
    navSections: Map<string, NavItem[]>;
    secondaryNavLinks: SecondaryNavLink[];
    flatNavLinks: NavLink[];
    loading: boolean;
    error: string | null;
    search: (query: string) => SearchDocument[];
    rateLimitInfo: RateLimitInfo | null;
}

// Helper function to correctly decode Base64 encoded UTF-8 strings.
// The standard `atob` function can corrupt multi-byte characters.
const decodeBase64Utf8 = (base64: string): string => {
    try {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return new TextDecoder('utf-8').decode(bytes);
    } catch (e) {
        console.error("Error decoding base64 string:", e);
        return ""; // Return empty string on error to avoid breaking the build process
    }
};

const NavContext = createContext<NavContextType>({
    navSections: new Map(),
    secondaryNavLinks: [],
    flatNavLinks: [],
    loading: true,
    error: null,
    search: () => [],
    rateLimitInfo: null,
});

export const useNav = () => useContext(NavContext);

const formatTitle = (name: string): string => {
    return name
        .replace(/\.md$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
};

interface GitTreeNode {
    path: string;
    type: 'tree' | 'blob';
}

interface FileData {
    path: string; // relative path from docsPath
    title: string;
    position?: number;
    folder_position?: number;
    date?: string;
}

// Tree structure to represent file hierarchy
interface TreeNode {
    name: string;
    children: Map<string, TreeNode>;
    fileData?: FileData;
    isFolder: boolean;
}

const createNode = (name: string, isFolder = false): TreeNode => ({
    name,
    children: new Map(),
    isFolder,
});

const slugify = (text: string): string => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
};

const buildSearchIndex = (fileContents: { path: string; content: string }[]): SearchData => {
    const searchStore: { [key: string]: SearchDocument } = {};

    const idx = lunr(function () {
        this.ref('id');
        this.field('pageTitle');
        this.field('title', { boost: 10 });
        this.field('content');

        fileContents.forEach(file => {
            if (!file) return;

            const { data, content } = matter(file.content);
            if (data.hidden === true) {
                return; // Skip hidden files in search index
            }
            const relativePath = file.path; // Already relative
            const pageTitle = data.title || formatTitle(relativePath.split('/').pop()!);
            
            const sections = content.split(/(?=^##\s)/gm);

            sections.forEach((section, i) => {
                const headerMatch = section.match(/^##\s+(.*)/);
                let doc: SearchDocument | null = null;
                if (headerMatch) {
                    const sectionTitle = headerMatch[1].trim();
                    const sectionSlug = slugify(sectionTitle);
                    const sectionContent = section.substring(headerMatch[0].length).trim();
                    
                    doc = {
                        id: `${relativePath}#${sectionSlug}`,
                        pageTitle: pageTitle,
                        title: sectionTitle,
                        content: sectionContent,
                        path: relativePath
                    };
                } else if (i === 0 && section.trim()) {
                    doc = {
                        id: relativePath,
                        pageTitle: pageTitle,
                        title: pageTitle,
                        content: section.trim(),
                        path: relativePath
                    };
                }
                
                if (doc) {
                    this.add(doc);
                    searchStore[doc.id] = doc;
                }
            });
        });
    });
    
    return { index: idx, store: searchStore };
};


export const NavProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [navSections, setNavSections] = useState<Map<string, NavItem[]>>(new Map());
    const [secondaryNavLinks, setSecondaryNavLinks] = useState<SecondaryNavLink[]>([]);
    const [flatNavLinks, setFlatNavLinks] = useState<NavLink[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchData, setSearchData] = useState<SearchData>({ index: null, store: {} });
    const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo | null>(null);
    const { lang, t } = useI18n();
    const { version } = useVersion();

    const baseDocsPath = useMemo(() => {
        let path = GITHUB_CONFIG.docsPath;
        if (VERSION_CONFIG.enabled) {
            path = `${path}/${version}`;
        }
        if (I18N_CONFIG.enabled) {
            path = `${path}/${lang}`;
        }
        return path;
    }, [lang, version]);

    const processAllFiles = (allFiles: FileData[], fileContents: { path: string; content: string }[]) => {
         // Build search index
        const searchData = buildSearchIndex(fileContents);
        setSearchData(searchData);

        // Build secondary navigation links
        const rootIndexFile = allFiles.find(file => file.path === 'index.md');
        
        const folderLinks = allFiles
            .filter(file => {
                const pathParts = file.path.split('/');
                return file.path.endsWith('/index.md') && pathParts.length === 2;
            })
            .map(file => {
                const pathParts = file.path.split('/');
                return {
                    name: file.title,
                    path: `/${pathParts[0]}`,
                    position: file.folder_position ?? Infinity,
                };
            })
            .sort((a, b) => {
                if (a.position !== b.position) return a.position - b.position;
                return a.name.localeCompare(b.name);
            });

        const finalSecondaryLinks: SecondaryNavLink[] = [];
        if (rootIndexFile) {
            finalSecondaryLinks.push({
                name: rootIndexFile.title,
                path: '/',
            });
        }
        finalSecondaryLinks.push(...folderLinks.map(({ name, path }) => ({ name, path })));
        setSecondaryNavLinks(finalSecondaryLinks);

        // Build a single file tree for the entire docs directory
        const root = createNode('root', true);
        allFiles.forEach(file => {
            const parts = file.path.split('/');
            let currentNode = root;
            parts.forEach((part, index) => {
                const isLastPart = index === parts.length - 1;
                if (!currentNode.children.has(part)) {
                    currentNode.children.set(part, createNode(part, !isLastPart));
                }
                currentNode = currentNode.children.get(part)!;
            });
            currentNode.fileData = file;
        });
        
        const convertTreeToNav = (node: TreeNode): NavItem[] => {
            const files: NavLink[] = [];
            const folders: NavSection[] = [];

            for (const childNode of node.children.values()) {
                if (childNode.isFolder) {
                    const folderIndexNode = childNode.children.get('index.md');
                    const children = convertTreeToNav(childNode);
                    if (children.length > 0) {
                        folders.push({
                            title: folderIndexNode?.fileData?.title || formatTitle(childNode.name),
                            children: children,
                            position: folderIndexNode?.fileData?.folder_position,
                        });
                    }
                } else if (childNode.fileData) {
                    if (childNode.fileData.path.endsWith('index.md')) continue;
                    files.push({
                        title: childNode.fileData.title,
                        path: childNode.fileData.path,
                        position: childNode.fileData.position,
                    });
                }
            }
            files.sort((a, b) => {
                const posA = a.position === undefined ? Infinity : a.position;
                const posB = b.position === undefined ? Infinity : b.position;
                if (posA !== posB) return posA - posB;
                return a.title.localeCompare(b.title);
            });
            folders.sort((a, b) => {
                const posA = a.position === undefined ? Infinity : a.position;
                const posB = b.position === undefined ? Infinity : b.position;
                if (posA !== posB) return posA - posB;
                return a.title.localeCompare(b.title);
            });
            return [...files, ...folders];
        };

        const newNavSections = new Map<string, NavItem[]>();
        const rootItems: NavItem[] = [];

        for (const childNode of root.children.values()) {
            if (childNode.isFolder) {
                const sectionNavItems = convertTreeToNav(childNode);
                if (sectionNavItems.length > 0) {
                    newNavSections.set(childNode.name, sectionNavItems);
                }
            } else if (childNode.fileData) {
                if (childNode.fileData.path.endsWith('index.md')) continue;
                rootItems.push({
                    title: childNode.fileData.title,
                    path: childNode.fileData.path,
                    position: childNode.fileData.position,
                });
            }
        }
        
        if (rootItems.length > 0) {
           rootItems.sort((a, b) => {
                const posA = a.position === undefined ? Infinity : a.position;
                const posB = b.position === undefined ? Infinity : b.position;
                if (posA !== posB) return posA - posB;
                return a.title.localeCompare(b.title);
            });
           newNavSections.set('/', rootItems);
        }
        setNavSections(newNavSections);

        const flattenNavItems = (items: NavItem[]): NavLink[] => {
            let links: NavLink[] = [];
            for (const item of items) {
                if ('children' in item) {
                    links = links.concat(flattenNavItems(item.children));
                } else {
                    links.push(item);
                }
            }
            return links;
        };

        const allFlatLinks: NavLink[] = [];
        for (const secLink of finalSecondaryLinks) {
            if (secLink.path === '/') {
                const rootFile = allFiles.find(f => f.path === 'index.md');
                if (rootFile) {
                    allFlatLinks.push({ title: rootFile.title, path: rootFile.path });
                }
                const rootItems = newNavSections.get('/') || [];
                allFlatLinks.push(...flattenNavItems(rootItems));
            } else {
                const sectionKey = secLink.path.substring(1);
                const sectionIndexFile = allFiles.find(f => f.path === `${sectionKey}/index.md`);
                if (sectionIndexFile) {
                    allFlatLinks.push({ title: sectionIndexFile.title, path: sectionIndexFile.path });
                }
                const sectionItems = newNavSections.get(sectionKey) || [];
                allFlatLinks.push(...flattenNavItems(sectionItems));
            }
        }
        setFlatNavLinks(allFlatLinks);
    };


    useEffect(() => {
        const buildNavFromLocal = async () => {
             try {
                const manifestPath = `/${GITHUB_CONFIG.docsPath}/file-manifest.json`;
                const manifestResponse = await fetch(manifestPath);
                if (!manifestResponse.ok) {
                    throw new Error(t('manifestNotFound', manifestPath));
                }
                const manifestData = await manifestResponse.json();
                // FIX: The manifest is an object with a 'files' array. Also, add a check to ensure it's an array.
                const allFilePaths: string[] = manifestData.files;
                if (!Array.isArray(allFilePaths)) {
                    throw new Error(t('manifestInvalid'));
                }

                // Filter paths to only include those for the currently selected version and language.
                const currentPrefix = `${version}/${lang}/`;
                const relevantFullPaths = allFilePaths.filter(p => p.startsWith(currentPrefix));

                const filePromises = relevantFullPaths.map(async (fullPath) => {
                    // Fetch the file using its full path relative to the /docs/ directory.
                    const response = await fetch(`/${GITHUB_CONFIG.docsPath}/${fullPath}`);
                    if (!response.ok) {
                        console.warn(t('localFileLoadError', fullPath));
                        return null;
                    }
                    const content = await response.text();
                    // Make the path relative to the current context (version/lang) before processing.
                    const relativePath = fullPath.substring(currentPrefix.length);
                    return { path: relativePath, content };
                });

                const fileContents = (await Promise.all(filePromises)).filter((c): c is { path: string; content: string } => c !== null);

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const allFiles: FileData[] = fileContents.map((file): FileData | null => {
                    const { data } = matter(file.content);
                    if (data.date && new Date(data.date) > today) return null;
                    if (data.hidden === true) return null;
                    return {
                        path: file.path,
                        title: data.title || formatTitle(file.path.split('/').pop()!),
                        position: data.position,
                        folder_position: data.folder_position,
                        date: data.date,
                    };
                }).filter((file): file is FileData => file !== null);

                processAllFiles(allFiles, fileContents);

            } catch (e) {
                const errorMessage = e instanceof Error ? e.message : String(e);
                setError(t('navBuildLocalError', errorMessage));
                console.error("Error building nav from local:", errorMessage);
            } finally {
                setLoading(false);
            }
        };


        const buildNavFromGitHub = async () => {
            const { owner, repo, branch, token } = GITHUB_CONFIG;
            const headers: HeadersInit = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            try {
                 // Fetch rate limit info first.
                const rateLimitResponse = await fetch(`https://api.github.com/rate_limit`, { headers });
                if (rateLimitResponse.ok) {
                    const rateData = await rateLimitResponse.json();
                    setRateLimitInfo(rateData.resources.core);
                }
                
                const treeUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
                const treeResponse = await fetch(treeUrl, { headers });
                if (!treeResponse.ok) {
                    throw new Error(t('githubApiError', treeResponse.status, treeResponse.statusText));
                }
                const { tree } = await treeResponse.json();

                const markdownBlobs = tree.filter((node: GitTreeNode) => 
                    node.path.startsWith(`${baseDocsPath}/`) && node.path.endsWith('.md')
                );

                const filePromises = markdownBlobs.map(async (node: GitTreeNode) => {
                    const fileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${node.path}?ref=${branch}`;
                    const fileHeaders: HeadersInit = { 'Accept': 'application/vnd.github.v3+json' };
                    if (token) { fileHeaders['Authorization'] = `Bearer ${token}`; }
                    try {
                        const response = await fetch(fileUrl, { headers: fileHeaders });
                        if (!response.ok) return null;
                        const fileData = await response.json();
                        const content = decodeBase64Utf8(fileData.content);
                        const relativePath = node.path.substring(baseDocsPath.length + 1);
                        return { path: relativePath, content };
                    } catch { return null; }
                });

                const fileContents = (await Promise.all(filePromises)).filter((c): c is { path: string; content: string } => c !== null);
                
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const allFiles: FileData[] = fileContents.map((file): FileData | null => {
                    const { data } = matter(file.content);
                    if (data.date && new Date(data.date) > today) return null;
                    if (data.hidden === true) return null;
                    return {
                        path: file.path,
                        title: data.title || formatTitle(file.path.split('/').pop()!),
                        position: data.position,
                        folder_position: data.folder_position,
                        date: data.date,
                    };
                }).filter((file): file is FileData => file !== null);
                
                processAllFiles(allFiles, fileContents);

            } catch (e) {
                const errorMessage = e instanceof Error ? e.message : String(e);
                setError(t('navBuildGithubError', errorMessage));
                console.error("Error fetching nav structure:", errorMessage);
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);
        setError(null);
        setNavSections(new Map());
        setFlatNavLinks([]);
        setSecondaryNavLinks([]);

        if (DOCS_CONFIG.source === 'local') {
            buildNavFromLocal();
        } else {
            buildNavFromGitHub();
        }
    }, [baseDocsPath, lang, version, t]);
    
    const search = (query: string): SearchDocument[] => {
        if (!searchData.index || !query) {
            return [];
        }
        const processedQuery = query.split(/\s+/).filter(Boolean).map(term => `+${term}*`).join(' ');
        try {
            const results = searchData.index.search(processedQuery);
            return results.map(result => searchData.store[result.ref]).filter(Boolean);
        } catch (e) {
            console.error("Search error:", e);
            return [];
        }
    };


    return (
        <NavContext.Provider value={{ navSections, secondaryNavLinks, flatNavLinks, loading, error, search, rateLimitInfo }}>
            {children}
        </NavContext.Provider>
    );
};
