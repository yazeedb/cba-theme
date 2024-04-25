import { parseFeaturedMedia, type ParsedImage, type Post } from './common';
import { routes } from './routes';

export const getCarouselAds = () => {
  return fetch(routes.carouselAds)
    .then((res) => res.json())
    .then((data: CarouselAdResponse[]) => data.map(parseCarouselAd));
};

const parseCarouselAd = (data: CarouselAdResponse): CarouselAd => {
  return {
    id: data.id,
    title: data.title.rendered,
    description: data.acf.description,
    ctaLink: data.acf.cta_link,
    image: parseFeaturedMedia(data._embedded['wp:featuredmedia'])
  };
};

export interface CarouselAd {
  id: number;
  title: string;
  description: string;
  ctaLink: string;
  image: ParsedImage;
}

interface CarouselAdResponse extends Post {
  acf: {
    description: string;
    cta_link: string;
  };
}
