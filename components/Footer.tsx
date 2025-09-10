import React from 'react';
import { FOOTER_CONFIG } from '../constants';

const Footer: React.FC = () => {
    if (!FOOTER_CONFIG.enabled) {
        return null;
    }

    const currentYear = new Date().getFullYear();
    const footerText = FOOTER_CONFIG.text.replace('{year}', currentYear.toString());

    return (
        <footer className="fixed bottom-0 w-full z-30 bg-white dark:bg-gray-900 text-center py-2 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
            {footerText}
        </footer>
    );
};

export default Footer;
