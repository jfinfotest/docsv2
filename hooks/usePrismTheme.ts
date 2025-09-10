import { useState, useLayoutEffect } from 'react';
import { PRISM_THEMES, DEFAULT_PRISM_THEME } from '../constants';

export interface PrismTheme {
    id: string;
    name: string;
    url: string;
}

export interface UsePrismThemeResult {
    theme: string;
    setTheme: (newTheme: string) => void;
    themeBackground: string | null;
    resetTheme: () => void;
    themes: PrismTheme[];
}

export function usePrismTheme(): UsePrismThemeResult {
    const [theme, _setTheme] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('prism-theme');
            return savedTheme || DEFAULT_PRISM_THEME;
        }
        return DEFAULT_PRISM_THEME;
    });
    const [themeBackground, setThemeBackground] = useState<string | null>(null);

    const setTheme = (newTheme: string) => {
        localStorage.setItem('prism-theme', newTheme);
        _setTheme(newTheme);
    };

    const resetTheme = () => {
        setTheme(DEFAULT_PRISM_THEME);
    };

    useLayoutEffect(() => {
        const linkId = 'prism-theme-link';
        let link = document.getElementById(linkId) as HTMLLinkElement;
        if (!link) {
            link = document.createElement('link');
            link.id = linkId;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
        
        const themeUrl = PRISM_THEMES.find(t => t.id === theme)?.url 
                      || PRISM_THEMES.find(t => t.id === DEFAULT_PRISM_THEME)!.url;

        link.href = themeUrl;
        
        link.onerror = () => {
            console.error(`Failed to load Prism theme: ${themeUrl}`);
            // If the theme fails, revert to default to avoid a broken state.
            setTheme(DEFAULT_PRISM_THEME);
        };

        // When the new stylesheet loads, calculate its background color
        link.onload = () => {
            const tempPre = document.createElement('pre');
            const tempCode = document.createElement('code');

            // Apply classes that themes will target
            tempPre.className = 'language-js';
            tempCode.className = 'language-js';
            tempPre.appendChild(tempCode);

            // Hide the element
            tempPre.style.position = 'fixed';
            tempPre.style.top = '-9999px';
            tempPre.style.left = '-9999px';
            
            document.body.appendChild(tempPre);

            try {
                const preStyle = window.getComputedStyle(tempPre);
                const codeStyle = window.getComputedStyle(tempCode);
                
                let bgColor = preStyle.backgroundColor;

                // Some themes (like 'coy') apply background to `code` instead of `pre`
                if (!bgColor || bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
                    bgColor = codeStyle.backgroundColor;
                }

                // If we still don't have a valid color, it might be a very minimal theme.
                // We'll use a fallback. A light grey is a safe bet for light themes.
                if (!bgColor || bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
                    bgColor = '#f5f2f0'; // Fallback for themes like Prism 'default'
                }
                
                setThemeBackground(bgColor);

            } finally {
                if (tempPre.parentNode === document.body) {
                    document.body.removeChild(tempPre);
                }
            }
        };
        
    }, [theme]);

    return { theme, setTheme, themeBackground, resetTheme, themes: PRISM_THEMES };
}
