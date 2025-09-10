import React, { useEffect, useRef, useState } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../context/I18nContext';

interface MermaidProps {
  chart: string;
  onError?: (errorMessage: string) => void;
}

const LoadingSpinner: React.FC = () => {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-center justify-center p-8 text-gray-500 dark:text-gray-400">
      <svg className="animate-spin h-8 w-8 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span className="text-sm">{t('mermaidRendering')}</span>
    </div>
  );
};

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => {
  const { t } = useI18n();
  return (
    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
      <div className="flex items-center">
        <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <h3 className="text-sm font-medium text-red-800 dark:text-red-200">{t('mermaidError')}</h3>
      </div>
      <p className="mt-2 text-sm text-red-700 dark:text-red-300">{message}</p>
    </div>
  );
};

const Mermaid: React.FC<MermaidProps> = ({ chart, onError }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode] = useDarkMode();
  const { appTheme, appThemes, font } = useTheme();
  const { t } = useI18n();

  useEffect(() => {
    let isMounted = true;

    const renderDiagram = async () => {
      if (!containerRef.current || !chart.trim()) return;

      setIsLoading(true);
      setError(null);

      try {
        // Importación dinámica de Mermaid
        const mermaidModule = await import('mermaid');
        const mermaid = mermaidModule.default;

        // Configuración del tema
        const currentPalette = appThemes.find(t => t.id === appTheme) || appThemes[0];
        const colors = currentPalette.colors;

        const config = {
          startOnLoad: false,
          theme: 'base',
          securityLevel: 'loose',
          fontFamily: font,
          themeVariables: {
            background: 'transparent',
            primaryColor: isDarkMode ? colors['primary-600'] : colors['primary-500'],
            primaryTextColor: isDarkMode ? '#ffffff' : '#000000',
            primaryBorderColor: isDarkMode ? colors['primary-500'] : colors['primary-700'],
            lineColor: isDarkMode ? '#6b7280' : '#9ca3af',
            textColor: isDarkMode ? '#e5e7eb' : '#374151',
            secondaryColor: isDarkMode ? '#374151' : '#e5e7eb',
            tertiaryColor: isDarkMode ? '#1f2937' : '#f9fafb',
            noteBkgColor: isDarkMode ? '#1f2937' : '#fefce8',
            noteTextColor: isDarkMode ? '#f9fafb' : '#1f2937',
          }
        };

        // Inicializar Mermaid
        mermaid.initialize(config);

        // Limpiar el contenedor
        containerRef.current.innerHTML = '';

        // Generar ID único
        const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Renderizar el diagrama
        const { svg } = await mermaid.render(id, chart);

        if (isMounted && containerRef.current) {
          containerRef.current.innerHTML = svg;
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Error desconocido al renderizar el diagrama';
          setError(errorMessage);
          setIsLoading(false);
          onError?.(errorMessage);
        }
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [chart, isDarkMode, appTheme, appThemes, font, onError, t]);

  if (error) {
    return (
      <div className="my-6">
        <ErrorDisplay message={error} />
      </div>
    );
  }

  return (
    <div className="my-6 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
      {isLoading && <LoadingSpinner />}
      <div 
        ref={containerRef}
        className={`mermaid-container ${isLoading ? 'hidden' : 'flex justify-center items-center'}`}
        style={{ minHeight: isLoading ? '0' : '100px' }}
      />
    </div>
  );
};

export default Mermaid;