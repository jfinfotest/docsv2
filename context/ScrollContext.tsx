import React, { createContext, useContext } from 'react';

interface ScrollContextType {
    scrollableContainerRef: React.RefObject<HTMLDivElement> | null;
}

export const ScrollContext = createContext<ScrollContextType>({
    scrollableContainerRef: null,
});

export const useScrollableContainer = () => useContext(ScrollContext);
