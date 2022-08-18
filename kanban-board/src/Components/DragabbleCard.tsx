import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
const Card = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.cardColor};
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
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          <span {...magic.dragHandleProps}>🍅</span>
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DragabbleCard);
