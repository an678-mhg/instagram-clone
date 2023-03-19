import { Response } from "../types";
import { User } from "./posts";

export interface SuggestAccount extends Response {
  account: User[];
}
