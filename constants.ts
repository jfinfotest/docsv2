// --- GENERAL APP CONFIGURATION ---
export const APP_CONFIG = {
    title: "FusionDoc",
    subtitle: "Next-Gen Documentation",
    icon: "/assets/logo.svg", // Path in the `/public` folder or a full URL
};

// --- DOCS SOURCE CONFIGURATION ---
export const DOCS_CONFIG = {
    // 'local': Read docs from the `/docs` folder in your project root.
    // 'github': Fetch docs from a GitHub repository.
    source: 'local', 
};

// --- GITHUB CONFIGURATION (only used if DOCS_CONFIG.source is 'github') ---
export const GITHUB_CONFIG = {
    owner: "your-github-username", // Your GitHub username
    repo: "your-repo-name",         // The name of your repository
    branch: "main",                 // The branch where your docs are
    docsPath: "docs",               // The folder in your repo where docs are stored
    token: process.env.REACT_APP_GITHUB_TOKEN || '', // Optional: A GitHub token for private repos or to increase rate limits.
};

// --- THEME & APPEARANCE ---
export const THEME_CONFIG = {
    defaultTheme: 'dark', // 'light' or 'dark'
    defaultAppTheme: 'blue', // Must match an ID from the `THEMES` array in `/src/themes.ts`
    defaultFont: 'Inter', // Must match an ID from the `FONTS` array below
};

export const FONTS = [
    { id: 'Inter', name: 'Inter' },
    { id: 'Roboto', name: 'Roboto' },
    { id: 'Source Sans Pro', name: 'Source Sans Pro' },
    { id: 'Lato', name: 'Lato' },
    { id: 'Montserrat', name: 'Montserrat' },
    { id: 'Poppins', name: 'Poppins' },
    { id: 'Open Sans', name: 'Open Sans' },
    { id: 'Nunito', name: 'Nunito' },
    { id: 'Roboto Mono', name: 'Roboto Mono' },
    { id: 'Merriweather', name: 'Merriweather' },
];

