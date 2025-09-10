import React, { useState, useMemo } from 'react';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import type { NavItem, NavSection } from '../types';
import { useNav } from '../context/NavContext';
import { ChevronDownIcon, DocumentIcon, FolderIcon, CloseIcon } from './Icons';
import { APP_CONFIG, SIDEBAR_BUSINESS_INFO_CONFIG } from '../constants';
import AppIcon from './AppIcon';
import SidebarLogo from './SidebarLogo';
import { useI18n } from '../context/I18nContext';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

interface NavLinkProps {
    path: string;
    title: string;
    isSubItem?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ path, title, isSubItem = false }) => {
    const location = useLocation();
    const to = path.replace('.md', '') === 'index' ? '/' : `/${path.replace('.md', '')}`;
    const isActive = location.pathname === to || (location.pathname === '/' && path === 'index.md');

    return (
        <RouterNavLink
            to={to}
            className={`flex items-start p-2 text-base font-normal rounded-lg transition-colors duration-200 ${isSubItem ? 'pl-3' : ''} ${isActive ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
            <DocumentIcon className="w-5 h-5 flex-shrink-0 mt-px" />
            <span className={`ml-3`}>{title}</span>
        </RouterNavLink>
    );
};

const CollapsibleSection: React.FC<{ section: NavSection }> = ({ section }) => {
    const location = useLocation();
    const containsActiveLink = section.children.some(child => {
        if ('path' in child) {
            const to = child.path.replace('.md', '') === 'index' ? '/' : `/${child.path.replace('.md', '')}`;
            // A section is "active" if the current URL path starts with the link's path, but ignore the root path
            return location.pathname.startsWith(to) && to !== '/';
        }
        return false;
    });

    const [isCollapsed, setCollapsed] = useState(!containsActiveLink);

    return (
        <li>
            <button
                type="button"
                className={`flex items-start w-full p-2 text-base rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    containsActiveLink 
                        ? 'font-semibold text-primary-600 dark:text-primary-300' 
                        : 'font-medium text-primary-700 dark:text-primary-400'
                }`}
                onClick={() => setCollapsed(!isCollapsed)}
            >
                <FolderIcon className="w-5 h-5 flex-shrink-0 mt-px" />
                <span className="flex-1 ml-3 text-left whitespace-normal break-words">{section.title}</span>
                <ChevronDownIcon isRotated={!isCollapsed} className="w-5 h-5 flex-shrink-0 mt-px" />
            </button>
            <ul className={`py-2 space-y-2 ${isCollapsed ? 'hidden' : 'block'}`}>
                {section.children.map((child, index) => (
                    <li key={index}>
                        {'path' in child ? (
                            <NavLink path={child.path} title={child.title} isSubItem />
                        ) : null}
                    </li>
                ))}
            </ul>
        </li>
    );
};

const SidebarSkeleton: React.FC = () => (
    <div className="space-y-4 animate-pulse">
        {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
                <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            </div>
        ))}
        <div className="pt-4">
            <div className="flex items-center space-x-3">
                <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
            </div>
            <div className="pl-9 mt-3 space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
            </div>
        </div>
    </div>
);

const SidebarContent: React.FC = () => {
    const { navSections, loading, error } = useNav();
    const location = useLocation();
    const { t } = useI18n();

    // Determine the current navigation config to display based on the URL path
    const navConfig = useMemo(() => {
        if (loading || navSections.size === 0) return [];

        const pathParts = location.pathname.split('/').filter(Boolean);
        // Default to the root section ('/')
        let sectionKey = '/';

        // If the path is nested (e.g., /section-one/page), check if the first part corresponds to a section
        if (pathParts.length > 0 && navSections.has(pathParts[0])) {
            sectionKey = pathParts[0];
        }
        
        return navSections.get(sectionKey) || [];
    }, [location.pathname, navSections, loading]);
    
    if (loading) {
        return <SidebarSkeleton />;
    }

    if (error) {
        return <div className="p-4 text-sm text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded-lg">{error}</div>;
    }
    
    if (!loading && navConfig.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-4 text-sm text-center text-gray-500 dark:text-gray-400">
                <FolderIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                <p className="mt-2">{t('sidebarNoItems')}</p>
            </div>
        );
    }

    return (
        <ul className="space-y-2">
            {navConfig.map((item, index) => (
                <li key={index}>
                    {'children' in item ? (
                        <CollapsibleSection section={item} />
                    ) : (
                        <NavLink path={item.path} title={item.title} />
                    )}
                </li>
            ))}
        </ul>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const sidebarFooterText = useMemo(() => {
        if (!SIDEBAR_BUSINESS_INFO_CONFIG.enabled || !SIDEBAR_BUSINESS_INFO_CONFIG.footerText) {
            return null;
        }
        const currentYear = new Date().getFullYear();
        return SIDEBAR_BUSINESS_INFO_CONFIG.footerText.replace('{year}', currentYear.toString());
    }, []);

    return (
        <>
            <div
                className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden ${isOpen ? 'block' : 'hidden'}`}
                onClick={() => setIsOpen(false)}
            ></div>
            <aside
                className={`fixed top-0 left-0 z-50 w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform md:relative md:translate-x-0 md:h-auto flex flex-col
                           ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Mobile Header */}
                <div className="flex-shrink-0 flex items-center justify-between p-4 border-b h-16 bg-primary-700 border-primary-600 md:hidden">
                    <a href="/#" className="flex items-center space-x-3 text-white">
                        <AppIcon className="h-8 w-8 text-3xl" />
                        <div>
                            <span className="block self-center text-xl font-semibold whitespace-nowrap leading-tight">{APP_CONFIG.title}</span>
                             {APP_CONFIG.subtitle && (
                                <span className="block text-xs text-primary-200/80 leading-tight">{APP_CONFIG.subtitle}</span>
                            )}
                        </div>
                    </a>
                    <button onClick={() => setIsOpen(false)} className="md:hidden text-primary-200 hover:text-white">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Main Content Area: Flex container to push footer down */}
                <div className="flex-grow flex flex-col overflow-hidden">
                    {/* Scrollable Navigation */}
                    <div className="flex-grow overflow-y-auto py-4 px-3">
                        <SidebarContent />
                    </div>

                    {/* Business Info Section */}
                    {SIDEBAR_BUSINESS_INFO_CONFIG.enabled && (
                        <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-3 bg-gray-50 dark:bg-gray-700/50">
                            {(SIDEBAR_BUSINESS_INFO_CONFIG.logo || SIDEBAR_BUSINESS_INFO_CONFIG.title) && (
                                <a 
                                    href={SIDEBAR_BUSINESS_INFO_CONFIG.link} 
                                    className="flex items-center space-x-3 group text-gray-800 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                >
                                    {SIDEBAR_BUSINESS_INFO_CONFIG.logo && <SidebarLogo className="h-8 w-8" />}
                                    {SIDEBAR_BUSINESS_INFO_CONFIG.title && (
                                        <span className="font-bold text-base">
                                            {SIDEBAR_BUSINESS_INFO_CONFIG.title}
                                        </span>
                                    )}
                                </a>
                            )}
                            {sidebarFooterText && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                   {sidebarFooterText}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;