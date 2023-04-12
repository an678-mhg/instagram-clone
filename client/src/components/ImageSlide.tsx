import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import ImageFade from "./ImageFade";

// interface ImageSlideProps {
//   media: { url: string; type: string }[];
//   radius?: boolean;
// }

interface ImageSlideProps {
  media: string[];
  radius?: boolean;
}

const ImageSlide: React.FC<ImageSlideProps> = ({ media, radius }) => {
  return (
    <Swiper
      className="w-full h-full"
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={true}
      navigation={true}
    >
      {media?.map((item) => (
        <SwiperSlide key={item}>
          <div
            className={`flex bg-[#222] items-center h-full justify-center ${
              radius && "rounded-md overflow-hidden"
            }`}
          >
            <ImageFade
              loading="lazy"
              width="100%"
              className="object-contain aspect-square"
              src={item}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlide;
