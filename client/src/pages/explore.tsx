import { CircularProgress } from "react-cssfx-loading";
import { InView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
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
    (page) => getPosts(6, page, "explore"),
    {
      getNextPageParam: (lastPage) => lastPage?.nextSkip,
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load data...</p>;
  }

  if (data?.pages?.length === 0 || data?.pages[0]?.posts?.length === 0) {
    return <div className="flex-grow text-center">There is no posts yet</div>;
  }

  return (
    <div className="xl:w-[1050px] max-w-full mt-5">
      <div className="w-full grid grid-cols-3 gap-1">
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
            className="mt-5 flex w-full items-center justify-center"
          >
            {isFetchingNextPage && <CircularProgress />}
          </div>
        )}
      </InView>
    </div>
  );
};

export default Explore;
