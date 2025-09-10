import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { GoogleGenAI } from '@google/genai';
import { useGemini } from '../context/GeminiContext';
import { CloseIcon, AudioWaveformIcon, RefreshIcon, DownloadIcon } from './Icons';
import { useI18n } from '../context/I18nContext';
import CopyButton from './CopyButton';

// --- Type Definitions ---
interface GeminiPodcastGeneratorProps {
    isOpen: boolean;
    onClose: () => void;
    pageContent: string | null;
    pageTitle: string | undefined;
}

type ViewState = 'idle' | 'generatingScript' | 'generatingAudio' | 'results';
type PodcastStyle = 'monologue' | 'dialogue';

interface PodcastSpeaker {
  name: string;
  voice: string;
}

// --- Constants ---
const GEMINI_TTS_VOICES = [
  "Kore", "Puck", "Charon", "Fenrir", "Leda", "Callirrhoe", "Aoede", "Enceladus", "Iapetus", "Algieba", "Algenib", "Rasalgethi", "Laomedeia", "Achernar", "Alnilam", "Schedar", "Gacrux", "Pulcherrima", "Achird", "Zubenelgenubi", "Vindemiatrix", "Sadachbia", "Sadaltager", "Sulafat", "Orus", "Autonoe", "Umbriel", "Erinome", "Despina"
];

// --- Helper Functions ---
function pcmToWav(pcmData: Uint8Array, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): Blob {
  const byteRate = sampleRate * numChannels * bitsPerSample / 8;
  const blockAlign = numChannels * bitsPerSample / 8;
  const wavHeader = new ArrayBuffer(44);
  const view = new DataView(wavHeader);
  view.setUint32(0, 0x52494646, false); // 'RIFF'
  view.setUint32(4, 36 + pcmData.length, true);
  view.setUint32(8, 0x57415645, false); // 'WAVE'
  view.setUint32(12, 0x666d7420, false); // 'fmt '
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  view.setUint32(36, 0x64617461, false); // 'data'
  view.setUint32(40, pcmData.length, true);
  return new Blob([wavHeader, new Uint8Array(pcmData)], { type: 'audio/wav' });
}


