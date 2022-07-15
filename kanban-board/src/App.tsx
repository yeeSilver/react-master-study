import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 100vh;
`;
const Board = styled.article`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 10px;
  min-height: 200px;
`;
const Card = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 5px;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;
const todos = [
  "세기말풋사과",
  "치즈인더트랩",
  "내가 죽기로 결심한 것은",
  "순정망화",
];
export default function App() {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {todos.map((todo, index) => (
                  <Draggable draggableId={todo} index={index}>
                    {(magic) => (
                      <Card
                        ref={magic.innerRef}
                        {...magic.draggableProps}
                        {...magic.dragHandleProps}
                      >
                        <span {...magic.dragHandleProps}>🍅</span>
                        {todo}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}
