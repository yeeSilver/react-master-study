import { atom, selector } from "recoil";

export const toDoState = atom({
  key: "toDo",
  default: ["세기말풋사과", "치즈인더트랩", "순정망화"],
});
