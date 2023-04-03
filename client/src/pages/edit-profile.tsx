import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { editProfile } from "../services/users";
import { toast } from "react-hot-toast";

export interface changeProfileFormValue {
  username: string;
  fullname: string;
  bio: string;
  website: string;
  phone: string;
}

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: user?.username,
      fullname: user?.fullname,
      bio: user?.bio,
      website: user?.website,
      phone: user?.phone,
    },
  });

  const { mutateAsync, isLoading } = useMutation(editProfile, {
    onSuccess: (_, body) => {},
    onError: () => {
      toast.error("Edit profile failed");
    },
  });

  const submitForm = (values: any) => {};

  return (
    <div className="pt-4 md:py-4 py-10">
      <h1 className="text-lg font-semibold md:text-left text-center">
        Edit Profile
      </h1>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col justify-center items-center md:px-0 px-4 mt-3"
      >
        <div className="md:w-[500px] w-full">
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar}
              className="w-10 h-10 rounded-full"
              loading="lazy"
            />
            <div>
              <h3 className="text-sm">{user?.username}</h3>
              <input type="file" hidden id="change-avatar" />
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
                className="px-2 py-1.5 mt-2 bg-gray-300 w-full max-w-full text-sm rounded-sm"
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
                className="px-2 py-1.5 mt-2 bg-gray-300 w-full max-w-full text-sm rounded-sm"
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
                className="px-2 py-1.5 mt-2 bg-gray-300 w-full max-w-full text-sm rounded-sm"
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
                className="px-2 py-1.5 mt-2 bg-gray-300 w-full max-w-full text-sm rounded-sm"
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
                })}
                rows={4}
                className="px-2 py-1.5 mt-2 bg-gray-300 w-full max-w-full text-sm rounded-sm"
                placeholder="Bio"
                style={{ resize: "none" }}
              />
              {errors?.bio?.message && (
                <span className="mt-3 text-xs text-red-500">
                  {errors?.bio?.message}
                </span>
              )}
            </div>
          </div>
          <button className="text-sm rounded-sm px-4 py-1.5 w-full max-w-full mt-3 bg-blue-500 text-white">
            Change Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
