import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { snapshot_UNSTABLE } from "recoil";
import styled from "styled-components";
const Card = styled.div<{ isDragging: boolean }>`
  padding: 10px;
  margin-bottom: 10px;
  color: ${(props) => (props.isDragging ? "whitesmoke" : "black")};
  background-color: ${(props) =>
    props.isDragging ? "#ED86B3" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging
      ? " 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
      : "none"};
  border-radius: 5px;
`;
interface IDraggableCardProps {
  toDo: string;
  index: number;
}
function DragabbleCard({ toDo, index }: IDraggableCardProps) {
  return (
    //보통 key는 index로 주어지는 경우가 많지만 이 경우에는 draggableId와 key가 동일해야 함.
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          <span {...magic.dragHandleProps}>💡</span>
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DragabbleCard);
