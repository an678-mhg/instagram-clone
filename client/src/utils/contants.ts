import Explore from "../icons/Explore";
import Home from "../icons/Home";
import Message from "../icons/Message";
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
    icons: Message,
    title: "Messages",
    href: "/messages",
  },
];
export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";

const urlExpression =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

export const parseLinkDescription = (text: string) => {
  const result = text
    ?.split(" ")
    ?.map((item) => {
      if (item.match(urlExpression)) {
        return `<a class="hover:underline text-blue-500" target="_blank" href=${
          item.startsWith("https://") ? item : `https://${item}`
        }>${item}</a>`;
      }
      return item;
    })
    ?.join(" ");
  return result;
};
