function fib(n) {
  // your code here
  let fibNumber = [0, 1];
  while (n > 0) {
    let res = fibNumber[0] + fibNumber[1];
    fibNumber.shift();
    fibNumber.push(res);
    n--;
  }
  return fibNumber[0];
}

const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => fib(item));
console.log(nums);
