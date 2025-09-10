import React from 'react';
import { SearchDocument } from '../types';
import { DocumentIcon } from './Icons';
import { useI18n } from '../context/I18nContext';

interface SearchResultsProps {
    query: string;
    results: SearchDocument[];
    onResultClick: (path: string) => void;
    isLoading: boolean;
}

const highlightText = (text: string, query: string) => {
    if (!query.trim() || !text) return text;
    
    // Split the query into individual, non-empty terms
    const terms = query.split(/\s+/).filter(Boolean);
    if (terms.length === 0) return text;

    // Create a regex to find all terms, and escape special characters
    const regex = new RegExp(`(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, i) =>
                terms.some(term => part.toLowerCase() === term.toLowerCase()) ? (
                    <span key={i} className="bg-yellow-200 dark:bg-yellow-700 rounded-sm text-gray-900 dark:text-gray-100">
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </>
    );
};

const createSnippet = (content: string, query: string, maxLength = 120): string => {
    if (!content || !query.trim()) {
        return (content || '').substring(0, maxLength) + (content.length > maxLength ? '...' : '');
    }

    const terms = query.split(/\s+/).filter(Boolean);
    if (terms.length === 0) {
        return (content || '').substring(0, maxLength) + (content.length > maxLength ? '...' : '');
    }

    const lowerContent = content.toLowerCase();
    let bestIndex = -1;

    // Find the first occurrence of any search term
    for (const term of terms) {
        const index = lowerContent.indexOf(term.toLowerCase());
        if (index !== -1) {
            bestIndex = index;
            break;
        }
    }

    if (bestIndex === -1) {
        // If no term is found, return the beginning of the content
        return content.substring(0, maxLength) + (content.length > maxLength ? '...' : '');
    }

    const startPosition = Math.max(0, bestIndex - Math.floor(maxLength / 2.5));
    const endPosition = Math.min(content.length, startPosition + maxLength);

    let snippet = content.substring(startPosition, endPosition);

    if (startPosition > 0) {
        snippet = '...' + snippet;
    }
    if (endPosition < content.length) {
        snippet = snippet + '...';
    }

    return snippet;
};

const SearchResults: React.FC<SearchResultsProps> = ({ query, results, onResultClick, isLoading }) => {
    const { t } = useI18n();
    return (
        <div className="absolute top-full mt-2 w-96 max-w-lg right-0 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {results.length > 0 && t('searchResults', results.length) + ' '}
                    <span className="font-semibold text-gray-800 dark:text-gray-200">"{query}"</span>
                </p>
            </div>
            {isLoading ? (
                 <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    {t('indexingContent')}
                </div>
            ) : results.length > 0 ? (
                <ul className="max-h-96 overflow-y-auto">
                    {results.map((result) => {
                        const snippet = createSnippet(result.content, query);
                        return (
                            <li key={result.id}>
                                <button
                                    onClick={() => onResultClick(result.id)}
                                    className="w-full text-left flex items-start p-3 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-150"
                                >
                                    <div className="flex-shrink-0 mt-1 text-gray-500 dark:text-gray-400">
                                        <DocumentIcon className="w-5 h-5" />
                                    </div>
                                    <div className="ml-3 overflow-hidden">
                                        {/* Show page title as a breadcrumb */}
                                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {highlightText(result.pageTitle, query)}
                                        </div>
                                        {/* Section title is more prominent */}
                                        <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                                            {highlightText(result.title, query)}
                                        </p>
                                        {/* Snippet from the section content */}
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                            {highlightText(snippet, query)}
                                        </p>
                                    </div>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    {t('noResultsFound')}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
