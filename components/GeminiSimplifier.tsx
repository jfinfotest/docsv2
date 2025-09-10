import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { GoogleGenAI, Type } from '@google/genai';
import { useGemini } from '../context/GeminiContext';
import { CloseIcon, LightbulbIdeaIcon, RefreshIcon } from './Icons';
import NestedMarkdown from './NestedMarkdown';
import CopyButton from './CopyButton';

// --- Type Definitions ---
interface SimplificationResult {
    concept: string;
    explanation: string;
}

interface GeminiSimplifierProps {
    isOpen: boolean;
    onClose: () => void;
    pageContent: string | null;
    pageTitle: string | undefined;
}

type ViewState = 'idle' | 'simplifying' | 'results';

// --- Helper Functions ---
const formatSimplificationForCopy = (result: SimplificationResult | null): string => {
    if (!result) return '';
    return `Concepto: ${result.concept}\n\nExplicación:\n${result.explanation}`;
};


// --- Main Component ---
const GeminiSimplifier: React.FC<GeminiSimplifierProps> = ({ isOpen, onClose, pageContent, pageTitle }) => {
    const { apiKey, isKeySet } = useGemini();
    const [view, setView] = useState<ViewState>('idle');
    const [result, setResult] = useState<SimplificationResult | null>(null);
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

    const handleSimplify = async () => {
        if (!ai || !pageContent) return;

        setView('simplifying');
        setError(null);
        
        const prompt = `Por favor, analiza el siguiente documento, identifica el concepto principal más complejo y explícalo con una analogía:\n\nTÍTULO: "${pageTitle || 'Sin título'}"\n\nCONTENIDO:\n---\n${pageContent}\n---`;

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash-001',
                contents: prompt,
                config: {
                    systemInstruction: `Eres un profesor experto en explicar temas complejos de forma sencilla. Tu tarea es analizar un texto, identificar el concepto técnico principal o más complejo y explicarlo usando una analogía del mundo real que sea fácil de entender. La explicación debe ser clara, concisa y en español. Basa tu análisis *únicamente* en el texto proporcionado.`,
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            concept: { 
                                type: Type.STRING,
                                description: "El nombre del concepto técnico principal identificado."
                            },
                            explanation: { 
                                type: Type.STRING,
                                description: "La explicación simplificada del concepto usando una analogía del mundo real."
                            }
                        },
                        required: ["concept", "explanation"]
                    }
                }
            });
            
            const jsonStr = response.text.trim();
            const simplificationResult = JSON.parse(jsonStr) as SimplificationResult;

            if (!simplificationResult.concept || !simplificationResult.explanation) {
                throw new Error("La IA no pudo simplificar el concepto.");
            }
            
            setResult(simplificationResult);
            setView('results');

        } catch (e) {
            console.error("Simplification failed:", e);
            setError(`Error al simplificar el concepto. ${e instanceof Error ? e.message : 'Por favor, inténtalo de nuevo.'}`);
            setView('idle');
        }
    };
    
    const reset = () => {
        setView('idle');
        setResult(null);
        setError(null);
    };
    
    useEffect(() => {
        if (!isOpen) {
            setTimeout(reset, 300); // Delay reset for closing animation
        }
    }, [isOpen]);


    const renderContent = () => {
        switch (view) {
            case 'simplifying':
                return (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4"></div>
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Simplificando concepto...</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Analizando el documento en busca de ideas complejas.</p>
                    </div>
                );

            case 'results':
                return (
                     <div className="p-6 overflow-y-auto">
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Concepto Clave</h4>
                                <p className="mt-1 text-xl font-bold text-primary-700 dark:text-primary-300">{result?.concept}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Explicación Sencilla</h4>
                                <div className="mt-1 text-base text-gray-700 dark:text-gray-300">
                                    <NestedMarkdown content={result?.explanation || ''} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
                
            case 'idle':
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <LightbulbIdeaIcon className="text-5xl text-gray-400 dark:text-gray-500" />
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-2">Simplificador con IA</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                            ¿Un tema parece complicado? Deja que la IA lo explique en términos sencillos con una analogía.
                        </p>
                        <button onClick={handleSimplify} className="px-6 py-3 font-semibold rounded-lg shadow-md bg-primary-600 text-white hover:bg-primary-700 transition-transform transform hover:scale-105">
                            Simplificar Concepto
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
                        <LightbulbIdeaIcon className="text-2xl text-gray-600 dark:text-gray-400" />
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white truncate">Simplificador: {pageTitle || 'este documento'}</h2>
                    </div>
                     <div className="flex items-center space-x-2">
                        {view === 'results' && result && (
                            <CopyButton textToCopy={formatSimplificationForCopy(result)} ariaLabel="Copiar explicación" />
                        )}
                        {view === 'results' && (
                            <button onClick={handleSimplify} className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white" aria-label="Generar de nuevo">
                                <RefreshIcon className="text-2xl" />
                            </button>
                        )}
                        <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white" aria-label="Cerrar simplificador">
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

export default GeminiSimplifier;