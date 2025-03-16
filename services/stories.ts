import { Story, StoryItem } from "@prisma/client";
import { instanceAxios } from "./instance";

export type IStory = Story & {
  items: StoryItem[]
}

export const getAll = async () => {
  const { data } = await instanceAxios.get<IStory[]>("/stories");

  return data;
};