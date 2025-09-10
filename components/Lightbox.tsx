import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import { useI18n } from '../context/I18nContext';

interface LightboxImage {
    src: string;
    alt: string;
}

interface LightboxContextType {
    openLightbox: (images: LightboxImage[], startIndex: number) => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export const useLightbox = () => {
    const context = useContext(LightboxContext);
    if (!context) {
        throw new Error('useLightbox must be used within a LightboxProvider');
    }
    return context;
};

interface LightboxProviderProps {
    children: ReactNode;
}

export const LightboxProvider: React.FC<LightboxProviderProps> = ({ children }) => {
    const [lightboxData, setLightboxData] = useState<{ images: LightboxImage[]; currentIndex: number } | null>(null);
    const { t } = useI18n();

    const openLightbox = (images: LightboxImage[], startIndex: number) => {
        if (images && images.length > 0) {
            setLightboxData({ images, currentIndex: startIndex });
            document.body.style.overflow = 'hidden';
        }
    };

    const closeLightbox = () => {
        setLightboxData(null);
        document.body.style.overflow = '';
    };

    const goToNext = () => {
        setLightboxData(prev => {
            if (!prev) return null;
            const nextIndex = (prev.currentIndex + 1) % prev.images.length;
            return { ...prev, currentIndex: nextIndex };
        });
    };

    const goToPrev = () => {
        setLightboxData(prev => {
            if (!prev) return null;
            const prevIndex = (prev.currentIndex - 1 + prev.images.length) % prev.images.length;
            return { ...prev, currentIndex: prevIndex };
        });
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeLightbox();
            }
            if (lightboxData && lightboxData.images.length > 1) {
                if (event.key === 'ArrowRight') {
                    goToNext();
                }
                if (event.key === 'ArrowLeft') {
                    goToPrev();
                }
            }
        };

        if (lightboxData) {
            window.addEventListener('keydown', handleKeyDown);
        }
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (document.body.style.overflow === 'hidden') {
                 document.body.style.overflow = '';
            }
        };
    }, [lightboxData]);

    const modalRoot = document.getElementById('modal-root');
    const currentImage = lightboxData ? lightboxData.images[lightboxData.currentIndex] : null;
    const hasMultipleImages = lightboxData && lightboxData.images.length > 1;

    return (
        <LightboxContext.Provider value={{ openLightbox }}>
            {children}
            {lightboxData && currentImage && modalRoot && ReactDOM.createPortal(
                <div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image viewer"
                >
                    <style>{`
                        @keyframes fade-in {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                        .animate-fade-in {
                            animation: fade-in 0.2s ease-out;
                        }
                    `}</style>
                    
                    <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        {hasMultipleImages && (
                            <button 
                                onClick={goToPrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                                aria-label={t('previousImage')}
                            >
                                <ChevronLeftIcon className="w-8 h-8" />
                            </button>
                        )}
                        
                        <img
                            src={currentImage.src}
                            alt={currentImage.alt}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        />
                        
                        {hasMultipleImages && (
                             <button 
                                onClick={goToNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                                aria-label={t('nextImage')}
                            >
                                <ChevronRightIcon className="w-8 h-8" />
                            </button>
                        )}
                    </div>

                    <div 
                        className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 text-center text-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <p>{currentImage.alt}</p>
                        {hasMultipleImages && (
                            <p className="text-xs opacity-75 mt-1">{lightboxData.currentIndex + 1} / {lightboxData.images.length}</p>
                        )}
                    </div>
                </div>,
                modalRoot
            )}
        </LightboxContext.Provider>
    );
};
