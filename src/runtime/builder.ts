import type { SitemapItem } from '../types/ModuleOptions';

import { js2xml } from 'xml-js';

import { xmlBase } from './config';

export function generateSitemap(sources: Array<string | SitemapItem>, hostname: string) {
    const sitemap = { ...xmlBase };

    const sitemapUrls = sources.flatMap((source) => {
        const sitemapUrl = generateSitemapUrl(source, hostname);
        return sitemapUrl ? [sitemapUrl] : [];
    });

    sitemap.elements = [
        {
            type: 'element',
            name: 'urlset',
            attributes: {
                xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
                'xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
            },
            elements: sitemapUrls,
        },
    ];

    const xml = js2xml(sitemap);

    return xml;
}

function generateSitemapUrl(source: string | SitemapItem, hostname: string) {
    if (typeof source === 'string') {
        return {
            type: 'element',
            name: 'url',
            elements: [
                {
                    type: 'element',
                    name: 'loc',
                    elements: [
                        {
                            type: 'text',
                            text: hostname + source,
                        },
                    ],
                },
            ],
        };
    } else if (typeof source === 'object' && 'url' in source) {
        return {
            type: 'element',
            name: 'url',
            elements: [
                {
                    type: 'element',
                    name: 'loc',
                    elements: [
                        {
                            type: 'text',
                            text: hostname + source.url,
                        },
                    ],
                },
                ...Object.entries(source).filter(([key]) => key !== 'url').map(([key, value]) => {
                    return {
                        type: 'element',
                        name: key,
                        elements: [
                            {
                                type: 'text',
                                text: String(value),
                            },
                        ],
                    };
                })
            ],
        };
    }
}