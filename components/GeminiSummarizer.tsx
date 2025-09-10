import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { GoogleGenAI } from '@google/genai';
import { useGemini } from '../context/GeminiContext';
import { CloseIcon, ListIcon, RefreshIcon } from './Icons';
import NestedMarkdown from './NestedMarkdown';
import CopyButton from './CopyButton';

// --- Type Definitions ---
interface GeminiSummarizerProps {
    isOpen: boolean;
    onClose: () => void;
    pageContent: string | null;
    pageTitle: string | undefined;
}

type ViewState = 'idle' | 'generating' | 'results';

// --- Main Component ---
const GeminiSummarizer: React.FC<GeminiSummarizerProps> = ({ isOpen, onClose, pageContent, pageTitle }) => {
    const { apiKey, isKeySet } = useGemini();
    const [view, setView] = useState<ViewState>('idle');
    const [summary, setSummary] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [ai, setAi] = useState<GoogleGenAI | null>(null);

    // Effect to initialize the AI client
    useEffect(() => {
        if (isKeySet && !ai) {
            try {
                setAi(new GoogleGenAI({ apiKey }));
            } catch(e) {
                 console.error("Failed to initialize GoogleGenAI", e);
                 setError("Error al inicializar el cliente de IA. ¿Es la clave de API válida?");
            }
        }
    }, [isKeySet, apiKey, ai]);

    const handleGenerateSummary = async () => {
        if (!ai || !pageContent) return;

        setView('generating');
        setError(null);
        
        const prompt = `Por favor, genera un resumen en puntos clave del siguiente documento:\n\nTÍTULO: "${pageTitle || 'Sin título'}"\n\nCONTENIDO:\n---\n${pageContent}\n---`;

        try {
            const systemInstruction = `Eres un experto en resumir contenido técnico. Tu tarea es generar un resumen conciso en forma de 5 a 7 puntos clave (bullet points) que capturen las ideas más importantes del texto proporcionado. La respuesta debe estar en español y formateada como una lista de viñetas Markdown. No añadas un encabezado al resumen. Basa tu respuesta *únicamente* en el texto proporcionado.`;
            
            const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-001',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction
        }
      });
            
            const summaryText = response.text.trim();

            if (!summaryText) {
                throw new Error("La IA no pudo generar un resumen.");
            }
            
            setSummary(summaryText);
            setView('results');

        } catch (e) {
            console.error("Summary generation failed:", e);
            setError(`Error al generar el resumen. ${e instanceof Error ? e.message : 'Por favor, inténtalo de nuevo.'}`);
            setView('idle');
        }
    };
    
    const reset = () => {
        setView('idle');
        setSummary(null);
        setError(null);
    };
    
    // Reset state when modal is closed
    useEffect(() => {
        if (!isOpen) {
            setTimeout(reset, 300); // Delay reset to allow for closing animation
        }
    }, [isOpen]);


    const renderContent = () => {
        switch (view) {
            case 'generating':
                return (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4"></div>
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Generando resumen...</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Analizando el documento en busca de los puntos clave.</p>
                    </div>
                );

            case 'results':
                return (
                     <div className="p-6 overflow-y-auto">
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                             <NestedMarkdown content={summary || ''} />
                        </div>
                    </div>
                );
                
            case 'idle':
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <ListIcon className="text-5xl text-gray-400 dark:text-gray-500" />
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-2">Generador de Resúmenes con IA</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                            Crea un resumen conciso del documento actual en puntos clave para una rápida visión general.
                        </p>
                        <button onClick={handleGenerateSummary} className="px-6 py-3 font-semibold rounded-lg shadow-md bg-primary-600 text-white hover:bg-primary-700 transition-transform transform hover:scale-105">
                            Generar Resumen
                        </button>
                    </div>
                );
        }
    };
    
    if (!isOpen) return null;

    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;
    
    return ReactDOM.createPortal(
        <div 
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="w-full max-w-2xl h-[90vh] sm:h-auto sm:max-h-[85vh] flex flex-col bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl relative"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3 min-w-0">
                        <ListIcon className="text-2xl text-gray-600 dark:text-gray-400" />
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white truncate">Resumen: {pageTitle || 'este documento'}</h2>
                    </div>
                     <div className="flex items-center space-x-2">
                        {view === 'results' && summary && (
                            <CopyButton textToCopy={summary} ariaLabel="Copiar resumen" />
                        )}
                        {view === 'results' && (
                            <button onClick={handleGenerateSummary} className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white" aria-label="Generar de nuevo">
                                <RefreshIcon className="text-2xl" />
                            </button>
                        )}
                        <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white" aria-label="Cerrar resumen">
                            <CloseIcon className="text-2xl" />
                        </button>
                    </div>
                </header>

                <main className="flex-grow flex flex-col min-h-0">
                   {error && <div className="m-4 text-red-500 text-sm p-3 bg-red-100 dark:bg-red-900/50 rounded-md">{error}</div>}
                   {renderContent()}
                </main>
            </div>
        </div>,
        modalRoot
    );
};

export default GeminiSummarizer;