import React, { useState, useMemo } from 'react';
import matter from 'gray-matter';
import { PaperAirplaneIcon } from './Icons';
import CodeBlock from './CodeBlock';
import { useI18n } from '../context/I18nContext';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RestClientProps {
    content: string;
}

interface ApiResponse {
    status: number;
    statusText: string;
    headers: { [key: string]: string };
    body: any;
    size: number;
    time: number;
}

const getStatusColorClasses = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-500';
    if (status >= 400 && status < 500) return 'text-yellow-500';
    if (status >= 500) return 'text-red-500';
    return 'text-gray-500';
};

const RestClient: React.FC<RestClientProps> = ({ content }) => {
    const { t } = useI18n();
    const initialConfig = useMemo(() => {
        try {
            const { data } = matter(content);
            return {
                method: (data.method || 'GET').toUpperCase() as Method,
                url: data.url || '',
                headers: data.headers || {},
                body: data.body || '',
            };
        } catch (e) {
            console.error("Error parsing RestClient YAML:", e);
            return { method: 'GET' as Method, url: '', headers: {}, body: '' };
        }
    }, [content]);

    const [method, setMethod] = useState<Method>(initialConfig.method);
    const [url, setUrl] = useState(initialConfig.url);
    const [headers, setHeaders] = useState(JSON.stringify(initialConfig.headers, null, 2));
    const [body, setBody] = useState(typeof initialConfig.body === 'object' ? JSON.stringify(initialConfig.body, null, 2) : initialConfig.body);
    const [requestTab, setRequestTab] = useState<'headers' | 'body'>('body');
    const [responseTab, setResponseTab] = useState<'body' | 'headers'>('body');
    
    const [response, setResponse] = useState<ApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSendRequest = async () => {
        setIsLoading(true);
        setResponse(null);
        setError(null);

        let parsedHeaders: HeadersInit = {};
        try {
            parsedHeaders = headers ? JSON.parse(headers) : {};
        } catch (e) {
            setError(t('restClientInvalidHeaders'));
            setIsLoading(false);
            return;
        }

        const requestOptions: RequestInit = {
            method,
            headers: parsedHeaders,
        };

        if (method !== 'GET' && body) {
            requestOptions.body = body;
        }

        const startTime = Date.now();
        try {
            const res = await fetch(url, requestOptions);
            const endTime = Date.now();
            
            const resHeaders: { [key: string]: string } = {};
            res.headers.forEach((value, key) => { resHeaders[key] = value; });
            
            const resText = await res.text();
            const resSize = new Blob([resText]).size;
            let resBody: any;
            try {
                resBody = JSON.parse(resText);
            } catch {
                resBody = resText;
            }

            setResponse({
                status: res.status,
                statusText: res.statusText,
                headers: resHeaders,
                body: resBody,
                size: resSize,
                time: endTime - startTime,
            });

        } catch (e) {
            setError(e instanceof Error ? e.message : t('restClientUnknownError'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="my-8 text-sm bg-white dark:bg-gray-800/50 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Request Section */}
            <div className="p-4 space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                    <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value as Method)}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 outline-none sm:w-32"
                    >
                        {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://api.example.com/resource"
                        className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 outline-none font-mono"
                    />
                    <button 
                        onClick={handleSendRequest}
                        disabled={isLoading}
                        className="inline-flex items-center justify-center px-4 py-2 font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-md disabled:bg-primary-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                             <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        ) : (
                            <>
                                <PaperAirplaneIcon className="w-5 h-5" />
                                <span className="ml-2">{t('send')}</span>
                            </>
                        )}
                    </button>
                </div>
                <div>
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                            <button onClick={() => setRequestTab('body')} className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${requestTab === 'body' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{t('body')}</button>
                            <button onClick={() => setRequestTab('headers')} className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${requestTab === 'headers' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{t('headers')}</button>
                        </nav>
                    </div>
                    <div className="pt-4">
                        {requestTab === 'body' && (
                            <textarea value={body} onChange={(e) => setBody(e.target.value)} className="w-full h-32 font-mono text-xs p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 outline-none" placeholder={t('requestBodyPlaceholder')} />
                        )}
                        {requestTab === 'headers' && (
                             <textarea value={headers} onChange={(e) => setHeaders(e.target.value)} className="w-full h-32 font-mono text-xs p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 outline-none" placeholder={t('headersPlaceholder')} />
                        )}
                    </div>
                </div>
            </div>

            {/* Response Section */}
            {error && <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-200">{error}</div>}
            {response && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center space-x-4 text-sm mb-3">
                        <span>{t('status')}: <span className={`font-bold ${getStatusColorClasses(response.status)}`}>{response.status} {response.statusText}</span></span>
                        <span>{t('time')}: <span className="font-bold">{response.time}ms</span></span>
                        <span>{t('size')}: <span className="font-bold">{(response.size / 1024).toFixed(2)} KB</span></span>
                    </div>
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                            <button onClick={() => setResponseTab('body')} className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${responseTab === 'body' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{t('body')}</button>
                            <button onClick={() => setResponseTab('headers')} className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${responseTab === 'headers' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{t('headers')}</button>
                        </nav>
                    </div>
                    <div className="pt-2">
                        {responseTab === 'body' && (
                             <CodeBlock className="language-json" node={{ children: [{ type: 'text', value: JSON.stringify(response.body, null, 2) }] }}>
                                {JSON.stringify(response.body, null, 2)}
                            </CodeBlock>
                        )}
                        {responseTab === 'headers' && (
                            <pre className="text-xs bg-white dark:bg-gray-900/50 p-4 rounded-b-md overflow-x-auto"><code>{JSON.stringify(response.headers, null, 2)}</code></pre>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RestClient;
