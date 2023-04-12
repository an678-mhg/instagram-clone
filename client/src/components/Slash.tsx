import ImageFade from "./ImageFade";

const Slash = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <ImageFade
        loading="lazy"
        className="w-[80px] h-[80px]"
        src="/images/logo-gradient.png"
      />
    </div>
  );
};

export default Slash;
