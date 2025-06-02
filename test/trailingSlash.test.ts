import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';
import { setup, $fetch } from '@nuxt/test-utils/e2e';

describe('Trailing slash', async () => {
    await setup({
        rootDir: fileURLToPath(new URL('./fixtures/trailingSlash', import.meta.url)),
    });

    it('adds trailing slash to static pages', async () => {
        const response = await $fetch('/sitemap.xml');
        
        expect(response).toContain('<loc>https://example.com/</loc>');
        expect(response).toContain('<loc>https://example.com/about/</loc>');
    });

    it('adds trailing slash to include pages', async () => {
        const response = await $fetch('/sitemap.xml');
        
        expect(response).toContain('<loc>https://example.com/dynamic/</loc>');
        expect(response).toContain('<loc>https://example.com/dynamic-with-options/</loc>');
    });

});
