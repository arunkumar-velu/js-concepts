function throttlePromises(promises, maxCount) {
  const result = [];
  let processing = 0;
  return new Promise((resolve, reject) => {
    function callFun() {
      while (maxCount > processing && promises.length) {
        let currentFunc = promises.shift();
        processing++;
        console.log("promise is called", processing);
        currentFunc()
          .then((res) => {
            result.push(res);
            processing--;
            console.log("promise is exec", processing);
            callFun();
          })
          .catch((err) => {
            reject(err);
          });
      }
      if (promises.length == 0 && processing == 0) {
        resolve(result);
      }
    }
    callFun();
  });
}
// var value = 0;
// var asyncFactory = function () {
//   return new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve(value++);
//     }, 10);
//   });
// };
// const arr = [];
// for (var i = 0; i < 20; i++) {
//   arr.push(asyncFactory);
// }
// // this is the solution function you'll write
// const throttled = throttlePromises(arr, 5);
// throttled.then(function (results) {
//   console.log(
//     results,
//     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
//   );
// });

var value = 0;
let ongoing = 0;
let maxOngoing = 0;
var asyncFactory = function () {
  ongoing += 1;
  console.log(ongoing, "ongoing");
  maxOngoing = Math.max(maxOngoing, ongoing);
  return new Promise(function (resolve) {
    setTimeout(function () {
      ongoing -= 1;
      resolve(value++);
    }, 10);
  });
};
const arr = [];
for (var i = 0; i < 20; i++) {
  arr.push(asyncFactory);
}
const throttled = throttlePromises(arr, 30);
throttled.then(function (results) {
  console.log("results", results);
  console.log("maxOngoing", maxOngoing);
});
