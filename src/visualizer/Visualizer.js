import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./Visualizer.css";
import Slider from "@mui/material/Slider";
import { animation } from "../components/Animation";
import { ReactDOM } from "react";

export default class Visualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      toSort: false,
      arraySize: 72,
      frames: [],
      frameNumber: 0,
      intervalId: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDragStop = this.handleDragStop.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
  }

  componentDidMount() {
    console.log("restarted");
    this.resetArray();
    this.resetSort();
    this.resetArraySize();
    this.resetFrames();
    // this.interval = setInterval(() => this.tick(), 300);
  }

  resetFrameNumber = () => {
    this.setState({ frameNumber: 0 });
  };

  componentWillUnmount() {
    clearInterval(this.newIntervalId);
  }
  // resetFrameNumber = () => {
  //   this.setState({ frameNumber: 0 });
  // };

  static getDerivedStateFromProps(props, state) {
    let frameRoll = animation(state.array);
    const { frames } = frameRoll;
    let frameVal = state.frameNumber + 1;
    // const { frameNumber } = frameVal;
    // console.log(frameRoll);

    return { frames };
  }

  resetAll = () => {
    this.resetArraySize();
    this.resetArray();
    this.resetSort();
    this.resetFrames();
    this.resetFrameNumber();
  };

  resetFrames = () => {
    let frameRoll = animation(this.state.array);
    this.setState({ frames: frameRoll });
    // console.log("reset");
  };

  componentDidUpdate() {
    let arrSize = this.state.arraySize;
    let array = [];
    let frames = animation(this.state.array);
    let valueList = [];
    let individualFrame = [];
    let renderList = [];
    let Frames = [];

    for (let i = 0; i < frames.length; i++) {
      Frames = frames.slice();
      individualFrame = Frames[i];

      for (let j = 0; j < individualFrame.length; j++) {
        valueList[j] = individualFrame[j][1];
      }
      renderList[i] = valueList.slice();
    }

    if (this.state.frameNumber === renderList.length) {
      this.resetAll();
    }

    // console.log("updated");
    // console.log(this.state.frameNumber);
    // console.log(renderList.length);
  }

  resetArraySize = () => {
    this.setState({ arraySize: 72 });
  };

  resetSort = () => {
    this.setState({ toSort: false });
  };

  resetArray = () => {
    const array = [];

    for (let i = 0; i < this.state.arraySize; i++) {
      array.push(randomIntFromInterval(5, 600));
    }
    this.setState({ array: array });

    // console.log("array was reset - jao");
  };

  handleClick = () => {
    let decide = this.state.toSort;
    if (this.state.toSort === false) {
      decide = true;
    } else {
      decide = false;
    }
    // console.log(this.state.toSort);

    const newIntervalId = setInterval(() => {
      this.setState((prevState) => {
        return {
          ...prevState,
          frameNumber: prevState.frameNumber + 1,
        };
      });
    }, 0.00000000000000000000000000000001);

    this.setState((prevState) => {
      return {
        ...prevState,
        intervalId: newIntervalId,
      };
    });

    this.setState({ toSort: decide });
  };

  handleGenerate() {
    this.resetArray();
  }

  handleChange(event, value) {
    if (typeof value === "number") {
      this.setState({ arraySize: value });
    }
    this.resetArray();
    // console.log(this.state.arraySize);
  }

  componentWillReceiveProps(nextState) {
    if (nextState.toSort !== this.state.toSort) {
      this.setState({ toSort: nextState.toSort });
    }
  }

  handleDragStop() {
    this.resetArray();
    this.props.update(this.state.arraySize);
  }

  //   // handleChange = (event, value) => this.setState({ arraySize: value });
  //   handleDragStop = () => this.props.update(this.state.arraySize);

  //   handleChange = (event, value) => {
  //     if (typeof value === "number") {
  //       this.setState({ arraySize: value });
  //     }
  //   };

  // tick() {
  //   this.setState((state) => ({ frameNumber: this.state.frameNumber + 1 }));
  // }

  render() {
    let arrSize = this.state.arraySize;
    let array = [];
    let frames = animation(this.state.array);
    let valueList = [];
    let individualFrame = [];
    let renderList = [0];
    let Frames = [];

    for (let i = 0; i < frames.length; i++) {
      Frames = frames.slice();
      individualFrame = Frames[i];

      for (let j = 0; j < individualFrame.length; j++) {
        valueList[j] = individualFrame[j][1];
      }
      renderList[i] = valueList.slice();
    }

    if (this.state.frameNumber === renderList.length) {
      this.resetAll();

      console.log("frameNumber === render list .length");

      return (
        <div className="mainDIV">
          <Box sx={{ width: 100, height: 600 }}>
            <Stack spacing={0.5} direction="row" className="visualizer">
              {array.map((value, idx) => (
                <Box
                  key={idx}
                  sx={{
                    borderRadius: 2,
                    width: 10,
                    height: value,
                    backgroundColor: "primary.dark",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                >
                  {value}
                </Box>
              ))}
            </Stack>
          </Box>
          <Button variant="contained" onClick={this.handleClick}>
            SORT
          </Button>
          <Button
            className="generateButton"
            variant="contained"
            onClick={this.handleGenerate}
          >
            GENERATE NEW ARRAY
          </Button>
          <Box sx={{ width: 300 }}>
            <Slider
              className="slider"
              defaultValue={arrSize}
              value={arrSize}
              step={5}
              marks
              min={5}
              max={72}
              valueLabelDisplay="auto"
              aria-label="Array Size"
              onChange={this.handleChange}
              onDragStop={this.handleDragStop}
              onChangeCommited={this.handleChange}
            ></Slider>
          </Box>
        </div>
      );
    }

    // console.log("render");
    // let array = [];
    frames = [];
    // console.log(renderList.length);
    // console.log(this.state.frameNumber);
    // let arrSize = this.state.arraySize;

    if (this.state.toSort === false) {
      array = this.state.array;

      return (
        <div className="mainDIV">
          <Box sx={{ width: 100, height: 600 }}>
            <Stack spacing={0.5} direction="row" className="visualizer">
              {array.map((value, idx) => (
                <Box
                  key={idx}
                  sx={{
                    borderRadius: 2,
                    width: 10,
                    height: value,
                    backgroundColor: "primary.dark",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                >
                  *
                </Box>
              ))}
            </Stack>
          </Box>
          <Button variant="contained" onClick={this.handleClick}>
            SORT
          </Button>
          <Button
            className="generateButton"
            variant="contained"
            onClick={this.handleGenerate}
          >
            GENERATE NEW ARRAY
          </Button>
          <Box sx={{ width: 300 }}>
            <Slider
              className="slider"
              defaultValue={arrSize}
              value={arrSize}
              step={5}
              marks
              min={5}
              max={72}
              valueLabelDisplay="auto"
              aria-label="Array Size"
              onChange={this.handleChange}
              onDragStop={this.handleDragStop}
              onChangeCommited={this.handleChange}
            ></Slider>
          </Box>
        </div>
      );
    } else {
      frames = animation(this.state.array);
      // console.log(frames);
      // console.log(this.state.array);
      // let array = this.state.array;

      // let boolList = [];
      // let valueList = [];
      // let frame = [];
      // let subValueList = [];
      // let elements = [];
      // for (let x = 0; x < frames.length; x++) {
      //   frame = frames[x];
      //   let i = 0;
      //   for (i; i < frame.length; i++) {
      //     subValueList[i] = frame[i][1];
      //   }
      //   for (let j = 0; j < frames.length; j++) {
      //     valueList[j] = subValueList;
      //   }
      // }

      let valueList = [];
      let individualFrame = [];
      let renderList = [];
      let Frames = [];

      for (let i = 0; i < frames.length; i++) {
        Frames = frames.slice();
        individualFrame = Frames[i];

        for (let j = 0; j < individualFrame.length; j++) {
          valueList[j] = individualFrame[j][1];
        }
        renderList[i] = valueList.slice();
      }
      // console.log(renderList);
      // console.log(this.state.frameNumber);

      //RENDERING
      // let index = this.state.frameNumber;
      // array = renderList[index];
      // console.log(array + "arrayedd");

      array = renderList[this.state.frameNumber];

      return (
        <div className="animatedDiv">
          <Box sx={{ width: 100, height: 600 }}>
            <Stack spacing={0.5} direction="row" className="visualizer">
              {array.map((value, idx) => (
                <Box
                  key={idx}
                  sx={{
                    borderRadius: 2,
                    width: 10,
                    height: value,
                    backgroundColor: "primary.dark",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                >
                  *
                </Box>
              ))}
            </Stack>
          </Box>
        </div>
      );
    }
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function selectionSort(inputArr) {
  let n = inputArr.length;
  for (let i = 0; i < n; i++) {
    // Finding the smallest number in the subarray
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (inputArr[j] < inputArr[min]) {
        min = j;
      }
    }
    if (min !== i) {
      // Swapping the elements
      let tmp = inputArr[i];
      inputArr[i] = inputArr[min];
      inputArr[min] = tmp;
    }
  }
  return inputArr;
}
