import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const listScreenShot = [
  "/images/screenshot1.png",
  "/images/screenshot2.png",
  "/images/screenshot3.png",
  "/images/screenshot4.png",
];

const Phone = () => {
  const [currentIndexScreenShot, setCurrentIndexScreenShot] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndexScreenShot((prev) =>
        prev >= listScreenShot.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mr-6 lg:block hidden">
      <div className="relative">
        <img
          src="/images/home-phones.png"
          loading="lazy"
          alt="home-phones.png"
        />
        <div className="absolute top-[29px] right-[60px]">
          {listScreenShot?.map((item, index) => (
            <img
              loading="lazy"
              key={item}
              src={item}
              className={`${
                currentIndexScreenShot === index ? "inline" : "hidden"
              } animation-fade`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Phone;
