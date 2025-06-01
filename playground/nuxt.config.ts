export default defineNuxtConfig({
    modules: ['../src/module'],
    devtools: { enabled: true },
    simpleSitemap: {
        hostname: 'example.com',
        enabled: true,
        exclude: ['/test',],
        include: [
            '/blog',
            { url: '/changefreq', changefreq: 'daily' },
            { url: '/priority', priority: 0.8 },
            { url: '/lastmod', lastmod: '2023-10-01' },
            {
                url: '/full',
                changefreq: 'daily',
                priority: 0.5,
                lastmod: '2023-10-01',
            },
        ],
        staticPagesOptions: [
            {
                url: '/static-page',
                changefreq: 'yearly',
            },
        ]
    },
});
