import { articles, articlePath, products, productPath } from './lib/editorial';
import { services, servicePath } from './lib/services';
import { normalizePath } from './lib/seo';

// Both the browser and prerender use the same resolver. Only the current route's
// view is loaded; the home animations are not part of editorial page startup.
export async function resolvePage(path: string) {
  const route = normalizePath(path);
  if (route === '/') {
    const { HomePage } = await import('./components/HomePage');
    return <HomePage />;
  }
  const service = services.find((item) => servicePath(item.slug) === route);
  if (service) {
    const { ServicePage } = await import('./components/ServicePage');
    return <ServicePage service={service} />;
  }
  const { ProductPage, ArticlePage, ProductsPage, BlogPage, NotFoundPage } = await import('./components/EditorialPages');
  const product = products.find((item) => productPath(item.id) === route);
  const article = articles.find((item) => articlePath(item.slug) === route);
  return product ? <ProductPage product={product} /> : article ? <ArticlePage article={article} />
    : route === '/produtos/' ? <ProductsPage /> : route === '/blog/' ? <BlogPage /> : <NotFoundPage />;
}
