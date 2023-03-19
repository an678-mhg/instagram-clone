import { useQuery } from "react-query";
import AccountItem from "../components/Account/AccountItem";
import AccountProfile from "../components/Account/AccountProfile";
import MainLayout from "../components/Layout/MainLayout";
import PostItem from "../components/Post/PostItem";
import { getSuggestAccount } from "../services/follow";
import { getPosts } from "../services/posts";
import postKey from "../utils/react-query-key";

const Home = () => {
  const { data, isLoading, isError } = useQuery([postKey.GET_HOME_FEED], () =>
    Promise.all([getPosts(5, 0), getSuggestAccount()])
  );

  console.log(data);

  return (
    <MainLayout>
      <div className="xl:w-[917px] max-w-full py-8 flex">
        <div className="md:w-[470px] max-w-full">
          {isLoading && <p>Loading...</p>}

          <div>
            {data &&
              data[0]?.posts?.map((post) => (
                <PostItem post={post} key={post._id} />
              ))}
          </div>
        </div>
        <div className="flex-1 ml-[64px] xl:block hidden">
          <AccountProfile />
          <div className="mt-6">
            <h1 className="text-[16px] font-semibold px-4 text-black">
              Suggestions for you
            </h1>
            <div className="mt-3">
              {data &&
                data[1]?.account?.map((account) => (
                  <AccountItem key={account._id} account={account} />
                ))}
            </div>
          </div>
          <button className="text-sm text-blue-500 px-4 py-2 font-semibold">
            See all
          </button>
          <div className="px-4 py-1">
            <p className="text-xs text-gray-400">
              © 2023 INSTAGRAM CLONE FROM{" "}
              <a
                className="text-blue-500 underline"
                href="https://github.com/an678-mhg"
              >
                an678-mhg
              </a>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
