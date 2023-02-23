import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../components/Layout/AuthLayout";
import ProtecedLayout from "../components/Layout/ProtecedLayout";
import Home from "../pages";
import Explore from "../pages/explore";
import Search from "../pages/search";
import SignIn from "../pages/signin";

const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtecedLayout>
        <Home />
      </ProtecedLayout>
    ),
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/explore",
    element: <Explore />,
  },
  {
    path: "/signin",
    element: (
      <AuthLayout>
        <SignIn />
      </AuthLayout>
    ),
  },
]);

export default routers;
