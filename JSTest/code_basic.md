##### 1. [Js连续赋值问题](https://www.cnblogs.com/xxcanghai/p/4998076.html)
>一、连续赋值有顺序
比如 : A=B=C 它的赋值顺序是 B=C ， A=B
二、js内部为了保证赋值语句的正确，会在一条赋值语句执行前，先把所有要赋值的引用地址取出一个副本，再依次赋值。

```js
//  code 1
let a = {
  n: 1,
};
let b = a;
// b = { n: 1 };
a.x = a = {
  n: 2,
};
// step1 B = C, new* a = { n: 2} //转向新的地址,会预先复制一个副本
// step2 A = B, old* a = { n:1, x:{n:2}}
console.log(a.x); // undefined
console.log(b); // {n: 1, x: {n: 2}}

// code 2
let a = 12,
  b = 12;
function fn() {
  // console.log(a, b); // Uncaught ReferenceError: Cannot access 'a' before initialization at fn
  console.log(b); // 12
  let a = (b = 13);
  console.log(a, b); // 13 13
}
fn();
console.log(a, b); // 12 13

// code 3
let i = 1;
let fn = (i) => (n) => console.log(n + ++i);
let f = fn(1);
f(2); // 4
fn(3)(4); // 8
f(5); // 8
console.log(i); // 1

// code 4
var n = 0;
function a() {
  var n = 10;
  function b() {
    n++;
    console.log(n);
  }
  b();
  return b;
}
var c = a();
c();
console.log(n); // 11 12 0
```

##### 2. 变量提升/静态方法/实例方法/原型方法调用
```js
function Foo() {
  getName = function () {
    console.log(1);
  };
  return this;
}
Foo.getName = function () {
  console.log(2);
};
Foo.prototype.getName = function () {
  console.log(3);
};
var getName = function () {
  console.log(4);
};
function getName() {
  console.log(5);
}

Foo.getName(); // 2 解析：调用函数的静态方法
getName(); // 4 解析：函数表达式会覆盖函数声明式方法
Foo().getName(); // 1 解析：调用函数自身的方法
getName(); // 1 解析: 受前一行代码执行影响相当于调用this.getName(), 其中this指向window，因为Foo方法里面定义getName的时候没有声明, 所以变成了全局变量
new Foo.getName(); // 2 解析：相当于执行new (Foo.getName)()
new Foo().getName(); // 3 解析：调用函数的实例方法, 相当于执行(new Foo()).getName()
new new Foo().getName(); // 3 解析：相当于执行new (new Foo()).getName)()
// 操作运算符的优先级: () > new > .
```

##### 3. 递归/微任务/宏任务
```js
function fn() {
  fn();
}
fn(); // Uncaught RangeError: Maximum call stack size exceeded

var num = 0;
function fn() {
  console.log(num++);
  setTimeout(fn, 1000);
}
fn(); // 可以正常执行，为什么？
// 解析：原因是因为setTImeout属于异步宏任务，不在主线程栈内存中
```
```js
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
```
```js
const list = [1, 2, 3];
const square = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
};

function test() {
  list.forEach(async (x) => {
    const res = await square(x);
    console.log(res);
  });
}
test();

// 执行结果： 1s之后输出 1 4 9

// 不能修改square方法，实现每隔一秒输出结果
const list = [1, 2, 3];
const square = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
};

function test() {
  list.forEach((x, index) => {
    setTimeout(async () => {
      const res = await square(x);
      console.log(res);
    }, index * 1000);
  });
}
test();
```
```js
console.log(1);
setTimeout(function () {
  console.log(2);
}, 0);
var promise = new Promise(function (resolve, reject) {
  console.log(3);
  setTimeout(function () {
    console.log(4);
    resolve();
  }, 1000);
});
promise.then(function () {
  console.log(5);
  setTimeout(function () {
    console.log(6);
  }, 0);
});
console.log(7);
// 输出结果顺序：1 3 7 2 4 5 6
// 解析：JS代码执行优先级：主线程 -> 微任务 -> 宏任务
```
```js
var promise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    console.log(1);
    resolve();
  }, 3000);
});
promise
  .then(function () {
    setTimeout(function () {
      console.log(2);
    }, 2000);
  })
  .then(function () {
    setTimeout(function () {
      console.log(3);
    }, 1000);
  })
  .then(function () {
    setTimeout(function () {
      console.log(4);
    }, 0);
  });
// 输出结果：3s后输出1和4，再过1s输出3，再过1s输出2
// 解析：promise.then()方法要等resolve()执行以后，才会执行后面的then方法，后面的这些方法按定时器异步流程处理
```
```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log(`async1 end`);
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

async1();

new Promise((resolve, reject) => {
  console.log("promise1");
  resolve();
}).then(() => {
  console.log("promise2");
});

console.log("script end");

// 输出结果：
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
```

