import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

interface ImageSlideProps {
  media: string[];
  contain?: boolean;
  radius?: boolean;
  radio?: "16/9" | "4/5" | "1/1";
}

const ImageSlide: React.FC<ImageSlideProps> = ({
  media,
  radius,
  radio = "1/1",
}) => {
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
            className={`flex bg-gray-100 items-center h-full justify-center ${
              radius && "rounded-md overflow-hidden"
            }`}
          >
            <img
              width="100%"
              style={{ aspectRatio: radio }}
              className={`object-cover block`}
              src={item}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlide;
