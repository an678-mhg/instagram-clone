import AccountItem from "../components/Account/AccountItem";
import AccountProfile from "../components/Account/AccountProfile";
import MainLayout from "../components/Layout/MainLayout";
import PostItem from "../components/Post/PostItem";
import StoryItem from "../components/StoryItem";

const Home = () => {
  return (
    <MainLayout>
      <div className="xl:w-[917px] max-w-full py-8 flex">
        {/* List Post */}
        <div className="md:w-[470px] max-w-full">
          {/* <div className="mb-8 flex items-center justify-between md:px-0 px-2">
            <StoryItem />
            <StoryItem />
            <StoryItem />
            <StoryItem />
            <StoryItem />
          </div> */}
          {/* Post Item */}
          <div>
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
          </div>
        </div>
        {/* Suggested Account */}
        <div className="flex-1 ml-[64px] xl:block hidden">
          <AccountProfile />
          <div className="mt-6">
            <h1 className="text-[16px] font-semibold px-4 text-black">
              Suggestions for you
            </h1>
            <div className="mt-3">
              <AccountItem />
              <AccountItem />
              <AccountItem />
              <AccountItem />
              <AccountItem />
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
