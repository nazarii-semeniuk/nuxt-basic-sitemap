import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';
import { setup, $fetch } from '@nuxt/test-utils/e2e';

describe('Basic', async () => {
    await setup({
        rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    });

    it('renders the sitemap', async () => {
        const response = await $fetch('/sitemap.xml');
        expect(response).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    });

    it('adds static pages', async () => {
        const response = await $fetch('/sitemap.xml');
        expect(response).toContain('<loc>https://example.com/</loc>');
        expect(response).toContain('<loc>https://example.com/about</loc>');
        expect(response).toContain('<loc>https://example.com/blog</loc>');
        expect(response).toContain('<loc>https://example.com/contacts</loc>');
    });

    it('includes custom URLs', async () => {
        const response = await $fetch('/sitemap.xml');

        expect(response).toContain('<loc>https://example.com/blog</loc>');
        expect(response).toContain('<loc>https://example.com/changefreq</loc>');
        expect(response).toContain('<loc>https://example.com/priority</loc>');
        expect(response).toContain('<loc>https://example.com/lastmod</loc>');
        expect(response).toContain('<loc>https://example.com/full</loc>');
        expect(response).toContain('<changefreq>daily</changefreq>');
        expect(response).toContain('<changefreq>weekly</changefreq>');
        expect(response).toContain('<priority>0.8</priority>');
        expect(response).toContain('<priority>0.5</priority>');
        expect(response).toContain('<lastmod>2023-10-01</lastmod>');
        expect(response).toContain('<lastmod>2024-10-01</lastmod>');
    });

    it('excludes specified URLs', async () => {
        const response = await $fetch('/sitemap.xml');
        expect(response).not.toContain('<loc>https://example.com/to-exclude</loc>');
    });

    it('includes static pages with options', async () => {
        const response = await $fetch('/sitemap.xml');
        expect(response).toContain('<loc>https://example.com/static-page</loc>');
        expect(response).toContain('<changefreq>yearly</changefreq>');
    });

    it('ignores dynamic routes', async () => {
        const response = await $fetch('/sitemap.xml');
        expect(response).not.toContain('<loc>https://example.com/dynamic/:slug()</loc>');
    });
});
