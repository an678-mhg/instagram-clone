import { CircularProgress } from "react-cssfx-loading";
import { InView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import NoPostYet from "../components/NoPostYet";
import PostExplore from "../components/Post/PostExplore";
import { getPosts } from "../services/posts";
import { Post } from "../types/posts";
import { postKey } from "../utils/react-query-key";

const Explore = () => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [postKey.GET_EXPLORE],
    (page) => getPosts(9, page, "explore"),
    {
      getNextPageParam: (lastPage) => lastPage?.nextSkip,
    }
  );

  if (isError) {
    return <p>Failed to load data...</p>;
  }

  if (data?.pages?.length === 0 || data?.pages[0]?.posts?.length === 0) {
    return (
      <div className="mt-5">
        <NoPostYet />
      </div>
    );
  }

  return (
    <div className="xl:w-[950px] w-full xl:mt-5 mt-0 md:pb-0 pb-8">
      {isLoading && (
        <div className="w-full grid md:grid-cols-3 grid-cols-2 gap-1">
          {Array.from(Array(6).keys()).map((item) => (
            <div className="w-full aspect-square skeleton" key={item} />
          ))}
        </div>
      )}

      <div className="w-full grid md:grid-cols-3 grid-cols-2 gap-1">
        {data?.pages
          ?.reduce((curr, page) => {
            // @ts-ignore
            curr.push(...page.posts);
            return curr;
          }, [] as Post[])
          ?.map((post) => (
            <PostExplore key={post._id} post={post} />
          ))}
      </div>

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
            className="pt-5 flex w-full items-center justify-center"
          >
            {isFetchingNextPage && (
              <div className="mb-5">
                <CircularProgress color="#fff" />
              </div>
            )}
          </div>
        )}
      </InView>
    </div>
  );
};

export default Explore;
