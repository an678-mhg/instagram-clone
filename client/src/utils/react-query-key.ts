export const postKey = {
  GET_HOME_FEED: "GET_HOME_FEED",
  GET_EXPLORE: "GET_EXPLORE",
  GET_DETAIL_POST: (_id: string) => `GET_DETAIL_POST_${_id}`,
};

export const accountKey = {
  GET_SUGGEST_ACCOUNT: "GET_SUGGEST_ACCOUNT",
};
