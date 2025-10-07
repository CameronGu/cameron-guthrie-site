export const site = {
  title: 'Cameron Guthrie',
  tagline: 'Entrepreneur & Strategic Integrator',
  description: 'I tame chaos, connect disciplines, and turn complex ideas into working companies and systems.',
  url: 'https://cameronjguthrie.com',
  author: 'Cameron Guthrie',
  ogImage: '/img/cjg-meta-preview-1200x628.jpg',
};

export type SeoProps = {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
};
