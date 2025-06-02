import type { SitemapItem } from "~/src/types/ModuleOptions";

export function addTrailingSlashToSources(sources: Array<string | SitemapItem>) {
    return sources.map((source) => {
        if (typeof source === 'string') {
            return source.endsWith('/') ? source : `${source}/`;
        } else {
            return {
                ...source,
                url: source.url.endsWith('/') ? source.url : `${source.url}/`,
            };
        }
    });
}