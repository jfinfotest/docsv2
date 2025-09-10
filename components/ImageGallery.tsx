import React from 'react';
import { useLightbox } from './Lightbox';
import { ZoomInIcon } from './Icons';
import { useI18n } from '../context/I18nContext';

export interface ImageGalleryItem {
    src: string;
    alt?: string;
}

export interface ImageGalleryProps {
    items: ImageGalleryItem[];
    columns?: 2 | 3 | 4;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ items, columns = 3 }) => {
    const { openLightbox } = useLightbox();
    const { t } = useI18n();

    if (!items || items.length === 0) {
        return null;
    }

    const gridClasses = {
        2: 'grid-cols-2',
        3: 'grid-cols-2 md:grid-cols-3',
        4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
    };
    
    const handleImageClick = (index: number) => {
        const lightboxImages = items.map(item => ({ src: item.src, alt: item.alt || '' }));
        openLightbox(lightboxImages, index);
    };

    return (
        <div className={`my-8 grid gap-4 ${gridClasses[columns]}`}>
            {items.map((item, index) => (
                <div
                    key={index}
                    className="relative block overflow-hidden group cursor-zoom-in rounded-lg shadow-md dark:shadow-black/30 transition-shadow duration-300 hover:shadow-xl dark:hover:shadow-black/50"
                    onClick={() => handleImageClick(index)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleImageClick(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={t('viewImageFullscreen', item.alt || '')}
                >
                    <img
                        src={item.src}
                        alt={item.alt || ''}
                        className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                        <ZoomInIcon className="w-8 h-8" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ImageGallery;
