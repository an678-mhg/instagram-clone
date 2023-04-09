import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import Slash from "./components/Slash";
import { AuthContext } from "./context/AuthContext";
import useUserInfomation from "./hooks/useUserInfomation";
import routers from "./routers";

function App() {
  const { user } = useContext(AuthContext);

  useUserInfomation();

  if (typeof user === "undefined") {
    return <Slash />;
  }

  return <RouterProvider router={routers} />;
}
export default App;
