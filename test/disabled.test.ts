import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';
import { setup, $fetch } from '@nuxt/test-utils/e2e';

describe('Sitemap disabling', async () => {
    await setup({
        rootDir: fileURLToPath(new URL('./fixtures/disabled', import.meta.url)),
    });

    it('does not render the sitemap', async () => {
        const response = await $fetch('/sitemap.xml');
        expect(response).not.toContain('<?xml version="1.0" encoding="UTF-8"?>');
    });
});
