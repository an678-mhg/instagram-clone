import Storie from "react-insta-stories";

const Stories = () => {
  return (
    <div className="w-full h-screen bg-[#222] flex items-center justify-center">
      <div className="w-[385px] max-w-full aspect-[9/16] rounded-md overflow-hidden">
        <Storie
          stories={[
            {
              url: "https://images.unsplash.com/photo-1677524278333-0ad11b9b3fe1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
            },
            {
              url: "https://images.unsplash.com/photo-1677531744549-18153c4a0e3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
            },
            {
              url: "http://res.cloudinary.com/an-nguyen/video/upload/v1672922342/ntn9nzqzycajvgnq9kvn.mp4",
              type: "video",
            },
          ]}
          defaultInterval={6000}
          width="100%"
          height="100%"
          header={() => <div>Hearser</div>}
        />
      </div>
    </div>
  );
};

export default Stories;
