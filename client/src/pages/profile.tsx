import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUserInfoById } from "../services/users";
import { usersKey } from "../utils/react-query-key";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PostExplore from "../components/Post/PostExplore";
import ProfileSkeleton from "../components/Skeleton/ProfileSkeleton";
import { AiOutlineLink, AiOutlineMail } from "react-icons/ai";
import { followUser } from "../services/follow";
import { ProfileResponse } from "../types/users";
import ListMyPost from "../components/Post/ListMyPost";

const Profile = () => {
  const { _id } = useParams();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    isError,
    isFetching,
  } = useQuery([usersKey.GET_INFO(_id as string)], () =>
    getUserInfoById(_id as string)
  );

  const { mutateAsync, isLoading: followUserLoading } = useMutation(followUser);

  const handleFollowUser = () => {
    if (user?._id === _id) return;

    const key = usersKey.GET_INFO(_id as string);

    const newData = queryClient.getQueryData([key]) as ProfileResponse;

    newData.user.is_follow = !newData.user.is_follow;

    queryClient.setQueryData([key], newData);

    mutateAsync(_id as string);
  };

  if (isError) {
    return <p>Failed to load data...</p>;
  }

  if (isLoading || !profile) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="xl:w-[950px] w-full md:mt-8 mt-4">
      <div className="w-full border-b border-[#262626] md:pb-8 pb-4">
        <div className="flex items-center md:space-x-16 space-x-4 md:px-16 px-4">
          <img
            loading="lazy"
            src={profile?.user?.avatar}
            className="md:w-[150px] md:h-[150px] w-[80px] h-[80px] rounded-full"
          />
          <div className="flex-1">
            <div className="flex md:space-x-4 md:space-y-0 space-y-2 md:items-center flex-col md:flex-row">
              <h3 className="font-semibold text-lg">
                {profile?.user?.username}
              </h3>
              {user?._id === profile?.user?._id ? (
                <Link
                  to="/edit-profile"
                  className="px-4 py-1.5 rounded-md inline bg-[#333] font-semibold text-sm"
                >
                  Edit profile
                </Link>
              ) : (
                <div className="space-x-4 md:mt-0 mt-3">
                  <button
                    onClick={handleFollowUser}
                    disabled={followUserLoading || isFetching}
                    className={`px-4 py-1.5 rounded-md ${
                      !profile.user.is_follow
                        ? "text-white bg-blue-500"
                        : "text-white bg-[#222]"
                    } font-semibold text-sm`}
                  >
                    {profile.user?.is_follow ? "Following" : "Follow"}
                  </button>
                  <button className="px-4 py-1.5 rounded-md bg-[#333] font-semibold text-sm">
                    Message
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center md:space-x-10 space-x-6 mt-3">
              <p className="font-semibold text-sm flex md:flex-row flex-col justify-center items-center">
                {profile?.user?.post_count}{" "}
                <span className="font-normal md:ml-2">posts</span>
              </p>
              <p className="font-semibold text-sm flex md:flex-row flex-col justify-center items-center">
                {profile?.user?.followers_count}{" "}
                <span className="font-normal md:ml-2">followers</span>
              </p>
              <p className="font-semibold text-sm flex md:flex-row flex-col justify-center items-center">
                {profile?.user?.following_count}{" "}
                <span className="font-normal md:ml-2">following</span>
              </p>
            </div>
            <h4 className="font-semibold text-sm mt-4">
              {profile?.user?.fullname}
            </h4>
            {profile?.user?.email && (
              <div className="flex items-center space-x-2">
                <p className="text-sm font-normal">{profile.user?.email}</p>
                <a href={`mailto:${profile?.user?.email}`}>
                  <AiOutlineMail size={20} />
                </a>
              </div>
            )}
            <div className="mt-2">
              {profile.user?.bio && (
                <p className="text-sm font-normal">{profile.user?.bio}</p>
              )}

              {profile.user?.website && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={profile.user?.website}
                  className="text-sm flex items-center space-x-2 font-normal text-blue-500 underline"
                >
                  <AiOutlineLink /> <span>Visit my website</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <ListMyPost _id={_id as string} />
    </div>
  );
};

export default Profile;
