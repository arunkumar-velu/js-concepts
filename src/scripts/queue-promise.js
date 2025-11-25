const HandlePromise = function () {
  const executeCount = 2;
  let currentCount = 0;
  const promiseQueue = [];
  const helper = (p) => {
    if (currentCount < executeCount) {
      currentCount++;
      console.log("helper", currentCount);
      return p()
        .then((res) => console.log(res))
        .finally(() => {
          currentCount--;
          promiseQueue.length > 0 && helper(promiseQueue.shift());
        });
    } else {
      promiseQueue.push(p);
    }
  };
  return helper;
};

const dummyPromise = (a) => {
  return () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(a), 2000);
    });
  };
};
console.log("start");

const promiseHandle = new HandlePromise();
promiseHandle(dummyPromise(1));
promiseHandle(dummyPromise(2));
promiseHandle(dummyPromise(3));
promiseHandle(dummyPromise(4));
promiseHandle(dummyPromise(5));
promiseHandle(dummyPromise(6));
promiseHandle(dummyPromise(7));
promiseHandle(dummyPromise(8));
promiseHandle(dummyPromise(9));
promiseHandle(dummyPromise(10));
promiseHandle(dummyPromise(11));
