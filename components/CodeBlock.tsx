import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTheme } from '../context/ThemeContext';
import { CopyIcon, CheckIcon, ExpandIcon, LineNumbersIcon, CloseIcon } from './Icons';
import { useI18n } from '../context/I18nContext';

// Helper to extract language from className
const getLanguage = (className: string = ''): string => {
    const match = /language-(\w+)/.exec(className || '');
    return match ? match[1] : 'text';
};

interface CodeContentProps {
    showLineNumbers: boolean;
    children: React.ReactNode;
    className?: string;
    themeBackground: string | null;
    fontSize: number;
    htmlContent?: string;
}


// Sub-component for the actual code rendering
const CodeContent = React.forwardRef<HTMLPreElement, CodeContentProps>(
    ({ showLineNumbers, children, className, themeBackground, fontSize, htmlContent, ...props }, ref) => {
        const [lineCount, setLineCount] = useState(0);
        const codeRef = useRef<HTMLElement>(null);
        const lineNumbersRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (codeRef.current) {
                const text = codeRef.current.textContent || '';
                const lines = text.split('\n');
                setLineCount(text.endsWith('\n') ? lines.length - 1 : lines.length);
            }
        }, [children, htmlContent]);

        // Sincroniza el line-height del código con los números de línea para una alineación perfecta.
        useEffect(() => {
            if (showLineNumbers && codeRef.current && lineNumbersRef.current) {
                const codeStyle = window.getComputedStyle(codeRef.current);
                lineNumbersRef.current.style.lineHeight = codeStyle.lineHeight;
            }
        }, [showLineNumbers, fontSize, children, htmlContent, themeBackground]);

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
                        {Array.from({ length: lineCount }, (_, i) => (
                            <div key={i}>{i + 1}</div>
                        ))}
                    </div>
                )}
                <pre
                    ref={ref}
                    className={`${className || ''} !m-0 !p-0 flex-grow bg-transparent`}
                    {...props}
                >
                    <code
                        ref={codeRef}
                        className={`${className || ''} block py-3 bg-transparent ${showLineNumbers ? 'pr-4' : 'px-4'}`}
                        style={{ fontSize: `${fontSize}px`, ...smoothTransition }}
                        {...(htmlContent ? { dangerouslySetInnerHTML: { __html: htmlContent } } : {})}
                    >
                        {htmlContent ? null : children}
                    </code>
                </pre>
            </div>
        );
    }
);

// Modal for fullscreen view
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

const WindowDots = () => (
    <div className="flex items-center space-x-1.5">
        <div className="w-3 h-3 rounded-full bg-red-400"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-400"></div>
    </div>
);


const CodeBlock: React.FC<any> = ({ node, className, children, htmlContent, ...props }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [showLineNumbers, setShowLineNumbers] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [fontSize, setFontSize] = useState(14); // Default font size in pixels
    const { themeBackground } = useTheme();
    const { t } = useI18n();
    
    const preRef = useRef<HTMLPreElement>(null);
    const language = getLanguage(className);

    const handleCopy = () => {
        if (preRef.current?.textContent) {
            navigator.clipboard.writeText(preRef.current.textContent);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };
    
    const toggleLineNumbers = () => setShowLineNumbers(!showLineNumbers);
    const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

    const handleWheel = (event: React.WheelEvent) => {
        if (event.shiftKey) {
            event.preventDefault();
            setFontSize(currentSize => {
                const newSize = currentSize - event.deltaY * 0.1;
                // Clamp font size between min and max values
                return Math.max(8, Math.min(32, newSize));
            });
        }
    };
    
    // Reusable UI component for the code block content and toolbar
    const CodeBlockUI = ({ isFullscreenView = false }: { isFullscreenView?: boolean; }) => {
        const buttonBaseClass = "p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";
        const activeClass = 'bg-blue-100/10 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300';
        
        return (
            <div 
                className={`flex flex-col ${isFullscreenView ? 'h-full' : 'rounded-xl shadow-lg shadow-black/10 dark:shadow-black/20 overflow-hidden'}`}
                style={{ backgroundColor: themeBackground || '#272822' }}
            >
                {/* Custom Title Bar */}
                <div className="flex-shrink-0 flex items-center justify-between px-4 h-12 bg-black/5 dark:bg-white/5">
                    <div className="flex items-center space-x-4">
                        <WindowDots />
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 select-none">{language}</span>
                        <span className="text-xs font-medium text-gray-500/70 dark:text-gray-400/70 select-none hidden sm:inline">
                            {t('shiftScrollToZoom')}
                        </span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <button onClick={handleCopy} className={buttonBaseClass} aria-label="Copiar código">
                            {isCopied ? <CheckIcon className="w-5 h-5 text-green-500" /> : <CopyIcon className="w-5 h-5" />}
                        </button>
                        <button onClick={toggleLineNumbers} className={`${buttonBaseClass} ${showLineNumbers ? activeClass : ''}`} aria-label="Alternar números de línea">
                            <LineNumbersIcon className="w-5 h-5" />
                        </button>
                        <button onClick={toggleFullscreen} className={buttonBaseClass} aria-label={isFullscreenView ? "Salir de pantalla completa" : "Entrar en pantalla completa"}>
                            {isFullscreenView ? <CloseIcon className="w-5 h-5" /> : <ExpandIcon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
                {/* Code Content */}
                <div
                    className={`${isFullscreenView ? 'flex-grow' : 'max-h-[70vh]'} overflow-auto`}
                    onWheel={handleWheel}
                >
                    <CodeContent
                        ref={preRef}
                        className={className}
                        showLineNumbers={showLineNumbers}
                        themeBackground={themeBackground}
                        fontSize={fontSize}
                        htmlContent={htmlContent}
                        {...props}
                    >
                        {children}
                    </CodeContent>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="relative text-sm my-4">
                 <CodeBlockUI isFullscreenView={false} />
            </div>
            
            <FullScreenModal isOpen={isFullscreen} onClose={toggleFullscreen}>
                <CodeBlockUI isFullscreenView={true} />
            </FullScreenModal>
        </>
    );
};

export default CodeBlock;
