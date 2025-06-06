import MyModule from '../../../src/module';

export default defineNuxtConfig({
    modules: [MyModule],
    basicSitemap: {
        hostname: 'https://example.com',
        trailingSlash: true,
        include: [
            '/dynamic',
            {
                url: '/dynamic-with-options',
                changefreq: 'daily',
            },
        ],
    },
});
