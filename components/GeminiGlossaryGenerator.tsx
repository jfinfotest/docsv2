import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { GoogleGenAI, Type } from '@google/genai';
import { useGemini } from '../context/GeminiContext';
import { CloseIcon, ClipboardListIcon, RefreshIcon } from './Icons';
import CopyButton from './CopyButton';

// --- Type Definitions ---
interface GlossaryTerm {
    term: string;
    definition: string;
}

interface GeminiGlossaryGeneratorProps {
    isOpen: boolean;
    onClose: () => void;
    pageContent: string | null;
    pageTitle: string | undefined;
}

type ViewState = 'idle' | 'generating' | 'results';

// --- Helper Functions ---
const formatGlossaryForCopy = (glossary: GlossaryTerm[]): string => {
    return glossary.map(item => `${item.term}\n${item.definition}`).join('\n\n');
};

// --- Main Component ---
const GeminiGlossaryGenerator: React.FC<GeminiGlossaryGeneratorProps> = ({ isOpen, onClose, pageContent, pageTitle }) => {
    const { apiKey, isKeySet } = useGemini();
    const [view, setView] = useState<ViewState>('idle');
    const [glossary, setGlossary] = useState<GlossaryTerm[]>([]);
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

    const handleGenerateGlossary = async () => {
        if (!ai || !pageContent) return;

        setView('generating');
        setError(null);
        
        const prompt = `Por favor, genera un glosario a partir del siguiente documento:\n\nTÍTULO: "${pageTitle || 'Sin título'}"\n\nCONTENIDO:\n---\n${pageContent}\n---`;

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash-001',
                contents: prompt,
                config: {
                    systemInstruction: `Eres un lexicógrafo y escritor técnico experto. Tu tarea es crear un glosario de términos clave a partir de un texto. Para cada término, proporciona una definición concisa y clara basada *únicamente* en el contexto del documento. No utilices ningún conocimiento externo. El glosario debe estar en español.`,
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            glossary: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        term: { type: Type.STRING },
                                        definition: { type: Type.STRING }
                                    },
                                    required: ["term", "definition"]
                                }
                            }
                        },
                        required: ["glossary"]
                    }
                }
            });
            
            const jsonStr = response.text.trim();
            const result = JSON.parse(jsonStr) as { glossary: GlossaryTerm[] };

            if (!result.glossary || result.glossary.length === 0) {
                throw new Error("La IA no pudo generar ningún término del glosario.");
            }
            
            // Sort glossary alphabetically by term
            const sortedGlossary = result.glossary.sort((a, b) => a.term.localeCompare(b.term));

            setGlossary(sortedGlossary);
            setView('results');

        } catch (e) {
            console.error("Glossary generation failed:", e);
            setError(`Error al generar el glosario. ${e instanceof Error ? e.message : 'Por favor, inténtalo de nuevo.'}`);
            setView('idle');
        }
    };
    
    const reset = () => {
        setView('idle');
        setGlossary([]);
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
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Generando glosario...</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Analizando el documento en busca de términos clave.</p>
                    </div>
                );

            case 'results':
                return (
                     <div className="p-6 overflow-y-auto">
                        <dl>
                            {glossary.map((item, index) => (
                                <div key={index} className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:mb-0 last:pb-0">
                                    <dt className="text-base font-semibold text-primary-700 dark:text-primary-300">{item.term}</dt>
                                    <dd className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.definition}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                );
                
            case 'idle':
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <ClipboardListIcon className="text-5xl text-gray-400 dark:text-gray-500" />
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-2">Generador de Glosario</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                            Escanea el documento actual para crear una lista de términos clave y sus definiciones.
                        </p>
                        <button onClick={handleGenerateGlossary} className="px-6 py-3 font-semibold rounded-lg shadow-md bg-primary-600 text-white hover:bg-primary-700 transition-transform transform hover:scale-105">
                            Generar Glosario
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
                        <ClipboardListIcon className="text-2xl text-gray-600 dark:text-gray-400" />
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white truncate">Glosario: {pageTitle || 'este documento'}</h2>
                    </div>
                     <div className="flex items-center space-x-2">
                        {view === 'results' && glossary.length > 0 && (
                           <CopyButton textToCopy={formatGlossaryForCopy(glossary)} ariaLabel="Copiar glosario" />
                        )}
                        {view === 'results' && (
                            <button onClick={handleGenerateGlossary} className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white" aria-label="Generar de nuevo">
                                <RefreshIcon className="text-2xl" />
                            </button>
                        )}
                        <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white" aria-label="Cerrar glosario">
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

export default GeminiGlossaryGenerator;