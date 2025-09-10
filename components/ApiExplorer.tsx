import React, { useState, useEffect } from 'react';
import { PaperAirplaneIcon, CopyIcon, CheckIcon, ChevronDownIcon } from './Icons';

// --- Type Definitions ---
interface ApiSchema {
    type: 'string' | 'integer' | 'number' | 'boolean' | 'object' | 'array';
    example?: any;
    properties?: { [key: string]: ApiSchema };
}

interface ApiParameter {
    name: string;
    in: 'path' | 'query' | 'header';
    description: string;
    required?: boolean;
    schema: ApiSchema;
}

interface ApiRequestBody {
    description?: string;
    required?: boolean;
    content: {
        [mimeType: string]: {
            schema: ApiSchema;
        };
    };
}

interface ApiEndpoint {
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    title: string;
    description: string;
    parameters?: ApiParameter[];
    requestBody?: ApiRequestBody;
}

interface ApiExplorerProps {
    baseUrl: string;
    endpoints: ApiEndpoint[];
}

interface ApiResponse {
    status: number;
    statusText: string;
    headers: { [key: string]: string };
    body: any;
    size: number;
    time: number;
}

// --- Helper Functions ---
const getMethodColorClasses = (method: ApiEndpoint['method']) => {
    switch (method.toUpperCase()) {
        case 'GET': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case 'POST': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        case 'PUT': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        case 'PATCH': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
        case 'DELETE': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
};

const getStatusColorClasses = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-500';
    if (status >= 400 && status < 500) return 'text-yellow-500';
    if (status >= 500) return 'text-red-500';
    return 'text-gray-500';
};

const generateExampleBody = (schema?: ApiSchema): string => {
    if (!schema || schema.type !== 'object' || !schema.properties) {
        return '';
    }
    const exampleObj: { [key: string]: any } = {};
    for (const key in schema.properties) {
        exampleObj[key] = schema.properties[key].example || '';
    }
    return JSON.stringify(exampleObj, null, 2);
};

// --- Sub-components ---
const ParameterInput: React.FC<{ param: ApiParameter; value: string; onChange: (value: string) => void; }> = ({ param, value, onChange }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center mb-3">
            <div className="font-mono text-sm">
                {param.name}
                {param.required && <span className="text-red-500 ml-1">*</span>}
                <span className="block text-xs text-gray-500">{param.schema.type} ({param.in})</span>
            </div>
            <div className="md:col-span-2">
                <input
                    type={param.schema.type === 'integer' || param.schema.type === 'number' ? 'number' : 'text'}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={param.description}
                    className="w-full text-sm px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 outline-none"
                />
            </div>
        </div>
    );
};

