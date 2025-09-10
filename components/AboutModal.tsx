import React from 'react';
import ReactDOM from 'react-dom';
import { useI18n } from '../context/I18nContext';
import { APP_CONFIG } from '../constants';
import { CloseIcon, ExternalLinkIcon, InfoCircleIcon } from './Icons';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const technologies = [
    { name: 'React', url: 'https://react.dev/' },
    { name: 'Tailwind CSS', url: 'https://tailwindcss.com/' },
    { name: 'Google Gemini API', url: 'https://ai.google.dev/' },
    { name: 'Prism.js', url: 'https://prismjs.com/' },
    { name: 'Mermaid.js', url: 'https://mermaid.js.org/' },
    { name: 'Chart.js', url: 'https://www.chartjs.org/' },
    { name: 'KaTeX', url: 'https://katex.org/' },
    { name: 'Tabler Icons', url: 'https://tabler-icons.io/' },
];

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
    const { t } = useI18n();
    
    if (!isOpen) return null;
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;

    const CreditPill: React.FC<{ name: string; url: string }> = ({ name, url }) => (
        <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm font-medium text-gray-800 dark:text-gray-200 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/50 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
        >
            {name} <ExternalLinkIcon className="w-3.5 h-3.5 ml-1.5 opacity-70" />
        </a>
    );

    return ReactDOM.createPortal(
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-modal-title"
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
            <div
                className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl relative"
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label={t('closeAbout')}>
                    <CloseIcon className="text-2xl" />
                </button>
                
                <div className="p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-900/50">
                            <InfoCircleIcon className="text-5xl text-primary-600 dark:text-primary-400" />
                        </div>
                    </div>
                    <h2 id="about-modal-title" className="text-2xl font-bold text-gray-900 dark:text-white">
                        {t('aboutTitle')} {APP_CONFIG.title}
                    </h2>
                </div>
                
                <div className="px-8 pb-8">
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white text-center mb-4">{t('aboutCoreTechnologies')}</h3>
                        <div className="flex flex-wrap justify-center gap-2">
                            {technologies.map(tech => (
                                <CreditPill key={tech.name} name={tech.name} url={tech.url} />
                            ))}
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                        <p>{t('aboutCreatedBy')}</p>
                    </div>
                </div>

            </div>
        </div>,
        modalRoot
    );
};

export default AboutModal;