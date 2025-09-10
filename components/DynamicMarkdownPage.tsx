import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import matter from 'gray-matter';
import { GITHUB_CONFIG, DOCS_CONFIG, VERSION_CONFIG, I18N_CONFIG } from '../constants';
import MarkdownPage from './MarkdownPage';
import RightSidebar from './RightSidebar';
import { useScrollableContainer } from '../context/ScrollContext';
import EditPageButton from './EditPageButton';
import { useNav } from '../context/NavContext';
import PageNavigation from './PageNavigation';
import { LightboxProvider } from './Lightbox';
import { useGemini } from '../context/GeminiContext';
import GeminiChat from './GeminiChat';
import GeminiQuizGenerator from './GeminiQuizGenerator';
import FloatingActionBar from './FloatingActionBar';
import GeminiGlossaryGenerator from './GeminiGlossaryGenerator';
import GeminiSimplifier from './GeminiSimplifier';
import GeminiCodeAnalyzer from './GeminiCodeAnalyzer';
import GeminiSummarizer from './GeminiSummarizer';
import GeminiPodcastGenerator from './GeminiPodcastGenerator';
import { useI18n } from '../context/I18nContext';
import { useVersion } from '../context/VersionContext';
import { CalendarIcon, UserCircleIcon } from './Icons';

interface DynamicMarkdownPageProps {
    path: string;
}

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface FrontmatterData {
    title?: string;
    date?: string;
    author?: string;
    hide_title?: boolean;
    [key: string]: any;
}

// Helper function to correctly decode Base64 encoded UTF-8 strings.
// The standard `atob` function can corrupt multi-byte characters.
const decodeBase64Utf8 = (base64: string, t: (key: string) => string): string => {
    try {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return new TextDecoder('utf-8').decode(bytes);
    } catch (e) {
        console.error("Error decoding base64 string:", e);
        return t('contentDecodingError');
    }
};

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

const ErrorDisplay: React.FC<{ message: string; t: (key: string) => string }> = ({ message, t }) => (
    <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg">
        <h3 className="font-bold">{t('contentFailedToLoad')}</h3>
        <p>{message}</p>
    </div>
);


