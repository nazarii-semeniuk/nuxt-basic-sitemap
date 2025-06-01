type Changefreq = "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";

export type SitemapItem = {
  url: string;
  lastmod?: string;
  changefreq?: Changefreq;
  priority?: number;
};

export type ModuleOptions = {
  enabled: boolean;
  hostname?: string;
  exclude: Array<string>;
  include:
    Array<string | SitemapItem>
    | (() => Promise<Array<string | SitemapItem>>)
    | (() => Array<string | SitemapItem>);
  includeStaticPages: boolean;
  staticPagesOptions?: Array<SitemapItem>
};
