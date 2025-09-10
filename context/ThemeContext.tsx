import React, { createContext, useContext, ReactNode, useState, useLayoutEffect } from 'react';
import { usePrismTheme, UsePrismThemeResult } from '../hooks/usePrismTheme';
import { useFont, UseFontResult } from '../hooks/useFont';
import { THEMES, hexToRgb, ThemePalette } from '../themes';
import { THEME_CONFIG, FONTS } from '../constants';

// Combine prism theme, app theme, and font into one context type
interface AppThemeContextType extends UsePrismThemeResult, UseFontResult {
    appTheme: string;
    setAppTheme: (themeId: string) => void;
    appThemes: ThemePalette[];
}

const defaultState: AppThemeContextType = {
    theme: '',
    setTheme: () => {},
    themeBackground: null,
    resetTheme: () => {},
    themes: [],
    appTheme: THEME_CONFIG.defaultAppTheme,
    setAppTheme: () => {},
    appThemes: THEMES,
    font: THEME_CONFIG.defaultFont,
    setFont: () => {},
    fonts: FONTS,
};

const ThemeContext = createContext<AppThemeContextType>(defaultState);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const prismThemeState = usePrismTheme();
    const fontState = useFont();
    const [appTheme, _setAppTheme] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('app-theme');
            return savedTheme || THEME_CONFIG.defaultAppTheme;
        }
        return THEME_CONFIG.defaultAppTheme;
    });

    const setAppTheme = (themeId: string) => {
        if (THEMES.find(t => t.id === themeId)) {
            localStorage.setItem('app-theme', themeId);
            _setAppTheme(themeId);
        }
    };

    useLayoutEffect(() => {
        const currentTheme = THEMES.find(t => t.id === appTheme) || THEMES.find(t => t.id === THEME_CONFIG.defaultAppTheme);
        if (currentTheme) {
            const root = document.documentElement;
            Object.entries(currentTheme.colors).forEach(([key, value]) => {
                const rgbValue = hexToRgb(value);
                if (rgbValue) {
                    root.style.setProperty(`--color-${key}`, rgbValue);
                }
            });
        }
    }, [appTheme]);

    const value: AppThemeContextType = {
        ...prismThemeState,
        ...fontState,
        appTheme,
        setAppTheme,
        appThemes: THEMES
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
