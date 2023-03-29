export const postKey = {
  GET_HOME_FEED: "GET_HOME_FEED",
  GET_EXPLORE: "GET_EXPLORE",
  GET_DETAIL_POST: (_id: string) => `GET_DETAIL_POST_${_id}`,
  GET_REPLY_COMMENT: (parent_id: string, show: boolean) =>
    `GET_REPLY_COMMENT_${parent_id}_${show}`,
};

export const accountKey = {
  GET_SUGGEST_ACCOUNT: "GET_SUGGEST_ACCOUNT",
};
