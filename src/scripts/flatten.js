function flattenArray(arr) {
  let result = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      result = [...result, ...flattenArray(item)];
    } else {
      result.push(item);
    }
  });
  return result;
}
//console.log(flattenArray([1, 2, [3, [2, 5, [9, 10, [20, 21]]]]]));

function flattenObject(obj, parent = "") {
  let result = {};
  if (
    typeof obj == "string" ||
    typeof obj == "number" ||
    typeof obj == "date"
  ) {
    return obj;
  }
  Object.keys(obj).forEach((key) => {
    const nestedKey = parent ? parent + "." + key : key;
    if (typeof obj[key] != "object") {
      result[nestedKey] = obj[key];
    } else {
      result = { ...result, ...flattenObject(obj[key], nestedKey) };
    }
  });
  return result;
}

console.log(
  flattenObject({
    a: 1,
    b: {
      a: 2,
      d: 4,
      c: {
        a: 26,
        d: 28,
      },
    },
  })
);
