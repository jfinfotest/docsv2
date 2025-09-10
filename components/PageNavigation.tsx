import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import type { NavLink } from '../types';
import { useI18n } from '../context/I18nContext';

interface PageNavigationProps {
    prevPage?: NavLink;
    nextPage?: NavLink;
}

const PageNavigation: React.FC<PageNavigationProps> = ({ prevPage, nextPage }) => {
    const { t } = useI18n();
    if (!prevPage && !nextPage) {
        return null;
    }

    const linkClass = "flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200";

    const getLinkPath = (page: NavLink) => {
        const cleanedPath = page.path.replace(/\.md$/, '');
        return cleanedPath === 'index' ? '/' : `/${cleanedPath}`;
    };

    return (
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 grid gap-4 md:grid-cols-2">
            {prevPage ? (
                <Link to={getLinkPath(prevPage)} className={`${linkClass} text-left`}>
                    <ChevronLeftIcon className="w-5 h-5" />
                    <div className="ml-3">
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t('previousPage')}</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{prevPage.title}</p>
                    </div>
                </Link>
            ) : <div />}
            {nextPage ? (
                <Link to={getLinkPath(nextPage)} className={`${linkClass} text-right`}>
                    <div className="mr-3 text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t('nextPage')}</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{nextPage.title}</p>
                    </div>
                    <ChevronRightIcon className="w-5 h-5" />
                </Link>
            ) : <div />}
        </div>
    );
};

export default PageNavigation;
