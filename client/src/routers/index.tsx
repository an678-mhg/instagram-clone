import { createBrowserRouter } from "react-router-dom";
import Home from "../pages";
import Explore from "../pages/explore";
import Search from "../pages/search";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/explore",
    element: <Explore />,
  },
]);

export default routers;
