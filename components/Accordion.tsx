import React, { useState, createContext, useContext, ReactNode } from 'react';
import { ChevronDownIcon } from './Icons';
import NestedMarkdown from './NestedMarkdown';

// --- Accordion Item ---
interface AccordionItemProps {
    title: string;
    children: ReactNode;
    id: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, id }) => {
    const { openItems, toggleItem } = useAccordionContext();
    const isOpen = openItems.includes(id);
    const headerId = `accordion-header-${id}`;
    const contentId = `accordion-content-${id}`;

    return (
        <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
            <h3 id={headerId} className="m-0">
                <button
                    type="button"
                    className={`flex items-center justify-between w-full p-5 font-medium text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-300 dark:focus:ring-primary-700
                                ${isOpen 
                                    ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300' 
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                    onClick={() => toggleItem(id)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                >
                    <span className="text-base min-w-0 mr-4 flex-1 text-left">{title}</span>
                    <ChevronDownIcon isRotated={isOpen} />
                </button>
            </h3>
            <div
                id={contentId}
                role="region"
                aria-labelledby={headerId}
                className={`grid transition-all duration-300 ease-in-out bg-white dark:bg-gray-900/50 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <div className="p-5">
                        <NestedMarkdown content={children as string} />
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Accordion Context ---
interface AccordionContextType {
    openItems: string[];
    toggleItem: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);
const useAccordionContext = () => {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error('AccordionItem must be used within an Accordion component');
    }
    return context;
};


// --- Accordion ---
interface AccordionProps {
    allowMultiple?: boolean;
    items: { title: string, content: string }[];
}

const Accordion: React.FC<AccordionProps> = ({ allowMultiple = false, items }) => {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (id: string) => {
        setOpenItems(prev => {
            if (allowMultiple) {
                return prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
            } else {
                return prev.includes(id) ? [] : [id];
            }
        });
    };
    
    return (
        <div className="my-6 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <AccordionContext.Provider value={{ openItems, toggleItem }}>
                {items.map((item, index) => (
                    <AccordionItem key={index} id={`item-${index}`} title={item.title}>
                        {item.content}
                    </AccordionItem>
                ))}
            </AccordionContext.Provider>
        </div>
    );
};

export default Accordion;