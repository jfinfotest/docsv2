import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { VERSION_CONFIG } from '../constants';

interface VersionContextType {
    version: string;
    setVersion: (version: string) => void;
    versions: string[];
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

export const useVersion = () => {
    const context = useContext(VersionContext);
    if (!context) {
        throw new Error('useVersion must be used within a VersionProvider');
    }
    return context;
};

export const VersionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [version, setVersionState] = useState<string>(() => {
        if (!VERSION_CONFIG.enabled) return VERSION_CONFIG.defaultVersion;
        return localStorage.getItem('version') || VERSION_CONFIG.defaultVersion;
    });

    useEffect(() => {
        if (VERSION_CONFIG.enabled) {
            localStorage.setItem('version', version);
        }
    }, [version]);

    const setVersion = (newVersion: string) => {
        if (VERSION_CONFIG.versions.includes(newVersion)) {
            setVersionState(newVersion);
        }
    };

    const value = {
        version,
        setVersion,
        versions: VERSION_CONFIG.versions,
    };

    return <VersionContext.Provider value={value}>{children}</VersionContext.Provider>;
};
