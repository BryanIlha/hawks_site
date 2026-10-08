import { pagePaths, getPageMeta } from '../.ssr/entry-server.js';

// Run after building. Reads only the target website; does not submit indexing requests.
const base = new URL(process.argv[2] ?? 'https://hawksbi.com.br/');
if (!['https:', 'http:'].includes(base.protocol)) throw new Error('Informe uma URL HTTP ou HTTPS.');
const failures = [];
for (const path of pagePaths) {
  try {
    const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(15000) });
    const html = await response.text();
    const expected = getPageMeta(path);
    if (response.status !== 200) failures.push(`${path}: HTTP ${response.status}`);
    if (!response.headers.get('content-type')?.includes('text/html')) failures.push(`${path}: tipo de conteúdo incorreto`);
    if (!html.includes(`<link rel="canonical" href="${expected.url}"`)) failures.push(`${path}: canonical divergente`);
    const decode = (text) => text.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"');
    if (decode(html.match(/<title>(.*?)<\/title>/)?.[1] ?? '') !== expected.title) failures.push(`${path}: título divergente ou versão antiga`);
    if ((html.match(/<h1(?:\s|>)/g) ?? []).length !== 1) failures.push(`${path}: H1 ausente ou duplicado no HTML inicial`);
    if (/name="robots" content="[^"]*noindex/.test(html) || /noindex/i.test(response.headers.get('x-robots-tag') ?? '')) failures.push(`${path}: noindex`);
  } catch (error) { failures.push(`${path}: ${error.message}`); }
}
try {
  const response = await fetch(new URL('/seo-validation-missing-page-20261008/', base), { signal: AbortSignal.timeout(15000) });
  if (response.status !== 404) failures.push(`URL inexistente: HTTP ${response.status}; esperado 404`);
  const sitemapResponse = await fetch(new URL('/sitemap.xml', base), { signal: AbortSignal.timeout(15000) });
  const sitemap = await sitemapResponse.text();
  if (sitemapResponse.status !== 200) failures.push(`Sitemap: HTTP ${sitemapResponse.status}`);
  for (const path of pagePaths) if (!sitemap.includes(`<loc>${getPageMeta(path).url}</loc>`)) failures.push(`Sitemap: ${path} ausente`);
  const robotsResponse = await fetch(new URL('/robots.txt', base), { signal: AbortSignal.timeout(15000) });
  const robots = await robotsResponse.text();
  if (robotsResponse.status !== 200 || /Disallow:\s*\/\s*$/m.test(robots) || !robots.includes('Sitemap: https://hawksbi.com.br/sitemap.xml')) failures.push('robots.txt: bloqueio, sitemap ausente ou resposta incorreta');
} catch (error) { failures.push(`Verificação de servidor: ${error.message}`); }
if (failures.length) {
  console.error(`Falhas em ${base.origin}:\n${failures.map((failure) => `- ${failure}`).join('\n')}`);
  process.exitCode = 1;
} else console.log(`${pagePaths.length} rotas verificadas em ${base.origin}: HTML, canonical, título, indexabilidade, sitemap, robots e HTTP 404.`);
