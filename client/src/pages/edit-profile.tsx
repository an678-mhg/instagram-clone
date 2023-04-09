import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { editProfile } from "../services/users";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import checkFile from "../utils/checkFile";
import uploadFile from "../utils/upload";

export interface changeProfileFormValue {
  username: string;
  fullname: string;
  bio: string;
  website: string;
  phone: string;
}

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [file, setFile] = useState<File | null>(null);
  const [previewFile, setPreviewFile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      previewFile && URL.revokeObjectURL(previewFile);
    };
  }, [previewFile]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      username: user?.username,
      fullname: user?.fullname,
      bio: user?.bio,
      website: user?.website,
      phone: user?.phone,
    },
  });

  const { mutateAsync } = useMutation(editProfile);

  const submitForm = async (values: any) => {
    if (!user) return;
    let toastId = toast.loading("Loading....");
    setLoading(true);

    try {
      let newAvatarUrl: string = "";

      if (file) {
        newAvatarUrl = await uploadFile(file);
      }

      await mutateAsync({ ...values, avatar: newAvatarUrl || user.avatar });

      setUser((prev) => ({
        ...prev,
        ...values,
        avatar: newAvatarUrl || user.avatar,
      }));

      navigate(`/profile/${user._id}`);

      toast.success("Edit profile success", { id: toastId });
    } catch (error) {
      toast.error("Edit profile failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!checkFile("image", 5, file)) {
      return toast.error("Only accepts image file and file cannot exceed 5MB");
    }

    const previewFile = URL.createObjectURL(file);
    setPreviewFile(previewFile);
    setFile(file);
  };

  return (
    <div className="pt-4 md:py-4 py-10 w-full md:w-[500px]">
      <h1 className="text-2xl font-medium text-center">Edit Profile</h1>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col justify-center items-center md:px-0 px-4 mt-5 w-full"
      >
        <div className="w-full">
          <div className="flex items-center space-x-3">
            <img
              src={previewFile || user?.avatar}
              className="w-10 h-10 rounded-full object-cover"
              loading="lazy"
            />
            <div>
              <h3 className="text-sm">{user?.username}</h3>
              <input
                onChange={handleFileChange}
                type="file"
                hidden
                id="change-avatar"
              />
              <label
                htmlFor="change-avatar"
                className="text-sm cursor-pointer text-blue-500"
              >
                Change profile photo
              </label>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold">Username</p>
            <div className="flex-1">
              <input
                {...register("username", {
                  required: { value: true, message: "Username is required!" },
                })}
                className="px-2 py-1.5 mt-2 bg-[#222] w-full max-w-full text-sm rounded-sm"
                placeholder="Username"
              />
              {errors?.username?.message && (
                <span className="mt-3 text-xs text-red-500">
                  {errors?.username?.message}
                </span>
              )}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold">Fullname</p>
            <div className="flex-1">
              <input
                {...register("fullname", {
                  required: { value: true, message: "Fullname is required!" },
                })}
                className="px-2 py-1.5 mt-2 bg-[#222] w-full max-w-full text-sm rounded-sm"
                placeholder="Fullname"
              />
              {errors?.fullname?.message && (
                <span className="mt-3 text-xs text-red-500">
                  {errors?.fullname?.message}
                </span>
              )}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold">Website</p>
            <div className="flex-1">
              <input
                {...register("website", {
                  required: { value: true, message: "Website is required!" },
                })}
                className="px-2 py-1.5 mt-2 bg-[#222] w-full max-w-full text-sm rounded-sm"
                placeholder="Website"
              />
              {errors?.website?.message && (
                <span className="mt-3 text-xs text-red-500">
                  {errors?.website?.message}
                </span>
              )}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold">Phone number</p>
            <div className="flex-1">
              <input
                {...register("phone", {
                  required: { value: true, message: "Phone is required!" },
                })}
                className="px-2 py-1.5 mt-2 bg-[#222] w-full max-w-full text-sm rounded-sm"
                placeholder="Phone number"
              />
              {errors?.phone?.message && (
                <span className="mt-3 text-xs text-red-500">
                  {errors?.phone?.message}
                </span>
              )}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold">Bio</p>
            <div className="flex-1">
              <textarea
                {...register("bio", {
                  required: { value: true, message: "Bio is required!" },
                  maxLength: {
                    value: 100,
                    message: "Bio should not exceed 100 characters",
                  },
                })}
                rows={4}
                className="px-2 py-1.5 mt-2 bg-[#222] w-full max-w-full text-sm rounded-sm"
                placeholder="Bio"
                style={{ resize: "none" }}
              />
              {errors?.bio?.message && (
                <span className="mt-3 text-xs text-red-500">
                  {errors?.bio?.message}
                </span>
              )}
              <p className="text-right text-xs font-normal">
                {getValues("bio")?.length} / 100
              </p>
            </div>
          </div>
          <button
            disabled={loading}
            className="text-sm rounded-sm px-4 py-1.5 w-full max-w-full mt-3 bg-blue-500 text-white"
          >
            Change Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
