import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

interface CopyButtonProps {
    textToCopy: string;
    className?: string;
    ariaLabel?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy, className, ariaLabel = "Copiar al portapapeles" }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (!textToCopy) return;
        navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className={`p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white ${className || ''}`}
            aria-label={ariaLabel}
        >
            {isCopied ? <CheckIcon className="text-2xl text-green-500" /> : <CopyIcon className="text-2xl" />}
        </button>
    );
};

export default CopyButton;