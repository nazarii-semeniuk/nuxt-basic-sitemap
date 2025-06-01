import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';
import { setup, $fetch } from '@nuxt/test-utils/e2e';

describe('Dynamic without hostname and static pages', async () => {
    await setup({
        rootDir: fileURLToPath(new URL('./fixtures/dynamic', import.meta.url)),
        port: 56102,
    });

    it("don't render static pages in sitemap", async () => {
        const response = await $fetch('/sitemap.xml');

        expect(response).not.toContain(`<loc>https://127.0.0.1:56102</loc>`);
        expect(response).not.toContain(`<loc>https://127.0.0.1:56102/about</loc>`);
    });

    it('render include dynamic pages', async () => {
        const response = await $fetch('/sitemap.xml');

        expect(response).toContain(`<loc>https://127.0.0.1:56102/blog</loc>`);
        expect(response).toContain(`<loc>https://127.0.0.1:56102/custom</loc>`);
        expect(response).toContain('<changefreq>daily</changefreq>');
    });

});