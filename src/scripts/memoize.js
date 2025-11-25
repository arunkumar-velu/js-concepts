function memoize(fn) {
  let cache = new Map();
  return async function () {
    const args = arguments;
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    console.log("cache", cache);
    const result = await fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

async function getUserData(q, key, cb) {
  console.log("Actual call made");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(q + key);
    }, 2000);
  });
}
const square = memoize(getUserData);
(async () => {
  console.log(await square(2, 3));
  console.log(await square(2, 3));
  console.log(await square(3, 4));
  console.log(await square(3, 4));
  console.log(await square(2, 3));
  console.log(await square(2, 3));
})();
