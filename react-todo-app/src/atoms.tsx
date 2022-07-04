import { atom, selector } from "recoil";

type categories = "TO_DO" | "DOING" | "DONE";

export interface IToDo {
  text: string;
  id: number;
  //string중에서도 이 세개 중 하나에 해당해야 함
  category: categories;
}
//할일을 처음 등록할때 정할 수 있는 카테고리
export const categoryState = atom<categories>({
  key: "category",
  default: "TO_DO",
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    //이렇게 하면 toDos에 모든 toDo(toDoState의 값들)가 할당 됨
    const toDos = get(toDoState);
    const category = get(categoryState);
    /* if (category === "TO_DO")
      return toDos.filter((toDo) => toDo.category === "TO_DO");
    if (category === "DOING")
      return toDos.filter((toDo) => toDo.category === "DOING");
    if (category === "DONE")
      return toDos.filter((toDo) => toDo.category === "DONE"); 
    
    이 코드를 한 줄로 단축시키면  */
    return toDos.filter((toDo) => toDo.category === category);
  },
});
