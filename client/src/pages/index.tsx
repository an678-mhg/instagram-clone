import AccountItem from "../components/Account/AccountItem";
import MainLayout from "../components/layout/MainLayout";
import PostItem from "../components/Post/PostItem";

const Home = () => {
  return (
    <MainLayout>
      <div className="xl:w-[917px] max-w-full py-8 flex">
        {/* List Post */}
        <div className="md:w-[470px] max-w-full">
          {/* Post Item */}
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
        </div>
        {/* Suggested Account */}
        <div className="flex-1 ml-[64px] xl:block hidden">
          <AccountItem />
          <div className="mt-6">
            <h1 className="text-[16px] font-semibold px-4 text-black dark:text-white">
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
