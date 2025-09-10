import React from 'react';
import { useI18n } from '../context/I18nContext';

interface VideoEmbedProps {
    src: string;
    title?: string;
}

const getEmbedUrl = (url: string): string | null => {
    let embedUrl: string | null = null;
    try {
        const urlObj = new URL(url);

        if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
            const videoId = urlObj.hostname.includes('youtu.be')
                ? urlObj.pathname.substring(1)
                : urlObj.searchParams.get('v');
            if (videoId) {
                embedUrl = `https://www.youtube.com/embed/${videoId}`;
            }
        } else if (urlObj.hostname.includes('vimeo.com')) {
            const videoId = urlObj.pathname.split('/').pop();
            if (videoId) {
                embedUrl = `https://player.vimeo.com/video/${videoId}`;
            }
        }
    } catch (e) {
        console.error("Invalid video URL:", url, e);
        return null;
    }
    return embedUrl;
};

const VideoEmbed: React.FC<VideoEmbedProps> = ({ src, title }) => {
    const { t } = useI18n();
    const embedUrl = getEmbedUrl(src);

    if (!embedUrl) {
        return (
            <div className="my-6 p-4 border-l-4 rounded-r-lg bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200">
                <p className="font-bold">{t('videoEmbedError')}</p>
                <p>{t('videoEmbedErrorDetails', src)}</p>
            </div>
        );
    }

    return (
        <div className="my-8">
            {title && (
                <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200 mb-4">{title}</h3>
            )}
            <div 
                className="relative h-0 overflow-hidden max-w-full w-full rounded-xl shadow-lg"
                style={{ paddingBottom: '56.25%' }} // 16:9 aspect ratio
            >
                <iframe
                    src={embedUrl}
                    title={title || 'Video insertado'}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </div>
    );
};

export default VideoEmbed;
