import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
import Grid from './Grid';

// Helper function to reconstruct raw text from a HAST node tree.
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


/**
 * A component for rendering Markdown content that may be nested inside other
 * custom components. It supports most custom components like Admonitions,
 * Accordions, etc., to allow for rich, nested content.
 */
const NestedMarkdown: React.FC<{ content: string }> = ({ content }) => {
    return (
        <div className="text-sm max-w-none text-current [&_p:last_of_type]:mb-0">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    // FIX: Strip the outer <pre> tag for code blocks to prevent double containers.
                    pre: ({ children }) => <>{children}</>,
                    // Use simpler styling for nested elements
                    p: ({node, ...props}) => <p className="my-2" {...props} />,
                    a: ({node, ...props}) => <CustomLink {...props} className="text-current underline" />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-2" {...props} />,
                    li: ({node, ...props}) => <li className="mb-1" {...props} />,
                    img: ({node, ...props}) => <MarkdownImage src={props.src} alt={props.alt} />,
                    code: ({node, className, children, ...props}: any) => {
                        // FIX: Allow hyphens in language names to support components like `api-explorer`.
                        const match = /language-([\w-]+)/.exec(className || '');
                        
                        if (match) {
                            const code = getNodeText(node).replace(/\n$/, '');
                            
                            // Handle all supported custom components that can be nested
                            if (match[1] === 'mermaid') return <Mermaid chart={code} />;
                            if (match[1] === 'tabs') return <TabbedCodeBlock content={code} />;
                            if (match[1] === 'cta') return <CTA content={code} />;

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
                                
                                const itemParts = processedContent.split(/\n###\s+/).filter(Boolean);

                                const items = itemParts.map(part => {
                                    const [title, ...contentParts] = part.split(/\r?\n/);
                                    return { title: title.trim(), content: contentParts.join('\n').trim() };
                                });
                                return <Accordion allowMultiple={allowMultiple} items={items} />;
                            }

                            if (match[1] === 'timeline') {
                                const itemParts = code.split(/\n---\r?\n/).filter(part => part.trim() !== '');
                                const items = itemParts.map(part => {
                                    const lines = part.trim().split(/\r?\n/);
                                    const header = lines.shift() || '### |';
                                    const content = lines.join('\n').trim();
                                    const headerMatch = header.match(/^###\s+(.*?)\s*\|\s*(.*)/);
                                    if (headerMatch) {
                                        return { title: headerMatch[1].trim(), date: headerMatch[2].trim(), content };
                                    }
                                    return { title: 'Invalid format', date: '', content: part };
                                }).filter(item => item.title !== 'Invalid format');
                                return <Timeline items={items} />;
                            }
                            
                            if (match[1] === 'cards') {
                                const { data } = matter(code);
                                const { items = [], columns = 2 } = data;
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

                            // For standard code blocks, use the full-featured CodeBlock component
                            return <CodeBlock node={node} className={className} {...props}>{children}</CodeBlock>;
                        }
                        
                        // For inline code, use the styled InlineCode component
                        return <InlineCode {...props}>{children}</InlineCode>;
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default NestedMarkdown;