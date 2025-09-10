import React, { useState } from 'react';
import { GeminiIcon, MessageIcon, AcademicCapIcon, CloseIcon, ClipboardListIcon, LightbulbIdeaIcon, CodeBracketIcon, ListIcon, AudioWaveformIcon } from './Icons';

interface FloatingActionBarProps {
    onChatClick: () => void;
    onQuizClick: () => void;
    onGlossaryClick: () => void;
    onSummarizerClick: () => void;
    onSimplifierClick: () => void;
    onCodeAnalyzerClick: () => void;
    onPodcastClick: () => void;
}

const FloatingActionButton: React.FC<{ onClick: () => void; children: React.ReactNode; tooltip: string; yTranslate: string; }> = ({ onClick, children, tooltip, yTranslate }) => {
    return (
        <div className={`relative flex items-center transition-transform duration-300 ease-in-out ${yTranslate}`}>
            <div className="absolute right-full mr-4 px-2 py-1 bg-gray-700 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {tooltip}
            </div>
            <button
                onClick={onClick}
                className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400"
                aria-label={tooltip}
            >
                {children}
            </button>
        </div>
    );
};


const FloatingActionBar: React.FC<FloatingActionBarProps> = ({ onChatClick, onQuizClick, onGlossaryClick, onSummarizerClick, onSimplifierClick, onCodeAnalyzerClick, onPodcastClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Reordered for better UX: Chat > Content Transformation > Knowledge/Tools
    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center space-y-4 group">
             {isOpen && (
                <>
                    <FloatingActionButton onClick={onChatClick} tooltip="Chatear con el documento" yTranslate="translate-y-0">
                        <MessageIcon className="text-2xl" />
                    </FloatingActionButton>
                    <FloatingActionButton onClick={onSummarizerClick} tooltip="Generar Resumen" yTranslate="translate-y-0">
                        <ListIcon className="text-2xl" />
                    </FloatingActionButton>
                    <FloatingActionButton onClick={onSimplifierClick} tooltip="Simplificar Concepto" yTranslate="translate-y-0">
                        <LightbulbIdeaIcon className="text-2xl" />
                    </FloatingActionButton>
                    <FloatingActionButton onClick={onPodcastClick} tooltip="Generar Podcast con IA" yTranslate="translate-y-0">
                        <AudioWaveformIcon className="text-2xl" />
                    </FloatingActionButton>
                    <FloatingActionButton onClick={onGlossaryClick} tooltip="Generar Glosario" yTranslate="translate-y-0">
                        <ClipboardListIcon className="text-2xl" />
                    </FloatingActionButton>
                    <FloatingActionButton onClick={onQuizClick} tooltip="Generar Cuestionario con IA" yTranslate="translate-y-0">
                        <AcademicCapIcon className="text-2xl" />
                    </FloatingActionButton>
                    <FloatingActionButton onClick={onCodeAnalyzerClick} tooltip="Analizar Código" yTranslate="translate-y-0">
                        <CodeBracketIcon className="text-2xl" />
                    </FloatingActionButton>
                </>
            )}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg hover:bg-primary-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary-300"
                aria-label={isOpen ? "Cerrar acciones de IA" : "Abrir acciones de IA"}
            >
                <div className={`transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    {isOpen ? <CloseIcon className="text-2xl" /> : <GeminiIcon className="text-2xl" />}
                </div>
            </button>
        </div>
    );
};

export default FloatingActionBar;