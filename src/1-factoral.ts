export function factoral(inputNumber: number): number {
  var result: number = 1;
  if (inputNumber >= 0) {    
    for (let iteration: number = 1; iteration <= inputNumber; iteration++) {
      result = iteration * result;
    }
  } else {
    // Returning negative 1 to indicate invalid operation.
    result = -1;
  }
  return result;
}