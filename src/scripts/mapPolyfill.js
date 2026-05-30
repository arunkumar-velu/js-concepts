Array.prototype.mapPolyfill = function (callback) {
  let arr = [];
  let count = 0;
  while (count < this.length) {
    arr.push(callback(this[count], count, this));
    count++;
  }
  return arr;
};

const a = [1, 2, 3].mapPolyfill((item, index, array) => {
  console.log(item, index, array);
  return item * 2;
});
console.log(a);
