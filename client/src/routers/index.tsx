import { createBrowserRouter } from "react-router-dom";
// Layout
import AuthLayout from "../components/Layouts/AuthLayout";
import MainLayout from "../components/Layouts/MainLayout";
import ProtecedLayout from "../components/Layouts/ProtecedLayout";
import { lazy } from "react";
// Pages
const Home = lazy(() => import("../pages"));
const Active = lazy(() => import("../pages/active"));
const Explore = lazy(() => import("../pages/explore"));
const Forgot = lazy(() => import("../pages/forgot"));
const Post = lazy(() => import("../pages/post"));
const Profile = lazy(() => import("../pages/profile"));
const Search = lazy(() => import("../pages/search"));
const SignIn = lazy(() => import("../pages/signin"));
const SignUp = lazy(() => import("../pages/signup"));
const Stories = lazy(() => import("../pages/stories"));
const EditProfile = lazy(() => import("../pages/edit-profile"));
const Messages = lazy(() => import("../pages/messages"));

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
  {
    path: "/messages",
    element: (
      <ProtecedLayout>
        <MainLayout>
          <Messages />
        </MainLayout>
      </ProtecedLayout>
    ),
  },
]);

export default routers;
