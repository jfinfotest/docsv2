import React, { useState, useMemo } from 'react';
import matter from 'gray-matter';
import NestedMarkdown from './NestedMarkdown';
import ImageWithLightbox from './ImageWithLightbox';
import CodeBlock from './CodeBlock';
import Mermaid from './Mermaid';
import { ChevronLeftIcon, ChevronRightIcon, RefreshIcon } from './Icons';
import { useI18n } from '../context/I18nContext';

// --- Type Definitions ---
type Media = 
    | { type: 'image'; src: string; alt?: string }
    | { type: 'code'; lang: string; code: string }
    | { type: 'mermaid'; chart: string };

interface TutorialStep {
    content: string;
    media: Media;
}

interface TutorialSliderProps {
    content: string;
}

// --- Sub-component for rendering the media panel content ---
const MediaRenderer: React.FC<{ media: Media }> = ({ media }) => {
    switch (media.type) {
        case 'image':
            return <ImageWithLightbox src={media.src} alt={media.alt} />;
        case 'code':
            return (
                <CodeBlock 
                    className={`language-${media.lang}`}
                    node={{ children: [{ type: 'text', value: media.code }] }}
                >
                    {media.code}
                </CodeBlock>
            );
        case 'mermaid':
            return <Mermaid chart={media.chart} />;
        default:
            return null;
    }
};

// --- Main Component ---
const TutorialSlider: React.FC<TutorialSliderProps> = ({ content }) => {
    const { t } = useI18n();
    const steps = useMemo<TutorialStep[]>(() => {
        try {
            const { data } = matter(content);
            return (data.steps as TutorialStep[]) || [];
        } catch (e) {
            console.error("Error parsing tutorial-slider YAML:", e);
            return [];
        }
    }, [content]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : 0));
    };

    const goToNext = () => {
        setCurrentIndex(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    };
    
    const restart = () => {
        setCurrentIndex(0);
    };

    if (steps.length === 0) {
        return (
            <div className="my-6 p-4 border-l-4 rounded-r-lg bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200">
                <p className="font-bold">{t('tutorialSliderError')}</p>
                <p>{t('tutorialSliderErrorDetails')}</p>
            </div>
        );
    }

    const activeStep = steps[currentIndex];
    const isLastStep = currentIndex === steps.length - 1;

    return (
        <div className="my-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
            <style>{`
                @keyframes fade-in-slide {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-slide {
                    animation: fade-in-slide 0.5s ease-out forwards;
                }
            `}</style>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Visual Panel */}
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 min-h-[300px] md:min-h-[400px]">
                    <div key={currentIndex} className="animate-fade-in-slide">
                        <MediaRenderer media={activeStep.media} />
                    </div>
                </div>

                {/* Text Panel */}
                <div className="p-6 flex flex-col">
                    <div className="flex-grow">
                        <div key={currentIndex} className="animate-fade-in-slide">
                            <NestedMarkdown content={activeStep.content} />
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        <button 
                            onClick={goToPrevious}
                            disabled={currentIndex === 0}
                            className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeftIcon className="w-5 h-5" />
                            <span className="ml-2">{t('previous')}</span>
                        </button>

                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {t('stepOf', currentIndex + 1, steps.length)}
                        </div>

                        {isLastStep ? (
                            <button
                                onClick={restart}
                                className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg shadow-sm bg-green-600 text-white hover:bg-green-700"
                            >
                                <RefreshIcon className="w-5 h-5" />
                                <span className="ml-2">{t('restart')}</span>
                            </button>
                        ) : (
                             <button
                                onClick={goToNext}
                                disabled={isLastStep}
                                className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg shadow-sm bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50"
                            >
                                <span className="mr-2">{t('next')}</span>
                                <ChevronRightIcon className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorialSlider;
