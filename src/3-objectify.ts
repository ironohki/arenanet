export function objectify(inputString: string): any {
  const arrayOfStrings: Array<string> = inputString.split(".");
  const outputArray = arrayOfStrings.filter((x) => x.length > 0 && typeof x === "string");
  return arrayToObject(outputArray);
}

const arrayToObject = (inputArray: Array<string>): Object => {
  var newObject: any = {};
  if(inputArray.length > 0) {
    newObject[inputArray[0]] = arrayToObject(inputArray.slice(1));
  }
  return newObject; 
}