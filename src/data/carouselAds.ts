import type { Post } from './commonInterfaces';

export const parseCarouselAd = (data: CarouselAdResponse): CarouselAd => {
  const [image] = data._embedded['wp:featuredmedia'];

  return {
    id: data.id,
    image: {
      src: image?.link ?? '',
      alt: image?.alt_text ?? ''
    }
  };
};

export interface CarouselAd {
  id: number;
  image: {
    src: string;
    alt: string;
  };
}

interface CarouselAdResponse extends Post {}