// --- Main Component ---
const GeminiPodcastGenerator: React.FC<GeminiPodcastGeneratorProps> = ({ isOpen, onClose, pageContent, pageTitle }) => {
    const { apiKey, isKeySet } = useGemini();
    const { t } = useI18n();
    
    const [view, setView] = useState<ViewState>('idle');
    const [script, setScript] = useState<string | null>(null);
    const [style, setStyle] = useState<PodcastStyle>('dialogue');
    const [speakers, setSpeakers] = useState<PodcastSpeaker[]>([
        { name: 'NARRADOR', voice: 'Kore' },
        { name: 'EXPERTO', voice: 'Puck' }
    ]);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [ai, setAi] = useState<GoogleGenAI | null>(null);

    useEffect(() => {
        if (isKeySet && !ai) {
            try {
                setAi(new GoogleGenAI({ apiKey }));
            } catch(e) {
                 console.error("Failed to initialize GoogleGenAI", e);
                 setError(t('geminiInitError'));
            }
        }
    }, [isKeySet, apiKey, ai, t]);

    useEffect(() => {
        return () => {
            if (audioUrl) URL.revokeObjectURL(audioUrl);
        };
    }, [audioUrl]);
    
    const handleSpeakerChange = (index: number, field: keyof PodcastSpeaker, value: string) => {
        setSpeakers(prev => {
            const newSpeakers = [...prev];
            newSpeakers[index] = { ...newSpeakers[index], [field]: value };
            return newSpeakers;
        });
    };

    const handleGenerate = async () => {
        if (!ai || !pageContent) return;

        const currentSpeakers = style === 'monologue' ? [speakers[0]] : speakers;
        if (currentSpeakers.some(s => !s.name.trim())) {
            setError(t('speakerNameError'));
            return;
        }

        setView('generatingScript');
        setError(null);
        setScript(null);
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);

        const speakerNamesForPrompt = style === 'dialogue'
            ? `un diálogo conversacional entre ${speakers[0].name.trim()} y ${speakers[1].name.trim()}.`
            : `un monólogo narrado por ${speakers[0].name.trim()}.`;
        
        const scriptPrompt = `Crea un guion de podcast atractivo a partir del siguiente documento.
- Estilo: ${speakerNamesForPrompt}
- Formato: Cada línea DEBE empezar con el nombre del locutor en mayúsculas seguido de dos puntos (ej: ${speakers[0].name.trim().toUpperCase()}: Texto...). No incluyas ninguna otra anotación, solo el texto hablado.
- Tono: Educativo pero conversacional y fácil de seguir.
- Idioma: Español.
- Fuente: Basa el guion *únicamente* en el contenido del documento proporcionado.

TÍTULO: "${pageTitle || 'Sin título'}"
DOCUMENTO:\n---\n${pageContent}\n---`;
        
        try {
            const scriptResponse = await ai.models.generateContent({
                model: 'gemini-2.0-flash-001',
                contents: scriptPrompt,
                config: {
                    systemInstruction: 'Eres un guionista experto en podcasts educativos. Crea guiones atractivos, informativos y bien estructurados que mantengan la atención del oyente.'
                }
            });
            const generatedScript = scriptResponse.text.trim();
            if (!generatedScript) throw new Error("La IA no pudo generar un guion.");
            setScript(generatedScript);

            setView('generatingAudio');

            const generationConfig: Record<string, any> = { responseModalities: ["AUDIO"] };
            let speechConfig: Record<string, any> = {};
            
            const dialogueSpeakers = style === 'dialogue' 
                ? speakers.map(s => ({ speaker: s.name.trim().toUpperCase(), voiceConfig: { prebuiltVoiceConfig: { voiceName: s.voice, languageCode: 'es-ES' } } }))
                : [];

            if (style === 'monologue') {
                speechConfig = { voiceConfig: { prebuiltVoiceConfig: { voiceName: speakers[0].voice, languageCode: 'es-ES' } } };
            } else {
                speechConfig = { multiSpeakerVoiceConfig: { speakerVoiceConfigs: dialogueSpeakers } };
            }
            generationConfig.speechConfig = speechConfig;

            const audioResponse = await ai.models.generateContent({
                model: 'gemini-2.0-flash-001',
                contents: generatedScript,
                config: {
                    systemInstruction: 'Eres un director de audio experto. Proporciona instrucciones detalladas para la producción de audio de podcasts profesionales.',
                    ...generationConfig
                }
            });

            const part = audioResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData;
            if (!part?.data) throw new Error('Gemini no devolvió audio. Respuesta: ' + JSON.stringify(audioResponse));

            const mimeType = part.mimeType || 'audio/wav';
            const audioBuffer = Uint8Array.from(atob(part.data), c => c.charCodeAt(0));
            const audioBlob = mimeType.startsWith('audio/L16') ? pcmToWav(audioBuffer) : new Blob([audioBuffer], { type: mimeType });
            setAudioUrl(URL.createObjectURL(audioBlob));
            setView('results');

        } catch (e) {
            console.error("Podcast generation failed:", e);
            setError(`Error al generar el podcast. ${e instanceof Error ? e.message : 'Por favor, inténtalo de nuevo.'}`);
            setView('idle');
        }
    };

    const reset = () => {
        setView('idle');
        setScript(null);
        setError(null);
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
    };
    
    useEffect(() => { if (!isOpen) setTimeout(reset, 300); }, [isOpen]);

    const renderContent = () => {
        switch (view) {
            case 'generatingScript':
            case 'generatingAudio':
                return (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4"></div>
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                            {view === 'generatingScript' ? t('generatingScript') : t('generatingAudio')}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('thisMayTakeAMoment')}</p>
                    </div>
                );
            case 'results':
                return (
                    <div className="p-6 flex flex-col flex-grow min-h-0">
                        {audioUrl && (
                            <div className="mb-4">
                                <audio controls src={audioUrl} className="w-full">Your browser does not support the audio element.</audio>
                            </div>
                        )}
                        <div className="flex-grow overflow-y-auto p-4 bg-gray-100 dark:bg-gray-900/50 rounded-lg">
                            <h4 className="font-semibold mb-2">{t('script')}</h4>
                            <pre className="text-sm whitespace-pre-wrap font-sans">{script}</pre>
                        </div>
                    </div>
                );
            case 'idle':
            default:
                return (
                    <div className="p-6 overflow-y-auto space-y-8">
                        <section>
                            <label className="block text-base font-semibold text-gray-900 dark:text-white mb-3">{t('podcastStyle')}</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={() => setStyle('monologue')} className={`p-4 border-2 rounded-lg text-left transition-colors ${style === 'monologue' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/50' : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'}`}>
                                    <div className="font-bold text-gray-800 dark:text-gray-200">{t('monologue')}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('monologueDesc')}</div>
                                </button>
                                <button onClick={() => setStyle('dialogue')} className={`p-4 border-2 rounded-lg text-left transition-colors ${style === 'dialogue' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/50' : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'}`}>
                                    <div className="font-bold text-gray-800 dark:text-gray-200">{t('dialogue')}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('dialogueDesc')}</div>
                                </button>
                            </div>
                        </section>
                        <section>
                            <label className="block text-base font-semibold text-gray-900 dark:text-white mb-3">{t('podcastVoices')}</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{style === 'monologue' ? t('monologueSpeakerName') : t('dialogueSpeaker1Name')}</label>
                                    <input type="text" value={speakers[0].name} onChange={e => handleSpeakerChange(0, 'name', e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500" placeholder={t('monologueSpeakerName')}/>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('voice')}</label>
                                    <select value={speakers[0].voice} onChange={e => handleSpeakerChange(0, 'voice', e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500">
                                        {GEMINI_TTS_VOICES.map(v => <option key={v} value={v}>{v}</option>)}
                                    </select>
                                </div>
                                {style === 'dialogue' && (
                                    <div className="space-y-3">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('dialogueSpeaker2Name')}</label>
                                        <input type="text" value={speakers[1].name} onChange={e => handleSpeakerChange(1, 'name', e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500" placeholder={t('dialogueSpeaker2Name')}/>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('voice')}</label>
                                        <select value={speakers[1].voice} onChange={e => handleSpeakerChange(1, 'voice', e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500">
                                            {GEMINI_TTS_VOICES.map(v => <option key={v} value={v}>{v}</option>)}
                                        </select>
                                    </div>
                                )}
                            </div>
                        </section>
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
            onClick={onClose} role="dialog" aria-modal="true"
        >
            <div
                className="w-full max-w-2xl h-[95vh] sm:h-auto sm:max-h-[90vh] flex flex-col bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl relative"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3 min-w-0">
                        <AudioWaveformIcon className="text-2xl text-gray-600 dark:text-gray-400" />
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white truncate">{t('podcastFor', pageTitle || t('thisDocument'))}</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                        {view === 'results' && audioUrl && (
                            <a href={audioUrl} download={`${pageTitle || 'podcast'}.wav`} className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white" aria-label={t('downloadAudio')}>
                                <DownloadIcon className="text-2xl" />
                            </a>
                        )}
                        {view === 'results' && script && <CopyButton textToCopy={script} ariaLabel={t('copyScript')} />}
                        {view !== 'idle' && <button onClick={reset} className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white" aria-label={t('startOver')}><RefreshIcon className="text-2xl" /></button>}
                        <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white" aria-label={t('closePodcast')}><CloseIcon className="text-2xl" /></button>
                    </div>
                </header>
                <main className="flex-grow flex flex-col min-h-0">
                   {error && <div className="m-4 text-red-500 text-sm p-3 bg-red-100 dark:bg-red-900/50 rounded-md">{error}</div>}
                   {!isKeySet && view === 'idle' && <p className="m-4 text-center text-xs text-yellow-600 dark:text-yellow-400">{t('noApiKey')}</p>}
                   {renderContent()}
                </main>
                 {view === 'idle' && (
                    <footer className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700">
                        <button 
                            onClick={handleGenerate} 
                            disabled={!isKeySet || (style === 'monologue' ? !speakers[0].name.trim() : speakers.some(s => !s.name.trim()))}
                            className="w-full px-6 py-3 font-semibold rounded-lg shadow-md bg-primary-600 text-white hover:bg-primary-700 transition-transform transform hover:scale-105 disabled:bg-primary-400 disabled:cursor-not-allowed"
                        >
                            {t('generatePodcast')}
                        </button>
                    </footer>
                )}
            </div>
        </div>,
        modalRoot
    );
};

export default GeminiPodcastGenerator;