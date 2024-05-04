import { parseFeaturedMedia, type Page, type ParsedImage } from './common';
import { routes } from './routes';

export const getPageAndPageChildren = (parentSlug: string) => {
  return fetch(routes.pagesBySlug(parentSlug))
    .then((res) => res.json())
    .then(([parentPage, ...rest]: Page[]) => {
      if (!parentPage) {
        throw new Error(`Page not found for slug ${parentSlug.toString()}`);
      }

      if (rest.length > 0) {
        console.warn(
          'WARNING, multiple pages found for slug. Using first page',
          { parentSlug, parentPage, rest }
        );
      }

      return fetch(routes.pagesByParent(parentPage.id))
        .then((res) => res.json())
        .then((children: Page[]) => {
          return {
            parent: parsePage(parentPage),
            children: children.map(parsePage)
          };
        });
    });
};

const parsePage = (page: Page): ParsedPage => {
  return {
    id: page.id,
    title: page.title.rendered,
    content: page.content.rendered,
    subtitle: page.acf.page_subtitle,
    image: parseFeaturedMedia(page._embedded['wp:featuredmedia']),
    order: page.menu_order ?? 0
  };
};

interface ParsedPage {
  id: number;
  title: string;
  content: string;
  subtitle: string;
  image: ParsedImage;
  order: number;
}
