import { useLocation } from "react-router-dom";

const useQueryParams = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  return queryParams;
};

export default useQueryParams;
