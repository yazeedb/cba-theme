import type { Post, Rendered } from './common';
import { routes } from './routes';

export const getPageSpoilers = () => {
  return fetch(routes.pageSpoilers)
    .then((res) => res.json())
    .then((data: PageSpoilerResponse[]) => data.map(parsePageSpoiler));
};

const parsePageSpoiler = (data: PageSpoilerResponse): PageSpoiler => {
  return {
    id: data.id,
    title: data.title.rendered,
    content: data.content.rendered
  };
};

export interface PageSpoiler {
  id: number;
  title: string;
  content: string;
}

interface PageSpoilerResponse extends Post {
  content: Rendered;
}
