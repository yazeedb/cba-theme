import type { Post } from './commonInterfaces';

const parseBook = (data: BookResponse): Book => {
  const [image] = data._embedded['wp:featuredmedia'];

  return {
    id: data.id,
    title: data.title.rendered,
    author: data.acf.author,
    description: data.acf.description,
    image: {
      src: image?.link ?? '',
      alt: image?.alt_text ?? ''
    }
  };
};

export interface Book {
  id: number;
  image: { src: string; alt: string };
  title: string;
  author: string;
  description: string;
}

interface BookResponse extends Post {
  acf: {
    author: string;
    description: string;
  };
}
