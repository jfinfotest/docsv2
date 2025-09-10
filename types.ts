export interface NavLink {
    title: string;
    path: string;
    position?: number;
}

export interface NavSection {
    title: string;
    children: NavItem[];
    position?: number;
}

export type NavItem = NavLink | NavSection;

export interface SearchDocument {
    id: string;         // "path/to/file.md#section-anchor"
    pageTitle: string;  // Title of the page from frontmatter
    title: string;      // Title of the H2 section
    content: string;    // Content within that section
    path: string;       // "path/to/file.md"
}