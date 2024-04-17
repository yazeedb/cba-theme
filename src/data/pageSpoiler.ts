import type { Post, Rendered } from './commonInterfaces';

export const parsePageSpoiler = (data: PageSpoilerResponse): PageSpoiler => {
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
