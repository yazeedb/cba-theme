import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import type { HTMLProps } from 'react';
import cn from 'classnames';

const arrowClassName = 'w-4 h-4 xs:w-6 xs:h-6 sm:w-12 sm:h-12';

export const Carousel = () => {
  return (
    <Swiper
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 5000 }}
      navigation={{ prevEl: '.prev-slide', nextEl: '.next-slide' }}
      modules={[Pagination, Navigation]}
      className="w-full h-auto mx-auto relative"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <SwiperSlide
          key={i}
          className="text-center flex justify-center items-center"
        >
          <div className="aspect-w-16 aspect-h-9 w-full h-auto">
            <img
              className="w-full h-full object-cover"
              src={`https://picsum.photos/id/${i + 1}/2000/600`}
              alt="Beautiful landscape"
            />
          </div>
        </SwiperSlide>
      ))}

      <SlideButton className="prev-slide left-0">
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
      </SlideButton>

      <SlideButton className="next-slide right-0">
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
      </SlideButton>
    </Swiper>
  );
};

interface SlideButtonProps extends HTMLProps<HTMLButtonElement> {}

const SlideButton = ({ className, ...rest }: SlideButtonProps) => {
  return (
    <button
      {...rest}
      type="button"
      className={cn(
        className,
        'absolute top-0 z-10 bg-black bg-opacity-70 text-white p-3 mx-3 rounded-full flex items-center justify-center'
      )}
    />
  );
};
