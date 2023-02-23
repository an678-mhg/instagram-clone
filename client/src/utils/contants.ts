import Create from "../assets/icons/Create";
import Explore from "../assets/icons/Explore";
import Home from "../assets/icons/Home";
import Message from "../assets/icons/Message";
import Notification from "../assets/icons/Notification";
import Reels from "../assets/icons/Reels";
import Search from "../assets/icons/Search";
import { Sidebar } from "../types";

export const sidebars: Sidebar[] = [
  {
    icons: Home,
    title: "Home",
    href: "/",
  },
  {
    icons: Search,
    title: "Search",
    href: "/search",
    hiddenIconWhenMobile: true,
  },
  {
    icons: Explore,
    title: "Explore",
    href: "/explore",
  },
  {
    icons: Reels,
    title: "Reels",
    href: "/reels",
  },
  {
    icons: Message,
    title: "Messages",
    href: "/messages",
  },
  {
    icons: Notification,
    title: "Notification",
    href: "/notification",
    hiddenIconWhenMobile: true,
  },
  {
    icons: Create,
    title: "Create",
    href: "/create",
  },
];

export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";
