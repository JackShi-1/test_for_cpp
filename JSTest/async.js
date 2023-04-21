console.log("script start"); //1

const promiseA = new Promise((resolve, reject) => {
  console.log("init promiseA"); //2
  resolve("promiseA");
});

const promiseB = new Promise((resolve, reject) => {
  console.log("init promiseB"); //3
  resolve("promiseB");
});

setTimeout(() => {
  console.log("setTimeout run"); //7
  promiseB.then((res) => {
    console.log("promiseB res :>> ", res); //9
  });
  console.log("setTimeout end"); //8
}, 500);

promiseA.then((res) => {
  console.log("promiseA res :>> ", res); //5
});

queueMicrotask(() => {
  console.log("queue Microtask run"); //6
});

console.log("script end"); // 4

// script start
// init promiseA
// init promiseB
// script end
// promiseA res :>>  promiseA
// queue Microtask run
// setTimeout run
// setTimeout end
// promiseB res :>>  promiseB
