import React, { useState, useEffect } from 'react';
import { GITHUB_CONFIG, SIDEBAR_BUSINESS_INFO_CONFIG, DOCS_CONFIG } from '../constants';

// Add props to allow custom classes
interface SidebarLogoProps {
    className?: string;
}

const SidebarLogo: React.FC<SidebarLogoProps> = ({ className = 'h-8 w-8' }) => {
    const [iconSrc, setIconSrc] = useState<string | null>(null);
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        const fetchIconFromGitHub = async () => {
             if (!SIDEBAR_BUSINESS_INFO_CONFIG.logo) {
                setHasError(true);
                return;
            }

            const { owner, repo, branch, docsPath, token } = GITHUB_CONFIG;
            const logoPath = SIDEBAR_BUSINESS_INFO_CONFIG.logo;
            // Remove leading slash if path is absolute for GitHub API path correctness
            const apiPath = logoPath.startsWith('/') ? logoPath.substring(1) : `${docsPath}/${logoPath}`;

            const url = `https://api.github.com/repos/${owner}/${repo}/contents/${apiPath}?ref=${branch}`;

            const headers: HeadersInit = { 'Accept': 'application/vnd.github.v3+json' };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            try {
                const response = await fetch(url, { headers });
                if (!response.ok) {
                    throw new Error(`Sidebar logo not found at ${apiPath}`);
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
                console.error("Failed to fetch sidebar logo:", error);
                setHasError(true);
                setIconSrc(null);
            }
        };

        const loadIconFromLocal = () => {
            if (!SIDEBAR_BUSINESS_INFO_CONFIG.logo) {
                setHasError(true);
                return;
            }
            const logoPath = SIDEBAR_BUSINESS_INFO_CONFIG.logo;
            // If the path is already absolute, use it directly. Otherwise, construct it.
            const localIconPath = logoPath.startsWith('/') ? logoPath : `/${GITHUB_CONFIG.docsPath}/${logoPath}`;
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
        return null;
    }

    return (
        <img 
            src={iconSrc} 
            alt="Sidebar Logo" 
            className={`${className} object-contain`}
            onError={() => setHasError(true)}
        />
    );
};

export default SidebarLogo;