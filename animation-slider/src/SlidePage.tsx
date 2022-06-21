import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 50vw;
  gap: 10px;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;
const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const Overlay = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default function SlidePage() {
  const [clicked, setClicked] = useState(false);
  const toggleShowing = () => setClicked((prev) => !prev);
  return (
    <div onClick={toggleShowing}>
      <Grid>
        <Box layoutId="hi" />
        <Box />
        <Box />
        <Box />
      </Grid>
      {/* 오버레이창: 클릭시 뒷배경에 보이는 어두운 배경 창 */}
      <AnimatePresence>
        {clicked ? (
          <Overlay
            initial={{ backgroundColor: " rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: " rgba(0, 0, 0, 0.5)" }}
            exit={{ backgroundColor: " rgba(0, 0, 0, 0)" }}
          >
            {/* 어두운 배경 위에 선택된 창 */}
            <Box layoutId="hi" style={{ width: 400, height: 200 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
