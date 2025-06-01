import MyModule from '../../../src/module';

export default defineNuxtConfig({
    modules: [MyModule],
    simpleSitemap: {
        hostname: 'https://example.com',
        exclude: ['/to-exclude'],
        include: [
            '/blog',
            { url: '/changefreq', changefreq: 'weekly' },
            { url: '/priority', priority: 0.8 },
            { url: '/lastmod', lastmod: '2023-10-01' },
            {
                url: '/full',
                changefreq: 'daily',
                priority: 0.5,
                lastmod: '2024-10-01',
            },
        ],
        staticPagesOptions: [
          {
            url: '/static-page',
            changefreq: 'yearly',
          }
        ]
    },
});
