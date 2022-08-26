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
  font-weight: 400;
`;
interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}
function DragabbleCard({ toDoId, toDoText, index }: IDraggableCardProps) {
  return (
    // draggableId는 stirng이어야 하기 때문에 toDoId(number) + "" 로 string으로 변환해줌
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          <span {...magic.dragHandleProps}>{toDoText}</span>
          {/* {toDoText} */}
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DragabbleCard);
