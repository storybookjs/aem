// util function to convert the input to string type
function convertToString(input: any) {
  if (input) {
    if (typeof input === 'string') {
      return input;
    }
    return String(input);
  }
  return '';
}

// convert string to words
function toWords(input: any) {
  const convertedInput = convertToString(input);
  const regex = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;
  return convertedInput.match(regex);
}

// convert the input array to camel case
export function toCamelCase(input: any) {
  const inputArray = toWords(input);
  let result = '';
  /* eslint-disable no-plusplus */
  for (let i = 0; i < inputArray.length; i++) {
    const currentStr = inputArray[i];
    let tempStr = currentStr.toLowerCase();
    if (i !== 0) {
      // convert first letter to upper case (the word is in lowercase)
      tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1);
    }
    result += tempStr;
  }
  return result;
}
