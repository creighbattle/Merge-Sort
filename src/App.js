import React from "react";
import Sketch from "./Sketch";
import styled from "styled-components";
import BottomSettings from "./BottomSettings";

const Container = styled.div`
  height: 100vh;
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(51, 51, 51);
`;

function App() {
  return (
    <Container>
      <Sketch />
      {/* <BottomSettings /> */}
    </Container>
  );
}

export default App;
