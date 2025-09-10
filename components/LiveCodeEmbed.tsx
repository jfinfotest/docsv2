import React from 'react';
import { useI18n } from '../context/I18nContext';

interface LiveCodeEmbedProps {
    src: string;
    title?: string;
}

const getEmbedUrl = (url: string): string | null => {
    try {
        const urlObj = new URL(url);

        if (urlObj.hostname.includes('codepen.io')) {
            // https://codepen.io/chriscoyier/pen/gOMdOr -> https://codepen.io/chriscoyier/embed/gOMdOr
            urlObj.pathname = urlObj.pathname.replace('/pen/', '/embed/');
            return urlObj.toString();
        }

        if (urlObj.hostname.includes('jsfiddle.net')) {
            // https://jsfiddle.net/user/slug/ -> https://jsfiddle.net/user/slug/embedded/
            const path = urlObj.pathname.endsWith('/') ? urlObj.pathname : `${urlObj.pathname}/`;
            urlObj.pathname = `${path}embedded/`;
            return urlObj.toString();
        }

        if (urlObj.hostname.includes('codesandbox.io')) {
            // https://codesandbox.io/s/slug -> https://codesandbox.io/embed/slug
            urlObj.pathname = urlObj.pathname.replace('/p/', '/embed/').replace('/s/', '/embed/');
            return urlObj.toString();
        }

    } catch (e) {
        console.error("Invalid embed URL:", url, e);
        return null;
    }
    return null; // Unsupported service
};

const LiveCodeEmbed: React.FC<LiveCodeEmbedProps> = ({ src, title }) => {
    const { t } = useI18n();
    const embedUrl = getEmbedUrl(src);

    if (!embedUrl) {
        return (
            <div className="my-6 p-4 border-l-4 rounded-r-lg bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200">
                <p className="font-bold">{t('liveCodeEmbedInvalidUrl')}</p>
                <p>{t('liveCodeEmbedInvalidUrlDetails')}</p>
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
                style={{ paddingTop: '75%' }} // 4:3 aspect ratio
            >
                <iframe
                    src={embedUrl}
                    title={title || 'Live Code Embed'}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ border: 0 }}
                    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                    loading="lazy"
                />
            </div>
        </div>
    );
};

export default LiveCodeEmbed;
