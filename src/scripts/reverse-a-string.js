function isReverseString(str) {
  const strArray = str.split(" ");
  const result = [];
  for (let i = 0; i < strArray.length; i++) {
    const reversStr = strArray[i].split("").reverse();
    result.push(reversStr.join(""));
  }
  return result.join(" ");
}

function main() {
  const inputData = [
    {
      input: "Hello world, Happy new year",
      output: "olleH ,dlrow yppaH wen raey",
    },
    {
      input: "",
      output: "",
    },
    {
      input: "Hello",
      output: "ollHe",
    },
  ];
  for (let i = 0; i < inputData.length; i++) {
    console.log(isReverseString(inputData[i].input) == inputData[i].output);
  }
}
main();
