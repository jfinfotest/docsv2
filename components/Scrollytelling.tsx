import React, { useState, useEffect, useMemo, useRef } from 'react';
import matter from 'gray-matter';
import NestedMarkdown from './NestedMarkdown';
import ImageWithLightbox from './ImageWithLightbox';
import CodeBlock from './CodeBlock';
import Mermaid from './Mermaid';
import { useI18n } from '../context/I18nContext';

// --- Type Definitions ---
type Media = 
    | { type: 'image'; src: string; alt?: string }
    | { type: 'code'; lang: string; code: string }
    | { type: 'mermaid'; chart: string };

interface ScrollytellingStep {
    content: string;
    media: Media;
}

interface ScrollytellingProps {
    content: string;
}

// --- Sub-component for rendering the sticky media panel ---
const StickyMediaPanel: React.FC<{ activeMedia: Media | null }> = ({ activeMedia }) => {
    const { t } = useI18n();
    const renderMedia = (media: Media) => {
        switch (media.type) {
            case 'image':
                return <ImageWithLightbox src={media.src} alt={media.alt} />;
            case 'code':
                // CodeBlock expects children, not a string prop.
                // We also need to simulate the structure it expects from rehype-prism.
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

    return (
        <div className="w-full h-full p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl">
             {activeMedia ? (
                <div key={JSON.stringify(activeMedia)} className="animate-fade-in">
                    {renderMedia(activeMedia)}
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                    <p>{t('scrollToBegin')}</p>
                </div>
            )}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.98); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

// --- Main Component ---
const Scrollytelling: React.FC<ScrollytellingProps> = ({ content }) => {
    const { t } = useI18n();
    const steps = useMemo<ScrollytellingStep[]>(() => {
        try {
            const { data } = matter(content);
            return (data.steps as ScrollytellingStep[]) || [];
        } catch (e) {
            console.error("Error parsing scrollytelling YAML:", e);
            return [];
        }
    }, [content]);

    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        stepRefs.current = stepRefs.current.slice(0, steps.length);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-step-index') || '0', 10);
                        setActiveIndex(index);
                    }
                });
            },
            {
                rootMargin: '-50% 0px -50% 0px', // Trigger when the element is in the vertical center
                threshold: 0,
            }
        );

        stepRefs.current.forEach(el => {
            if (el) observer.observe(el);
        });

        return () => {
            stepRefs.current.forEach(el => {
                if (el) observer.unobserve(el);
            });
        };
    }, [steps.length]);

    if (steps.length === 0) {
        return (
            <div className="my-6 p-4 border-l-4 rounded-r-lg bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200">
                <p className="font-bold">{t('scrollytellingError')}</p>
                <p>{t('scrollytellingErrorDetails')}</p>
            </div>
        );
    }

    const activeMedia = activeIndex >= 0 && activeIndex < steps.length ? steps[activeIndex].media : null;
    
    return (
        <div className="my-8 md:flex md:space-x-8">
            {/* Left/Top Panel: Scrolling Text Content */}
            <div className="md:w-1/2">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        // FIX: Ensure the ref callback function returns void by using a block statement.
                        ref={el => { stepRefs.current[index] = el; }}
                        data-step-index={index}
                        className={`min-h-[60vh] flex items-center justify-center p-6 transition-opacity duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-40'}`}
                    >
                        <div className="prose dark:prose-invert">
                             <NestedMarkdown content={step.content} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Right/Bottom Panel: Sticky Media */}
            <div className="md:w-1/2 md:sticky md:top-24 h-[80vh] rounded-xl shadow-lg">
                <StickyMediaPanel activeMedia={activeMedia} />
            </div>
        </div>
    );
};

export default Scrollytelling;
