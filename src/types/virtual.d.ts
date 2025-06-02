declare module '#basicSitemap/staticPages.mjs' {
    export const sources: string[];
}

declare module '#basicSitemap/includePages.mjs' {
    export const sources: Array<string | import('./ModuleOptions').SitemapItem>;
}
