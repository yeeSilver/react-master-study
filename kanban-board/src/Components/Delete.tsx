import React from "react";
import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";
import { deleteState } from ".././atom";
import { useSetRecoilState } from "recoil";

const Trash = styled.div`
  font-size: 2rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: none;
  cursor: pointer;
  &:hover {
    transform: scale(2.5);
  }
  padding: 20px;
`;

interface ITrashProps {
  // toDos: IToDo[];
  deleteId: string;
}

export default function Delete({ deleteId }: ITrashProps) {
  const setDel = useSetRecoilState(deleteState);
  const onDeleteClick = () => {
    console.log(setDel);
  };
  return (
    // <Droppable droppableId="DELETE">{() => <Trash>🗑️</Trash>}</Droppable>
    <Droppable droppableId={deleteId}>
      {() => <Trash onClick={onDeleteClick}>🗑️</Trash>}
    </Droppable>
  );
}
