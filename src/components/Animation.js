export const animation = (inputArr) => {
  let frames = populateAnimationArray(inputArr);
  //[false,false,false, true, false, true],[false,false,false, true, false, true], etc etc etc
  //each index corresponds to a boolean value that decides whether or not an element is colored
  // console.log(frames);
  let outputChanges = selectionSetFrames(inputArr);

  // console.log(outputChanges);

  return outputChanges;
  // let marker1 = 0;
  // let marker2 = 0;

  // let n = inputArr.length;
  // for (let i = 0; i < n; i++) {
  //   // Finding the smallest number in the subarray

  //   let min = i;
  //   for (let j = i + 1; j < n; j++) {
  //     if (inputArr[j] < inputArr[min]) {
  //       min = j;
  //     }
  //   }
  //   if (min !== i) {
  //     // Swapping the elements
  //     let tmp = inputArr[i];
  //     inputArr[i] = inputArr[min];
  //     inputArr[min] = tmp;
  //   }
  // }
};

export const populateAnimationArray = (array) => {
  let frameArray = [];
  let elementArray = [];
  let pairArray = [];
  let frames = calculateFrames(array);

  let n = array.length;

  // for (let i = 0; i < array.length; i++) {
  //   elementArray[i] = false;
  // }

  // for (let i = 0; i < frames; i++) {
  //   frameArray[i] = elementArray;
  // }

  // for (let i = 0; i < n; i++) {
  //   pairArray[0] = false;
  //   pairArray[1] = array[i];
  //   elementArray[i] = pairArray;

  // }

  for (let i = 0; i < array.length; i++) {
    pairArray[0] = false;
    pairArray[1] = array[i];
    elementArray[i] = pairArray.slice();
  }
  for (let i = 0; i < frames; i++) {
    frameArray[i] = elementArray;
  }

  return frameArray;
};

export const calculateFrames = (inputArr) => {
  let returner = selectionSortCount(inputArr);

  // let n = array.length;

  // let steps = 0;
  // for (let i = 1; i <= n; i++) {
  //   steps += n - i;
  // }

  return returner;
};

function selectionSetFrames(arr) {
  let pairArray = [];
  let arrayStates = [];
  let elementArray = [];
  //^ an array that keeps track of every change in state of the elements (the order of the elements basically)

  let inputArr = arr.slice();
  let count = 0;
  let n = inputArr.length;

  elementArray = inputArr.slice();

  for (let i = 0; i < inputArr.length; i++) {
    pairArray[0] = false;
    pairArray[1] = inputArr[i];
    elementArray[i] = pairArray.slice();
  }

  arrayStates[count] = elementArray.slice();

  for (let i = 0; i < n; i++) {
    // Finding the smallest number in the subarray

    // count += 1;

    elementArray = inputArr.slice();

    for (let i = 0; i < inputArr.length; i++) {
      pairArray[0] = false;
      pairArray[1] = inputArr[i];
      elementArray[i] = pairArray.slice();
    }

    arrayStates[count] = elementArray.slice();

    let min = i;
    for (let j = i + 1; j < n; j++) {
      // count += 1;

      elementArray = inputArr.slice();

      for (let i = 0; i < inputArr.length; i++) {
        pairArray[0] = false;
        pairArray[1] = inputArr[i];
        elementArray[i] = pairArray.slice();
      }

      arrayStates[count] = elementArray.slice();

      if (inputArr[j] < inputArr[min]) {
        min = j;

        count += 1;

        elementArray = inputArr.slice();

        for (let i = 0; i < inputArr.length; i++) {
          pairArray[0] = false;
          pairArray[1] = inputArr[i];
          elementArray[i] = pairArray.slice();
        }

        arrayStates[count] = elementArray.slice();
      }
    }
    if (min !== i) {
      // Swapping the elements
      let tmp = inputArr[i];
      inputArr[i] = inputArr[min];
      inputArr[min] = tmp;

      count += 1;

      elementArray = inputArr.slice();

      for (let i = 0; i < inputArr.length; i++) {
        pairArray[0] = false;
        pairArray[1] = inputArr[i];
        elementArray[i] = pairArray.slice();
      }

      arrayStates[count] = elementArray.slice();
    }
  }
  return arrayStates;
}

function boolMarker() {}

function selectionSortCount(arr) {
  let inputArr = arr.slice();
  let count = 0;
  let n = inputArr.length;
  for (let i = 0; i < n; i++) {
    // Finding the smallest number in the subarray

    count += 1;

    let min = i;
    for (let j = i + 1; j < n; j++) {
      count += 1;

      if (inputArr[j] < inputArr[min]) {
        min = j;

        count += 1;
      }
    }
    if (min !== i) {
      // Swapping the elements
      let tmp = inputArr[i];
      inputArr[i] = inputArr[min];
      inputArr[min] = tmp;

      count += 1;
    }
  }
  return count;
}

function merge(left, right) {
  let arr = [];
  // Break out of loop if any one of the array gets empty
  while (left.length && right.length) {
    // Pick the smaller among the smallest element of left and right sub arrays
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }

  // Concatenating the leftover elements
  // (in case we didn't go through the entire left or right array)
  return [...arr, ...left, ...right];
}
function mergeSort(array) {
  const half = array.length / 2;

  // Base case or terminating case
  if (array.length < 2) {
    return array;
  }

  const left = array.splice(0, half);
  return merge(mergeSort(left), mergeSort(array));
}
