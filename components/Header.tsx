import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';
import { MenuIcon, MoonIcon, SunIcon, SettingsIcon, GitHubIcon, TwitterIcon, DiscordIcon, TranslateIcon, VersionsIcon, ChevronDownIcon, InfoCircleIcon } from './Icons';
import { APP_CONFIG, HEADER_LINKS, I18N_CONFIG, VERSION_CONFIG } from '../constants';
import AppIcon from './AppIcon';
import SearchBar from './SearchBar';
import { useI18n } from '../context/I18nContext';
import { useVersion } from '../context/VersionContext';

interface HeaderProps {
    onMenuClick: () => void;
    onSettingsClick: () => void;
    onAboutClick: () => void;
    showMenuButton?: boolean;
}

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
    GitHub: GitHubIcon,
    Twitter: TwitterIcon,
    Discord: DiscordIcon,
};

// --- Custom Dropdown Component for Header ---
interface DropdownOption {
    value: string;
    label: string;
}

interface HeaderDropdownProps {
    options: DropdownOption[];
    value: string;
    onChange: (value: string) => void;
    Icon: React.FC<{ className?: string }>;
    ariaLabel: string;
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ options, value, onChange, Icon, ariaLabel }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (newValue: string) => {
        onChange(newValue);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-1 md:space-x-2 px-1.5 md:px-2 py-1 md:py-1.5 text-xs md:text-sm bg-primary-600 hover:bg-primary-500 border border-primary-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-white transition-colors duration-200"
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-label={ariaLabel}
            >
                <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-200" />
                <span className="hidden sm:inline">{selectedOption?.label}</span>
                <ChevronDownIcon className={`w-2.5 h-2.5 md:w-3 md:h-3 text-primary-200 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10 animate-fade-in-down">
                    <ul className="py-1">
                        {options.map(option => (
                            <li key={option.value}>
                                <button
                                    onClick={() => handleSelect(option.value)}
                                    className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                                        option.value === value
                                            ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <style>{`
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down { animation: fade-in-down 0.2s ease-out; }
            `}</style>
        </div>
    );
};


const Header: React.FC<HeaderProps> = ({ onMenuClick, onSettingsClick, onAboutClick, showMenuButton = true }) => {
    const [isDarkMode, toggleDarkMode] = useDarkMode();
    const { t, lang, setLang, languages } = useI18n();
    const { version, setVersion, versions } = useVersion();
    const navigate = useNavigate();

    const validLinks = HEADER_LINKS.filter(link => iconMap[link.icon] && link.url);

    return (
        <header className="relative flex-shrink-0 z-60 bg-primary-700 border-b border-primary-600 w-full">
            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between px-6 h-12">
                <div className="flex items-center space-x-2 text-white">
                    <div className="flex items-center justify-center h-full">
                        <AppIcon className="h-6 w-6 text-2xl flex-shrink-0 -mt-0.5" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="block text-lg font-semibold leading-tight">{APP_CONFIG.title}</span>
                        {APP_CONFIG.subtitle && (
                             <span className="block text-xs text-primary-200/80 leading-tight">{APP_CONFIG.subtitle}</span>
                        )}
                    </div>
                </div>
                
                <div className="flex items-center space-x-2">
                    <SearchBar />
                    
                    {validLinks.length > 0 && (
                        <>
                            <div className="w-px h-6 bg-primary-500/50"></div>
                            <div className="flex items-center space-x-1">
                                {validLinks.map((link) => {
                                    const IconComponent = iconMap[link.icon];
                                    return (
                                        <a
                                            key={link.icon}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center w-8 h-8 rounded-full text-primary-200 hover:text-white hover:bg-primary-600 focus:outline-none transition-colors duration-200"
                                            aria-label={link.label}
                                        >
                                            <IconComponent className="text-lg" />
                                        </a>
                                    );
                                })}
                            </div>
                        </>
                    )}
                    
                    {(I18N_CONFIG.enabled || VERSION_CONFIG.enabled) && <div className="w-px h-6 bg-primary-500/50"></div>}
                    
                    {I18N_CONFIG.enabled && (
                        <HeaderDropdown
                            Icon={TranslateIcon}
                            options={languages.map(l => ({ value: l.code, label: l.name }))}
                            value={lang}
                            onChange={(newLang) => {
                                setLang(newLang);
                                navigate('/');
                            }}
                            ariaLabel={t('language')}
                        />
                    )}
                    {VERSION_CONFIG.enabled && (
                        <HeaderDropdown
                            Icon={VersionsIcon}
                            options={versions.map(v => ({ value: v, label: v }))}
                            value={version}
                            onChange={(newVersion) => {
                                setVersion(newVersion);
                                navigate('/');
                            }}
                            ariaLabel={t('version')}
                        />
                    )}

                    <div className="w-px h-6 bg-primary-500/50"></div>

                    <button
                        onClick={() => toggleDarkMode()}
                        className="flex items-center justify-center w-8 h-8 rounded-full text-primary-200 hover:text-white hover:bg-primary-600 focus:outline-none transition-colors duration-200"
                        aria-label={t('toggleDarkMode')}
                    >
                        {isDarkMode ? <SunIcon className="text-lg" /> : <MoonIcon className="text-lg" />}
                    </button>
                    <button
                        onClick={onSettingsClick}
                        className="flex items-center justify-center w-10 h-10 rounded-full text-primary-200 hover:text-white hover:bg-primary-600 focus:outline-none transition-colors duration-200"
                        aria-label={t('openSettings')}
                    >
                        <SettingsIcon className="text-lg" />
                    </button>
                    <button
                        onClick={onAboutClick}
                        className="flex items-center justify-center w-10 h-10 rounded-full text-primary-200 hover:text-white hover:bg-primary-600 focus:outline-none transition-colors duration-200"
                        aria-label={t('openAbout')}
                    >
                        <InfoCircleIcon className="text-lg" />
                    </button>
                </div>
            </div>
            
            {/* Mobile Layout */}
            <div className="md:hidden">
                {/* Top row: Menu, Title, Essential controls */}
                <div className="flex items-center justify-between px-4 h-10">
                    <div className="flex items-center space-x-2">
                        {showMenuButton && (
                            <button onClick={onMenuClick} className="text-primary-200 hover:text-white focus:outline-none">
                                 <MenuIcon className="w-4 h-4" />
                            </button>
                        )}
                        <a href="/#" className="flex items-center space-x-1.5 text-white">
                             <div className="flex items-center justify-center h-full">
                                 <AppIcon className="h-5 w-5 text-xl flex-shrink-0 -mt-0.5" />
                             </div>
                             <span className="text-base font-semibold">{APP_CONFIG.title}</span>
                         </a>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                        {I18N_CONFIG.enabled && (
                            <HeaderDropdown
                                Icon={TranslateIcon}
                                options={languages.map(l => ({ value: l.code, label: l.name }))}
                                value={lang}
                                onChange={(newLang) => {
                                    setLang(newLang);
                                    navigate('/');
                                }}
                                ariaLabel={t('language')}
                            />
                        )}
                        {VERSION_CONFIG.enabled && (
                            <HeaderDropdown
                                Icon={VersionsIcon}
                                options={versions.map(v => ({ value: v, label: v }))}
                                value={version}
                                onChange={(newVersion) => {
                                    setVersion(newVersion);
                                    navigate('/');
                                }}
                                ariaLabel={t('version')}
                            />
                        )}
                        <button
                             onClick={() => toggleDarkMode()}
                             className="flex items-center justify-center w-7 h-7 rounded-full text-primary-200 hover:text-white hover:bg-primary-600 focus:outline-none transition-colors duration-200"
                             aria-label={t('toggleDarkMode')}
                         >
                             {isDarkMode ? <SunIcon className="text-base" /> : <MoonIcon className="text-base" />}
                         </button>
                         <button
                             onClick={onSettingsClick}
                             className="flex items-center justify-center w-7 h-7 rounded-full text-primary-200 hover:text-white hover:bg-primary-600 focus:outline-none transition-colors duration-200"
                             aria-label={t('openSettings')}
                         >
                             <SettingsIcon className="text-base" />
                        </button>
                    </div>
                </div>
                
                {/* Bottom row: Search bar */}
                <div className="px-4 pb-2">
                    <SearchBar />
                </div>
            </div>
            

        </header>
    );
};

export default Header;