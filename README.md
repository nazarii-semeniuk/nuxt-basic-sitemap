# Nuxt Basic Sitemap

## Overview

Nuxt Basic Sitemap is a developer-friendly module for generating sitemaps in Nuxt applications. It simplifies the process of creating dynamic and static sitemaps, ensuring your website is SEO-friendly and easily discoverable by search engines.

## Features

- **Static pages support**: Automatically include static pages based on your application's routes in your sitemap effortlessly.
- **Include any page**: Include any other pages, via static array, or sync/async function
- **Exclusion rules**: Exclude specific pages or routes from the sitemap.
- **Trailing slash handling**: Configure trailing slashes for URLs.
- **Custom hostname**: Set a custom hostname for your sitemap.
- **Highly configurable**: Fine-tune sitemap generation with various options.

## Installation

Install the module via npm:

```bash
npm install nuxt-basic-sitemap
```

Or using yarn:

```bash
yarn add nuxt-basic-sitemap
```

## Usage

1. Add the module to your Nuxt configuration:

```ts
export default defineNuxtConfig({
  modules: [
    'nuxt-basic-sitemap',
  ],
  basicSitemap: {
    hostname: 'https://example.com',
    exclude: ['/to-exclude'],
    trailingSlash: true,
  },
});
```

2. Start your Nuxt application, and the sitemap will be available at `/sitemap.xml`.

## Configuration Options

### `enabled`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Ability to quickly turn off/on sitemap

### `hostname`

- **Type**: `string`
- **Required**: `false` - if no hostname set, module will try to get `host` from a request
- **Description**: The base URL for your sitemap.

### `trailingSlash`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Whether to add trailing slashes to URLs.

### `includeStaticPages`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Whether to automatically add pages based on your app's routes

### `exclude`

- **Type**: `string[]`
- **Required**: `false`
- **Description**: An array of routes to exclude from the sitemap.

### `include`

- **Type**: `Array<string | SitemapItem> | (() => Array<string | SitemapItem>) | (() => Promise<Array<string | SitemapItem>>)`
- **Required**: `false`
- **Description**: An array of routes to includes pages. Can be just simple array of strings and [SitemapItem](#sitemapitem) objects, or a function that returns either same array, or promise, that will resolve the same array.

More about [SitemapItem type here](#sitemapitem)

### `staticPagesOptions`

- **Type**: `Array<SitemapItem>`
- **Required**: `false`
- **Description**: Ability to set `lastmod`, `changefreq` and `priority` for static pages (pages that automatically generates based on routes)

More about [SitemapItem type here](#sitemapitem)

## Types

### SitemapItem

```ts
type SitemapItem = {
  url: string;
  lastmod?: string;
  changefreq?: Changefreq;
  priority?: number;
};
```

## Example

### Basic example

```ts
// nuxt.config.ts
{
...
  basicSitemap: {
    hostname: 'https://example.com',
    trailingSlash: true,
    include: [
      '/about',
      {
        url: '/blog',
        changefreq: 'daily'
      }
    ],
    exclude: ['/to-exclude']
  }
...
}
```

### Example with options for static pages

```ts
// nuxt.config.ts
{
...
  basicSitemap: {
    hostname: 'https://example.com',
    staticPagesOptions: [
      {
        url: '/',
        priority: 1
      }
    ]
  }
...
}
```

### Example with only dynamic custom pages

```ts
// nuxt.config.ts
{
...
  basicSitemap: {
    hostname: 'https://example.com',
    includeStaticPages: false,
    include: async () => {
      const pages = await $fetch(...);

      return pages;
    }
  }
...
}
```

## Development

### Running the Playground

The `playground` directory contains a sample Nuxt application for testing the module. To run the playground:

```bash
cd playground
npm install
npm run dev
```

### Running Tests

The `test` directory contains unit tests for the module. To run the tests:

```bash
npm test
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a clear description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Support

If you encounter any issues or have questions, feel free to open an issue on GitHub or contact the maintainers.

---

Happy coding!
