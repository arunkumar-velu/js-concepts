var value = 0;
var asyncFactory = function() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(value++);
    }, 10);
  });
};
const arr = [];
for (var i = 0; i < 20; i++) {
  arr.push(asyncFactory);
}
// this is the solution function you'll write
const throttled = throttlePromises(arr, 5)
throttled.then(function(results) {
  expect(results).toEqual([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19])
  done()
});