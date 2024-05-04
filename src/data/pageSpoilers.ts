import type { Post, Rendered } from './common';
import { getOnePage } from './page';
import { routes } from './routes';

export const getPageSpoilers = () => {
  return fetch(routes.pageSpoilers)
    .then((res) => res.json())
    .then((data: PageSpoilerResponse[]) =>
      Promise.all(data.map((d) => getOnePage(d.acf.page_link))).then((pages) =>
        pages.map((p, index) => parsePageSpoiler(data[index]!, p.slug))
      )
    );
};

const parsePageSpoiler = (
  data: PageSpoilerResponse,
  link: string
): PageSpoiler => {
  return {
    id: data.id,
    title: data.title.rendered,
    content: data.content.rendered,
    link
  };
};

export interface PageSpoiler {
  id: number;
  title: string;
  content: string;
  link: string;
}

interface PageSpoilerResponse extends Post {
  content: Rendered;
  acf: { page_link: number };
}
