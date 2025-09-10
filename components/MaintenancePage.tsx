import React, { useEffect } from 'react';
import { MAINTENANCE_MODE_CONFIG, APP_CONFIG, FOOTER_CONFIG } from '../constants';
import NestedMarkdown from './NestedMarkdown';
import { ToolsIcon } from './Icons';
import AppIcon from './AppIcon';
import { useI18n } from '../context/I18nContext';

const MaintenancePage: React.FC = () => {
    const { message } = MAINTENANCE_MODE_CONFIG;
    const { t } = useI18n();

    const currentYear = new Date().getFullYear();
    const footerText = FOOTER_CONFIG.enabled 
        ? FOOTER_CONFIG.text.replace('{year}', currentYear.toString())
        : null;

    useEffect(() => {
        // Force dark mode for the maintenance page by adding 'dark' class to the html element.
        document.documentElement.classList.add('dark');
        // Cleanup function to remove the class when the component unmounts.
        return () => {
            document.documentElement.classList.remove('dark');
        };
    }, []); // Empty dependency array ensures this runs only on mount and unmount.

    return (
        // The 'dark' class is added here to ensure all styles are applied correctly,
        // and the background colors are set for dark mode.
        <div className="dark relative flex flex-col min-h-screen bg-gray-900 overflow-hidden">
            {/* Subtle background grid pattern */}
            <div className="absolute inset-0 z-0 opacity-50">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e95ff18,transparent)]"></div>
            </div>

            {/* Main content area, centered */}
            <main className="relative z-10 flex-grow flex flex-col items-center justify-center p-6 text-center">
                {/* Branding at the top */}
                <div className="flex items-center space-x-3 mb-6">
                    <AppIcon className="h-9 w-9 text-4xl" />
                    <span className="text-2xl font-semibold text-gray-200">{APP_CONFIG.title}</span>
                </div>

                {/* Main content card/block */}
                <div className="w-full max-w-2xl bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700 p-8 sm:p-12">
                    {/* Large Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-900/50">
                            <ToolsIcon className="text-5xl text-primary-400" />
                        </div>
                    </div>

                    {/* Headings and Message */}
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
                        {t('maintenanceInProgress')}
                    </h1>
                
                    <div className="text-base sm:text-lg text-gray-400 prose prose-sm dark:prose-invert max-w-none">
                        <NestedMarkdown content={message} />
                    </div>

                    <p className="mt-8 text-sm text-gray-400">
                        {t('thankYouForPatience')}
                    </p>
                </div>
            </main>

            {/* Consistent Footer */}
            {footerText && (
                <footer className="relative z-10 w-full py-6 text-center text-xs text-gray-400">
                    {footerText}
                </footer>
            )}
        </div>
    );
};

export default MaintenancePage;
