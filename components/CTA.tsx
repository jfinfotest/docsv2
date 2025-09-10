import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import matter from 'gray-matter';
import { 
    RocketIcon, DownloadIcon, PlayIcon, ExternalLinkIcon,
    AudioWaveformIcon, VideoCameraIcon, MessageIcon, BookOpenIcon
} from './Icons';
import NestedMarkdown from './NestedMarkdown';
import { useI18n } from '../context/I18nContext';

interface ButtonConfig {
    text: string;
    url: string;
    variant?: 'primary' | 'secondary';
    icon?: string;
}

interface CTAProps {
    content: string;
}

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
    RocketIcon,
    DownloadIcon,
    PlayIcon,
    ExternalLinkIcon,
    AudioWaveformIcon,
    VideoCameraIcon,
    MessageIcon,
    BookOpenIcon,
};

const CTA: React.FC<CTAProps> = ({ content }) => {
    const { t } = useI18n();
    const parsedData = useMemo(() => {
        try {
            const { data, content: markdownContent } = matter(content);
            const { title, buttons = [] } = data as { title?: string; buttons?: ButtonConfig[] };
            return { success: true, title, markdownContent, buttons };
        } catch (e) {
            console.error("Error parsing CTA content:", e);
            return { success: false, title: null, markdownContent: null, buttons: [] };
        }
    }, [content]);

    if (!parsedData.success) {
        return (
             <div className="my-6 p-4 border-l-4 rounded-r-lg bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200">
                <p className="font-bold">{t('ctaInvalidSyntax')}</p>
                <p>{t('ctaInvalidSyntaxDetails')}</p>
            </div>
        );
    }

    const { title, markdownContent, buttons } = parsedData;

    return (
        <div className="my-8 p-6 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
            {title && (
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {title}
                </h3>
            )}
            {markdownContent && (
                <div className="text-gray-600 dark:text-gray-300">
                    <NestedMarkdown content={markdownContent} />
                </div>
            )}
            {buttons.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-4">
                    {buttons.map((button, index) => {
                        const isExternal = button.url.startsWith('http');
                        const IconComponent = button.icon ? iconMap[button.icon] : null;

                        const commonClasses = "inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg shadow-sm transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800";
                        const primaryClasses = "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500";
                        const secondaryClasses = "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-primary-500";

                        const buttonClasses = `${commonClasses} ${button.variant === 'secondary' ? secondaryClasses : primaryClasses}`;

                        const ButtonContent = (
                            <>
                                {IconComponent && <IconComponent className="w-5 h-5" />}
                                <span className={IconComponent ? 'ml-2' : ''}>{button.text}</span>
                                {isExternal && !IconComponent && <ExternalLinkIcon className="w-4 h-4 ml-1.5" />}
                            </>
                        );

                        if (isExternal) {
                            return (
                                <a
                                    key={index}
                                    href={button.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={buttonClasses}
                                >
                                    {ButtonContent}
                                </a>
                            );
                        } else {
                            return (
                                <Link key={index} to={button.url} className={buttonClasses}>
                                    {ButtonContent}
                                </Link>
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
};

export default CTA;
