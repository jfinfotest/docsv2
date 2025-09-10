import React from 'react';
import { useLightbox } from './Lightbox';
import { ZoomInIcon } from './Icons';
import { useI18n } from '../context/I18nContext';

interface ImageWithLightboxProps {
    src?: string;
    alt?: string;
}

// Helper to parse the alt tag for a caption and {key=value} options
const parseAltText = (alt: string = '') => {
    const options: { [key: string]: string | boolean } = {};
    let caption = alt;

    const match = alt.match(/(.*)\s*\{(.*)\}\s*$/);
    if (match) {
        caption = match[1].trim();
        const optionsStr = match[2];

        optionsStr.split(',').forEach(part => {
            const [key, value] = part.split('=').map(s => s.trim());
            if (key) {
                // Store values as is, or `true` for boolean flags like {shadow}
                options[key] = value === undefined ? true : value;
            }
        });
    }

    return { caption, options };
};

const ImageWithLightbox: React.FC<ImageWithLightboxProps> = ({ src, alt }) => {
    const { openLightbox } = useLightbox();
    const { t } = useI18n();
    
    if (!src) {
        return <img src="" alt={alt || 'Image failed to load'} className="my-6 rounded-lg shadow-md" />;
    }

    const { caption, options } = parseAltText(alt);
    const { width, height, align, shadow } = options;

    const handleClick = () => {
        openLightbox([{ src, alt: caption || '' }], 0);
    };

    // Base classes
    const figureClasses = ['my-6', 'max-w-full']; // not-prose is key to override prose styles
    const figureStyles: React.CSSProperties = {};
    const imgStyles: React.CSSProperties = {};

    // Apply width and height
    if (width) {
        figureStyles.width = String(width);
        imgStyles.width = '100%';
    }
    if (height) {
        imgStyles.height = String(height);
        imgStyles.objectFit = 'cover';
    }

    // Apply alignment
    switch (align) {
        case 'center':
            figureClasses.push('mx-auto');
            break;
        case 'left':
            figureClasses.push('sm:float-left sm:mr-6');
            break;
        case 'right':
            figureClasses.push('sm:float-right sm:ml-6');
            break;
    }

    // Shadow classes for the interactive span
    const spanClasses = [
        "relative", "block", "overflow-hidden", "group", "cursor-zoom-in",
        "transition-shadow", "duration-300", "rounded-lg",
        shadow ? 'shadow-xl dark:shadow-black/50' : 'shadow-md dark:shadow-black/30'
    ];

    return (
        <figure 
            className={figureClasses.join(' ')}
            style={figureStyles}
        >
            <span
                className={spanClasses.join(' ')}
                onClick={handleClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
                aria-label={t('viewImageFullscreen', caption)}
            >
                <img 
                    src={src} 
                    alt={caption} 
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105 block"
                    style={imgStyles} 
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                    <ZoomInIcon className="w-8 h-8" />
                </div>
            </span>
            {caption && (
                <figcaption className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
};

export default ImageWithLightbox;