const DynamicMarkdownPage: React.FC<DynamicMarkdownPageProps> = ({ path }) => {
    const [content, setContent] = useState<string | null>(null);
    const [frontmatter, setFrontmatter] = useState<FrontmatterData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [tocItems, setTocItems] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const contentRef = useRef<HTMLElement>(null);
    const timeoutRef = useRef<number | null>(null);
    const { scrollableContainerRef } = useScrollableContainer();
    const { flatNavLinks } = useNav();
    const location = useLocation();
    const { isKeySet } = useGemini();
    const { t, lang } = useI18n();
    const { version } = useVersion();
    const [isChatOpen, setChatOpen] = useState(false);
    const [isQuizOpen, setQuizOpen] = useState(false);
    const [isGlossaryOpen, setGlossaryOpen] = useState(false);
    const [isSummarizerOpen, setSummarizerOpen] = useState(false);
    const [isSimplifierOpen, setSimplifierOpen] = useState(false);
    const [isCodeAnalyzerOpen, setCodeAnalyzerOpen] = useState(false);
    const [isPodcastOpen, setPodcastOpen] = useState(false);

    const baseDocsPath = useMemo(() => {
        let basePath = GITHUB_CONFIG.docsPath;
        if (VERSION_CONFIG.enabled) {
            basePath = `${basePath}/${version}`;
        }
        if (I18N_CONFIG.enabled) {
            basePath = `${basePath}/${lang}`;
        }
        return basePath;
    }, [lang, version]);


    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            setError(null);
            setContent(null);
            setFrontmatter(null);
            setTocItems([]);
            setActiveId(null);
            scrollableContainerRef?.current?.scrollTo(0, 0);

            try {
                let text = '';
                if (DOCS_CONFIG.source === 'local') {
                    const response = await fetch(`/${baseDocsPath}/${path}`);
                    if (!response.ok) {
                        throw new Error(t('localFileNotFound', path, response.statusText));
                    }
                    text = await response.text();
                } else {
                    const { owner, repo, branch, token } = GITHUB_CONFIG;
                    const fullPath = `${baseDocsPath}/${path}`;
                    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${fullPath}?ref=${branch}`;
                    const headers: HeadersInit = { 'Accept': 'application/vnd.github.v3+json' };
                    if (token) {
                        headers['Authorization'] = `Bearer ${token}`;
                    }
                    const response = await fetch(url, { headers });
                    if (!response.ok) {
                        const errorData = await response.json().catch(() => null);
                        const errorMessage = errorData?.message || `${response.status} - ${response.statusText}`;
                        throw new Error(t('githubFileNotFound', path, errorMessage));
                    }
                    const fileData = await response.json();
                    text = decodeBase64Utf8(fileData.content, t);
                }

                const { data, content: markdownContent } = matter(text);
                if (data.date) {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const postDate = new Date(data.date);
                    if (postDate > today) {
                        throw new Error(t('contentNotAvailable'));
                    }
                }
                
                setFrontmatter(data);
                setContent(markdownContent);

            } catch (e) {
                const errorMessage = e instanceof Error ? e.message : String(e);
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [path, scrollableContainerRef, baseDocsPath, t]);

    useEffect(() => {
        if (!content || !contentRef.current) return;
        
        const headingElements = contentRef.current.querySelectorAll('h2, h3');
        const newTocItems = Array.from(headingElements).map(el => ({
            id: el.id,
            text: el.textContent || '',
            level: parseInt(el.tagName.substring(1), 10),
        }));
        setTocItems(newTocItems);
    }, [content]);

    useEffect(() => {
        const scrollContainer = scrollableContainerRef?.current;
        if (!scrollContainer) return;

        const handleScroll = () => {
            if (timeoutRef.current) {
                window.cancelAnimationFrame(timeoutRef.current);
            }

            timeoutRef.current = window.requestAnimationFrame(() => {
                let currentActiveId = null;
                let smallestDistance = Infinity;
                const containerTop = scrollContainer.getBoundingClientRect().top;

                tocItems.forEach(item => {
                    const element = document.getElementById(item.id);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        const topRelativeToContainer = rect.top - containerTop;
                        if (topRelativeToContainer >= 0 && topRelativeToContainer < smallestDistance) {
                           smallestDistance = topRelativeToContainer;
                           currentActiveId = item.id;
                        }
                    }
                });
                
                if (currentActiveId) {
                   setActiveId(currentActiveId);
                }
            });
        };

        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll);
            if (timeoutRef.current) {
                window.cancelAnimationFrame(timeoutRef.current);
            }
        };
    }, [tocItems, scrollableContainerRef]);

    useEffect(() => {
        if (!loading && contentRef.current) {
            const hash = location.hash;
            if (hash) {
                try {
                    const id = decodeURIComponent(hash.substring(1));
                    const element = document.getElementById(id);
                    const scrollContainer = scrollableContainerRef?.current;
                    
                    if (element && scrollContainer) {
                        setTimeout(() => {
                            const offsetPosition = element.offsetTop - 16;
                            scrollContainer.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth',
                            });
                        }, 100);
                    }
                } catch (e) {
                    console.error("Error scrolling to anchor:", e);
                }
            }
        }
    }, [loading, path, scrollableContainerRef, location.hash]);


    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorDisplay message={error} t={t} />;
    }
    
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(lang, options);
    };

    const currentPageIndex = flatNavLinks.findIndex(link => link.path === path);
    const prevPage = currentPageIndex > 0 ? flatNavLinks[currentPageIndex - 1] : undefined;
    const nextPage = currentPageIndex !== -1 && currentPageIndex < flatNavLinks.length - 1 ? flatNavLinks[currentPageIndex + 1] : undefined;

    const isHomePage = location.pathname === '/';

    return (
        <LightboxProvider>
            <div className="lg:flex lg:flex-row-reverse">
                {!isHomePage && tocItems.length > 0 && (
                    <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0 lg:ml-12">
                       <RightSidebar items={tocItems} activeId={activeId} />
                    </aside>
                )}
                <div className="min-w-0 flex-1">
                    {frontmatter?.title && !frontmatter?.hide_title && (
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8">
                            {frontmatter.title}
                        </h1>
                    )}
                    
                    {content ? <MarkdownPage ref={contentRef} content={content} /> : null}

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400 mt-12 border-t border-gray-200 dark:border-gray-700 pt-6">
                        {frontmatter?.date && (
                            <div className="flex items-center">
                                <CalendarIcon className="w-4 h-4 mr-1.5" />
                                <span>{formatDate(frontmatter.date)}</span>
                            </div>
                        )}
                        {frontmatter?.author && (
                             <div className="flex items-center">
                                <UserCircleIcon className="w-4 h-4 mr-1.5" />
                                <span>{frontmatter.author}</span>
                            </div>
                        )}
                        <div className="ml-auto">
                            <EditPageButton filePath={path} />
                        </div>
                    </div>

                    <PageNavigation prevPage={prevPage} nextPage={nextPage} />
                </div>
            </div>
            
            {isKeySet && content && (
                <>
                    <FloatingActionBar
                        onChatClick={() => setChatOpen(true)}
                        onQuizClick={() => setQuizOpen(true)}
                        onGlossaryClick={() => setGlossaryOpen(true)}
                        onSummarizerClick={() => setSummarizerOpen(true)}
                        onSimplifierClick={() => setSimplifierOpen(true)}
                        onCodeAnalyzerClick={() => setCodeAnalyzerOpen(true)}
                        onPodcastClick={() => setPodcastOpen(true)}
                    />
                    <GeminiChat 
                        isOpen={isChatOpen}
                        onClose={() => setChatOpen(false)}
                        pageContent={content}
                        pageTitle={frontmatter?.title}
                    />
                     <GeminiQuizGenerator
                        isOpen={isQuizOpen}
                        onClose={() => setQuizOpen(false)}
                        pageContent={content}
                        pageTitle={frontmatter?.title}
                    />
                    <GeminiGlossaryGenerator
                        isOpen={isGlossaryOpen}
                        onClose={() => setGlossaryOpen(false)}
                        pageContent={content}
                        pageTitle={frontmatter?.title}
                    />
                    <GeminiSummarizer
                        isOpen={isSummarizerOpen}
                        onClose={() => setSummarizerOpen(false)}
                        pageContent={content}
                        pageTitle={frontmatter?.title}
                    />
                    <GeminiSimplifier
                        isOpen={isSimplifierOpen}
                        onClose={() => setSimplifierOpen(false)}
                        pageContent={content}
                        pageTitle={frontmatter?.title}
                    />
                    <GeminiCodeAnalyzer
                        isOpen={isCodeAnalyzerOpen}
                        onClose={() => setCodeAnalyzerOpen(false)}
                        pageContent={content}
                        pageTitle={frontmatter?.title}
                    />
                    <GeminiPodcastGenerator
                        isOpen={isPodcastOpen}
                        onClose={() => setPodcastOpen(false)}
                        pageContent={content}
                        pageTitle={frontmatter?.title}
                    />
                </>
            )}
        </LightboxProvider>
    );
};

export default DynamicMarkdownPage;
