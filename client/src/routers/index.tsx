import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../components/Layouts/AuthLayout";
import MainLayout from "../components/Layouts/MainLayout";
import ProtecedLayout from "../components/Layouts/ProtecedLayout";
import Home from "../pages";
import Active from "../pages/active";
import Explore from "../pages/explore";
import Forgot from "../pages/forgot";
import Post from "../pages/post";
import Profile from "../pages/profile";
import Search from "../pages/search";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";
import Stories from "../pages/stories";
import EditProfile from "../pages/edit-profile";

const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtecedLayout>
        <MainLayout>
          <Home />
        </MainLayout>
      </ProtecedLayout>
    ),
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/explore",
    element: (
      <ProtecedLayout>
        <MainLayout>
          <Explore />
        </MainLayout>
      </ProtecedLayout>
    ),
  },
  {
    path: "/signin",
    element: (
      <AuthLayout>
        <SignIn />
      </AuthLayout>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthLayout>
        <SignUp />
      </AuthLayout>
    ),
  },
  {
    path: "/active",
    element: (
      <AuthLayout>
        <Active />
      </AuthLayout>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthLayout>
        <Forgot />
      </AuthLayout>
    ),
  },
  {
    path: "/stories",
    element: (
      <ProtecedLayout>
        <Stories />
      </ProtecedLayout>
    ),
  },
  {
    path: "/post/:_id",
    element: (
      <ProtecedLayout>
        <Post />
      </ProtecedLayout>
    ),
  },
  {
    path: "/profile/:_id",
    element: (
      <ProtecedLayout>
        <MainLayout>
          <Profile />
        </MainLayout>
      </ProtecedLayout>
    ),
  },
  {
    path: "/edit-profile",
    element: (
      <ProtecedLayout>
        <MainLayout>
          <EditProfile />
        </MainLayout>
      </ProtecedLayout>
    ),
  },
]);

export default routers;
