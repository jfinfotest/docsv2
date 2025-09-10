import { useState, useLayoutEffect } from 'react';
import { THEME_CONFIG } from '../constants';

type DarkModeResult = [boolean, () => void];

export function useDarkMode(): DarkModeResult {
    const [isDarkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedMode = localStorage.getItem('theme');
            if (savedMode) {
                return savedMode === 'dark';
            }
        }
        return THEME_CONFIG.defaultTheme === 'dark';
    });

    // Apply the theme class to the document and save to localStorage on change.
    useLayoutEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!isDarkMode);
    };

    return [isDarkMode, toggleDarkMode];
}
