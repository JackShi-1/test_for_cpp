// #### 20. [对象可结构]让下面代码成立

var [a, b] = {
    a: 3,
    b: 4,
};
console.log(a, b); // 3,4

// {
//     [Symbol.iterator]: function(){
//         return 迭代器
//     }
// }
// 例子
const arr = [3,4];
console.log(arr[Symbol.iterator]); // [Function: values]

const iter = arr[Symbol.iterator]();
console.log(iter); // Object [Array Iterator] {}
console.log(iter.next()); // { value: 3, done: false }
console.log(iter.next()); // { value: 4, done: false }
console.log(iter.next()); // { value: undefined, done: true }


Object.prototype[Symbol.iterator] = function(){
    const arr = Object.values(this);
    return arr[Symbol.iterator]();
}

Object.prototype[Symbol.iterator] = function* (){
    yield* Object.values(this);
}

var obj = {
    0: 0,
    1: 1,
    length: 2,
  };
  for (i of obj) {
    console.log(i);
  }
  // 报错：Uncaught TypeError: obj is not iterable
  
  var obj = {
    0: 0,
    1: 1,
    length: 2,
    [Symbol.iterator]: Array.prototype[Symbol.iterator],
  };
  for (i of obj) {
    console.log(i);
  }
  
  // 原理：可迭代对象都拥有@@iterator属性