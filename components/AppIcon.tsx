import React, { useState, useEffect } from 'react';
import { GITHUB_CONFIG, APP_CONFIG, DOCS_CONFIG } from '../constants';
import { BookIcon } from './Icons';

// Add props to allow custom classes
interface AppIconProps {
    className?: string;
}

const AppIcon: React.FC<AppIconProps> = ({ className = 'h-8 w-8' }) => { // Default size to not break existing usage
    const [iconSrc, setIconSrc] = useState<string | null>(null);
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        const fetchIconFromGitHub = async () => {
            if (!APP_CONFIG.icon) {
                setHasError(true);
                return;
            }

            const { owner, repo, branch, docsPath, token } = GITHUB_CONFIG;
            // Remove leading slash if path is absolute, for GitHub API path correctness
            const iconPath = APP_CONFIG.icon.startsWith('/') ? APP_CONFIG.icon.substring(1) : APP_CONFIG.icon;
            // The GitHub API path should not have the top-level folder if it's part of the base URL already
            const cleanDocsPath = docsPath.startsWith('docs') ? docsPath.substring(5) : docsPath;
            const fullPath = `${cleanDocsPath}/${iconPath}`.replace(/^\//, '');

            const url = `https://api.github.com/repos/${owner}/${repo}/contents/${fullPath}?ref=${branch}`;

            const headers: HeadersInit = { 'Accept': 'application/vnd.github.v3+json' };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            try {
                const response = await fetch(url, { headers });
                if (!response.ok) {
                    throw new Error(`Icon not found at ${fullPath}`);
                }
                const fileData = await response.json();
                
                if (fileData.encoding !== 'base64' || !fileData.content) {
                    throw new Error('Invalid icon file data from GitHub API.');
                }

                const getMimeType = (filename: string): string => {
                    if (filename.endsWith('.svg')) return 'image/svg+xml';
                    if (filename.endsWith('.png')) return 'image/png';
                    if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) return 'image/jpeg';
                    if (filename.endsWith('.ico')) return 'image/x-icon';
                    if (filename.endsWith('.gif')) return 'image/gif';
                    return 'application/octet-stream';
                };
                
                const mimeType = getMimeType(fileData.name);
                const dataUri = `data:${mimeType};base64,${fileData.content}`;
                
                setIconSrc(dataUri);
                setHasError(false);

            } catch (error) {
                console.error("Failed to fetch app icon:", error);
                setHasError(true);
                setIconSrc(null);
            }
        };

        const loadIconFromLocal = () => {
             if (!APP_CONFIG.icon) {
                setHasError(true);
                return;
            }
            const iconPath = APP_CONFIG.icon;
            // If the path is already absolute, use it directly. Otherwise, construct it.
            const localIconPath = iconPath.startsWith('/') ? iconPath : `/${GITHUB_CONFIG.docsPath}/${iconPath}`;
            setIconSrc(localIconPath);
            setHasError(false);
        };

        if (DOCS_CONFIG.source === 'local') {
            loadIconFromLocal();
        } else {
            fetchIconFromGitHub();
        }
    }, []);

    if (hasError || !iconSrc) {
        return <BookIcon className={className} />;
    }

    return (
        <img 
            src={iconSrc} 
            alt="App Logo" 
            className={`${className} object-contain`}
            onError={() => setHasError(true)}
        />
    );
};

export default AppIcon;