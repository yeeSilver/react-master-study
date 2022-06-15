import React, { useState } from "react";
import { useForm } from "react-hook-form";

/* export default function ToDoList() {
  const [todo, setTodo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    //event의 currentarget 내부 value를 구조분해할당으로 가져옴
    const {
      currentTarget: { value },
    } = event;
    setTodo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(todo);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={todo} onChange={onChange} placeholder="Write a to do" />
        <button>➕</button>
      </form>
    </div>
  );
} */
interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  // username은 required가 아니라서 ?을 넣어줘야함.
  username?: string;
  password: string;
  confirm_password: string;
  extraError?: string;
}

export default function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    //디폴트값으로 인풋 창 안에 미리 출력할 요소
    defaultValues: {
      email: "gmail.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.confirm_password) {
      setError(
        "confirm_password",
        { message: "Password are not matched" },
        { shouldFocus: true }
      );
    }
    setError("extraError", { message: "Server offline" });
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@gmail.com$/,
              message: "Only gmail.com is allowed",
            },
          })}
          placeholder="Write email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", {
            required: "this is empty",
            validate: {
              noStyles: (value) =>
                value.includes("Styles") ? "no Styles allowed" : true,
              noHarry: (value) =>
                value.includes("Harry") ? "no Harry allowed" : true,
            },
          })}
          placeholder="Write first name"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", { required: "this is empty" })}
          placeholder="Write last name"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...(register("username"), { required: false })}
          placeholder="Write user name"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "be at least 8 characters",
            },
          })}
          placeholder="Write password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("confirm_password", {
            required: "confirm_password should be matched with pwd",
            minLength: {
              value: 8,
              message: "should be matched with password",
            },
          })}
          placeholder="Write password"
        />
        <button>➕</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}
