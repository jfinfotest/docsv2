import React from 'react';
import NestedMarkdown from './NestedMarkdown';
import { useI18n } from '../context/I18nContext';

interface Step {
    title: string;
    content: string;
}

interface StepItemProps extends Step {
    index: number;
    isLast: boolean;
}

const StepItem: React.FC<StepItemProps> = ({ index, title, content, isLast }) => {
    return (
        <li className="relative pl-12 pb-8">
            {/* Vertical line connecting the steps */}
            {!isLast && (
                <div className="absolute left-0 top-5 h-full w-px bg-gray-300 dark:bg-gray-600 translate-x-[19.5px]" />
            )}
            
            {/* Numbered circle */}
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white font-bold ring-8 ring-white dark:ring-gray-800">
                {index + 1}
            </div>

            <div className="ml-4">
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
                <div className="text-gray-700 dark:text-gray-300">
                    <NestedMarkdown content={content} />
                </div>
            </div>
        </li>
    );
};
StepItem.displayName = 'StepItem';

// Parser function
const parseStepsContent = (content: string): Step[] => {
    if (!content || !content.trim()) return [];

    let processedContent = content.trim();
    // Normalize by removing the initial separator if it exists
    if (processedContent.startsWith('### ')) {
        processedContent = processedContent.substring(4);
    }
    
    // Split into individual steps
    const parts = processedContent.split(/\n###\s+/);

    return parts.map(part => {
        const trimmedPart = part.trim();
        const firstNewlineIndex = trimmedPart.indexOf('\n');
        
        // If there's no newline, the whole part is the title
        if (firstNewlineIndex === -1) {
            return { title: trimmedPart, content: '' };
        }
        
        // Otherwise, split into title and content
        const title = trimmedPart.substring(0, firstNewlineIndex).trim();
        const stepContent = trimmedPart.substring(firstNewlineIndex + 1).trim();
        
        return { title, content: stepContent };
    });
};


interface StepsProps {
    content: string;
}

const Steps: React.FC<StepsProps> = ({ content }) => {
    const { t } = useI18n();
    const items = parseStepsContent(content);

    if (items.length === 0) {
        return (
             <div className="my-6 p-4 border-l-4 rounded-r-lg bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200">
                <p className="font-bold">{t('stepsError')}</p>
                <p>{t('stepsErrorDetails')}</p>
            </div>
        );
    }
    
    return (
        <div className="my-8">
            <ol className="relative">
                {items.map((item, index) => (
                    <StepItem
                        key={index}
                        index={index}
                        title={item.title}
                        content={item.content}
                        isLast={index === items.length - 1}
                    />
                ))}
            </ol>
        </div>
    );
};
Steps.displayName = 'Steps';

export default Steps;
