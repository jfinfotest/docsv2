import { useState, useLayoutEffect } from 'react';
import { FONTS, THEME_CONFIG } from '../constants';

export interface Font {
    id: string;
    name: string;
}

export interface UseFontResult {
    font: string;
    setFont: (newFont: string) => void;
    fonts: Font[];
}

// Function to generate Google Fonts URL
const getFontUrl = (fontFamily: string): string => {
    const formattedFamily = fontFamily.replace(/ /g, '+');
    return `https://fonts.googleapis.com/css2?family=${formattedFamily}:wght@400;500;600;700;800&display=swap`;
};

export function useFont(): UseFontResult {
    const [font, _setFont] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            const savedFont = localStorage.getItem('app-font');
            return savedFont || THEME_CONFIG.defaultFont;
        }
        return THEME_CONFIG.defaultFont;
    });

    const setFont = (newFont: string) => {
        localStorage.setItem('app-font', newFont);
        _setFont(newFont);
    };

    useLayoutEffect(() => {
        const linkId = 'google-font-link';
        let link = document.getElementById(linkId) as HTMLLinkElement;
        if (!link) {
            link = document.createElement('link');
            link.id = linkId;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }

        const selectedFont = FONTS.find(f => f.id === font) || FONTS.find(f => f.id === THEME_CONFIG.defaultFont);

        if (selectedFont) {
            link.href = getFontUrl(selectedFont.id);
            document.body.style.fontFamily = `'${selectedFont.id}', sans-serif`;
        }

    }, [font]);

    return { font, setFont, fonts: FONTS };
}
