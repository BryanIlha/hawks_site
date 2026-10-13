import { articles, products, articlePath, type ProductId, type Article } from "./editorial";
export const createPublicBlogFeed = (source: Article[], product?: ProductId) => ({
  schemaVersion: 1,
  articles: source.filter(article => article.editorialStatus !== "draft" && (!product || (article.products ?? [article.product]).includes(product)))
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
    .map(article => ({ id: article.slug, products: article.products ?? [article.product], kind: article.kind ?? "news", title: article.title, summary: article.summary, date: article.date, status: article.status, availabilityNote: article.note, url: `https://hawksbi.com.br${articlePath(article.slug)}` })),
});

export const blogProductIds = products.map(product => product.id);

export const publicBlogFeed = (product?: ProductId) => createPublicBlogFeed(articles, product);