##### promise串行问题（腾讯文档）
```js
let promiseArr = [
  () => {
    return new Promise(res => {
      console.log('run 1', Date.now());
      res('run 1 resolve');
    });
  },
  () => {
    return new Promise(res => {
      console.log('run 2', Date.now());
      res('run 2 resolve');
    });
  },
  () => {
    return new Promise(res => {
      console.log('run 3', Date.now());
      res('run 3 resolve');
    });
  },
]

async function fn () {
  for (let i = 0; i < promiseArr.length; i++) {
    // 串行打印console.log;
    // await promiseArr[i]();
    // 串行打印console.log并执行resolve
    await promiseArr[i]().then((value) => {
      console.log(value);
    });
  }
}
fn();
```

##### 事件循环(字节面试题)
```js
function test () {
  console.log(1);
  Promise.resolve().then(test);
}
test();
setTimeout(() => {console.log(2)}, 0)

// 打印结果：
// 一直输出1 不会执行setTimeout里面的回调函数
```

##### promise、async/await
``` js
// 字节面试题
new Promise((reslove, reject) => {
    reject();
}).then(null, () => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
});

// 打印结果： 1 2 3
```

```js
new Promise((reslove, reject) => {
    reject();
}).then(null, () => {
    console.log(1);
}).then(() => {
    new Promise((reslove, reject) => {
        reject();
    }).then(null, () => {
        console.log('a');
    }).then(() => {
        console.log('b');
    }).then(() => {
        console.log('c');
    })
}).then(() => {
    console.log(3);
})

// 打印结果：
// 1
// a
// 3
// b
// c
```
```js
new Promise((resolve, reject) => {
    resolve();
}).then(null, () => {
    console.log(1);
}).then(() => {
    new Promise((resolve, reject) => {
        console.log(2);
        resolve();
    }).then(null, () => {
        console.log('a');
    }).then(() => {
        console.log('b');
    }).then(() => {
        console.log('c');
    })
}).then(() => {
    console.log(3);
})

// 打印结果：
// 2
// 3
// b
// c
```
```js
new Promise((resolve, reject) => {
    reject();
}).then(null, () => {
    console.log(1);
}).then(() => {
    new Promise((resolve, reject) => {
        console.log(2);
        reject();
    }).then(null, () => {
        console.log('a');
    }).then(() => {
        console.log('b');
    }).then(() => {
        console.log('c');
    })
}).then(() => {
    console.log(3);
})
// 1
// 2
// a
// 3
// b
// c
```
```js
function foo () {
  var a = 0;
  return function () {
    console.log(a++);
  }
}
var f1 = foo(),
f2 = foo();
f1(); // 0
f1(); // 1
f2(); // 0
```
```js
function Page() {
  console.log(this);
  return this.hosts;
}
Page.hosts = ['h1'];
Page.prototype.hosts = ['h2'];
var p1 = new Page();
var p2 = Page();
console.log(p1.hosts); // undefined
console.log(p2.hosts); // Uncaught TypeError: Cannot read property 'hosts' of undefined
```

##### 如果让一个不可迭代对象，变成可迭代

```js
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
```


