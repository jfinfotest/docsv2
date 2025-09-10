import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useI18n } from '../context/I18nContext';

// A dedicated functional component for the fallback UI.
// This allows us to use hooks safely within the error boundary's render path.
const ErrorFallback: React.FC<{ error: Error | null }> = ({ error }) => {
    const { t } = useI18n();
    return (
        <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg">
            <h3 className="font-bold text-lg">{t('errorTitle')}</h3>
            <p className="mt-2">{t('errorMessage')}</p>
            <details className="mt-4 text-sm">
                <summary>{t('errorDetails')}</summary>
                <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs whitespace-pre-wrap">
                    {String(error)}
                </pre>
            </details>
        </div>
    );
};

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }
    
    public render() {
        if (this.state.hasError) {
            // Render the functional component fallback UI
            return <ErrorFallback error={this.state.error} />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;