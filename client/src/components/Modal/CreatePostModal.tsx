import { useContext, useEffect, useCallback, useRef } from "react";
import { BiArrowBack } from "react-icons/bi";
import VideoAndImage from "../../icons/VideoAndImage";
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
import checkFile from "../../utils/checkFile";
import EmojiTippy from "../Comment/EmojiTippy";
import { createNotification } from "../../services/notifications";

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
  const areaRef = useRef<HTMLTextAreaElement | null>(null);

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [showSelectEmoji, setShowSelectEmoji] = useState(false);

  const typingEmoji = useCallback((emoji: string) => {
    setFormData((prev) => ({ ...prev, caption: (prev.caption += emoji) }));
    areaRef.current?.focus();
  }, []);

  const setStatusEmoji = useCallback(() => {
    setShowSelectEmoji((prev) => !prev);
  }, []);

  useEffect(() => {
    return () => {
      formData?.files?.length > 0 &&
        formData?.files?.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [formData?.files?.length]);

  const { mutateAsync } = useMutation(addPost);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList);

    if (files.some((file) => !checkFile("image", 5, file))) {
      return toast.error("Only accepts image file and file cannot exceed 5MB");
    }

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

      const newPost = await mutateAsync({
        caption: formData.caption,
        media,
        post_type: formData.type,
        user_id: user?._id as string,
      });

      setIsOpen(false);

      queryClient.refetchQueries([postKey.GET_HOME_FEED]);

      createNotification({
        comment: null,
        message: "just created a new post",
        post: newPost?.post?._id,
        url: `/post/${newPost?.post?._id}`,
      });

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
      className={`w-[835px] max-w-full md:h-[540px] h-screen mx-auto overflow-hidden rounded-md bg-[#111] flex flex-col`}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#262626] cursor-pointer">
        <BiArrowBack onClick={() => setIsOpen(false)} className="text-2xl" />
        <h1 className="font-semibold">Create new {formData.type}</h1>
        <button disabled={loading} className="font-semibold text-blue-500">
          Share
        </button>
      </div>

      <div className="w-full flex-1 flex md:flex-row flex-col h-full overflow-hidden">
        <div className="md:w-[60%] overflow-hidden relative flex justify-center items-center md:h-full h-auto aspect-square md:py-0 flex-col">
          {formData?.files?.length > 0 ? (
            <ImageSlide media={formData?.files?.map((file) => file.preview)} />
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
        </div>
        <div className="p-4 flex-1 flex flex-col border-l md:border-t-0 border-t border-[#262626]">
          <div className="flex items-center">
            <img
              loading="lazy"
              src={user?.avatar}
              className="w-8 h-8 rounded-full"
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
            ref={areaRef}
            style={{ resize: "none" }}
            placeholder="Write a caption..."
            className="outline-none text-sm w-full text-white mt-3 flex-1 bg-transparent mb-2"
          />
          <EmojiTippy
            setShowSelectEmoji={setStatusEmoji}
            typingEmoji={typingEmoji}
            showSelectEmoji={showSelectEmoji}
          />
        </div>
      </div>
    </form>
  );
};

export default CreatePostModal;
