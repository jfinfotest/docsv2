import React, { useState, useEffect, useMemo, useCallback } from 'react';
import matter from 'gray-matter';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import { useI18n } from '../context/I18nContext';

// --- Type Definitions ---
interface CarouselItem {
    src: string;
    alt?: string;
}

interface CarouselProps {
    content: string;
}

// --- Main Component ---
const Carousel: React.FC<CarouselProps> = ({ content }) => {
    const { t } = useI18n();
    const { items, autoPlay, interval, showDots } = useMemo(() => {
        try {
            const { data } = matter(content);
            const config = {
                items: (data.items as CarouselItem[]) || [],
                autoPlay: data.autoPlay === true,
                interval: typeof data.interval === 'number' ? data.interval : 5000,
                showDots: data.showDots !== false, // default to true
            };
            return config;
        } catch (e) {
            console.error("Error parsing carousel YAML:", e);
            return { items: [], autoPlay: false, interval: 5000, showDots: true };
        }
    }, [content]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = useCallback(() => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, items.length]);

    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === items.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, items.length]);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };
    
    useEffect(() => {
        if (!autoPlay || items.length <= 1) return;

        const slideInterval = setInterval(goToNext, interval);
        return () => clearInterval(slideInterval);
    }, [autoPlay, interval, goToNext, items.length]);

    if (items.length === 0) {
        return (
            <div className="my-6 p-4 border-l-4 rounded-r-lg bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200">
                <p className="font-bold">{t('carouselError')}</p>
                <p>{t('carouselErrorDetails')}</p>
            </div>
        );
    }

    return (
        <div className="my-8 h-96 w-full relative group rounded-xl shadow-lg overflow-hidden">
            {/* Slides Container */}
            <div className="w-full h-full">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0'}`}
                    >
                        <img src={item.src} alt={item.alt || ''} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                         {item.alt && (
                            <div className="absolute bottom-4 left-4 right-4 p-4 text-white text-sm bg-black/30 rounded-lg">
                                {item.alt}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            {items.length > 1 && (
                 <>
                    <button
                        onClick={goToPrevious}
                        className="absolute top-1/2 left-4 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label={t('previousImage')}
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute top-1/2 right-4 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label={t('nextImage')}
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                </>
            )}

            {/* Dot Indicators */}
            {showDots && items.length > 1 && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                    {items.map((_, slideIndex) => (
                        <button
                            key={slideIndex}
                            onClick={() => goToSlide(slideIndex)}
                            className={`w-3 h-3 rounded-full transition-colors ${currentIndex === slideIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`}
                            aria-label={t('goToImage', slideIndex + 1)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Carousel;
