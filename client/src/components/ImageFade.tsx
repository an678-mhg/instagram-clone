import { FC, HTMLProps, useRef, useState } from "react";

interface ImageFadeProps extends HTMLProps<HTMLImageElement> {
  loading?: "lazy";
}

const ImageFade: FC<ImageFadeProps> = ({
  className,
  onLoad,
  loading = "lazy",
  onError,
  ...others
}) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleImageError = () => {
    imgRef.current?.setAttribute("src", "/images/no-image.png");
  };

  return (
    <img
      ref={imgRef}
      className={`${
        loaded ? "opacity-100" : "opacity-0"
      } transition duration-300 ${className}`}
      onLoad={(e) => {
        setLoaded(true);
        onLoad && onLoad(e);
      }}
      onError={handleImageError}
      {...others}
      loading={loading}
    />
  );
};

export default ImageFade;
