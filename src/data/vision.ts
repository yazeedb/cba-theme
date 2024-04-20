import type { Post } from './common';
import { routes } from './routes';

const visionPostId = 301;

export const getVision = () => {
  return fetch(routes.post(visionPostId))
    .then((res) => res.json())
    .then((data: Post) => parseVision(data));
};

const parseVision = (data: Post): Vision => {
  return {
    title: data.title.rendered,
    content: data.content.rendered
  };
};

export interface Vision {
  title: string;
  content: string;
}
