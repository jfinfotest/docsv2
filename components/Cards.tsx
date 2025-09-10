import React from 'react';
import { Link } from 'react-router-dom';
import { 
    RocketIcon, BookOpenIcon, FileCodeIcon, MessageIcon, 
    PlayIcon, FolderIcon, PencilIcon, ExternalLinkIcon,
    CodeBracketIcon, LayoutIcon, MathSymbolsIcon, ChartBarIcon,
    PresentationAnalyticsIcon, SlideshowIcon, TrendingUpIcon, ServerIcon, 
    UsersIcon, NumberIcon, WorldIcon,
    VideoCameraIcon, AcademicCapIcon, ClipboardListIcon,
    ListIcon, LightbulbIdeaIcon, SettingsIcon, GeminiIcon, WandIcon
} from './Icons';
import NestedMarkdown from './NestedMarkdown';
import { useI18n } from '../context/I18nContext';

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
    RocketIcon,
    BookOpenIcon,
    FileCodeIcon,
    MessageIcon,
    PlayIcon,
    FolderIcon,
    PencilIcon,
    ExternalLinkIcon,
    CodeBracketIcon,
    LayoutIcon,
    MathSymbolsIcon,
    ChartBarIcon,
    PresentationAnalyticsIcon,
    SlideshowIcon,
    TrendingUpIcon,
    ServerIcon,
    UsersIcon,
    NumberIcon,
    WorldIcon,
    VideoCameraIcon,
    AcademicCapIcon,
    ClipboardListIcon,
    ListIcon,
    LightbulbIdeaIcon,
    SettingsIcon,
    GeminiIcon,
    WandIcon
};

export interface CardItemProps {
    title: string;
    icon?: string;
    href: string;
    content: string;
}

export interface CardsProps {
    items: CardItemProps[];
    columns?: 2 | 3;
}

const Card: React.FC<CardItemProps> = ({ title, icon, href, content }) => {
    const { t } = useI18n();
    const isExternal = href.startsWith('http');
    const IconComponent = icon ? iconMap[icon] : null;

    const cardContent = (
        <>
            {IconComponent && (
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                    <IconComponent className="text-2xl" />
                </div>
            )}
            <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                <NestedMarkdown content={content} />
            </div>
            <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-primary-600 dark:text-primary-400 transition-transform group-hover:translate-x-1">
                <span>{isExternal ? t('learnMore') : t('goToPage')}</span>
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </div>
        </>
    );

    const commonClasses = "group flex flex-col h-full rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800/50 dark:border-gray-700 dark:hover:border-primary-600 dark:hover:shadow-primary-900/50";
    
    if (isExternal) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={commonClasses}>
                {cardContent}
            </a>
        );
    }
    
    return (
        <Link to={href} className={commonClasses}>
            {cardContent}
        </Link>
    );
};

const Cards: React.FC<CardsProps> = ({ items, columns = 2 }) => {
    if (!items || items.length === 0) {
        return null;
    }

    const gridClasses = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3'
    };

    return (
        <div className={`my-8 grid grid-cols-1 gap-6 ${gridClasses[columns]}`}>
            {items.map((item, index) => (
                <Card key={index} {...item} />
            ))}
        </div>
    );
};

export default Cards;
