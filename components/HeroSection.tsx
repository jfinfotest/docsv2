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

interface HeroSectionProps {
    content: string;
}

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
    RocketIcon, DownloadIcon, PlayIcon, ExternalLinkIcon,
    AudioWaveformIcon, VideoCameraIcon, MessageIcon, BookOpenIcon,
};

const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
    const { t } = useI18n();
    const parsedData = useMemo(() => {
        try {
            const { data } = matter(content);
            const { 
                title, 
                subtitle, 
                buttons = [],
                backgroundImage,
                backgroundVideo,
                overlayOpacity = 0.5
            } = data as { 
                title?: string; 
                subtitle?: string;
                buttons?: ButtonConfig[];
                backgroundImage?: string;
                backgroundVideo?: string;
                overlayOpacity?: number;
            };
            return { 
                success: true, 
                title, 
                subtitle, 
                buttons, 
                backgroundImage,
                backgroundVideo,
                overlayOpacity
            };
        } catch (e) {
            console.error("Error parsing HeroSection content:", e);
            return { success: false, title: null, subtitle: null, buttons: [], backgroundImage: null, backgroundVideo: null, overlayOpacity: 0.5 };
        }
    }, [content]);

    if (!parsedData.success || !parsedData.title) {
        return (
             <div className="my-6 p-4 border-l-4 rounded-r-lg bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200">
                <p className="font-bold">{t('heroSectionInvalidSyntax')}</p>
                <p>{t('heroSectionInvalidSyntaxDetails')}</p>
            </div>
        );
    }

    const { title, subtitle, buttons, backgroundImage, backgroundVideo, overlayOpacity } = parsedData;

    return (
        <div className="relative my-8 text-white rounded-2xl shadow-xl overflow-hidden flex items-center justify-center text-center" style={{ minHeight: '60vh' }}>
            {backgroundVideo && (
                <video
                    className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src={backgroundVideo} type="video/mp4" />
                </video>
            )}
            <div 
                className="absolute inset-0 z-10 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})`}}
            />
            <div 
                className="absolute inset-0 z-20 bg-black"
                style={{ opacity: overlayOpacity }}
            />

            <div className="relative z-30 p-8 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-4 text-lg md:text-xl text-gray-200">
                        {subtitle}
                    </p>
                )}
                {buttons.length > 0 && (
                    <div className="mt-8 flex flex-wrap gap-4 justify-center">
                        {buttons.map((button, index) => {
                            const isExternal = button.url.startsWith('http');
                            const IconComponent = button.icon ? iconMap[button.icon] : null;

                            const commonClasses = "inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";
                            const primaryClasses = "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500";
                            const secondaryClasses = "bg-gray-200 text-gray-800 hover:bg-white focus:ring-gray-300";

                            const buttonClasses = `${commonClasses} ${button.variant === 'secondary' ? secondaryClasses : primaryClasses}`;

                            const ButtonContent = (
                                <>
                                    {IconComponent && <IconComponent className="w-5 h-5" />}
                                    <span className={IconComponent ? 'ml-2' : ''}>{button.text}</span>
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
        </div>
    );
};

export default HeroSection;
