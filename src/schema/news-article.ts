import { organizationRef } from "@schema/organization";

export const newsArticle = (
  site: URL | undefined,
  pathname: string,
  post: { title: string; date: Date; description: string },
) => ({
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: post.title,
  description: post.description,
  datePublished: post.date.toISOString(),
  mainEntityOfPage: new URL(pathname, site).href,
  author: organizationRef(site),
  publisher: organizationRef(site),
});

/** Trail for the news index itself, where "News" is the current page and so
    carries no `item` URL. */
export const newsIndexBreadcrumbs = (site: URL | undefined) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site?.href },
    { "@type": "ListItem", position: 2, name: "News" },
  ],
});

export const articleBreadcrumbs = (site: URL | undefined, title: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site?.href },
    {
      "@type": "ListItem",
      position: 2,
      name: "News",
      item: new URL("/news/", site).href,
    },
    { "@type": "ListItem", position: 3, name: title },
  ],
});
