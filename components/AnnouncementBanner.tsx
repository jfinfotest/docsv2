import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ANNOUNCEMENT_BANNER_CONFIG } from '../constants';
import { CloseIcon } from './Icons';
import NestedMarkdown from './NestedMarkdown';
import { useI18n } from '../context/I18nContext';

const AnnouncementBanner: React.FC = () => {
    const { enabled, id, content, link } = ANNOUNCEMENT_BANNER_CONFIG;
    const { t } = useI18n();
    const storageKey = `announcement-dismissed-${id}`;

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!enabled || !id) {
            setIsOpen(false);
            return;
        }
        const isDismissed = localStorage.getItem(storageKey) === 'true';
        if (!isDismissed) {
            setIsOpen(true);
        }
    }, [enabled, id, storageKey]);

    const handleDismiss = () => {
        localStorage.setItem(storageKey, 'true');
        setIsOpen(false);
    };

    if (!isOpen) {
        return null;
    }

    const isExternal = link?.href.startsWith('http');

    return (
        <div className="relative z-40 bg-primary-600 text-white">
            <div className="container mx-auto px-6 py-2.5 text-sm font-medium text-center">
                <div className="inline-block">
                    <NestedMarkdown content={content} />
                </div>
                {link && (
                    isExternal ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="ml-2 inline-block underline hover:opacity-80">
                            {link.text} &rarr;
                        </a>
                    ) : (
                        <Link to={link.href} className="ml-2 inline-block underline hover:opacity-80">
                            {link.text} &rarr;
                        </Link>
                    )
                )}
            </div>
            <button
                onClick={handleDismiss}
                className="absolute top-1/2 right-4 -translate-y-1/2 p-1 rounded-full text-primary-200 hover:text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label={t('dismissAnnouncement')}
            >
                <CloseIcon className="w-5 h-5" />
            </button>
        </div>
    );
};

export default AnnouncementBanner;
