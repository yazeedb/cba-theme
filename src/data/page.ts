import { parseFeaturedMedia, type Page, type ParsedImage } from './common';
import { routes } from './routes';

export const getPage = (id: number) => {
  return fetch(routes.page(id))
    .then((res) => res.json())
    .then((data: Page) => parsePage(data));
};

const parsePage = (page: Page): ParsedPage => {
  return {
    id: page.id,
    title: page.title.rendered,
    subtitle: page.acf.page_subtitle,
    image: parseFeaturedMedia(page._embedded['wp:featuredmedia'])
  };
};

interface ParsedPage {
  id: number;
  title: string;
  subtitle: string;
  image: ParsedImage;
}
