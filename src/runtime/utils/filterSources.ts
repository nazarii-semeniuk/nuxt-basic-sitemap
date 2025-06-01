import type { SitemapItem } from '../../types/ModuleOptions';

export function filterSources(
    sources: Array<string | SitemapItem>,
    exclude: Array<string>
): Array<string | SitemapItem> {
    return sources.filter((source) => {
        if (typeof source === 'string') {
            return !exclude.includes(source);
        } else if (typeof source === 'object' && 'url' in source) {
            return !exclude.includes(source.url);
        }
        return true;
    });
}
