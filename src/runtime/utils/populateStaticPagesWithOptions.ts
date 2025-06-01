import type {
    SitemapItem,
} from '~/src/types/ModuleOptions';

export function populateStaticPagesWithOptions(
    sources: string[],
    options: SitemapItem[]
): Array<string | SitemapItem> {
    return sources.map((url) => {
        const match = options.find((option) => option.url === url);

        if (match) {
            return {
                url,
                lastmod: match.lastmod,
                changefreq: match.changefreq,
                priority: match.priority,
            };
        }

        return url;
    });
}
