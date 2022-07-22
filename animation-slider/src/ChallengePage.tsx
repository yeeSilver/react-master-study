import { motion, AnimatePresence } from "framer-motion";

import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
`;

const Box = styled(motion.div)`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  background-color: #ffffff4f;
  border-radius: 10px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const boxVars = {
  hover: { scale: 1.05 },
};
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

const Circle = styled(motion.div)`
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255);
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const OverlayVariants = {
  start: { backgroundColor: " rgba(0, 0, 0, 0)" },
  animate: { backgroundColor: " rgba(0, 0, 0, 0.5)" },
  end: { backgroundColor: " rgba(0, 0, 0, 0)" },
};

export default function ChallengePage() {
  const [id, setId] = useState<null | string>(null);
  const [btnOn, setBtnOn] = useState(false);
  const toggleBtn = () => setBtnOn((prev) => !prev);

  const OnStyle = {
    marginTop: "30px",
    color: "green",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  };
  const OffStyle = {
    marginTop: "30px",
    color: "red",
    padding: "10px",
    borderRadius: "5px",
    transform: `scale(1.2)`,
    cursor: "pointer",
  };

  return (
    <Wrapper>
      <Grid>
        {[1, 2, 3, 4].map((i) => (
          <Box
            key={i}
            onClick={() => setId(i + "")}
            layoutId={i + ""}
            variants={boxVars}
            whileHover="hover"
          >
            {i === 2 ? !btnOn ? <Circle layoutId="circle" /> : null : null}
            {i === 3 ? btnOn ? <Circle layoutId="circle" /> : null : null}
          </Box>
        ))}
      </Grid>

      <button onClick={toggleBtn} style={btnOn ? OffStyle : OnStyle}>
        SWITCH
      </button>

      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={() => setId(null)}
            variants={OverlayVariants}
            initial="start"
            animate="animate"
            exit="end"
          >
            <Box
              layoutId={id}
              style={{ backgroundColor: "white", height: "30%", width: "30%" }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}
