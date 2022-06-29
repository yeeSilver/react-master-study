import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";
interface IForm {
  toDo: string;
}
//toDo 리스트 수정
export default function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValue = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValue)}>
      <input
        {...register("toDo", {
          required: "Warning: This is empty",
        })}
        placeholder="Write a to do"
      />
      <button>➕</button>
    </form>
  );
}
