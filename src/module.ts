import type { ModuleOptions, SitemapItem } from './types/ModuleOptions';
import type { RuntimeConfig } from './types/RuntimeConfig';
import type { NuxtPage } from 'nuxt/schema';

import { defineNuxtModule, createResolver, addServerHandler } from '@nuxt/kit';

import { prepareHostname } from './runtime/utils/prepareHostname';
import { populateStaticPagesWithOptions } from './runtime/utils/populateStaticPagesWithOptions';

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'nuxt-basic-sitemap',
        configKey: 'basicSitemap',
        compatibility: {
            nuxt: '>=3.10.0',
            bridge: false,
        },
    },
    defaults: {
        enabled: true,
        includeStaticPages: true,
        exclude: [],
        include: [],
        trailingSlash: false,
    },
    async setup(options, nuxt) {
        const resolver = createResolver(import.meta.url);

        const runtimeConfig: RuntimeConfig = {
            hostname: options.hostname ? prepareHostname(options.hostname) : '',
            exclude: options.exclude,
            trailingSlash: options.trailingSlash ?? false,
        };

        nuxt.options.runtimeConfig.basicSitemap = runtimeConfig;

        let staticPages: Array<string | SitemapItem> = [];
        nuxt.hook('pages:resolved', (pages) => {

            pages.forEach((page) => {
                const stack: { parentPath: string; page: NuxtPage }[] = [
                    { parentPath: '', page },
                ];

                while (stack.length > 0) {
                    const { parentPath, page: currentPage } = stack.pop()!;

                    if (currentPage.path.includes(':')) {
                        // Skip dynamic routes
                        continue;
                    }

                    const fullPath =
                        parentPath +
                        (currentPage.path.startsWith('/') ? '' : '/') +
                        currentPage.path;
                    staticPages.push(fullPath);

                    if (
                        currentPage.children &&
                        currentPage.children.length > 0
                    ) {
                        currentPage.children.forEach((child) => {
                            stack.push({ parentPath: fullPath, page: child });
                        });
                    }
                }
            });

        });

        nuxt.hook('nitro:config', (nitroConfig) => {
            nitroConfig.virtual!['#basicSitemap/staticPages.mjs'] = () => {
                staticPages.sort((a, b) => {
                    const aUrl = typeof a === 'string' ? a : a.url;
                    const bUrl = typeof b === 'string' ? b : b.url;
                    return aUrl.localeCompare(bUrl);
                });

                if (options.staticPagesOptions && options.includeStaticPages) {
                    staticPages = populateStaticPagesWithOptions(staticPages as string[], options.staticPagesOptions);
                }

                return `export const sources = ${JSON.stringify(options.includeStaticPages ? staticPages : [], null, 4)}`;
            };

             nitroConfig.virtual!['#basicSitemap/includePages.mjs'] = async () => {
                const sources = [];

                if (typeof options.include === 'function') {
                    const result = await options.include();
                    if (Array.isArray(result)) {
                        sources.push(...result);
                    }
                } else {
                    sources.push(...options.include);
                }

                sources.sort((a, b) => {
                    const aUrl = typeof a === 'string' ? a : a.url;
                    const bUrl = typeof b === 'string' ? b : b.url;
                    return aUrl.localeCompare(bUrl);
                });

                return `export const sources = ${JSON.stringify(sources, null, 4)}`;
             };
        });


        if (options.enabled) {
            addServerHandler({
                route: '/sitemap.xml',
                handler: resolver.resolve('./runtime/routes/sitemap'),
            });
        }
    },
});
