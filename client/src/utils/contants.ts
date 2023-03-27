import Create from "../assets/icons/Create";
import Explore from "../assets/icons/Explore";
import Home from "../assets/icons/Home";
import Message from "../assets/icons/Message";
import Reels from "../assets/icons/Reels";
import { Sidebar } from "../types";

export const sidebars: Sidebar[] = [
  {
    icons: Home,
    title: "Home",
    href: "/",
  },
  {
    icons: Explore,
    title: "Explore",
    href: "/explore",
  },
  {
    icons: Reels,
    title: "Stories",
    href: "/reels",
  },
  {
    icons: Message,
    title: "Messages",
    href: "/messages",
  },
];
export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";
