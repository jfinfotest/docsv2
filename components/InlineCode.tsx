import React from 'react';

const InlineCode: React.FC<any> = ({ children }) => {
    // Este componente ahora usa los colores primarios de la aplicación a través de las variables CSS de Tailwind,
    // asegurando que coincida con el tema de la aplicación (azul, verde, etc.) en lugar del tema del bloque de código.
    return (
        <code 
            className="px-1.5 py-1 mx-0.5 rounded-md font-mono text-sm bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300"
        >
            {children}
        </code>
    );
};

export default InlineCode;