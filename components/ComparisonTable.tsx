import React, { useMemo } from 'react';
import matter from 'gray-matter';
import { CheckIcon, CloseIcon, MinusIcon } from './Icons';
import NestedMarkdown from './NestedMarkdown';
import { useI18n } from '../context/I18nContext';

// --- Type Definitions ---
type Header = string | { text: string; highlight?: boolean };
type Row = string[];

interface ComparisonTableProps {
    content: string;
}

// --- Helper Functions ---
const renderCellContent = (content: string) => {
    if (typeof content !== 'string') return content;
    const lowerContent = content.toLowerCase().trim();
    
    if (['true', 'check', 'yes'].includes(lowerContent)) {
        return <CheckIcon className="h-6 w-6 text-green-500 mx-auto" />;
    }
    if (['false', 'cross', 'x', 'no'].includes(lowerContent)) {
        return <CloseIcon className="h-6 w-6 text-red-500 mx-auto" />;
    }
    if (['n/a', '-', 'na'].includes(lowerContent)) {
        return <MinusIcon className="h-6 w-6 text-gray-400 mx-auto" />;
    }
    return <span className="text-gray-700 dark:text-gray-300">{content}</span>;
};

const normalizeHeaders = (headers: Header[]): { text: string; highlight: boolean }[] => {
    return headers.map(h => {
        if (typeof h === 'string') {
            return { text: h, highlight: false };
        }
        return { text: h.text, highlight: h.highlight || false };
    });
};

// --- Main Component ---
const ComparisonTable: React.FC<ComparisonTableProps> = ({ content }) => {
    const { t } = useI18n();
    const { headers, rows } = useMemo(() => {
        try {
            const { data } = matter(content);
            return {
                headers: normalizeHeaders((data.headers as Header[]) || []),
                rows: (data.rows as Row[]) || [],
            };
        } catch (e) {
            console.error("Error parsing ComparisonTable YAML:", e);
            return { headers: [], rows: [] };
        }
    }, [content]);

    if (headers.length === 0 || rows.length === 0) {
        return (
            <div className="my-6 p-4 border-l-4 rounded-r-lg bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200">
                <p className="font-bold">{t('comparisonTableError')}</p>
                <p>{t('comparisonTableErrorDetails')}</p>
            </div>
        );
    }

    return (
        <div className="my-8 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 text-sm">
                <thead className="text-left bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                scope="col"
                                className={`whitespace-nowrap px-4 py-3 font-semibold text-gray-900 dark:text-white ${header.highlight ? 'bg-primary-50 dark:bg-primary-900/30' : ''}`}
                            >
                                {header.text}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-800/50">
                            {row.map((cell, cellIndex) => {
                                const isFeatureColumn = cellIndex === 0;
                                const isHighlighted = headers[cellIndex]?.highlight;
                                return (
                                    <td
                                        key={cellIndex}
                                        className={`whitespace-nowrap px-4 py-3 ${isHighlighted ? 'bg-primary-50 dark:bg-primary-900/30' : ''}`}
                                    >
                                        {isFeatureColumn ? (
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                <NestedMarkdown content={cell} />
                                            </div>
                                        ) : (
                                            renderCellContent(cell)
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ComparisonTable;
