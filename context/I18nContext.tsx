import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { I18N_CONFIG, UI_TEXT } from '../constants';

type Language = { code: string; name: string };

type TranslateFunction = (key: string, ...args: any[]) => string;

interface I18nContextType {
    lang: string;
    setLang: (lang: string) => void;
    languages: Language[];
    t: TranslateFunction;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [lang, setLangState] = useState<string>(() => {
        if (!I18N_CONFIG.enabled) return I18N_CONFIG.defaultLang;
        return localStorage.getItem('lang') || I18N_CONFIG.defaultLang;
    });

    useEffect(() => {
        if (I18N_CONFIG.enabled) {
            localStorage.setItem('lang', lang);
        }
    }, [lang]);

    const setLang = (newLang: string) => {
        if (I18N_CONFIG.languages.some(l => l.code === newLang)) {
            setLangState(newLang);
        }
    };

    const t: TranslateFunction = useCallback((key, ...args) => {
        const translations = (UI_TEXT as any)[lang] || (UI_TEXT as any)[I18N_CONFIG.defaultLang];
        const translation = translations[key] || key;

        if (typeof translation === 'function') {
            return translation(...args);
        }

        return translation;
    }, [lang]);


    const value = {
        lang,
        setLang,
        languages: I18N_CONFIG.languages,
        t,
    };

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
