import React, { createContext, useContext, ReactNode, useState, useMemo } from 'react';

const GEMINI_API_KEY_STORAGE_KEY = 'gemini-api-key';

interface GeminiContextType {
    apiKey: string;
    setApiKey: (key: string) => void;
    isKeySet: boolean;
}

const GeminiContext = createContext<GeminiContextType | undefined>(undefined);

export const useGemini = () => {
    const context = useContext(GeminiContext);
    if (!context) {
        throw new Error('useGemini must be used within a GeminiProvider');
    }
    return context;
};

export const GeminiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [apiKey, _setApiKey] = useState<string>(() => {
        // La clave de API se obtiene exclusivamente del localStorage.
        return localStorage.getItem(GEMINI_API_KEY_STORAGE_KEY) || '';
    });

    const setApiKey = (key: string) => {
        localStorage.setItem(GEMINI_API_KEY_STORAGE_KEY, key);
        _setApiKey(key);
    };

    const isKeySet = useMemo(() => !!apiKey, [apiKey]);

    const value: GeminiContextType = {
        apiKey,
        setApiKey,
        isKeySet,
    };

    return (
        <GeminiContext.Provider value={value}>
            {children}
        </GeminiContext.Provider>
    );
};