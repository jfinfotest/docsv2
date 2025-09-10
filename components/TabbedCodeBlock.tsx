import React, { useState, useRef, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useTheme } from '../context/ThemeContext';
import { CopyIcon, CheckIcon, ExpandIcon, LineNumbersIcon, CloseIcon, FileCodeIcon } from './Icons';
import { useI18n } from '../context/I18nContext';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';

// --- Helper Functions ---

interface Tab {
    title: string;
    lang: string;
    code: string;
}

// Parses the special syntax for tabbed code blocks.
const parseTabContent = (content: string): Tab[] => {
    const tabs: Tab[] = [];
    // FIX: Add the 'u' flag for Unicode support in the regex.
    // This ensures that special characters like 'ñ' in tab titles are parsed correctly.
    const separator = /---\[tab\s+title="([^"]+)"\s+lang="([^"]+)"\]---\r?\n/gu;
    
    // The first part before any separator is ignored. The rest come in groups of 3.
    const parts = content.split(separator);
    
    if (parts.length < 4 && content.trim() !== '') {
        console.warn("Could not parse tab content. Ensure it starts with a `---[tab...]---` separator.", {
            content: content.substring(0, 100) + '...',
            parts
        });
        return [];
    }
    
    for (let i = 1; i < parts.length; i += 3) {
        tabs.push({
            title: parts[i],
            lang: parts[i + 1],
            code: parts[i + 2].trim(),
        });
    }

    return tabs;
};

// --- Language Loading Logic ---
const loadedLanguages = new Set(['javascript', 'js', 'css', 'html', 'markup', 'svg', 'xml', 'clike']);
const langAliasMap: { [key: string]: string } = {
    py: 'python', sh: 'bash', shell: 'bash', js: 'javascript', ts: 'typescript',
    html: 'markup', xml: 'markup', svg: 'markup', md: 'markdown', yml: 'yaml',
};
const languageLoadPromises: { [key: string]: Promise<void> } = {};

const loadPrismLanguage = (lang: string): Promise<void> => {
    const canonicalLang = langAliasMap[lang] || lang;
    
    if (!canonicalLang) return Promise.resolve();
    
    // Check if canonical language is already loaded
    if (loadedLanguages.has(canonicalLang)) return Promise.resolve();
    if (languageLoadPromises[canonicalLang]) return languageLoadPromises[canonicalLang];

    // Check if Prism has it already (languages are imported statically)
    if (Prism.languages[canonicalLang]) {
        loadedLanguages.add(canonicalLang);
        return Promise.resolve();
    }
    
    // For unsupported languages, just resolve without error
    const promise = Promise.resolve();
    loadedLanguages.add(canonicalLang);
    if (lang !== canonicalLang) loadedLanguages.add(lang);
    
    languageLoadPromises[canonicalLang] = promise;
    return promise;
};


const highlightCode = (code: string, lang: string): string => {
    const canonicalLang = langAliasMap[lang] || lang;
    if (Prism.languages[canonicalLang]) {
        return Prism.highlight(code, Prism.languages[canonicalLang], canonicalLang);
    }
    return code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};


// --- Sub Components ---

const WindowDots = () => (
    <div className="flex items-center space-x-1.5">
        <div className="w-3 h-3 rounded-full bg-red-400"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-400"></div>
    </div>
);

const FullScreenModal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode; }> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;

    return ReactDOM.createPortal(
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" 
            onClick={onClose}
        >
            <div className="w-full h-full max-w-full max-h-full relative rounded-xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        modalRoot
    );
};

interface CodeRendererProps {
    showLineNumbers: boolean;
    htmlContent: string;
    themeBackground: string | null;
    fontSize: number;
    onTextContent: (text: string) => void;
    lang: string;
}

const CodeRenderer = React.forwardRef<HTMLPreElement, CodeRendererProps>(
    ({ showLineNumbers, htmlContent, themeBackground, fontSize, onTextContent, lang }, ref) => {
        const [lineCount, setLineCount] = useState(0);
        const codeRef = useRef<HTMLElement>(null);
        const lineNumbersRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (codeRef.current) {
                const text = codeRef.current.textContent || '';
                onTextContent(text); // Pass raw text up for copy functionality
                const lines = text.split('\n');
                setLineCount(text.endsWith('\n') ? lines.length - 1 : lines.length);
            }
        }, [htmlContent, onTextContent]);
        
        useEffect(() => {
            if (showLineNumbers && codeRef.current && lineNumbersRef.current) {
                const codeStyle = window.getComputedStyle(codeRef.current);
                lineNumbersRef.current.style.lineHeight = codeStyle.lineHeight;
            }
        }, [showLineNumbers, fontSize, htmlContent, themeBackground]);

        const smoothTransition = { transition: 'font-size 0.1s ease-out, line-height 0.1s ease-out' };

        return (
            <div className="flex items-start">
                {showLineNumbers && (
                    <div
                        ref={lineNumbersRef}
                        aria-hidden="true"
                        className="flex-shrink-0 select-none text-right pr-4 pl-4 py-3 sticky left-0 z-10"
                        style={{ backgroundColor: themeBackground || 'transparent', fontSize: `${fontSize}px`, ...smoothTransition }}
                    >
                        {Array.from({ length: lineCount }, (_, i) => <div key={i}>{i + 1}</div>)}
                    </div>
                )}
                <pre ref={ref} className={`language-${lang} !m-0 !p-0 flex-grow bg-transparent`} >
                    <code
                        ref={codeRef}
                        className={`language-${lang} block py-3 bg-transparent ${showLineNumbers ? 'pr-4' : 'px-4'}`}
                        style={{ fontSize: `${fontSize}px`, ...smoothTransition }}
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </pre>
            </div>
        );
    }
);
CodeRenderer.displayName = "CodeRenderer";


