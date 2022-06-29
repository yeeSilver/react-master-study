import { atom } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  //string중에서도 이 세개 중 하나에 해당해야 함
  category: "TO_DO" | "DOING" | "DONE";
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
