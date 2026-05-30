Array.prototype.reducePolyfill = function (callback, initial) {
  if (!callback || typeof callback !== "function") {
    throw `Reduce function without callback`;
  }
  let a = initial;
  let c = 0;
  while (c < this.length) {
    a = callback.apply(this, [a, c, this]);
    c++;
  }
  return a;
};

const arr = [1, 2, 3, 4];
const result = arr.reducePolyfill(function (acc, current, arra) {
  acc = acc + current;
  return acc;
}, 1);
console.log(result);
// const empty = [].reduce(function (acc, current, arra) {
//   acc = acc + current;
//   return acc;
// });
// console.log(empty);
