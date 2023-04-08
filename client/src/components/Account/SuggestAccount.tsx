import { useQuery } from "react-query";
import { getSuggestAccount } from "../../services/follow";
import { accountKey } from "../../utils/react-query-key";
import AccountSkeleton from "../Skeleton/AccountSkeleton";
import AccountItem from "./AccountItem";
import AccountProfile from "./AccountProfile";

const SuggestAccount = () => {
  const { data, isLoading, isError, isFetching } = useQuery(
    [accountKey.GET_SUGGEST_ACCOUNT],
    getSuggestAccount
  );

  if (isError) {
    return <h1>Failed to load post</h1>;
  }

  return (
    <div className="flex-1 ml-[64px] xl:block hidden">
      <AccountProfile />
      <div className="mt-2">
        <h1 className="text-[16px] font-semibold px-4 text-black">
          Suggestions for you
        </h1>
        <div className="mt-2">
          {isLoading &&
            Array.from(Array(5).keys()).map((item) => (
              <AccountSkeleton key={item} />
            ))}

          {data?.map((account) => (
            <AccountItem
              isFetching={isFetching}
              key={account._id}
              account={account}
            />
          ))}
        </div>
      </div>
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
  );
};

export default SuggestAccount;
