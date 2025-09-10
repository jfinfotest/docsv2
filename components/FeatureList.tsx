import React, { useMemo } from 'react';
import matter from 'gray-matter';
import NestedMarkdown from './NestedMarkdown';
import { 
    CheckCircleIcon, RocketIcon, LightbulbIcon, GeminiIcon, 
    LayoutIcon, CodeBracketIcon, SettingsIcon, ShieldCheckIcon, 
    BoltIcon, ScaleIcon 
} from './Icons';
import { useI18n } from '../context/I18nContext';

// --- Type Definitions ---
interface FeatureItem {
    title: string;
    icon: string;
    content: string;
}

interface FeatureListProps {
    content: string;
}

// --- Icon Mapping ---
const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
    CheckCircleIcon, RocketIcon, LightbulbIcon, GeminiIcon,
    LayoutIcon, CodeBracketIcon, SettingsIcon, ShieldCheckIcon,
    BoltIcon, ScaleIcon
};

// --- Sub-component for a single list item ---
const FeatureListItem: React.FC<FeatureItem> = ({ title, icon, content }) => {
    const IconComponent = iconMap[icon] || CheckCircleIcon; // Default to checkmark
    
    return (
        <li className="flex items-start space-x-4">
            <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/50">
                <IconComponent className="text-3xl text-primary-600 dark:text-primary-400" />
            </div>
            <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h4>
                <div className="mt-1 text-gray-600 dark:text-gray-400">
                    <NestedMarkdown content={content} />
                </div>
            </div>
        </li>
    );
};
FeatureListItem.displayName = 'FeatureListItem';

// --- Main Component ---
const FeatureList: React.FC<FeatureListProps> = ({ content }) => {
    const { t } = useI18n();
    const { items } = useMemo(() => {
        try {
            const { data } = matter(content);
            return { items: (data.items as FeatureItem[]) || [] };
        } catch (e) {
            console.error("Error parsing FeatureList YAML:", e);
            return { items: [] };
        }
    }, [content]);

    if (items.length === 0) {
        return (
            <div className="my-6 p-4 border-l-4 rounded-r-lg bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200">
                <p className="font-bold">{t('featureListError')}</p>
                <p>{t('featureListErrorDetails')}</p>
            </div>
        );
    }

    return (
        <div className="my-8">
            <ul className="space-y-6">
                {items.map((item, index) => (
                    <FeatureListItem key={index} {...item} />
                ))}
            </ul>
        </div>
    );
};
FeatureList.displayName = 'FeatureList';

export default FeatureList;
