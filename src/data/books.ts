import { parseFeaturedMedia, type ParsedImage, type Post } from './common';

const parseBook = (data: BookResponse): Book => {
  return {
    id: data.id,
    title: data.title.rendered,
    author: data.acf.author,
    description: data.acf.description,
    image: parseFeaturedMedia(data._embedded['wp:featuredmedia'])
  };
};

export interface Book {
  id: number;
  image: ParsedImage;
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
