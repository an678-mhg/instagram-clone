import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useQueryParams from "../../hooks/useQueryParams";
import { Layout } from "../../types";

const AuthLayout = ({ children }: Layout) => {
  const { user } = useContext(AuthContext);
  const queryParams = useQueryParams();

  if (user) {
    return <Navigate to={queryParams.get("redirect") || "/"} />;
  }

  return <>{children}</>;
};

export default AuthLayout;
