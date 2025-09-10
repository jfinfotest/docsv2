import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import SecondaryNav from './components/SecondaryNav';
import Sidebar from './components/Sidebar';
import DynamicMarkdownPage from './components/DynamicMarkdownPage';
import ErrorBoundary from './components/ErrorBoundary';
import SettingsDrawer from './components/SettingsDrawer';
import { ScrollContext } from './context/ScrollContext';
import { useNav } from './context/NavContext'; // Importar useNav para acceder a la configuración de navegación
import Footer from './components/Footer';
import AnnouncementBanner from './components/AnnouncementBanner';
import { MAINTENANCE_MODE_CONFIG } from './constants';
import MaintenancePage from './components/MaintenancePage';
import AboutModal from './components/AboutModal';

// Este componente extrae la ruta de la URL y renderiza la página de markdown.
// Usar un componente aquí nos permite pasar una `key` única a DynamicMarkdownPage,
// forzándolo a remontarse y volver a buscar datos cuando la ruta cambia.
const DynamicPageLoader: React.FC = () => {
    const location = useLocation();
    const { secondaryNavLinks, flatNavLinks, loading } = useNav();

    // Memoiza un conjunto de todas las rutas de carpetas conocidas de la estructura de navegación.
    // Esto es más fiable que simplemente comprobar los enlaces de navegación secundaria.
    const allFolderPaths = useMemo(() => {
        if (loading) {
            return new Set<string>();
        }
        const paths = new Set<string>();
        // Añadir secciones de nivel superior de la navegación secundaria
        secondaryNavLinks.forEach(link => {
            if (link.path !== '/') {
                paths.add(link.path);
            }
        });
        // Añadir todas las rutas padre de los enlaces de archivos individuales
        flatNavLinks.forEach(link => {
            const pathParts = link.path.split('/');
            // Para una ruta como "a/b/c.md", las carpetas son "/a" y "/a/b"
            for (let i = 1; i < pathParts.length; i++) {
                const folderPath = '/' + pathParts.slice(0, i).join('/');
                paths.add(folderPath);
            }
        });
        return paths;
    }, [loading, secondaryNavLinks, flatNavLinks]);


    // useMemo para calcular la ruta del archivo a buscar.
    // Esto asegura que solo recalculamos cuando cambia la ubicación o cuando se carga la navegación.
    const filePath = useMemo(() => {
        if (loading) {
            return null;
        }

        let path = location.pathname.substring(1).replace(/\/$/, '');
        
        const currentPath = location.pathname.length > 1 ? location.pathname.replace(/\/$/, '') : '/';

        if (path === '' || path === 'index') {
            path = 'index.md';
        } else if (allFolderPaths.has(currentPath)) {
            // Si la ruta URL actual coincide con una carpeta conocida, cargar su archivo de índice.
            path = path ? `${path}/index.md` : 'index.md';
        } else if (!path.endsWith('.md')) {
            path = `${path}.md`;
        }
        
        return path;

    }, [location.pathname, allFolderPaths, loading]);
    
    // Mientras la navegación se está cargando, filePath será nulo. No renderizar nada.
    if (!filePath) {
        return null;
    }
    
    // Pasar la ruta del archivo calculada a DynamicMarkdownPage.
    // La 'key' asegura que el componente se remonte si la ruta del archivo cambia.
    return <DynamicMarkdownPage key={filePath} path={filePath} />;
};

const App: React.FC = () => {
    if (MAINTENANCE_MODE_CONFIG.enabled) {
        return <MaintenancePage />;
    }

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isSettingsOpen, setSettingsOpen] = useState(false);
    const [isAboutModalOpen, setAboutModalOpen] = useState(false);
    const location = useLocation();
    const mainScrollRef = useRef<HTMLDivElement>(null);

    // Cierra el sidebar en el cambio de ruta en móviles
    useEffect(() => {
        setSidebarOpen(false);
    }, [location]);
    
    const isHomePage = location.pathname === '/';

    return (
        <ScrollContext.Provider value={{ scrollableContainerRef: mainScrollRef }}>
            <div className="flex h-screen flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                <AnnouncementBanner />
                <Header 
                    onMenuClick={() => setSidebarOpen(!isSidebarOpen)}
                    onSettingsClick={() => setSettingsOpen(!isSettingsOpen)}
                    onAboutClick={() => setAboutModalOpen(true)}
                    showMenuButton={!isHomePage}
                />
                <SecondaryNav />
                <div className="flex flex-1 overflow-hidden">
                    {!isHomePage && <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />}

                    <div ref={mainScrollRef} className="flex-1 overflow-y-auto pb-16">
                        <main className="flex-grow">
                            <div className="container mx-auto px-6 py-8">
                                <ErrorBoundary key={location.pathname}>
                                    <Routes>
                                        <Route path="/*" element={<DynamicPageLoader />} />
                                    </Routes>
                                </ErrorBoundary>
                            </div>
                        </main>
                    </div>
                </div>
                <Footer />
                <SettingsDrawer isOpen={isSettingsOpen} setIsOpen={setSettingsOpen} />
                <AboutModal isOpen={isAboutModalOpen} onClose={() => setAboutModalOpen(false)} />
            </div>
        </ScrollContext.Provider>
    );
};

export default App;