const ResponseDisplay: React.FC<{ response: ApiResponse | null }> = ({ response }) => {
    const [isCopied, setIsCopied] = useState(false);

    if (!response) return null;

    const handleCopy = () => {
        const bodyText = typeof response.body === 'string' ? response.body : JSON.stringify(response.body, null, 2);
        navigator.clipboard.writeText(bodyText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const formattedBody = typeof response.body === 'object' ? JSON.stringify(response.body, null, 2) : String(response.body);

    return (
        <div className="mt-6">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Respuesta</h4>
            <div className="flex items-center space-x-4 text-sm mb-3">
                <span>Estado: <span className={`font-bold ${getStatusColorClasses(response.status)}`}>{response.status} {response.statusText}</span></span>
                <span>Tiempo: <span className="font-bold">{response.time}ms</span></span>
                <span>Tamaño: <span className="font-bold">{(response.size / 1024).toFixed(2)} KB</span></span>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-xs font-semibold uppercase">Cuerpo</span>
                    <button onClick={handleCopy} className="text-gray-500 hover:text-gray-800 dark:hover:text-white p-1 rounded-md">
                        {isCopied ? <CheckIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
                    </button>
                </div>
                <pre className="p-4 text-xs bg-white dark:bg-gray-900/50 overflow-x-auto"><code>{formattedBody}</code></pre>
            </div>
        </div>
    );
};

const Endpoint: React.FC<{ endpoint: ApiEndpoint; baseUrl: string; }> = ({ endpoint, baseUrl }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTryItOut, setTryItOut] = useState(false);
    const [paramValues, setParamValues] = useState<{ [key: string]: string }>({});
    const [bodyValue, setBodyValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        if (isTryItOut) {
            const initialParams: { [key: string]: string } = {};
            endpoint.parameters?.forEach(p => {
                initialParams[p.name] = String(p.schema.example || '');
            });
            setParamValues(initialParams);
            setBodyValue(generateExampleBody(endpoint.requestBody?.content['application/json']?.schema));
        }
    }, [isTryItOut, endpoint]);

    const handleParamChange = (name: string, value: string) => {
        setParamValues(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSendRequest = async () => {
        setIsLoading(true);
        setResponse(null);
        setError(null);

        let url = `${baseUrl}${endpoint.path}`;
        const queryParams = new URLSearchParams();
        const headers = new Headers({ 'Content-Type': 'application/json' });

        endpoint.parameters?.forEach(p => {
            const value = paramValues[p.name];
            if (!value && p.required) {
                setError(`El parámetro "${p.name}" es obligatorio.`);
                setIsLoading(false);
                return;
            }
            if (value) {
                if (p.in === 'path') url = url.replace(`{${p.name}}`, encodeURIComponent(value));
                if (p.in === 'query') queryParams.append(p.name, value);
                if (p.in === 'header') headers.append(p.name, value);
            }
        });
        
        if (error) return; // Stop if there was a validation error

        const finalUrl = queryParams.toString() ? `${url}?${queryParams.toString()}` : url;
        
        const requestOptions: RequestInit = {
            method: endpoint.method,
            headers,
        };
        
        if (endpoint.method !== 'GET' && endpoint.requestBody && bodyValue) {
            try {
                JSON.parse(bodyValue); // Validate JSON
                requestOptions.body = bodyValue;
            } catch (e) {
                setError("JSON no válido en el cuerpo de la solicitud.");
                setIsLoading(false);
                return;
            }
        }
        
        const startTime = Date.now();
        try {
            const res = await fetch(finalUrl, requestOptions);
            const endTime = Date.now();
            
            const resHeaders: { [key: string]: string } = {};
            res.headers.forEach((value, key) => { resHeaders[key] = value; });
            
            let resBody: any;
            const contentType = res.headers.get('content-type');
            const resText = await res.text();
            const resSize = new Blob([resText]).size;
            
            if (contentType && contentType.includes('application/json')) {
                resBody = resText ? JSON.parse(resText) : null;
            } else {
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
            setError(e instanceof Error ? e.message : 'Ocurrió un error de red desconocido.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden my-4">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${getMethodColorClasses(endpoint.method)}`}>{endpoint.method}</span>
                <span className="ml-4 font-mono text-sm text-gray-800 dark:text-gray-200">{endpoint.path}</span>
                <span className="ml-4 text-sm text-gray-600 dark:text-gray-400 font-medium truncate hidden sm:block">{endpoint.title}</span>
                <ChevronDownIcon isRotated={isOpen} className="w-5 h-5 ml-auto flex-shrink-0" />
            </button>
            {isOpen && (
                <div className="p-6 bg-white dark:bg-gray-900/50">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{endpoint.description}</p>
                    
                    {!isTryItOut && <button onClick={() => setTryItOut(true)} className="px-4 py-2 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-md">Probar</button>}

                    {isTryItOut && (
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg mt-4">
                            {endpoint.parameters && endpoint.parameters.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Parámetros</h4>
                                    {endpoint.parameters.map(p => <ParameterInput key={p.name} param={p} value={paramValues[p.name] || ''} onChange={(v) => handleParamChange(p.name, v)} />)}
                                </div>
                            )}
                            {endpoint.requestBody && (
                                <div className="mb-4">
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Cuerpo de la Solicitud</h4>
                                    <textarea value={bodyValue} onChange={(e) => setBodyValue(e.target.value)} className="w-full h-48 font-mono text-xs p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 outline-none" />
                                </div>
                            )}

                            <button onClick={handleSendRequest} disabled={isLoading} className="w-full flex items-center justify-center px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:bg-blue-400">
                                {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div> : <><PaperAirplaneIcon className="w-5 h-5" /><span className="ml-2">Enviar Solicitud</span></>}
                            </button>
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            <ResponseDisplay response={response} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// --- Main Component ---
const ApiExplorer: React.FC<ApiExplorerProps> = ({ baseUrl, endpoints }) => {
    if (!baseUrl || !endpoints) {
        return (
            <div className="my-6 p-4 border-l-4 rounded-r-lg bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200">
                <p className="font-bold">Error de Configuración</p>
                <p>Las propiedades `baseUrl` y `endpoints` son obligatorias para el Explorador de API.</p>
            </div>
        );
    }
    
    return (
        <div className="my-8">
            {endpoints.map((endpoint, index) => (
                <Endpoint key={index} endpoint={endpoint} baseUrl={baseUrl} />
            ))}
        </div>
    );
};

export default ApiExplorer;