// --- PRISM CODE BLOCK THEMES ---
// For a full list of themes, see: https://github.com/PrismJS/prism-themes
export const PRISM_THEMES = [
    // --- Core Themes ---
    { id: 'prism-default', name: 'Default', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css' },
    { id: 'prism-coy', name: 'Coy', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-coy.min.css' },
    { id: 'prism-dark', name: 'Dark', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-dark.min.css' },
    { id: 'prism-funky', name: 'Funky', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-funky.min.css' },
    { id: 'prism-okaidia', name: 'Okaidia', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css' },
    { id: 'prism-solarized-light', name: 'Solarized Light', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-solarizedlight.min.css' },
    { id: 'prism-tomorrow', name: 'Tomorrow Night', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css' },
    { id: 'prism-twilight', name: 'Twilight', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-twilight.min.css' },
    
    // --- Prism-Themes Collection (https://github.com/PrismJS/prism-themes) ---
    { id: 'prism-a11y-dark', name: 'A11y Dark', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-a11y-dark.min.css' },
    { id: 'prism-atom-dark', name: 'Atom Dark', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-atom-dark.min.css' },
    { id: 'prism-base16-atelier-sulphurpool-light', name: 'Atelier Sulphurpool', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-base16-ateliersulferpool.light.min.css' },
    { id: 'prism-cb', name: 'CB (Code B)', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-cb.min.css' },
    { id: 'prism-coldark-cold', name: 'Coldark Cold', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-coldark-cold.min.css' },
    { id: 'prism-coldark-dark', name: 'Coldark Dark', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-coldark-dark.min.css' },
    { id: 'prism-darcula', name: 'Darcula', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-darcula.min.css' },
    { id: 'prism-dracula', name: 'Dracula', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-dracula.min.css' },
    { id: 'prism-duotone-dark', name: 'Duotone Dark', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-duotone-dark.min.css' },
    { id: 'prism-duotone-earth', name: 'Duotone Earth', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-duotone-earth.min.css' },
    { id: 'prism-duotone-forest', name: 'Duotone Forest', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-duotone-forest.min.css' },
    { id: 'prism-duotone-light', name: 'Duotone Light', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-duotone-light.min.css' },
    { id: 'prism-duotone-sea', name: 'Duotone Sea', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-duotone-sea.min.css' },
    { id: 'prism-duotone-space', name: 'Duotone Space', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-duotone-space.min.css' },
    { id: 'prism-ghcolors', name: 'GitHub', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-ghcolors.min.css' },
    { id: 'prism-gruvbox-dark', name: 'Gruvbox Dark', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-gruvbox-dark.min.css' },
    { id: 'prism-gruvbox-light', name: 'Gruvbox Light', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-gruvbox-light.min.css' },
    { id: 'prism-hopscotch', name: 'Hopscotch', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-hopscotch.min.css' },
    { id: 'prism-lucario', name: 'Lucario', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-lucario.min.css' },
    { id: 'prism-material-dark', name: 'Material Dark', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-material-dark.min.css' },
    { id: 'prism-material-light', name: 'Material Light', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-material-light.min.css' },
    { id: 'prism-material-oceanic', name: 'Material Oceanic', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-material-oceanic.min.css' },
    { id: 'prism-night-owl', name: 'Night Owl', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-night-owl.min.css' },
    { id: 'prism-nord', name: 'Nord', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-nord.min.css' },
    { id: 'prism-one-dark', name: 'One Dark', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-one-dark.min.css' },
    { id: 'prism-one-light', name: 'One Light', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-one-light.min.css' },
    { id: 'prism-pojoaque', name: 'Pojoaque', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-pojoaque.min.css' },
    { id: 'prism-shades-of-purple', name: 'Shades of Purple', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-shades-of-purple.min.css' },
    { id: 'prism-synthwave84', name: 'Synthwave \'84', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-synthwave84.min.css' },
    { id: 'prism-vs', name: 'VS', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-vs.min.css' },
    { id: 'prism-vsc-dark-plus', name: 'VSC Dark Plus', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-vsc-dark-plus.min.css' },
    { id: 'prism-xonokai', name: 'Xonokai', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-xonokai.min.css' },
    { id: 'prism-z-darks', name: 'Z-Darks', url: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-z-darks.min.css' },
];
export const DEFAULT_PRISM_THEME = 'prism-dracula';


// --- HEADER & NAVIGATION ---
export const HEADER_LINKS = [
    { icon: 'GitHub', label: 'GitHub', url: 'https://github.com/' },
    { icon: 'Twitter', label: 'Twitter', url: 'https://twitter.com/' },
    { icon: 'Discord', label: 'Discord', url: 'https://discord.com/' },
];

// --- FOOTER ---
export const FOOTER_CONFIG = {
    enabled: true,
    text: `Copyright © {year} ${APP_CONFIG.title}. All rights reserved.`,
};

// --- EDIT PAGE BUTTON ---
export const EDIT_PAGE_BUTTON_CONFIG = {
    enabled: true, // Only works when DOCS_CONFIG.source is 'github'
};

// --- ANNOUNCEMENT BANNER ---
export const ANNOUNCEMENT_BANNER_CONFIG = {
    enabled: false,
    id: "v1-release", // A unique ID for this banner. If you change it, users will see the banner again.
    content: "🎉 We've just launched our new feature! Check it out.",
    link: {
        href: "/features/new-feature", // Can be an internal or external link
        text: "Learn more",
    },
};


// --- SIDEBAR BUSINESS/COMPANY INFO ---
export const SIDEBAR_BUSINESS_INFO_CONFIG = {
    enabled: true,
    logo: '/assets/company-logo.svg', // Path in `/public` folder
    title: 'Powered by FusionDoc',
    link: 'https://github.com/cog-creators/fusion-doc',
    footerText: `© {year} Your Company Inc.` // `{year}` will be replaced with the current year
};


// --- INTERNATIONALIZATION (I18N) ---
export const I18N_CONFIG = {
    enabled: true,
    defaultLang: 'es',
    languages: [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
    ],
};

// --- VERSIONING ---
export const VERSION_CONFIG = {
    enabled: true,
    defaultVersion: 'v2.0',
    versions: ['v2.0', 'v1.0'],
};


// --- MAINTENANCE MODE ---
export const MAINTENANCE_MODE_CONFIG = {
    enabled: false,
    message: "We're currently performing scheduled maintenance. We'll be back online shortly. Thanks for your patience!",
};


// --- UI TEXT TRANSLATIONS ---
// This is used for static UI text. Content from markdown files is not translated here.
export const UI_TEXT = {
    en: {
        searchPlaceholder: "Search docs...",
        onThisPage: "On this page",
        editThisPage: "Edit this page",
        previousPage: "Previous",
        nextPage: "Next",
        sidebarNoItems: "No items in this section.",
        // Settings
        settingsTitle: "Settings",
        appTheme: "App Theme",
        font: "Font",
        codeTheme: "Code Block Theme",
        preview: "Preview",
        resetCodeTheme: "Reset Code Theme",
        geminiApiKey: "Gemini API Key",
        pasteApiKey: "Paste your API key here",
        keyStored: "Your key is stored only in your browser's local storage.",
        apiKeyActive: "API Key is active.",
        apiKeyNotSet: "API Key not set.",
        saveKey: "Save Key",
        keySaved: "Key Saved!",
        showKey: "Show Key",
        hideKey: "Hide Key",
        docsSource: "Docs Source",
        githubApiUsage: "GitHub API Usage",
        requestsUsed: (used: number, limit: number) => `${used} / ${limit} requests used`,
        resetsAt: (time: string) => `Resets at ${time}`,
        loadingApiUsage: "Loading API usage...",
        // Dark Mode Toggle
        toggleDarkMode: "Toggle dark mode",
        // Language & Version Dropdowns
        language: "Language",
        version: "Version",
        // Settings Drawer
        openSettings: "Open settings",
        // About Modal
        openAbout: "About this site",
        aboutTitle: "About",
        aboutCoreTechnologies: "Core Technologies",
        closeAbout: "Close about modal",
        aboutCreatedBy: "Created by the FusionDoc Team",
        // Search Results
        searchResults: (count: number) => `${count} results found`,
        indexingContent: "Indexing content...",
        noResultsFound: "No results found.",
        // Error Boundary
        errorTitle: "Something went wrong",
        errorMessage: "An unexpected error occurred. Please try refreshing the page.",
        errorDetails: "Error Details",
        // Content Loading
        contentFailedToLoad: "Content failed to load",
        contentDecodingError: "Failed to decode content from Base64.",
        contentNotAvailable: "This content is scheduled for future release and is not yet available.",
        localFileNotFound: (path: string, status: string) => `Could not fetch local file ${path}: ${status}`,
        githubFileNotFound: (path: string, message: string) => `Could not fetch ${path}: ${message}`,
        // Nav Errors
        manifestNotFound: (path: string) => `Could not find '${path}'. This file is required for local mode.`,
        manifestInvalid: "The 'file-manifest.json' is invalid. Expected an object with a 'files' property containing an array.",
        localFileLoadError: (path: string) => `Could not load local file: ${path}`,
        navBuildLocalError: (details: string) => `Failed to build navigation from local files. Details: ${details}`,
        githubApiError: (status: number, statusText: string) => `GitHub API error: ${status} - ${statusText}`,
        navBuildGithubError: (details: string) => `Failed to build navigation. Please check your GitHub config and repo structure. Details: ${details}`,
        // Gemini Features
        askAbout: (title: string) => `Ask about "${title}"`,
        thisDocument: 'this document',
        askAnything: "Ask me anything about this document!",
        allAnswersBasedOnText: "All answers are based solely on the provided text.",
        askAQuestion: "Ask a question...",
        sendMessage: "Send Message",
        clearChat: "Clear Chat",
        closeChat: "Close Chat",
        geminiInitError: "Failed to initialize Gemini. Please check your API key.",
        geminiError: (error: string) => `An error occurred with Gemini: ${error}`,
        noApiKey: "No Gemini API key set. Please add one in settings.",
        // Quiz Generator
        quizFor: (title: string) => `Quiz for: ${title}`,
        closeQuiz: "Close Quiz",
        testYourKnowledge: "Test Your Knowledge",
        quizDescription: "Let AI generate a quiz based on this document to test your comprehension.",
        generateQuiz: "Generate Quiz",
        generatingQuiz: "Generating quiz...",
        thisMayTakeAMoment: "This may take a moment...",
        questionOf: (current: number, total: number) => `Question ${current} of ${total}`,
        submitForGrading: "Submit for Grading",
        quizResults: "Quiz Results",
        youScored: (score: number, total: number) => `You scored ${score} out of ${total}`,
        scoreAverage: (avg: string) => `(${avg} / 5.0 avg.)`,
        noAnswerProvided: "No answer provided.",
        yourAnswer: "Your Answer:",
        idealAnswer: "Ideal Answer:",
        aiFeedback: "AI Feedback:",
        tryAgain: "Try Again",
        copyResults: "Copy Results",
        // Podcast Generator
        podcastFor: (title: string) => `Podcast for: ${title}`,
        closePodcast: "Close Podcast",
        podcastStyle: "Podcast Style",
        monologue: "Monologue",
        monologueDesc: "A single speaker narrates the topic.",
        dialogue: "Dialogue",
        dialogueDesc: "Two speakers discuss the topic.",
        podcastVoices: "Podcast Voices",
        monologueSpeakerName: "Speaker Name",
        dialogueSpeaker1Name: "Speaker 1 Name",
        dialogueSpeaker2Name: "Speaker 2 Name",
        voice: "Voice",
        speakerNameError: "Please enter a name for each speaker.",
        generatingScript: "Generating script...",
        generatingAudio: "Generating audio...",
        script: "Script",
        generatePodcast: "Generate Podcast",
        downloadAudio: "Download Audio",
        copyScript: "Copy Script",
        startOver: "Start Over",
        // Mermaid Component
        mermaidRendering: "Rendering diagram...",
        mermaidError: "Diagram Error",
        mermaidLibraryNotLoadedError: "Mermaid library is not loaded.",
        // Code Block
        shiftScrollToZoom: "(Shift + Scroll to Zoom)",
        // API Explorer
        response: "Response",
        status: "Status",
        time: "Time",
        size: "Size",
        body: "Body",
        tryItOut: "Try it out",
        parameters: "Parameters",
        requestBody: "Request Body",
        sendRequest: "Send Request",
        paramIsRequired: (name: string) => `Parameter "${name}" is required.`,
        invalidJsonInBody: "Invalid JSON in request body.",
        unknownNetworkError: "An unknown network error occurred.",
        configError: "Configuration Error",
        configErrorDetails: "The `baseUrl` and `endpoints` properties are required for the API Explorer.",
        // Cards
        learnMore: "Learn More",
        goToPage: "Go to page",
        // Component Errors
        ctaInvalidSyntax: "Invalid CTA Syntax",
        ctaInvalidSyntaxDetails: "Could not parse the Call to Action block. Please check the frontmatter syntax in your markdown file.",
        fileTreeError: "File Tree Error",
        fileTreeErrorDetails: "Could not parse the `file-tree` block content. Please check the syntax.",
        carouselError: "Carousel Error",
        carouselErrorDetails: "No images found. Please check the YAML syntax in your `carousel` block.",
        heroSectionInvalidSyntax: "Invalid Hero Section Syntax",
        heroSectionInvalidSyntaxDetails: "Could not parse content. Ensure the `title` is defined in the frontmatter.",
        teamProfileError: "Team Profile Error",
        teamProfileErrorDetails: "No members found. Please check the YAML syntax in your `team-profile` block.",
        liveCodeEmbedInvalidUrl: "Invalid Embed URL",
        liveCodeEmbedInvalidUrlDetails: "Could not generate embed for the provided URL or the service is not supported. Supported services: CodePen, JSFiddle, CodeSandbox.",
        featureListError: "Feature List Error",
        featureListErrorDetails: "No features found. Check the YAML syntax in your `feature-list` block.",
        comparisonTableError: "Comparison Table Error",
        comparisonTableErrorDetails: "Ensure `headers` and `rows` are correctly defined in your YAML block.",
        chartConfigError: "Chart Configuration Error",
        chartConfigErrorDetails: "Could not parse the YAML content. Please check the syntax.",
        scrollytellingError: "Scrollytelling Error",
        scrollytellingErrorDetails: "No steps found. Check the YAML syntax in your `scrollytelling` block.",
        tutorialSliderError: "Tutorial Slider Error",
        tutorialSliderErrorDetails: "No steps found. Check the YAML syntax in your `tutorial-slider` block.",
        statCardsError: "Stat Cards Error",
        statCardsErrorDetails: "No items found. Check the YAML syntax in your `stat-cards` block.",
        quizError: "Invalid Quiz Syntax",
        quizErrorDetails: "Could not find valid questions. Please check the YAML syntax in your `quiz` block.",
        stepsError: "Invalid Steps Syntax",
        stepsErrorDetails: "Could not parse the Steps block. Each step must start with `### Step Title`.",
        videoEmbedError: "Invalid Video URL",
        videoEmbedErrorDetails: (src: string) => `Could not generate embed for the provided URL: ${src}`,
        // Other Interactive
        scrollToBegin: "Scroll to begin tutorial",
        stepOf: (current: number, total: number) => `Step ${current} of ${total}`,
        previous: "Previous",
        next: "Next",
        restart: "Restart",
        send: "Send",
        headers: "Headers",
        requestBodyPlaceholder: "Request body (e.g., JSON)",
        headersPlaceholder: '{\n  "Content-Type": "application/json"\n}',
        maintenanceInProgress: "Maintenance In Progress",
        thankYouForPatience: "Thank you for your patience.",
        dismissAnnouncement: "Dismiss announcement",
        photoOf: (name: string) => `Photo of ${name}`,
        previousImage: "Previous image",
        nextImage: "Next image",
        goToImage: (index: number) => `Go to image ${index}`,
        viewImageFullscreen: (alt: string) => `View image in fullscreen: ${alt}`,
        // Code Analyzer
        codeAnalyzerTitle: "AI Code Analyzer",
        selectCodeBlock: "1. Select a code block",
        chooseAction: "2. Choose an action",
        explainCode: "Explain Code",
        translateCode: "Translate Code",
        translateTo: "Translate to:",
        analyze: "Analyze",
        backToSelection: "← Back to selection",
        originalCode: (lang: string) => `Original Code (${lang})`,
        aiExplanation: "AI Explanation",
        translationTo: (lang: string) => `Translation to ${lang}`,
        noCodeBlocksFound: "No Code Blocks Found",
        noCodeBlocksFoundDetails: "This page does not contain any code snippets to analyze.",
        codeAnalysisError: (err: string) => `Error analyzing code. ${err}`,
        codeAnalysisFailed: "Code analysis failed",
        closeAnalyzer: "Close analyzer",
        resetAnalyzer: "Reset analyzer",
    },
    es: {
        searchPlaceholder: "Buscar en la documentación...",
        onThisPage: "En esta página",
        editThisPage: "Editar esta página",
        previousPage: "Anterior",
        nextPage: "Siguiente",
        sidebarNoItems: "No hay elementos en esta sección.",
        // Settings
        settingsTitle: "Configuración",
        appTheme: "Tema de la Aplicación",
        font: "Fuente",
        codeTheme: "Tema del Bloque de Código",
        preview: "Vista Previa",
        resetCodeTheme: "Restablecer Tema del Código",
        geminiApiKey: "Clave de API de Gemini",
        pasteApiKey: "Pega tu clave de API aquí",
        keyStored: "Tu clave se almacena únicamente en el almacenamiento local de tu navegador.",
        apiKeyActive: "La clave de API está activa.",
        apiKeyNotSet: "Clave de API no establecida.",
        saveKey: "Guardar Clave",
        keySaved: "¡Clave Guardada!",
        showKey: "Mostrar Clave",
        hideKey: "Ocultar Clave",
        docsSource: "Fuente de Documentos",
        githubApiUsage: "Uso de la API de GitHub",
        requestsUsed: (used: number, limit: number) => `${used} / ${limit} solicitudes usadas`,
        resetsAt: (time: string) => `Se reinicia a las ${time}`,
        loadingApiUsage: "Cargando uso de la API...",
        // Dark Mode Toggle
        toggleDarkMode: "Alternar modo oscuro",
        // Language & Version Dropdowns
        language: "Idioma",
        version: "Versión",
        // Settings Drawer
        openSettings: "Abrir configuración",
        // About Modal
        openAbout: "Acerca de este sitio",
        aboutTitle: "Acerca de",
        aboutCoreTechnologies: "Tecnologías Principales",
        closeAbout: "Cerrar 'Acerca de'",
        aboutCreatedBy: "Creado por el equipo de FusionDoc",
        // Search Results
        searchResults: (count: number) => `${count} resultados encontrados`,
        indexingContent: "Indexando contenido...",
        noResultsFound: "No se encontraron resultados.",
        // Error Boundary
        errorTitle: "Algo salió mal",
        errorMessage: "Ocurrió un error inesperado. Por favor, intenta refrescar la página.",
        errorDetails: "Detalles del Error",
        // Content Loading
        contentFailedToLoad: "Falló la carga del contenido",
        contentDecodingError: "Falló la decodificación del contenido desde Base64.",
        contentNotAvailable: "Este contenido está programado para un futuro lanzamiento y aún no está disponible.",
        localFileNotFound: (path: string, status: string) => `No se pudo obtener el archivo local ${path}: ${status}`,
        githubFileNotFound: (path: string, message: string) => `No se pudo obtener ${path}: ${message}`,
        // Nav Errors
        manifestNotFound: (path: string) => `No se pudo encontrar '${path}'. Este archivo es necesario para el modo local.`,
        manifestInvalid: "El 'file-manifest.json' es inválido. Se esperaba un objeto con una propiedad 'files' que contenga un array.",
        localFileLoadError: (path: string) => `No se pudo cargar el archivo local: ${path}`,
        navBuildLocalError: (details: string) => `Falló al construir la navegación desde los archivos locales. Detalles: ${details}`,
        githubApiError: (status: number, statusText: string) => `Error de la API de GitHub: ${status} - ${statusText}`,
        navBuildGithubError: (details: string) => `Falló al construir la navegación. Por favor, revisa tu configuración de GitHub y la estructura del repositorio. Detalles: ${details}`,
        // Gemini Features
        askAbout: (title: string) => `Preguntar sobre "${title}"`,
        thisDocument: 'este documento',
        askAnything: "¡Pregúntame lo que sea sobre este documento!",
        allAnswersBasedOnText: "Todas las respuestas se basan únicamente en el texto proporcionado.",
        askAQuestion: "Haz una pregunta...",
        sendMessage: "Enviar Mensaje",
        clearChat: "Limpiar Chat",
        closeChat: "Cerrar Chat",
        geminiInitError: "Falló la inicialización de Gemini. Por favor, revisa tu clave de API.",
        geminiError: (error: string) => `Ocurrió un error con Gemini: ${error}`,
        noApiKey: "No se ha establecido una clave de API de Gemini. Por favor, añádela en la configuración.",
        // Quiz Generator
        quizFor: (title: string) => `Cuestionario para: ${title}`,
        closeQuiz: "Cerrar Cuestionario",
        testYourKnowledge: "Pon a Prueba tu Conocimiento",
        quizDescription: "Deja que la IA genere un cuestionario basado en este documento para probar tu comprensión.",
        generateQuiz: "Generar Cuestionario",
        generatingQuiz: "Generando cuestionario...",
        thisMayTakeAMoment: "Esto puede tardar un momento...",
        questionOf: (current: number, total: number) => `Pregunta ${current} de ${total}`,
        submitForGrading: "Enviar para Calificar",
        quizResults: "Resultados del Cuestionario",
        youScored: (score: number, total: number) => `Obtuviste ${score} de ${total}`,
        scoreAverage: (avg: string) => `(${avg} / 5.0 prom.)`,
        noAnswerProvided: "No se proporcionó respuesta.",
        yourAnswer: "Tu Respuesta:",
        idealAnswer: "Respuesta Ideal:",
        aiFeedback: "Comentarios de la IA:",
        tryAgain: "Intentar de Nuevo",
        copyResults: "Copiar Resultados",
        // Podcast Generator
        podcastFor: (title: string) => `Podcast para: ${title}`,
        closePodcast: "Cerrar Podcast",
        podcastStyle: "Estilo del Podcast",
        monologue: "Monólogo",
        monologueDesc: "Un solo narrador explica el tema.",
        dialogue: "Diálogo",
        dialogueDesc: "Dos locutores discuten el tema.",
        podcastVoices: "Voces del Podcast",
        monologueSpeakerName: "Nombre del Locutor",
        dialogueSpeaker1Name: "Nombre del Locutor 1",
        dialogueSpeaker2Name: "Nombre del Locutor 2",
        voice: "Voz",
        speakerNameError: "Por favor, introduce un nombre para cada locutor.",
        generatingScript: "Generando guion...",
        generatingAudio: "Generando audio...",
        script: "Guion",
        generatePodcast: "Generar Podcast",
        downloadAudio: "Descargar Audio",
        copyScript: "Copiar Guion",
        startOver: "Empezar de Nuevo",
        // Mermaid Component
        mermaidRendering: "Renderizando diagrama...",
        mermaidError: "Error en el Diagrama",
        mermaidLibraryNotLoadedError: "La librería Mermaid no está cargada.",
        // Code Block
        shiftScrollToZoom: "(Shift + Scroll para Zoom)",
        // API Explorer
        response: "Respuesta",
        status: "Estado",
        time: "Tiempo",
        size: "Tamaño",
        body: "Cuerpo",
        tryItOut: "Probar",
        parameters: "Parámetros",
        requestBody: "Cuerpo de la Solicitud",
        sendRequest: "Enviar Solicitud",
        paramIsRequired: (name: string) => `El parámetro "${name}" es obligatorio.`,
        invalidJsonInBody: "JSON no válido en el cuerpo de la solicitud.",
        unknownNetworkError: "Ocurrió un error de red desconocido.",
        configError: "Error de Configuración",
        configErrorDetails: "Las propiedades `baseUrl` y `endpoints` son obligatorias para el Explorador de API.",
        // Cards
        learnMore: "Saber más",
        goToPage: "Ir a la página",
        // Component Errors
        ctaInvalidSyntax: "Sintaxis de CTA Inválida",
        ctaInvalidSyntaxDetails: "No se pudo analizar el contenido del bloque de Llamada a la Acción. Por favor, revisa la sintaxis del frontmatter en tu archivo markdown.",
        fileTreeError: "Error en el Árbol de Archivos",
        fileTreeErrorDetails: "No se pudo analizar el contenido del bloque `file-tree`. Por favor, revisa la sintaxis.",
        carouselError: "Error en el Carrusel",
        carouselErrorDetails: "No se encontraron imágenes. Por favor, revisa la sintaxis YAML en tu bloque `carousel`.",
        heroSectionInvalidSyntax: "Sintaxis de HeroSection Inválida",
        heroSectionInvalidSyntaxDetails: "No se pudo analizar el contenido. Asegúrate de que el `title` esté definido en el frontmatter.",
        teamProfileError: "Error en el Perfil de Equipo",
        teamProfileErrorDetails: "No se encontraron miembros. Por favor, revisa la sintaxis YAML en tu bloque `team-profile`.",
        liveCodeEmbedInvalidUrl: "URL de Embed Inválida",
        liveCodeEmbedInvalidUrlDetails: "No se pudo generar la inserción para la URL proporcionada o el servicio no es compatible. Servicios compatibles: CodePen, JSFiddle, CodeSandbox.",
        featureListError: "Error en la Lista de Características",
        featureListErrorDetails: "No se encontraron características. Revisa la sintaxis YAML en tu bloque `feature-list`.",
        comparisonTableError: "Error en la Tabla Comparativa",
        comparisonTableErrorDetails: "Asegúrate de que `headers` y `rows` estén definidos correctamente en tu bloque YAML.",
        chartConfigError: "Error en la Configuración del Gráfico",
        chartConfigErrorDetails: "No se pudo analizar el contenido YAML. Por favor, revisa la sintaxis.",
        scrollytellingError: "Error en Scrollytelling",
        scrollytellingErrorDetails: "No se encontraron pasos. Revisa la sintaxis YAML en tu bloque `scrollytelling`.",
        tutorialSliderError: "Error en el Tutorial Slider",
        tutorialSliderErrorDetails: "No se encontraron pasos. Revisa la sintaxis YAML en tu bloque `tutorial-slider`.",
        statCardsError: "Error en Tarjetas de Estadísticas",
        statCardsErrorDetails: "No se encontraron items. Revisa la sintaxis YAML en tu bloque `stat-cards`.",
        quizError: "Sintaxis de Cuestionario Inválida",
        quizErrorDetails: "No se pudieron encontrar preguntas válidas. Por favor, revisa la sintaxis YAML en tu bloque `quiz`.",
        stepsError: "Sintaxis de Pasos Inválida",
        stepsErrorDetails: "No se pudo analizar el contenido del bloque de Pasos. Cada paso debe comenzar con `### Título del Paso`.",
        videoEmbedError: "URL de Video Inválida",
        videoEmbedErrorDetails: (src: string) => `No se pudo generar la inserción para la URL proporcionada: ${src}`,
        // Other Interactive
        scrollToBegin: "Desplázate para comenzar el tutorial",
        stepOf: (current: number, total: number) => `Paso ${current} de ${total}`,
        previous: "Anterior",
        next: "Siguiente",
        restart: "Reiniciar",
        send: "Enviar",
        headers: "Cabeceras",
        requestBodyPlaceholder: "Cuerpo de la solicitud (ej. JSON)",
        headersPlaceholder: '{\n  "Content-Type": "application/json"\n}',
        maintenanceInProgress: "Mantenimiento en Progreso",
        thankYouForPatience: "Gracias por tu paciencia.",
        dismissAnnouncement: "Descartar anuncio",
        photoOf: (name: string) => `Foto de ${name}`,
        previousImage: "Imagen anterior",
        nextImage: "Siguiente imagen",
        goToImage: (index: number) => `Ir a la imagen ${index}`,
        viewImageFullscreen: (alt: string) => `Ver imagen en pantalla completa: ${alt}`,
        // Code Analyzer
        codeAnalyzerTitle: "Analizador de Código con IA",
        selectCodeBlock: "1. Selecciona un bloque de código",
        chooseAction: "2. Elige una acción",
        explainCode: "Explicar Código",
        translateCode: "Traducir Código",
        translateTo: "Traducir a:",
        analyze: "Analizar",
        backToSelection: "← Volver a la selección",
        originalCode: (lang: string) => `Código Original (${lang})`,
        aiExplanation: "Explicación de la IA",
        translationTo: (lang: string) => `Traducción a ${lang}`,
        noCodeBlocksFound: "No se encontraron bloques de código",
        noCodeBlocksFoundDetails: "Esta página no contiene ningún fragmento de código para analizar.",
        codeAnalysisError: (err: string) => `Error al analizar el código. ${err}`,
        codeAnalysisFailed: "Falló el análisis del código",
        closeAnalyzer: "Cerrar analizador",
        resetAnalyzer: "Reiniciar analizador",
    },
};