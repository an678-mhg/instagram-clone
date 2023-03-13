import { useContext, useEffect, useMemo } from "react";
import { BiArrowBack } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Emoji from "../../assets/icons/Emoji";
import VideoAndImage from "../../assets/images/VideoAndImage";
import { AuthContext } from "../../context/AuthContext";
import { BsChevronDown, BsFilePostFill } from "react-icons/bs";
import { MdOutlineAutoStories } from "react-icons/md";
import { useState } from "react";
import { CreatePostModalContext } from "../../context/CreatePostModalContext";
import ImageSlide from "../ImageSlide";
import { IoMdResize } from "react-icons/io";
import Tippy from "@tippyjs/react/headless";
import MenuRadio from "../Menu/MenuRadio";

interface FilePreview {
  file: File;
  preview: string;
}

interface FormData {
  caption: string;
  files: FilePreview[];
  type: "post" | "stories";
}

const CreatePostModal = () => {
  const { user } = useContext(AuthContext);
  const { setIsOpen } = useContext(CreatePostModalContext);

  const [showType, setShowType] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    caption: "",
    files: [],
    type: "post",
  });
  const [showMenuRadio, setShowMenuRadio] = useState(false);
  const [radio, setRadio] = useState<"1/1" | "16/9" | "4/5">("1/1");

  const media = useMemo(
    () => formData?.files?.map((file) => file.preview),
    [formData?.files?.length]
  );

  useEffect(() => {
    return () => {
      formData?.files?.length > 0 &&
        formData?.files?.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [formData?.files?.length]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList);
    setFormData({
      ...formData,
      files: files?.map((file) => {
        return {
          file,
          preview: URL.createObjectURL(file),
        };
      }),
    });
  };

  return (
    <div
      className={`md:w-[835px] max-w-full ${
        formData?.files?.length === 0 ? "h-[500px]" : "h-auto"
      } mx-auto overflow-hidden rounded-md bg-white flex flex-col`}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <BiArrowBack onClick={() => setIsOpen(false)} className="text-2xl" />
        <h1 className="font-semibold">Create new {formData.type}</h1>
        <button className="font-semibold text-blue-500">Share</button>
      </div>

      <div className="w-full flex-1 flex md:flex-row flex-col h-full">
        <div className="md:w-[60%] relative flex justify-center items-center h-full flex-col">
          {formData?.files?.length > 0 ? (
            <ImageSlide radio={radio} contain={true} media={media} />
          ) : (
            <div className="flex items-center flex-col">
              <VideoAndImage />
              <h3 className="mt-3 text-lg font-semibold">
                Drag, drop video and image file
              </h3>
              <input
                onChange={handleFileChange}
                id="fileSelect"
                type="file"
                hidden
                multiple
              />
              <label
                htmlFor="fileSelect"
                className="mt-3 text-sm cursor-pointer bg-blue-500 text-white font-semibold px-4 py-2 rounded-md"
              >
                Select file to computer
              </label>
            </div>
          )}

          {formData?.files?.length > 0 && (
            <Tippy
              onClickOutside={() => setShowMenuRadio(false)}
              visible={showMenuRadio}
              interactive
              render={(attrs) => <MenuRadio {...attrs} setRadio={setRadio} />}
            >
              <div
                onClick={() => setShowMenuRadio(true)}
                className="bg-[rgba(0,0,0,0.646)] cursor-pointer flex items-center justify-center w-[30px] h-[30px] rounded-full absolute left-0 bottom-0 z-[99999999] m-2"
              >
                <IoMdResize color="#fff" />
              </div>
            </Tippy>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col border-l md:border-t-0 border-t border-gray-200">
          <div className="flex items-center">
            <LazyLoadImage
              src={user?.avatar}
              className="w-8 h-8 rounded-full"
              effect="blur"
            />
            <p className="text-sm font-semibold ml-3">
              {user?.username}{" "}
              <span className="font-normal">create a {formData.type}</span>
            </p>
          </div>
          <textarea
            value={formData.caption}
            onChange={(e) =>
              setFormData({ ...formData, caption: e.target.value })
            }
            placeholder="Write a caption..."
            className="outline-none text-sm w-full text-black mt-3 flex-1"
          />
          <div className="flex items-center justify-between mt-3">
            <Emoji width={20} height={20} />
            <p className="text-xs text-gray-500">0/2,200</p>
          </div>
          <div className="mt-3 cursor-pointer">
            <p
              onClick={() => setShowType(!showType)}
              className="flex items-center justify-between"
            >
              Type <BsChevronDown className="cursor-pointer" />
            </p>
            {showType && (
              <ul className="mt-3">
                <li
                  onClick={() => setFormData({ ...formData, type: "post" })}
                  className="text-sm p-2 flex items-center justify-between"
                >
                  Post <BsFilePostFill className="w-5 h-5" />
                </li>
                <li
                  onClick={() => setFormData({ ...formData, type: "stories" })}
                  className="text-sm p-2 flex items-center justify-between"
                >
                  Stories <MdOutlineAutoStories className="w-5 h-5" />
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
