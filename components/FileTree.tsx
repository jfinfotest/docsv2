
import React, { useMemo } from 'react';
import matter from 'gray-matter';
import { FolderIcon, DocumentIcon } from './Icons';
import { useI18n } from '../context/I18nContext';

// --- Type Definitions ---
interface FileTreeConfig {
    highlight?: string[];
    annotations?: { [key: string]: string };
}

interface TreeItem {
    id: number;
    content: string;
    isHighlighted: boolean;
    annotation?: string;
    isFolder: boolean;
}

interface FileTreeProps {
    content: string;
}

// --- Helper Functions ---

/**
 * Normalizes a path by removing tree characters and trailing slashes.
 * e.g., "│   ├── components/" -> "components"
 */
const cleanLineForPath = (line: string): string => {
    // This regex is designed to be greedy and remove all common box-drawing characters,
    // spaces, and the trailing slash if it exists.
    return line.replace(/^[│├└─\s]*/u, '').replace(/\/$/, '');
};


/**
 * Parses the raw string content into a structured array of TreeItem objects.
 * This is the core logic that builds the file tree structure.
 */
const parseFileTree = (rawContent: string): TreeItem[] => {
    try {
        const { data, content: treeString } = matter(rawContent);
        const config: FileTreeConfig = data || {};
        const highlightSet = new Set(config.highlight || []);
        const annotations = config.annotations || {};

        const lines = treeString.split('\n').filter(line => line.trim() !== '');
        const items: TreeItem[] = [];
        
        // A stack to keep track of the parent directory path based on indentation.
        const pathStack: { level: number; name: string }[] = [];

        const getIndentation = (line: string): number => {
            const match = line.match(/^\s*/);
            return match ? match[0].length : 0;
        };

        lines.forEach((line, index) => {
            const indentation = getIndentation(line);
            const pathPart = cleanLineForPath(line);

            // Adjust the stack to find the correct parent directory.
            while (pathStack.length > 0 && indentation <= pathStack[pathStack.length - 1].level) {
                pathStack.pop();
            }
            
            const parentPath = pathStack.map(p => p.name).join('/');
            // Reconstruct the full path for matching against highlight/annotations.
            const fullPath = parentPath ? `${parentPath}/${pathPart}` : pathPart;
            
            const isFolder = line.trim().endsWith('/');
            if (isFolder) {
                pathStack.push({ level: indentation, name: pathPart });
            }

            items.push({
                id: index,
                content: line,
                isFolder,
                isHighlighted: highlightSet.has(fullPath) || highlightSet.has(`${fullPath}/`),
                annotation: annotations[fullPath] || annotations[`${fullPath}/`],
            });
        });

        return items;
    } catch (e) {
        console.error("Error parsing file tree content:", e);
        return []; // Return an empty array on error to prevent crashes
    }
};


// --- Main Component ---
const FileTree: React.FC<FileTreeProps> = ({ content }) => {
    const { t } = useI18n();
    const items = useMemo(() => parseFileTree(content), [content]);

    if (items.length === 0) {
        return (
            <div className="my-6 p-4 border-l-4 rounded-r-lg bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200">
                <p className="font-bold">{t('fileTreeError')}</p>
                <p>{t('fileTreeErrorDetails')}</p>
            </div>
        );
    }
    
    return (
        <div className="my-6 font-mono text-sm bg-gray-50 dark:bg-gray-800/50 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-4 h-10 bg-gray-100 dark:bg-gray-800 rounded-t-xl border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
            </div>
            <div className="p-4 overflow-x-auto">
                <code>
                    {items.map(item => (
                        <div
                            key={item.id}
                            className={`flex justify-between items-center whitespace-pre ${
                                item.isHighlighted ? 'bg-primary-100 dark:bg-primary-900/50 rounded-md -mx-2 px-2' : ''
                            }`}
                        >
                            <span className="flex items-center">
                               {item.isFolder ? <FolderIcon className="w-4 h-4 mr-1 text-primary-500" /> : <DocumentIcon className="w-4 h-4 mr-1 text-gray-500" />}
                               <span>{item.content}</span>
                            </span>
                            {item.annotation && (
                                <span className="text-gray-500 dark:text-gray-400 italic ml-4 flex-shrink-0">
                                    // {item.annotation}
                                </span>
                            )}
                        </div>
                    ))}
                </code>
            </div>
        </div>
    );
};

export default FileTree;
