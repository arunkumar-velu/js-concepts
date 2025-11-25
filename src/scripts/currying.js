function sum(a, b, c, d) {
  return a + b + c + d;
}
function generate(fn) {
  const helper = (...agrs) => {
    if (agrs.length >= fn.length) {
      return fn.apply(this, agrs);
    } else {
      return (...agrs2) => {
        return helper(...agrs, ...agrs2);
      };
    }
  };
  return helper;
}
let curreidSum = generate(sum);
console.log(curreidSum(1)(2)(3)(4));
console.log(curreidSum(1, 2, 3)(4));
console.log(curreidSum(4, 4)(3)(4));
