import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Layout } from "../../types";

const ProtecedLayout = ({ children }: Layout) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <Navigate
        to={`/signin?redirect=${encodeURIComponent(location.pathname)}`}
      />
    );
  }

  return <>{children}</>;
};

export default ProtecedLayout;
