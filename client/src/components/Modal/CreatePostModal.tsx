import { useContext, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import Emoji from "../../assets/icons/Emoji";
import VideoAndImage from "../../assets/images/VideoAndImage";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { CreatePostModalContext } from "../../context/CreatePostModalContext";
import ImageSlide from "../ImageSlide";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { addPost } from "../../services/posts";
import uploadFile from "../../utils/upload";
import { useQueryClient } from "react-query";
import { postKey } from "../../utils/react-query-key";

interface FilePreview {
  file: File;
  preview: string;
}

interface FormData {
  caption: string;
  files: FilePreview[];
  type: "posts" | "stories";
}

const initialFormData: FormData = {
  caption: "",
  files: [],
  type: "posts",
};

const CreatePostModal = () => {
  const { user } = useContext(AuthContext);
  const { setIsOpen } = useContext(CreatePostModalContext);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      formData?.files?.length > 0 &&
        formData?.files?.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [formData?.files?.length]);

  const { mutateAsync } = useMutation(addPost);

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

  const handleAddPost = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.caption || formData.files?.length === 0) {
      return toast.error("A caption or photo is required!");
    }

    let toastId;

    try {
      toastId = toast.loading("Upload posts start");
      setLoading(true);

      const media = await Promise.all(
        formData?.files?.map((file) => uploadFile(file.file))
      );

      await mutateAsync({
        caption: formData.caption,
        media,
        post_type: formData.type,
        user_id: user?._id as string,
      });

      setIsOpen(false);

      queryClient.refetchQueries([postKey.GET_HOME_FEED]);
      toast.dismiss(toastId);
      toast.success("Upload post success");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Upload posts failed");
    }
  };

  return (
    <form
      onSubmit={handleAddPost}
      className={`md:w-[835px] max-w-full h-[540px] mx-auto overflow-hidden rounded-md bg-white flex flex-col`}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <BiArrowBack onClick={() => setIsOpen(false)} className="text-2xl" />
        <h1 className="font-semibold">Create new {formData.type}</h1>
        <button disabled={loading} className="font-semibold text-blue-500">
          Share
        </button>
      </div>

      <div className="w-full flex-1 flex md:flex-row flex-col h-full overflow-hidden">
        <div className="md:w-[60%] overflow-hidden relative flex justify-center items-center h-full flex-col">
          {formData?.files?.length > 0 ? (
            <ImageSlide media={formData?.files?.map((file) => file.preview)} />
          ) : (
            <div className="flex items-center flex-col">
              <VideoAndImage />
              <h3 className="mt-3 text-lg font-semibold">
                Drag, drop video and image file
              </h3>
              <input
                accept="image/*, video/*"
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
        </div>
      </div>
    </form>
  );
};

export default CreatePostModal;
