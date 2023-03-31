import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "10s",
  });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, process.env.REFRESH_JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

export const generateActiveToken = (payload: object) => {
  return jwt.sign(payload, process.env.ACTIVE_JWT_SECRET as string);
};
