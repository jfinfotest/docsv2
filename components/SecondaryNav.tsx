import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNav } from '../context/NavContext';

const SecondaryNav: React.FC = () => {
    const { secondaryNavLinks, loading } = useNav();

    if (loading && secondaryNavLinks.length === 0) {
        return (
            <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
                <nav className="container mx-auto px-6">
                    <div className="relative flex items-center space-x-6 overflow-x-auto whitespace-nowrap py-1.5 no-scrollbar animate-pulse">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 py-1"></div>
                        ))}
                    </div>
                </nav>
            </div>
        );
    }

    if (!loading && secondaryNavLinks.length === 0) {
        return null;
    }

    return (
        <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <nav className="container mx-auto px-6">
                {/* On smaller screens, this will be horizontally scrollable */}
                <div className="relative flex items-center space-x-6 overflow-x-auto whitespace-nowrap py-1.5 no-scrollbar">
                    {secondaryNavLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            // The `end` prop is crucial for the root path ('/') to not stay active on other routes.
                            end={link.path === '/'} 
                            className={({ isActive }) =>
                                `block text-sm font-medium transition-colors duration-200 py-0.5 ${
                                    isActive
                                        ? 'text-primary-600 dark:text-primary-400'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default SecondaryNav;