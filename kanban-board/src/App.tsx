import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atom";
import Board from "./Components/Board";
import Delete from "./Components/Delete";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;
const Side = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #eae5e6;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 680px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
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
    console.log(info);
    if (destination?.droppableId === source.droppableId) {
      // same board
      setToDos((allBoards) => {
        // all boards를 가져와서 doing 보드를 카피하고, source.index로부터 1개를 잘라냄. 그리고 목적지 index에 draggableId 요소를 추가.
        const boardCopy = [...allBoards[source.droppableId]];
        //taskObj: 옮기려고하는 todo obj 전체를 가져다 줌
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
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
        const taskObj = sourceCopy[source.index];

        sourceCopy.splice(source.index, 1);
        destiCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceCopy,
          [destination.droppableId]: destiCopy,
        };
      });
    }
  };
  return (
    // 드래그 이후에 드랍 할때 마다 실행되는 펑션
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Side>
          <Delete />
        </Side>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
      </Container>
    </DragDropContext>
  );
}
