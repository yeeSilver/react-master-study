import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  //여러개의 boads 안의 todo들 어레이
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    //to_do
    TODO: [],
    DOING: [],
    DONE: [],
  },
  // default: ["a", "b", "c", "d", "e", "f"],
});
