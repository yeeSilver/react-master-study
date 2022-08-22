import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";
import { IToDo, toDoState } from "../atom";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 10px;
  min-height: 200px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.3rem;
  font-weight: 700;
  /* color: #444; */
  color: #7294d4;
`;

const Area = styled.div<IAreaProps>`
  flex-grow: 1;
  padding: 20px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#FFDEDE"
      : props.draggingFromThisWith
      ? "#8da6d6"
      : "#7294d4"};
  transition: background-color 0.3s ease-in-out;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IAreaProps {
  draggingFromThisWith: boolean;
  isDraggingOver: boolean;
}

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

export default function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    //toDo의 인풋 발류를 빈칸으로 만들어주도록.
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((todo, index) => (
              <DragabbleCard
                key={todo.id}
                toDoId={todo.id}
                index={index}
                toDoText={todo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
