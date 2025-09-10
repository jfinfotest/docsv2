import React from 'react';
import NestedMarkdown from './NestedMarkdown';
import {
    InfoIcon, LightbulbIcon, WarningTriangleIcon, DangerIcon,
    CheckCircleIcon, QuestionIcon, QuoteIcon, ExampleIcon, BugIcon,
    ExclamationCircleIcon, BookOpenIcon
} from './Icons';

interface AdmonitionProps {
    type: string;
    title?: string;
    content: string;
}

// Helper to force nested prose elements to inherit the parent's text color.
// This overrides the default prose colors, making the admonition content match its type color.
const proseColorFix = '[&_p]:text-current [&_ul]:text-current [&_ol]:text-current [&_li]:text-current [&_strong]:text-current';
const proseItalicFix = '[&_p]:italic [&_ul]:italic [&_ol]:italic [&_li]:italic';


const typeConfig: { [key: string]: { icon: React.FC<{ className?: string }>; defaultTitle: string; colorClasses: string; } } = {
    note: { icon: InfoIcon, defaultTitle: 'Nota', colorClasses: `bg-sky-50 dark:bg-sky-900/30 border-sky-500 text-sky-800 dark:text-sky-200 ${proseColorFix}` },
    info: { icon: InfoIcon, defaultTitle: 'Información', colorClasses: `bg-sky-50 dark:bg-sky-900/30 border-sky-500 text-sky-800 dark:text-sky-200 ${proseColorFix}` },
    tip: { icon: LightbulbIcon, defaultTitle: 'Consejo', colorClasses: `bg-teal-50 dark:bg-teal-900/30 border-teal-500 text-teal-800 dark:text-teal-200 ${proseColorFix}` },
    success: { icon: CheckCircleIcon, defaultTitle: 'Éxito', colorClasses: `bg-green-50 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-200 ${proseColorFix}` },
    warning: { icon: WarningTriangleIcon, defaultTitle: 'Advertencia', colorClasses: `bg-yellow-50 dark:bg-yellow-900/30 border-yellow-500 text-yellow-800 dark:text-yellow-200 ${proseColorFix}` },
    important: { icon: ExclamationCircleIcon, defaultTitle: 'Importante', colorClasses: `bg-amber-50 dark:bg-amber-900/30 border-amber-500 text-amber-800 dark:text-amber-200 ${proseColorFix}` },
    danger: { icon: DangerIcon, defaultTitle: 'Peligro', colorClasses: `bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200 ${proseColorFix}` },
    error: { icon: DangerIcon, defaultTitle: 'Error', colorClasses: `bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200 ${proseColorFix}` },
    failure: { icon: DangerIcon, defaultTitle: 'Fallo', colorClasses: `bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200 ${proseColorFix}` },
    bug: { icon: BugIcon, defaultTitle: 'Bug', colorClasses: `bg-rose-50 dark:bg-rose-900/30 border-rose-500 text-rose-800 dark:text-rose-200 ${proseColorFix}` },
    example: { icon: ExampleIcon, defaultTitle: 'Ejemplo', colorClasses: `bg-violet-50 dark:bg-violet-900/30 border-violet-500 text-violet-800 dark:text-violet-200 ${proseColorFix}` },
    abstract: { icon: BookOpenIcon, defaultTitle: 'Resumen', colorClasses: `bg-gray-100 dark:bg-gray-800/50 border-gray-500 text-gray-800 dark:text-gray-200 ${proseColorFix}` },
    question: { icon: QuestionIcon, defaultTitle: 'Pregunta', colorClasses: `bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-800 dark:text-blue-200 ${proseColorFix}` },
    quote: { icon: QuoteIcon, defaultTitle: 'Cita', colorClasses: `bg-gray-100 dark:bg-gray-800/50 border-gray-500 text-gray-800 dark:text-gray-200 italic ${proseColorFix} ${proseItalicFix}` },
};


const Admonition: React.FC<AdmonitionProps> = ({ type, title, content }) => {
    const config = typeConfig[type] || typeConfig.note;
    const { icon: Icon, defaultTitle, colorClasses } = config;
    const finalTitle = title || defaultTitle;

    return (
        <div className={`my-6 p-4 border-l-4 rounded-r-lg ${colorClasses}`}>
            <div className="flex items-center mb-2">
                <Icon className="flex-shrink-0 w-6 h-6 mr-3" />
                <h5 className="font-bold m-0">{finalTitle}</h5>
            </div>
            <NestedMarkdown content={content} />
        </div>
    );
};

export default Admonition;