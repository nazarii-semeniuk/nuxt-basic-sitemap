declare module '#simpleSitemap/staticPages.mjs' {
    export const sources: string[];
}

declare module '#simpleSitemap/includePages.mjs' {
    export const sources: Array<string | import('./ModuleOptions').SitemapItem>;
}
