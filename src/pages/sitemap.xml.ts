import { getCollection } from 'astro:content';
import { site } from '../config/site';

const routes = ['/', '/about', '/work', '/projects', '/contact'];

export async function GET() {
  const projects = await getCollection('projects');
  const urls = [
    ...routes.map((path) => `${site.url}${path}`),
    ...projects.map((project) => `${site.url}/projects/${project.slug}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls
      .map((loc) => `<url><loc>${loc}</loc></url>`)
      .join('') +
    `</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=86400',
    },
  });
}