// --- Main Component ---

const TabbedCodeBlock: React.FC<{ content: string }> = ({ content }) => {
    const tabs = useMemo(() => parseTabContent(content), [content]);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [isCopied, setIsCopied] = useState(false);
    const [showLineNumbers, setShowLineNumbers] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [fontSize, setFontSize] = useState(14);
    const { themeBackground } = useTheme();
    const { t } = useI18n();
    const [textContent, setTextContent] = useState('');
    const preRef = useRef<HTMLPreElement>(null);
    const [renderKey, setRenderKey] = useState(0);

    useEffect(() => {
        const activeLang = tabs[activeTabIndex]?.lang;
        if (!activeLang) return;

        const canonicalLang = langAliasMap[activeLang] || activeLang;
        if (loadedLanguages.has(canonicalLang) || Prism.languages[canonicalLang]) {
            return;
        }
        
        loadPrismLanguage(activeLang).finally(() => {
            setRenderKey(key => key + 1);
        });
    }, [activeTabIndex, tabs]);
    
    const activeTab = tabs[activeTabIndex];
    const highlightedHtml = useMemo(() => {
        if (!activeTab) return '';
        return highlightCode(activeTab.code, activeTab.lang);
    }, [activeTab, renderKey]);


    const handleCopy = () => {
        if (textContent) {
            navigator.clipboard.writeText(textContent);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };
    
    const toggleLineNumbers = () => setShowLineNumbers(!showLineNumbers);
    const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

    const handleWheel = (event: React.WheelEvent) => {
        if (event.shiftKey) {
            event.preventDefault();
            setFontSize(currentSize => Math.max(8, Math.min(32, currentSize - event.deltaY * 0.1)));
        }
    };
    
    const CodeBlockUI = ({ isFullscreenView = false }: { isFullscreenView?: boolean; }) => {
        const buttonBaseClass = "p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";
        const activeClass = 'bg-blue-100/10 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300';
        
        return (
            <div 
                className={`flex flex-col ${isFullscreenView ? 'h-full' : ''}`}
                style={{ backgroundColor: themeBackground || '#272822' }}
            >
                <div className="flex-shrink-0 flex items-center justify-between px-4 h-12 bg-black/5 dark:bg-white/5">
                    <div className="flex items-center space-x-4">
                        <WindowDots />
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 select-none hidden sm:inline">
                            {t('shiftScrollToZoom')}
                        </span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <button onClick={handleCopy} className={buttonBaseClass} aria-label="Copy code">{isCopied ? <CheckIcon className="w-5 h-5 text-green-500" /> : <CopyIcon className="w-5 h-5" />}</button>
                        <button onClick={toggleLineNumbers} className={`${buttonBaseClass} ${showLineNumbers ? activeClass : ''}`} aria-label="Toggle line numbers"><LineNumbersIcon className="w-5 h-5" /></button>
                        <button onClick={toggleFullscreen} className={buttonBaseClass} aria-label={isFullscreenView ? "Exit fullscreen" : "Enter fullscreen"}>{isFullscreenView ? <CloseIcon className="w-5 h-5" /> : <ExpandIcon className="w-5 h-5" />}</button>
                    </div>
                </div>
                <div
                    className={`${isFullscreenView ? 'flex-grow' : 'max-h-[70vh]'} overflow-auto`}
                    onWheel={handleWheel}
                >
                    <CodeRenderer
                        ref={preRef}
                        htmlContent={highlightedHtml}
                        showLineNumbers={showLineNumbers}
                        themeBackground={themeBackground}
                        fontSize={fontSize}
                        onTextContent={setTextContent}
                        lang={activeTab?.lang || ''}
                    />
                </div>
            </div>
        );
    };

    if (tabs.length === 0) {
        return (
            <div className="my-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
                <p className="font-bold">Invalid Tab Syntax</p>
                <p className="text-sm">Could not parse tabbed code block. Please check the syntax in your Markdown file.</p>
            </div>
        );
    }
    
    return (
        <div className="my-6 rounded-xl shadow-lg shadow-black/10 dark:shadow-black/20 overflow-hidden">
             <div className="flex border-b border-gray-700/50 bg-gray-100/50 dark:bg-gray-800/50"
                  style={{ backgroundColor: themeBackground ? `color-mix(in srgb, ${themeBackground} 80%, black)` : '#2a2d3a'}}
             >
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTabIndex(index)}
                        className={`-mb-px flex items-center px-4 py-2.5 text-sm font-medium border-b-2 transition-all duration-200 outline-none
                                    ${activeTabIndex === index 
                                        ? 'border-primary-500 text-gray-100 bg-black/10 dark:bg-white/5' 
                                        : 'border-transparent text-gray-400 hover:text-gray-200'}`}
                    >
                        <FileCodeIcon className="w-5 h-5" />
                        <span className="ml-2">{tab.title}</span>
                    </button>
                ))}
            </div>
            <CodeBlockUI />
            <FullScreenModal isOpen={isFullscreen} onClose={toggleFullscreen}>
                <CodeBlockUI isFullscreenView={true} />
            </FullScreenModal>
        </div>
    );
};

export default TabbedCodeBlock;
