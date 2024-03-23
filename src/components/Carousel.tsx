import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const Carousel = () => {
  return (
    <Swiper
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 5000 }}
      pagination={{
        clickable: true
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper w-full h-auto mx-auto"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <SwiperSlide className="text-center flex justify-center items-center">
          <div className="aspect-w-16 aspect-h-9 w-full h-auto">
            <img
              className="w-full h-full object-cover"
              src={`https://picsum.photos/id/${i + 1}/2000/600`}
              alt="Beautiful landscape"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
