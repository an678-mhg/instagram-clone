import { useQuery } from "react-query";
import { getMyPost, getUserInfoById } from "../services/users";
import { usersKey } from "../utils/react-query-key";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PostExplore from "../components/Post/PostExplore";
import ProfileSkeleton from "../components/Skeleton/ProfileSkeleton";

const Profile = () => {
  const { _id } = useParams();
  const { user } = useContext(AuthContext);

  const { data, isLoading, isError } = useQuery(
    [usersKey.GET_INFO(_id as string)],
    () =>
      Promise.all([getUserInfoById(_id as string), getMyPost(_id as string)])
  );

  if (isLoading || !data) {
    return <ProfileSkeleton />;
  }

  if (isError) {
    return <p>Failed to load data...</p>;
  }

  const [profile, posts] = data;

  return (
    <div className="xl:w-[950px] w-full md:mt-8 mt-4">
      <div className="w-full border-b border-gray-200 md:pb-8 pb-4">
        <div className="flex items-center md:space-x-16 space-x-4 md:px-16 px-4">
          <img
            loading="lazy"
            src={profile?.user?.avatar}
            className="md:w-[150px] md:h-[150px] w-[80px] h-[80px] rounded-full"
          />
          <div className="flex-1">
            <div className="flex md:space-x-4 md:items-center flex-col md:flex-row">
              <h3 className="font-semibold text-lg">
                {profile?.user?.username}
              </h3>
              {user?._id === profile?.user?._id ? (
                <Link
                  to="/edit-profile"
                  className="px-4 mt-2 py-1.5 rounded-md bg-gray-200 font-semibold text-sm"
                >
                  Edit profile
                </Link>
              ) : (
                <div className="space-x-4 md:mt-0 mt-3">
                  <button className="px-4 text-white py-1.5 rounded-md bg-blue-400 font-semibold text-sm">
                    Follow
                  </button>
                  <button className="px-4 py-1.5 rounded-md bg-gray-200 font-semibold text-sm">
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
            <div className="mt-2">
              {profile.user?.bio && (
                <p className="text-sm font-normal">{profile.user?.bio}</p>
              )}
              {profile.user?.website && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={profile.user?.website}
                  className="text-sm font-normal text-blue-500 underline line-clamp-1"
                >
                  {profile.user?.website}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-1 py-5">
        {posts?.posts?.map((post) => (
          <PostExplore key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
