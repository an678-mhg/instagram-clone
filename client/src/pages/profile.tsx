import { useQuery } from "react-query";
import { getMyPost, getUserInfoById } from "../services/users";
import { usersKey } from "../utils/react-query-key";
import { useParams } from "react-router-dom";
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
    <div className="xl:w-[950px] w-full mt-8">
      <div className="w-full border-b border-gray-200 pb-8">
        <div className="flex md:space-x-16 space-x-4 md:ml-16 ml-4">
          <img
            loading="lazy"
            src={profile?.user?.avatar}
            className="w-[150px] h-[150px] rounded-full"
          />
          <div>
            <div className="flex space-x-4 items-center">
              <h3 className="font-semibold text-lg">
                {profile?.user?.username}
              </h3>
              {user?._id === profile?.user?._id ? (
                <button className="px-4 py-1.5 rounded-md bg-gray-200 font-semibold text-sm">
                  Edit profile
                </button>
              ) : (
                <div className="space-x-4">
                  <button className="px-4 text-white py-1.5 rounded-md bg-blue-400 font-semibold text-sm">
                    Follow
                  </button>
                  <button className="px-4 py-1.5 rounded-md bg-gray-200 font-semibold text-sm">
                    Message
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-10 mt-3">
              <p className="font-semibold text-sm">
                {profile?.user?.post_count}{" "}
                <span className="font-normal">posts</span>
              </p>
              <p className="font-semibold text-sm">
                {profile?.user?.followers_count}{" "}
                <span className="font-normal">followers</span>
              </p>
              <p className="font-semibold text-sm">
                {profile?.user?.following_count}{" "}
                <span className="font-normal">following</span>
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
                  className="text-sm font-normal text-blue-500 underline"
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
