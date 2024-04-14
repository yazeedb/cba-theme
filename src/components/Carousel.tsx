import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import cn from 'classnames';

const imageDimensions = {
  width: 2000,
  height: 600
};

export const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 })
  ]);

  return (
    <div className="embla overflow-hidden relative">
      <div className="embla_viewport" ref={emblaRef}>
        <div className="embla__container flex">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              className="embla__slide flex-none basis-full min-w-0 text-center flex justify-center items-center"
              key={i}
            >
              <div className="aspect-w-16 aspect-h-9 w-full h-auto">
                <img
                  className="w-full h-full object-cover"
                  src={`https://picsum.photos/id/${i + 1}/${imageDimensions.width}/${imageDimensions.height}`}
                  alt="Beautiful landscape"
                  width={imageDimensions.width}
                  height={imageDimensions.height}
                  loading="lazy"
                  decoding="async"
                />
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
