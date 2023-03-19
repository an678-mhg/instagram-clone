export interface signInBody {
  email: string;
  password: string;
}

export interface signUpBody {
  email: string;
  password: string;
  username: string;
  fullname: string;
}

export interface refreshTokenBody {
  refreshToken: string;
}

export interface googleLoginBody {
  idTokens: string;
}

export interface addPostBody {
  caption: string;
  media: string[];
  post_type: "stories" | "posts";
  user_id: string;
}

export interface likePostBody {
  post_id: string;
}

export interface addCommentBody {
  post_id: string;
  comment: string;
}
