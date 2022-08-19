import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atom";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

export default function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  // onDragEnd 드래그가 끝난 뒤에 실행되는 함수
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (destination?.droppableId === source.droppableId) {
      // same board
      setToDos((allBoards) => {
        // all boards를 가져와서 doing 보드를 카피하고, source.index로부터 1개를 잘라냄. 그리고 목적지 index에 draggableId 요소를 추가.
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (!destination) return;
    if (destination.droppableId !== source.droppableId) {
      // not same board
      setToDos((allBoards) => {
        const sourceCopy = [...allBoards[source.droppableId]];
        const destiCopy = [...allBoards[destination.droppableId]];
        sourceCopy.splice(source.index, 1);
        destiCopy.splice(destination?.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: sourceCopy,
          [destination.droppableId]: destiCopy,
        };
      });
      console.log(toDos);
    }
  };
  return (
    // 드래그 이후에 드랍 할때 마다 실행되는 펑션
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}
