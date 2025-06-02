import { defineEventHandler, setResponseHeader } from 'h3';
import { useRuntimeConfig } from '#imports';
import { generateSitemap } from '../builder';
import { filterSources } from '../utils/filterSources';
import { prepareHostname } from '../utils/prepareHostname';
import { addTrailingSlashToSources } from '../utils/addTrailingSlashToSources';

export default defineEventHandler(async (e) => {
    const { sources: staticSources } = await import('#basicSitemap/staticPages.mjs');

    const { sources: includeSources } = await import('#basicSitemap/includePages.mjs');

    const { basicSitemap: sitemapConfig } = useRuntimeConfig();

    const sources = filterSources([...staticSources, ...includeSources], sitemapConfig.exclude);

    let hostname = sitemapConfig.hostname;
    const { trailingSlash } = sitemapConfig;

    if (!hostname) {
        const origin = e.node.req.headers.origin || e.node.req.headers.host;

        if (!origin) {
            return '<!-- No hostname provided for sitemap and can not be extracted from headers -->';
        }

        hostname = prepareHostname(origin.replace(/\/$/, ''));
    }

    const sitemap = generateSitemap(trailingSlash ? addTrailingSlashToSources(sources) : sources, hostname);

    setResponseHeader(e, 'Content-Type', 'application/xml');

    return sitemap;
});