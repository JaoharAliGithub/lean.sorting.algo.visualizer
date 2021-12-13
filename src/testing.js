import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./Visualizer.css";
import Slider from "@mui/material/Slider";

export default class Visualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      toSort: false,
      arraySize: 100,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDragStop = this.handleDragStop.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
  }

  componentDidMount() {
    this.resetArray();
    this.resetSort();
    this.resetArraySize();
  }

  componentDidUpdate() {}

  resetArraySize = () => {
    this.setState({ arraySize: 100 });
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

    console.log("array was reset - jao");
  };

  handleClick() {
    let currArrSize = this.state.arraySize;
    let currArr = this.state.array;
    let decide = false;
    if (this.state.toSort === false) {
      decide = true;
    } else {
      decide = false;
    }
    this.setState({ array: currArr, toSort: decide, arraySize: currArrSize });
    console.log(this.state.toSort);
  }

  handleGenerate() {
    this.resetArray();
  }

  handleChange(event, value) {
    if (typeof value === "number") {
      this.setState({ arraySize: value });
    }
    this.resetArray();
    console.log(this.state.arraySize);
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

  render() {
    console.log("rendered");
    let array = [0];
    if (this.state.toSort === false) {
      array = this.state.array;
    } else {
      array = selectionSort(this.state.array);
    }

    let arrSize = this.state.arraySize;

    return (
      <div className="mainDIV">
        <Box sx={{ width: 100, height: 100 }}>
          <Stack spacing={0.5} direction="row" className="visualizer">
            {array.map((value, idx) => (
              <Box
                key={idx}
                sx={{
                  borderRadius: 2,
                  width: 50,
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
        <Button variant="contained" onClick={this.handleGenerate}>
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
            max={200}
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

function findSmallest(inputArr) {

  let min = inputArr[0];
  for (let i =0; i < inputArr.length; i ++){
    if (inputArr[i] < min){
      let minIdx = i;
    }
  }

  return minIdx;
}

