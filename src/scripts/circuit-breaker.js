const circuitBreaker = (fn, failureCount, threshold) => {
  let failed = 0;
  let lastFailtureTime = 0;
  return (...args) => {
    if (failed >= failureCount && Date.now() - lastFailtureTime < threshold) {
      console.error("Service unavailable");
      return;
    }
    try {
      console.log("rtry");
      const result = fn(...args);
      console.log("www", result);
      failed = 0;
      return result;
    } catch (err) {
      failed++;
      lastFailtureTime = Date.now();
    }
  };
};

const testFunction = () => {
  let count = 0;
  return () => {
    count++;
    if (count < 4) {
      console.log(count, "failture");
      throw new Error("Failure occurred"); //
    } else {
      console.log(count, "success");
      return "success";
    }
  };
};
const t = testFunction();
const c = circuitBreaker(t, 3, 500);
c();
c();
c();
c();
c();
c();
setTimeout(() => {
  c();
  c();
  c();
}, 1000);
