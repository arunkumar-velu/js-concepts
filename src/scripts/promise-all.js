function getUserData(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a + b == 5) {
        reject("not a number");
      }
      resolve(a + b);
    }, 2000);
  });
}
async function PromiseAll(agrs) {
  console.log(agrs);
  return new Promise((resolve, reject) => {
    const results = [];
    let completeCount = 0;
    for (let i = 0; i < agrs.length; i++) {
      try {
        Promise.resolve(agrs[i])
          .then((response) => {
            results.push(response);
            completeCount += 1;
            console.log("agrs");
            if (completeCount == agrs.length) {
              resolve(results);
            }
          })
          .catch((errors) => {
            reject(errors);
          });
      } catch (err) {
        console.log(err);
      }
    }
  });
}
(async () => {
  console.log(await getUserData(1, 2));
  const results = await PromiseAll([
    getUserData(1, 2),
    getUserData(2, 3),
    getUserData(3, 4),
  ]);
  console.log(results);
})();
