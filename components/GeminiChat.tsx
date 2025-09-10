import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { GoogleGenAI } from '@google/genai';
import { useGemini } from '../context/GeminiContext';
import { CloseIcon, GeminiIcon, PaperAirplaneIcon, RefreshIcon } from './Icons';
import NestedMarkdown from './NestedMarkdown';
import { useI18n } from '../context/I18nContext';

interface Message {
    role: 'user' | 'model';
    text: string;
}

interface GeminiChatProps {
    isOpen: boolean;
    onClose: () => void;
    pageContent: string | null;
    pageTitle: string | undefined;
}

const GeminiChat: React.FC<GeminiChatProps> = ({ isOpen, onClose, pageContent, pageTitle }) => {
    const { apiKey, isKeySet } = useGemini();
    const { t } = useI18n();
    const [chat, setChat] = useState<any>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const systemInstruction = useMemo(() => {
        if (!pageContent) return '';
        return `Eres un asistente experto en el siguiente documento. Tu tarea es responder las preguntas del usuario basándote *únicamente* en el texto proporcionado. No uses ningún conocimiento externo. Si la respuesta no se encuentra en el documento, debes indicar que la información no está disponible en el contexto proporcionado. Sé conciso y útil. Formatea tus respuestas usando Markdown.\n\nDOCUMENT TITLE: "${pageTitle || 'Sin título'}"\n\nDOCUMENT CONTENT:\n---\n${pageContent}\n---`;
    }, [pageContent, pageTitle]);

    useEffect(() => {
        if (isOpen && isKeySet && systemInstruction) {
            try {
                const ai = new GoogleGenAI({ apiKey });
                const newChat = ai.chats.create({
                    model: 'gemini-2.0-flash-001',
                    config: {
                        systemInstruction: systemInstruction
                    }
                });
                setChat(newChat);
                setMessages([]);
                setError(null);
            } catch (e) {
                console.error("Failed to initialize Gemini Chat", e);
                setError(e instanceof Error ? e.message : t('geminiInitError'));
            }
        }
    }, [isOpen, isKeySet, systemInstruction, apiKey, t]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            textareaRef.current?.focus();
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!input.trim() || !chat || isLoading) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const responseStream = await chat.sendMessage(input, { stream: true });
            
            let modelResponse = '';
            setMessages(prev => [...prev, { role: 'model', text: '' }]);

            for await (const chunk of responseStream) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = modelResponse;
                    return newMessages;
                });
            }

        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "Ocurrió un error desconocido.";
            setError(t('geminiError', errorMessage));
            // Remove the empty model message on error
            setMessages(prev => prev.filter((_, i) => i !== prev.length -1 || prev[prev.length -1].text !== ''));
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleClearChat = () => {
        setMessages([]);
        if (chat && systemInstruction) {
            // Re-initialize chat to clear history
             try {
                const ai = new GoogleGenAI({ apiKey });
                const newChat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: systemInstruction,
                    },
                });
                setChat(newChat);
            } catch (e) {
                 setError("No se pudo reiniciar la sesión de chat.");
            }
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
                {/* Header */}
                <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3 min-w-0">
                        <GeminiIcon className="text-2xl" />
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white truncate">{t('askAbout', pageTitle || t('thisDocument'))}</h2>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                         <button onClick={handleClearChat} className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white" aria-label={t('clearChat')}>
                            <RefreshIcon className="text-2xl" />
                        </button>
                        <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white" aria-label={t('closeChat')}>
                            <CloseIcon className="text-2xl" />
                        </button>
                    </div>
                </header>

                {/* Messages */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 && !isLoading && (
                        <div className="text-center text-gray-500 dark:text-gray-400 p-8">
                            <p>{t('askAnything')}</p>
                            <p className="text-xs mt-2">{t('allAnswersBasedOnText')}</p>
                        </div>
                    )}
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'model' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-300"><GeminiIcon className="text-2xl" /></div>}
                            <div className={`max-w-md lg:max-w-xl p-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary-600 text-white rounded-br-none' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                                <NestedMarkdown content={msg.text} />
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-300"><GeminiIcon className="text-2xl" /></div>
                            <div className="max-w-md lg:max-w-xl p-3 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    {error && <div className="text-red-500 text-sm p-2 bg-red-100 dark:bg-red-900/50 rounded-md">{error}</div>}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <footer className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="relative">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={t('askAQuestion')}
                            rows={1}
                            className="w-full p-3 pr-12 text-base resize-none border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
                            disabled={!isKeySet || isLoading}
                        />
                         <button 
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading || !isKeySet}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed transition-colors"
                            aria-label={t('sendMessage')}
                        >
                           <PaperAirplaneIcon className="text-2xl" />
                        </button>
                    </div>
                     {!isKeySet && <p className="text-xs text-center text-yellow-600 dark:text-yellow-400 mt-2">{t('noApiKey')}</p>}
                </footer>
            </div>
        </div>,
        modalRoot
    );
};

export default GeminiChat;
