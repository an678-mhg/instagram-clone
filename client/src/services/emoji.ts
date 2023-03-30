import axios from "axios";
import { Emoji } from "../types";

export const getEmoji = async () => {
  const response = await axios.get<Emoji[]>(
    `https://emoji-api.com/emojis?access_key=${
      import.meta.env.VITE_EMOJI_API_KEY
    }`
  );
  return response.data;
};
