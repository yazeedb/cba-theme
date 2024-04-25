import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import cn from 'classnames';
import type { CarouselAd } from '../data/carouselAds';

interface CarouselProps {
  ads: CarouselAd[];
}

export const Carousel = ({ ads }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 })
  ]);

  return (
    <div className="embla overflow-hidden relative">
      <div className="embla_viewport" ref={emblaRef}>
        <div className="embla__container flex">
          {ads.map((ad) => (
            <div
              className="embla__slide flex-none basis-full min-w-0 text-center flex justify-center items-center"
              key={ad.id}
            >
              <div
                className="flex items-center relative w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${ad.image.src})`,
                  height: '50vh',
                  maxHeight: '600px'
                }}
              >
                <div className="flex items-center bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full">
                  <section className="flex flex-col gap-3 w-full text-center max-w-[80%] md:max-w-[50%] mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-bold text-primary-header-light">
                      {ad.title}
                    </h1>

                    <p className="text-base sm:text-xl text-paragraph-light italic">
                      {ad.description}
                    </p>

                    <a className="cta-button self-center" href={ad.ctaLink}>
                      Learn More
                    </a>
                  </section>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        id="carousel-previous"
        className={cn(prevNextClassName, 'left-3')}
        onClick={() => emblaApi?.scrollPrev()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={arrowClassName}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>

        <div className="sr-only">Go to previous slide</div>
      </button>

      <button
        type="button"
        id="carousel-next"
        className={cn(prevNextClassName, 'right-3')}
        onClick={() => emblaApi?.scrollNext()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={arrowClassName}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>

        <div className="sr-only">Go to next slide</div>
      </button>
    </div>
  );
};

const prevNextClassName =
  'absolute top-1/2 -translate-y-1/2 text-white rounded-full bg-black opacity-70 p-2';
const arrowClassName = 'w-4 h-4 xs:w-6 xs:h-6 sm:w-10 sm:h-10';
