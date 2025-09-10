import React, { useEffect, useRef } from 'react';
import { useScrollableContainer } from '../context/ScrollContext';
import { useI18n } from '../context/I18nContext';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface RightSidebarProps {
    items: TocItem[];
    activeId: string | null;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ items, activeId }) => {
    const itemRefs = useRef<Map<string, HTMLLIElement | null>>(new Map());
    const { scrollableContainerRef } = useScrollableContainer();
    const { t } = useI18n();

    useEffect(() => {
        const activeElement = itemRefs.current.get(activeId!);
        if (activeElement) {
            activeElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [activeId]);
    
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        const scrollContainer = scrollableContainerRef?.current;

        if (element && scrollContainer) {
            const offsetPosition = element.offsetTop - 16;
            
            scrollContainer.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };
    
    return (
        <div className="sticky top-8">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">{t('onThisPage')}</h3>
            <div className="max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
                <nav>
                    <ul className="space-y-1 border-l border-gray-200 dark:border-gray-700">
                        {items.map(item => (
                            <li 
                                key={item.id}
                                ref={el => {
                                    if (el) itemRefs.current.set(item.id, el);
                                    else itemRefs.current.delete(item.id);
                                }}
                            >
                                <a
                                    href={`#${item.id}`}
                                    onClick={(e) => handleLinkClick(e, item.id)}
                                    className={`block border-l-2 -ml-px py-1 transition-colors duration-200 text-sm ${
                                        item.level === 2 ? 'pl-3' : 'pl-6'
                                    } ${
                                        activeId === item.id 
                                            ? 'text-blue-600 dark:text-blue-400 font-semibold border-blue-600 dark:border-blue-400' 
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-transparent'
                                    }`}
                                >
                                    {item.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default RightSidebar;
