export type SitemapElement = {
    type: string;
    name?: string;
    text?: string;
    attributes?: Record<string, string | number>;
    elements?: SitemapElement[];
};

export type Sitemap = {
    declaration: {
        attributes: Record<string, string>;
    };
    elements: SitemapElement[];
};
