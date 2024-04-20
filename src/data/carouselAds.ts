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
    image: parseFeaturedMedia(data._embedded['wp:featuredmedia'])
  };
};

interface CarouselAd {
  id: number;
  image: ParsedImage;
}

interface CarouselAdResponse extends Post {}
