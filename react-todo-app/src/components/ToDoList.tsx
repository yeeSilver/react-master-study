import { useRecoilValue } from "recoil";
import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

export default function ToDoList() {
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h1>📑TO Do List</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          // <ToDo  text={toDo.text} category={toDo.category} id={toDo.id}/> 이걸 간단하게 줄이면 밑의 코드.
          //key안주면 에러남.
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}
