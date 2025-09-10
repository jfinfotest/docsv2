import React from 'react';

interface GridProps {
    columns: number;
    children: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({ columns, children }) => {
    const gridClasses = {
        2: 'lg:grid-cols-2',
        3: 'lg:grid-cols-3',
        4: 'lg:grid-cols-4',
    };

    return (
        <div className={`my-8 grid grid-cols-1 md:grid-cols-2 ${gridClasses[columns as keyof typeof gridClasses] || 'lg:grid-cols-2'} gap-8`}>
            {children}
        </div>
    );
};

export default Grid;