import React, { useMemo } from 'react';
import matter from 'gray-matter';
import { 
    DownloadIcon, TrendingUpIcon, ServerIcon, UsersIcon,
    CheckCircleIcon, RocketIcon, LightbulbIcon, BoltIcon,
    ShieldCheckIcon, ScaleIcon 
} from './Icons';
import { useI18n } from '../context/I18nContext';

// --- Type Definitions ---
interface StatCardItem {
    icon: string;
    value: string;
    label: string;
    color?: 'green' | 'blue' | 'yellow' | 'red' | 'purple' | 'teal';
}

interface StatCardsProps {
    content: string;
}

// --- Icon & Color Mapping ---
const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
    DownloadIcon, TrendingUpIcon, ServerIcon, UsersIcon,
    CheckCircleIcon, RocketIcon, LightbulbIcon, BoltIcon,
    ShieldCheckIcon, ScaleIcon
};

const colorClasses: { [key: string]: string } = {
    green: 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400',
    blue: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400',
    red: 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400',
    purple: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400',
    teal: 'bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400',
};

// --- Sub-component: StatCard ---
const StatCard: React.FC<StatCardItem> = ({ icon, value, label, color }) => {
    const IconComponent = iconMap[icon] || TrendingUpIcon;
    const colorStyle = color ? colorClasses[color] : colorClasses.blue;

    return (
        <div className="flex items-center p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg ${colorStyle}`}>
                <IconComponent className="text-2xl" />
            </div>
            <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            </div>
        </div>
    );
};


// --- Main Component: StatCards ---
const StatCards: React.FC<StatCardsProps> = ({ content }) => {
    const { t } = useI18n();
    const { items, columns } = useMemo(() => {
        try {
            const { data } = matter(content);
            const validColumns = [2, 3, 4].includes(data.columns) ? data.columns : 4;
            return {
                items: (data.items as StatCardItem[]) || [],
                columns: validColumns,
            };
        } catch (e) {
            console.error("Error parsing StatCards YAML:", e);
            return { items: [], columns: 4 };
        }
    }, [content]);

    if (items.length === 0) {
        return (
            <div className="my-6 p-4 border-l-4 rounded-r-lg bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200">
                <p className="font-bold">{t('statCardsError')}</p>
                <p>{t('statCardsErrorDetails')}</p>
            </div>
        );
    }

    const gridClasses = {
        2: 'sm:grid-cols-2',
        3: 'sm:grid-cols-2 lg:grid-cols-3',
        4: 'sm:grid-cols-2 lg:grid-cols-4'
    };

    return (
        <div className="my-8">
            <div className={`grid grid-cols-1 gap-4 ${gridClasses[columns]}`}>
                {items.map((item, index) => (
                    <StatCard key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

export default StatCards;
