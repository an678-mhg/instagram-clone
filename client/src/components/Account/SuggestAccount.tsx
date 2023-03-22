import { useQuery } from "react-query";
import { getSuggestAccount } from "../../services/follow";
import { accountKey } from "../../utils/react-query-key";
import AccountItem from "./AccountItem";
import AccountProfile from "./AccountProfile";

const SuggestAccount = () => {
  const { data, isLoading, isError, isFetching } = useQuery(
    [accountKey.GET_SUGGEST_ACCOUNT],
    getSuggestAccount
  );

  return (
    <div className="flex-1 ml-[64px] xl:block hidden">
      <AccountProfile />
      <div className="mt-6">
        <h1 className="text-[16px] font-semibold px-4 text-black">
          Suggestions for you
        </h1>
        <div className="mt-3">
          {isLoading && <p>LOading...</p>}
          {data?.map((account) => (
            <AccountItem
              isFetching={isFetching}
              key={account._id}
              account={account}
            />
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
  );
};

export default SuggestAccount;
