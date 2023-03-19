import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

interface ImageSlideProps {
  media: { url: string; type: string }[];
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
        <SwiperSlide key={item.url}>
          <div
            className={`flex bg-gray-100 items-center h-full justify-center ${
              radius && "rounded-md overflow-hidden"
            }`}
          >
            {item.type?.includes("image") ? (
              <img
                width="100%"
                className="object-contain aspect-square"
                src={item.url}
              />
            ) : (
              <video
                width="100%"
                className="object-contain aspect-square"
                src={item.url}
                controls
              />
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlide;
