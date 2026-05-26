function get(source, path, defaultValue = undefined) {
  // your code here
  if (!path || path.length == 0) {
    return;
  }
  if (typeof path == "string") {
    path = path.replace("[", ".").replace("]", "");
    path = path.split(".");
  }
  for (let i = 0; i < path.length; i++) {
    source = source[path[i]];
  }
  return source ? source : defaultValue;
}
const obj = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};
console.log(get(obj, "a.b.c")); // [1,2,3]
console.log(get(obj, "a.b.c.0")); // 1
console.log(get(obj, "a.b.c[1]")); // 2
console.log(get(obj, ["a", "b", "c", "2"])); // 3
console.log(get(obj, "a.b.c[3]")); // undefined
console.log(get(obj, "a.c", "bfe")); // 'bfe'
