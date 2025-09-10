import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import matter from 'gray-matter';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Link } from 'react-router-dom';
import CodeBlock from './CodeBlock';
import InlineCode from './InlineCode';
import Mermaid from './Mermaid';
import Admonition from './Admonition';
import ImageWithLightbox from './ImageWithLightbox';
import TabbedCodeBlock from './TabbedCodeBlock';
import CTA from './CTA';
import Accordion from './Accordion';
import Timeline from './Timeline';
import Cards from './Cards';
import Steps from './Steps';
import VideoEmbed from './VideoEmbed';
import ImageGallery from './ImageGallery';
import ApiExplorer from './ApiExplorer';
import Quiz from './Quiz';
import FileTree from './FileTree';
import Carousel from './Carousel';
import HeroSection from './HeroSection';
import TeamProfile from './TeamProfile';
import LiveCodeEmbed from './LiveCodeEmbed';
import FeatureList from './FeatureList';
import ComparisonTable from './ComparisonTable';
import Charts from './Charts';
import Scrollytelling from './Scrollytelling';
import TutorialSlider from './TutorialSlider';
import StatCards from './StatCards';
import RestClient from './RestClient';
import Animate from './Animate';
// FIX: Import the 'NestedMarkdown' component to resolve the 'Cannot find name' error.
import NestedMarkdown from './NestedMarkdown';
import Grid from './Grid';

// Helper function to reconstruct raw text from a HAST node tree.
// This is necessary because syntax highlighting plugins can wrap text in `<span>` elements.
const getNodeText = (node: any): string => {
    if (node.type === 'text') {
        return node.value;
    }
    if (node.children && Array.isArray(node.children)) {
        return node.children.map(getNodeText).join('');
    }
    return '';
};

// A wrapper component to handle image `src` that might be a Blob.
// It creates a temporary object URL and revokes it on unmount to prevent memory leaks.
const MarkdownImage: React.FC<{src?: string | Blob, alt?: string}> = ({ src, alt }) => {
    const [objectUrl, setObjectUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
        let url: string | null = null;
        if (src instanceof Blob) {
            url = URL.createObjectURL(src);
            setObjectUrl(url);
        }

        return () => {
            if (url) {
                URL.revokeObjectURL(url);
            }
        };
    }, [src]);
    
    if (src instanceof Blob) {
        return objectUrl ? <ImageWithLightbox src={objectUrl} alt={alt} /> : null;
    }

    return <ImageWithLightbox src={src} alt={alt} />;
};

const CustomLink: React.FC<any> = ({ href, children, ...props }) => {
    if (!href) {
        return <a {...props}>{children}</a>;
    }
    
    const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:');
    
    if (isExternal) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                {children}
            </a>
        );
    }

    // Process internal links for React Router
    let to = href.replace(/\.md$/, '');
    if (to.endsWith('/index')) {
        to = to.slice(0, -'/index'.length) || '/';
    } else if (to === 'index') {
        to = '/';
    }
    
    return <Link to={to} {...props}>{children}</Link>;
};

