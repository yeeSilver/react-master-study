import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

export default function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValue = (data: IForm) => {
    console.log(data.toDo);
    setValue("toDo", "");
  };
  return (
    <div>
      <h1>📑TO Do List</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValue)}>
        <input
          {...register("toDo", {
            required: "Warning: This is empty",
          })}
          placeholder="Write a to do"
        />
        <button>➕</button>
      </form>
      <ul></ul>
    </div>
  );
}
