import { CircularProgress } from "react-cssfx-loading";
import { InView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import SuggestAccount from "../components/Account/SuggestAccount";
import NoPostYet from "../components/NoPostYet";
import PostItem from "../components/Post/PostItem";
import PostSkeleton from "../components/Skeleton/PostSkeleton";
import { getPosts } from "../services/posts";
import { Post } from "../types/posts";
import { postKey } from "../utils/react-query-key";

const Home = () => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    [postKey.GET_HOME_FEED],
    (page) => getPosts(5, page, "feed"),
    {
      getNextPageParam: (lastPage) => lastPage?.nextSkip,
    }
  );

  if (isError) {
    return <p>Failed to load data...</p>;
  }

  return (
    <div className="xl:w-[917px] max-w-full py-8 flex">
      <div className="md:w-[470px] max-w-full">
        <div>
          {isLoading && <PostSkeleton />}

          {data?.pages?.length === 0 ||
            (data?.pages[0]?.posts?.length === 0 && <NoPostYet />)}

          {data?.pages
            ?.reduce((curr, page) => {
              // @ts-ignore
              curr.push(...page.posts);
              return curr;
            }, [] as Post[])
            .map((post, index) => (
              <PostItem
                limit={5}
                index={index}
                key={post._id}
                post={post}
                isFetching={isFetching}
              />
            ))}

          <InView
            fallbackInView
            onChange={(InVidew) => {
              if (InVidew && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
          >
            {({ ref }) => (
              <div
                ref={ref}
                className="mt-4 flex w-full items-center justify-center"
              >
                {isFetchingNextPage && <CircularProgress />}
              </div>
            )}
          </InView>
        </div>
      </div>

      <SuggestAccount />
    </div>
  );
};

export default Home;