const MarkdownPage = React.memo(React.forwardRef<HTMLElement, { content: string }>(({ content }, ref) => {
    return (
        <article ref={ref} className="">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeSlug, rehypeKatex, [rehypePrism, { ignoreMissing: true }]]}
                components={{
                    // FIX: Strip the outer <pre> tag added by rehype-prism-plus.
                    // Our custom <CodeBlock> and other components provide their own containers.
                    // This prevents double-boxing and unwanted styles from the prose theme.
                    pre: ({ children }) => <>{children}</>,
                    h2: ({node, ...props}) => <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mt-8 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-3" {...props} />,
                    p: ({node, ...props}) => <p className="text-lg leading-7 text-gray-700 dark:text-gray-300 mb-4" {...props} />,
                    a: ({node, ...props}) => <CustomLink {...props} className="text-blue-600 dark:text-blue-400 hover:underline" />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-8 my-4 space-y-2 text-lg text-gray-700 dark:text-gray-300" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-8 my-4 space-y-2 text-lg text-gray-700 dark:text-gray-300" {...props} />,
                    li: ({node, className, children, ...props}) => {
                        const isTaskItem = Array.isArray(children) && children.length > 0 && typeof children[0] === 'object' && 'type' in children[0] && children[0].type === 'checkbox';
                        if (className === 'task-list-item' || isTaskItem) {
                             return <li className="list-none my-1 flex items-center" {...props}>{children}</li>;
                        }
                        return <li className="mb-2" {...props}>{children}</li>;
                    },
                    input: ({node, type, checked, ...props}) => {
                        if (type === 'checkbox') {
                           return <input type="checkbox" checked={checked} disabled className="mr-3 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" {...props} />;
                        }
                        return <input type={type} checked={checked} {...props} />;
                    },
                    code: ({node, className, children, ...props}: any) => {
                        // FIX: Allow hyphens in language names to support components like `api-explorer`.
                        const match = /language-([\w-]+)/.exec(className || '');
                        
                        if (match) {
                            const code = getNodeText(node).replace(/\n$/, '');
                            
                            if (match[1] === 'mermaid') {
                                return <Mermaid chart={code} />;
                            }

                             if (match[1] === 'tabs') {
                                return <TabbedCodeBlock content={code} />;
                            }
                            
                            if (match[1] === 'cta') {
                                return <CTA content={code} />;
                            }

                            if (match[1] === 'admonition') {
                                let processedCode = code;
                                // Prepend '---' if it's missing, to ensure gray-matter can parse the frontmatter.
                                if (!processedCode.trim().startsWith('---')) {
                                    processedCode = `---\n${processedCode}`;
                                }
                            
                                const { data, content: admonitionContent } = matter(processedCode);
                                // Sanitize type by converting to lowercase, in case of user typo like 'Warning'
                                const type = (data.type ? String(data.type).toLowerCase() : 'note').trim();
                            
                                return <Admonition type={type} title={data.title} content={admonitionContent} />;
                            }
                            
                            if (match[1] === 'accordion') {
                                const { data, content: accordionContent } = matter(code);
                                const { allowMultiple = false } = data;
            
                                let processedContent = accordionContent.trim();
                                // Normalize by removing the initial separator if it exists.
                                // This prevents the "###" from being included in the first item's title.
                                if (processedContent.startsWith('### ')) {
                                    processedContent = processedContent.substring(4);
                                }
                                
                                // Now, the first item is clean, and the rest are separated by `\n### `
                                const itemParts = processedContent.split(/\n###\s+/).filter(Boolean);
            
                                const items = itemParts.map(part => {
                                    const [title, ...contentParts] = part.split(/\r?\n/);
                                    return {
                                        title: title.trim(),
                                        content: contentParts.join('\n').trim()
                                    };
                                });
            
                                return <Accordion allowMultiple={allowMultiple} items={items} />;
                            }

                            if (match[1] === 'timeline') {
                                const itemParts = code.split(/\n---\r?\n/).filter(part => part.trim() !== '');
                                const items = itemParts.map(part => {
                                    const lines = part.trim().split(/\r?\n/);
                                    const header = lines.shift() || '### |'; // Default if empty
                                    const content = lines.join('\n').trim();
                            
                                    const headerMatch = header.match(/^###\s+(.*?)\s*\|\s*(.*)/);
                                    if (headerMatch) {
                                        return {
                                            title: headerMatch[1].trim(),
                                            date: headerMatch[2].trim(),
                                            content: content
                                        };
                                    }
                                    // Fallback for malformed header
                                    return {
                                        title: 'Invalid format',
                                        date: '',
                                        content: part
                                    };
                                }).filter(item => item.title !== 'Invalid format');
                            
                                return <Timeline items={items} />;
                            }

                            if (match[1] === 'cards') {
                                const { data } = matter(code);
                                const { items = [], columns = 2 } = data;
                                // Basic validation
                                const validColumns = [2, 3].includes(columns) ? columns : 2;
                                return <Cards items={items} columns={validColumns} />;
                            }

                            if (match[1] === 'steps') {
                                return <Steps content={code} />;
                            }

                            if (match[1] === 'video') {
                                const { data } = matter(code);
                                const { src, title } = data;
                                if (typeof src !== 'string' || !src) {
                                    return (
                                         <div className="my-6 p-4 border-l-4 rounded-r-lg bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200">
                                            <p className="font-bold">Missing Video Source</p>
                                            <p>The `src` attribute is required in the video block.</p>
                                        </div>
                                    );
                                }
                                return <VideoEmbed src={src} title={title} />;
                            }
                            
                            if (match[1] === 'gallery') {
                                const { data } = matter(code);
                                const { items = [], columns = 3 } = data;
                                const validColumns = [2, 3, 4].includes(columns) ? columns : 3;
                                return <ImageGallery items={items} columns={validColumns} />;
                            }

                            if (match[1] === 'api-explorer') {
                                const { data } = matter(code);
                                // FIX: Cast `data` to `any` to resolve a TypeScript error with dynamic props from frontmatter. The component handles missing props at runtime.
                                return <ApiExplorer {...(data as any)} />;
                            }

                            if (match[1] === 'quiz') {
                                return <Quiz content={code} />;
                            }

                            if (match[1] === 'file-tree') {
                                return <FileTree content={code} />;
                            }

                            if (match[1] === 'carousel') {
                                return <Carousel content={code} />;
                            }

                            if (match[1] === 'hero-section') {
                                return <HeroSection content={code} />;
                            }

                            if (match[1] === 'team-profile') {
                                return <TeamProfile content={code} />;
                            }

                            if (match[1] === 'live-code') {
                                const { data } = matter(code);
                                const { src, title } = data;
                                if (typeof src !== 'string' || !src) {
                                    return (
                                         <div className="my-6 p-4 border-l-4 rounded-r-lg bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200">
                                            <p className="font-bold">Missing Live Code Source</p>
                                            <p>The `src` attribute is required in the live-code block.</p>
                                        </div>
                                    );
                                }
                                return <LiveCodeEmbed src={src} title={title} />;
                            }

                            if (match[1] === 'feature-list') {
                                return <FeatureList content={code} />;
                            }
                            
                            if (match[1] === 'comparison-table') {
                                return <ComparisonTable content={code} />;
                            }

                            if (match[1] === 'charts') {
                                return <Charts content={code} />;
                            }

                            if (match[1] === 'scrollytelling') {
                                return <Scrollytelling content={code} />;
                            }
                            
                            if (match[1] === 'tutorial-slider') {
                                return <TutorialSlider content={code} />;
                            }

                            if (match[1] === 'stat-cards') {
                                return <StatCards content={code} />;
                            }

                            if (match[1] === 'rest-client') {
                                return <RestClient content={code} />;
                            }

                            if (match[1] === 'animate') {
                                const { data, content: animateContent } = matter(code);
                                return (
                                    <Animate
                                        animation={data.animation || 'fadeIn'}
                                        duration={data.duration}
                                        delay={data.delay}
                                        iteration={data.iteration}
                                    >
                                        <NestedMarkdown content={animateContent} />
                                    </Animate>
                                );
                            }
                            
                            if (match[1] === 'grid') {
                                const { data, content: gridContent } = matter(code);
                                const { columns = 2 } = data;
                                const items = gridContent.split(/\n---\r?\n/).filter(part => part.trim() !== '');
                                return (
                                    <Grid columns={columns}>
                                        {items.map((itemContent, index) => (
                                            <div key={index}>
                                                <NestedMarkdown content={itemContent} />
                                            </div>
                                        ))}
                                    </Grid>
                                );
                            }

                            // For other languages, use the enhanced CodeBlock component.
                            return <CodeBlock node={node} className={className} {...props}>{children}</CodeBlock>;
                        }
                        
                        // For inline code, use the simple InlineCode component.
                        return <InlineCode {...props}>{children}</InlineCode>;
                    },
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-500 dark:text-gray-400 my-4" {...props} />,
                    table: ({node, ...props}) => <div className="overflow-x-auto my-6"><table className="w-full text-left border-collapse" {...props} /></div>,
                    thead: ({node, ...props}) => <thead className="bg-gray-100 dark:bg-gray-800" {...props} />,
                    tbody: ({node, ...props}) => <tbody className="divide-y divide-gray-200 dark:divide-gray-700" {...props} />,
                    tr: ({node, ...props}) => <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800" {...props} />,
                    th: ({node, ...props}) => <th className="p-3 font-semibold text-sm text-gray-800 dark:text-gray-200 uppercase" {...props} />,
                    td: ({node, ...props}) => <td className="p-3 text-gray-700 dark:text-gray-300" {...props} />,
                    // FIX: Use the MarkdownImage component to safely handle image sources that might be a Blob.
                    img: ({node, ...props}) => <MarkdownImage src={props.src} alt={props.alt} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
}));
MarkdownPage.displayName = "MarkdownPage";

export default MarkdownPage;