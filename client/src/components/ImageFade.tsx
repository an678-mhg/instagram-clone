import { FC, HTMLProps, useState } from "react";

interface ImageFadeProps extends HTMLProps<HTMLImageElement> {
  loading?: "lazy";
}

const ImageFade: FC<ImageFadeProps> = ({
  className,
  onLoad,
  loading = "lazy",
  ...others
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      className={`${
        loaded ? "opacity-100" : "opacity-0"
      } transition duration-300 ${className}`}
      onLoad={(e) => {
        setLoaded(true);
        onLoad && onLoad(e);
      }}
      {...others}
      loading={loading}
    />
  );
};

export default ImageFade;
