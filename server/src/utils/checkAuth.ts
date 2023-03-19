import jwt from "jsonwebtoken";

const checkAuth = (header: string): string => {
  const decoded = header ? jwt.decode(header.split(" ")[1]) : { _id: null };
  return (decoded as any)._id;
};

export default checkAuth;
