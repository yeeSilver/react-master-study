import React from "react";
import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";

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
      ? "#899da4"
      : "#7294d4"};
  transition: background-color 0.3s ease-in-out;
`;

interface IAreaProps {
  draggingFromThisWith: boolean;
  isDraggingOver: boolean;
}

interface IBoardProps {
  toDos: string[];
  boardId: string;
}
export default function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((todo, index) => (
              <DragabbleCard key={todo} toDo={todo} index={index} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
