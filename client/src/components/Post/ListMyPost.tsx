import React from "react";
import { useInfiniteQuery } from "react-query";
import { postKey } from "../../utils/react-query-key";
import { getMyPost } from "../../services/users";
import NoPostYet from "../NoPostYet";
import { Post } from "../../types/posts";
import PostExplore from "./PostExplore";
import { InView } from "react-intersection-observer";
import { CircularProgress } from "react-cssfx-loading";

interface ListMyPostProps {
  _id: string;
}

const ListMyPost: React.FC<ListMyPostProps> = ({ _id }) => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [postKey.GET_MYPOST(_id)],
    (page) => getMyPost(_id, page),
    {
      getNextPageParam: (lastPage) => lastPage?.nextSkip,
    }
  );

  if (isError) {
    return <p>Failed to load data...</p>;
  }

  if (isLoading || !data) {
    return (
      <div className="w-full grid md:grid-cols-3 grid-cols-2 gap-1">
        {Array.from(Array(6).keys()).map((item) => (
          <div className="w-full aspect-square skeleton" key={item} />
        ))}
      </div>
    );
  }

  if (data?.pages?.length === 0 || data?.pages[0]?.posts?.length === 0) {
    return (
      <div className="mt-5">
        <NoPostYet />
      </div>
    );
  }
  return (
    <div>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-1 md:py-5">
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

export default ListMyPost;
