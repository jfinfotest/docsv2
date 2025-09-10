import React from 'react';
import { GITHUB_CONFIG, EDIT_PAGE_BUTTON_CONFIG, DOCS_CONFIG } from '../constants';
import { PencilIcon } from './Icons';
import { useI18n } from '../context/I18nContext';

interface EditPageButtonProps {
    filePath: string;
}

const EditPageButton: React.FC<EditPageButtonProps> = ({ filePath }) => {
    const { t } = useI18n();
    // Disable the button if the feature is turned off or if running in local mode
    if (!EDIT_PAGE_BUTTON_CONFIG.enabled || !filePath || DOCS_CONFIG.source === 'local') {
        return null;
    }

    const { owner, repo, branch, docsPath } = GITHUB_CONFIG;
    // Construye la URL al editor de GitHub para el archivo dado.
    const editUrl = `https://github.com/${owner}/${repo}/edit/${branch}/${docsPath}/${filePath}`;

    return (
        <a
            href={editUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
        >
            <PencilIcon className="w-4 h-4 mr-2" />
            <span>{t('editThisPage')}</span>
        </a>
    );
};

export default EditPageButton;