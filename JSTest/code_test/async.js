// console.log("script start"); //1

// const promiseA = new Promise((resolve, reject) => {
//   console.log("init promiseA"); //2
//   resolve("promiseA");
// });

// const promiseB = new Promise((resolve, reject) => {
//   console.log("init promiseB"); //3
//   resolve("promiseB");
// });

// setTimeout(() => {
//   console.log("setTimeout run"); //7
//   promiseB.then((res) => {
//     console.log("promiseB res :>> ", res); //9
//   });
//   console.log("setTimeout end"); //8
// }, 500);

// promiseA.then((res) => {
//   console.log("promiseA res :>> ", res); //5
// });

// queueMicrotask(() => {
//   console.log("queue Microtask run"); //6
// });

// console.log("script end"); // 4

// // script start
// // init promiseA
// // init promiseB
// // script end
// // promiseA res :>>  promiseA
// // queue Microtask run
// // setTimeout run
// // setTimeout end
// // promiseB res :>>  promiseB
// async function async1() {
//   console.log("async1 start");
//   await async2();
//   console.log("async1 end");
//   setTimeout(() => {
//     console.log('timer1')
//   }, 0)
// }
// async function async2() {
//   setTimeout(() => {
//     console.log('timer2')
//   }, 0)
//   console.log("async2");
// }
// async1();
// setTimeout(() => {
//   console.log('timer3')
// }, 0)
// console.log("start")

// function foo(something) {
//   this.a = something
// }

// var obj1 = {
//   foo: foo
// }

// var obj2 = {}

// obj1.foo(2);
// console.log(obj1.a); // 2

// obj1.foo.call(obj2, 3);
// console.log(obj2.a); // 3

// var bar = new obj1.foo(4)
// console.log(obj1.a); // 2
// console.log(bar.a); // 4

// function getSomething() {
//   return "something";
// }
// async function testAsync() {
//   return Promise.resolve("hello async");
// }
// async function test() {
//   const v1 = await getSomething();
//   const v2 = await testAsync();
//   console.log(v1, v2);
// }
// test();

const arr = [3, 4];
console.log(arr[Symbol.iterator]); // [Function: values]

const iter = arr[Symbol.iterator]();
console.log(iter); // Object [Array Iterator] {}
console.log(iter.next()); // { value: 3, done: false }
console.log(iter.next()); // { value: 4, done: false }
console.log(iter.next()); // { value: undefined, done: true }
