import type { Post } from './commonInterfaces';

export const getCarouselAds = () => {
  return fetch(
    'http://localhost:8888/wordpress/wp-json/wp/v2/carousel-ad?_embed'
  )
    .then((res) => res.json())
    .then((data: CarouselAdResponse[]) => data.map(parseCarouselAd));
};

const parseCarouselAd = (data: CarouselAdResponse): CarouselAd => {
  const [image] = data._embedded['wp:featuredmedia'];

  return {
    id: data.id,
    image: {
      src: image?.link ?? '',
      alt: image?.alt_text ?? ''
    }
  };
};

interface CarouselAd {
  id: number;
  image: {
    src: string;
    alt: string;
  };
}

interface CarouselAdResponse extends Post {}
