function f(num) {
  let sum = num;
  function add(newNum) {
    sum += newNum;
    add.val = sum;
    return add;
  }
  add.val = sum;
  return add;
}
console.log(f(1).val); // 1
console.log(f(1)(2).val); // 3
console.log(f(1)(2)(3).val); // 6
console.log(f(10)(100)(1000).val);

// function f(initialValue) {
//   let sum = initialValue;

//   function next(nextValue) {
//     sum += nextValue;
//     return next(sum);
//   }

//   next.val = sum;
//   return next;
// }

// // 测试用例
// console.log(f(1).val); // 1
// console.log(f(1)(2).val); // 3
// console.log(f(1)(2)(3).val); // 6
// console.log(f(10)(100)(1000).val); // 1110
