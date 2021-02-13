import React, { useEffect, useState } from "react";
import Sketch from "react-p5";
import styled from "styled-components";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(51, 51, 51);
`;

const BtnDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SliderDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Visual(props) {
  let values = [];
  let states = [];
  let color = 0;
  let sleepTime = 50;

  //let w = 10;

  const width = window.innerWidth - 100;
  const height = window.innerHeight - 100;

  const [startDraw, setStartDraw] = useState(false);
  const [w, setW] = useState(5);
  const [speed, setSpeed] = useState(500);

  useEffect(() => {
    createArray();
  }, [w, speed]);

  const setSortSpeed = (value) => {
    // let e = document.getElementById("speed");
    // let strUser = e.options[e.selectedIndex].text;

    // if (strUser === "Slow") {
    //   setSpeed(500);
    // } else if (strUser === "Medium") {
    //   setSpeed(250);
    // } else {
    //   setSpeed(0);
    // }
    setSpeed(value);
  };

  const setUp = (p5, canvasParentRef) => {
    p5.createCanvas(width, height).parent(canvasParentRef);
    createArray();
    //p5.noLoop();
    p5.frameRate(5);
    // quickSort(values, 0, values.length - 1).then(() => {
    //   p5.noLoop();
    // });

    console.log("hi");
    // testing(values, 0, 10);
  };

  const createArray = () => {
    values = new Array(Math.floor(width / w));
    for (let i = 0; i < values.length; i++) {
      values[i] = Math.random(height);
      states[i] = -1;
    }
  };

  const startSort = () => {
    quickSort(values, 0, values.length - 1);
  };

  const draw = (p5) => {
    p5.background(51);

    for (let i = 0; i < values.length; i++) {
      p5.stroke(0);
      p5.fill(250);
      if (states[i] == 0) {
        p5.fill("#E0777D");
      } else if (states[i] == 1) {
        p5.fill("#D6FFB7");
      } else if (states[i] == 2) {
        p5.fill("cyan");
      } else if (states[i] == 3) {
        p5.fill("white");
      } else {
        p5.fill("pink");
      }
      p5.rect(i * w, 0, w, height * values[i]);
    }
  };

  async function quickSort(arr, start, end) {
    if (start >= end) {
      return;
    }

    let index = await partition(arr, start, end);
    states[index] = 1;

    await Promise.all([
      quickSort(arr, start, index - 1),
      quickSort(arr, index + 1, end),
    ]);

    for (let i = start; i < end; i++) {
      states[i] = 1;
    }
  }

  async function partition(arr, start, end) {
    states[start] = 3;
    states[end] = 3;
    for (let i = start + 1; i < end - 1; i++) {
      states[i] = 1;
    }

    let pivotIndex = start;
    let pivotValue = arr[end];

    for (let i = start; i < end; i++) {
      states[i] = 2;
      if (arr[i] < pivotValue) {
        await swap(arr, i, pivotIndex);
        states[pivotIndex] = 1;
        pivotIndex++;
        states[pivotIndex] = 0;
      } else {
        await sleep(speed);
      }
    }

    await swap(arr, pivotIndex, end);

    for (let i = start; i < end; i++) {
      if (i != pivotIndex) {
        //states[i] = -1;
      }
    }

    return pivotIndex;
  }

  async function swap(arr, a, b) {
    await sleep(speed);

    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const getValue = (value) => {
    setW(value);
  };

  return (
    <div>
      <Sketch setup={setUp} draw={draw} />
      <Container>
        <BtnDiv>
          <button onClick={startSort}>Sort</button>
        </BtnDiv>
        <SliderDiv>
          <h4 style={{ marginRight: "20px", color: "white" }}>Array Size</h4>
          <Slider
            min={5}
            max={100}
            onChange={getValue}
            style={{ width: "15%" }}
          />
        </SliderDiv>
        {/* <SliderDiv>
          <h4 style={{ marginRight: "20px" }}>Sort Speed</h4>
          <select onChange={() => setSortSpeed()} id="speed">
            <option>Slow</option>
            <option>Medium</option>
            <option>Fast</option>
          </select>
        </SliderDiv> */}
        <SliderDiv>
          <h4 style={{ marginRight: "20px", color: "white" }}>Sort Speed</h4>
          <Slider
            min={0}
            max={500}
            onChange={setSortSpeed}
            style={{ width: "15%" }}
          />
        </SliderDiv>
      </Container>
    </div>
  );
}

export default Visual;

// [5, 6, 3, 1, 8, 9, 6]
