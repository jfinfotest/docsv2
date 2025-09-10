import React from 'react';
import NestedMarkdown from './NestedMarkdown';

interface TimelineItemProps {
    title: string;
    date: string;
    content: string;
    isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, date, content, isLast }) => {
    return (
        <li className="relative pl-8">
            {/* The vertical line connecting the items */}
            {!isLast && (
                 <div className="absolute left-0 top-0 w-px h-full bg-gray-300 dark:bg-gray-600 translate-x-[9.5px] translate-y-4" />
            )}
           
            {/* The circle marker on the timeline */}
            <div className="absolute left-0 top-0 flex items-center justify-center w-5 h-5 bg-white dark:bg-gray-800 rounded-full ring-4 ring-white dark:ring-gray-800 translate-y-2">
                <div className="w-2.5 h-2.5 bg-primary-500 rounded-full" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white m-0">{title}</h3>
                <time className="sm:ml-4 flex-shrink-0 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">{date}</time>
            </div>
            <div className="pb-8">
                 <NestedMarkdown content={content} />
            </div>
        </li>
    );
};


interface TimelineProps {
    items: { title: string, date: string, content: string }[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
    return (
        <div className="my-6">
            <ol className="relative">
                {items.map((item, index) => (
                    <TimelineItem
                        key={index}
                        title={item.title}
                        date={item.date}
                        content={item.content}
                        isLast={index === items.length - 1}
                    />
                ))}
            </ol>
        </div>
    );
};

export default Timeline;