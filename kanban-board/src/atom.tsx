import { atom, selector } from "recoil";

interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    to_do: [
      "세기말풋사과",
      "치즈인더트랩",
      "순정망화",
      "내가 죽기로 결심한 것은",
      "먹이",
      "전지적 독자 시점",
    ],
    doing: [],
    done: [],
  },
  // default: ["a", "b", "c", "d", "e", "f"],
});
