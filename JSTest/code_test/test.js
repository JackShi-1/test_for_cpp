//  todo code 1
let a = {
    n: 1,
};
let b = a;
// b = { n: 1 };
a.x = a = {
    n: 2,
};

console.log(a.x); // undefined
console.log(b); // {n: 1, x: {n: 2}}


// // todo code 2
// class Prom {
//     static resolve(value) {
//         if (value && value.then) {
//             return value;
//         }
//         return new Prom((resolve) => resolve(value));
//     }

//     constructor(fn) {
//         this.value = undefined;
//         this.reason = undefined;
//         this.status = "PENDING";

//         // 维护一个 resolve/pending 的函数队列
//         this.resolveFns = [];
//         this.rejectFns = [];

//         const resolve = (value) => {
//             // 注意此处的 setTimeout
//             setTimeout(() => {
//                 this.status = "RESOLVED";
//                 this.value = value;
//                 this.resolveFns.forEach(({ fn, resolve: res, reject: rej }) =>
//                     res(fn(value))
//                 );
//             });
//         };

//         const reject = (e) => {
//             setTimeout(() => {
//                 this.status = "REJECTED";
//                 this.reason = e;
//                 this.rejectFns.forEach(({ fn, resolve: res, reject: rej }) =>
//                     rej(fn(e))
//                 );
//             });
//         };

//         fn(resolve, reject);
//     }

//     then(fn) {
//         if (this.status === "RESOLVED") {
//             const result = fn(this.value);
//             // 需要返回一个 Promise
//             // 如果状态为 resolved，直接执行
//             return Prom.resolve(result);
//         }
//         if (this.status === "PENDING") {
//             // 也是返回一个 Promise
//             return new Prom((resolve, reject) => {
//                 // 推进队列中，resolved 后统一执行
//                 this.resolveFns.push({ fn, resolve, reject });
//             });
//         }
//     }

//     catch(fn) {
//         if (this.status === "REJECTED") {
//             const result = fn(this.value);
//             return Prom.resolve(result);
//         }
//         if (this.status === "PENDING") {
//             return new Prom((resolve, reject) => {
//                 this.rejectFns.push({ fn, resolve, reject });
//             });
//         }
//     }
// }

// Prom.resolve(10)
//     .then((o) => o * 10)
//     .then((o) => o + 10)
//     .then((o) => {
//         console.log(o);
//     });

// const PromoTest = new Prom((resolve, reject) => reject("Error")).catch((e) => {
//     console.log("Error", e);
// });

// // Promise.resolve(10)
// //     .then((o) => o * 10)
// //     .then((o) => o + 10)
// //     .then((o) => {
// //         console.log(o);
// //     });

// // new Promise((resolve, reject) => reject("Error")).catch((e) => {
// //     console.log("Error", e);
// // });


// todo Code 3 Promise 2.0
// 1、基本架构：
//   状态
//   then
//   执行器函数 executor

// 2、executor、resolve、reject
// 3、then 同步下调用
// 4、then 异步下调用
// 5、then 链式调用
//   返回 Promise
//   then 函数递归返回常量结果，供下个 then 使用
//   考虑 then 成功的回调为 null 的情况

// const PROMISE_STATUS_PENDING = "pending";
// const PROMISE_STATUS_FULFILLED = "fulfilled";
// const PROMISE_STATUS_REJECTED = "rejected";

// // help fun
// function execFunctionWithCatchError(execFun, value, resolve, reject) {
//     try {
//         const result = execFun(value);
//         resolve(result);
//     } catch (error) {
//         reject(error);
//     }
// }

// class MyPromise {
//     constructor(executor) {
//         this.status = PROMISE_STATUS_PENDING; // 记录promise状态
//         this.value = undefined; // resolve返回值
//         this.reason = undefined; // reject返回值
//         this.onFulfilledFns = []; // 存放成功回调
//         this.onRejectedFns = []; // 存放失败回调

//         const resolve = value => {
//             //   if (this.status === PROMISE_STATUS_PENDING) {
//             //     queueMicrotask(() => {
//             //       if (this.status !== PROMISE_STATUS_PENDING) return;
//             //       this.status = PROMISE_STATUS_FULFILLED;
//             //       this.value = value;
//             //       this.onFulfilledFns.forEach(fn => {
//             //         fn(this.value);
//             //       });
//             //     });
//             //   }
//             if (value instanceof MyPromise) {
//                 return value.then(resolve, reject);
//             }

//             if (this.status === PROMISE_STATUS_PENDING) {
//                 this.status = PROMISE_STATUS_FULFILLED;
//                 this.value = value;
//                 this.onFulfilledFns.forEach((fn) => fn(this.value));
//             }
//         };

//         const reject = reason => {
//             if (this.status === PROMISE_STATUS_PENDING) {
//                 queueMicrotask(() => {
//                     if (this.status !== PROMISE_STATUS_PENDING) return;
//                     this.status = PROMISE_STATUS_REJECTED;
//                     this.reason = reason;
//                     this.onRejectedFns.forEach(fn => {
//                         fn(this.reason);
//                     });
//                 });
//             }
//         };

//         try {
//             executor(resolve, reject);
//         } catch (error) {
//             reject(error);
//         }
//     }

//     then(onFulfilled, onRejected) {
//         onFulfilled =
//             onFulfilled ||
//             (value => {
//                 return value;
//             });

//         onRejected =
//             onRejected ||
//             (err => {
//                 throw err;
//             });

//         return new MyPromise((resolve, reject) => {
//             // 1、 when operate then, status have confirmed
//             if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
//                 execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
//             }
//             if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
//                 execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
//             }

//             if (this.status === PROMISE_STATUS_PENDING) {
//                 // this.onFulfilledFns.push(onFulfilled);
//                 if (onFulfilled) {
//                     this.onFulfilledFns.push(() => {
//                         execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
//                     });
//                 }

//                 // this.onRejectedFns.push(onRejected);
//                 if (onRejected) {
//                     this.onRejectedFns.push(() => {
//                         execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
//                     });
//                 }
//             }
//         });
//         // const _promise = {
//         //     [PROMISE_STATUS_FULFILLED]: () => MyPromise.resolve(onFulfilled(this.value)),
//         //     [PROMISE_STATUS_REJECTED]: () => MyPromise.reject(onRejected(this.reason)),
//         //     [PROMISE_STATUS_PENDING]: () => {
//         //         return new MyPromise((resolve, reject) => {
//         //             this.onFulfilledFns.push(() => {
//         //                 execFunctionWithCatchError(onFulfilled, this.reason, resolve, reject);
//         //             });
//         //             this.onRejectedFns.push(() => {
//         //                 execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
//         //             });
//         //         });
//         //     },
//         // }[this.status]
//         // return _promise();
//     }

//     catch(onRejected) {
//         return this.then(undefined, onRejected);
//     }

//     finally(onFinally) {
//         return this.then(onFinally, onFinally);
//     }

//     static resolve(value) {
//         return new MyPromise(resolve => resolve(value));
//     }

//     static reject(reason) {
//         return new MyPromise((resolve, reject) => reject(reason));
//     }

//     static all(promises) {
//         return new MyPromise((resolve, reject) => {
//             const values = [];
//             promises.forEach(promise => {
//                 promise.then(
//                     res => {
//                         values.push(res);
//                         if (values.length === promises.length) {
//                             resolve(values);
//                         }
//                     },
//                     err => {
//                         reject(err);
//                     }
//                 );
//             });
//         });
//     }

//     // 只关心是否都完成了 无论成功与否
//     static allSettled(promises) {
//         return new MyPromise(resolve => {
//             const results = [];
//             promises.forEach(promise => {
//                 promise.then(
//                     res => {
//                         results.push({ status: PROMISE_STATUS_FULFILLED, value: res });
//                         if (results.length === promises.length) {
//                             resolve(results);
//                         }
//                     },
//                     err => {
//                         results.push({ status: PROMISE_STATUS_REJECTED, value: err });
//                         if (results.length === promises.length) {
//                             resolve(results);
//                         }
//                     }
//                 );
//             });
//         });
//     }

//     static race(promises) {
//         return new MyPromise((resolve, reject) => {
//             promises.forEach(promise => {
//                 promise.then(
//                     res => {
//                         resolve(res);
//                     },
//                     err => {
//                         reject(err);
//                     }
//                 );
//             });
//         });
//     }

//     static any(promises) {
//         return new MyPromise((resolve, reject) => {
//             const reasons = [];
//             promises.forEach(promise => {
//                 promise.then(
//                     res => {
//                         resolve(res);
//                     },
//                     err => {
//                         reasons.push(err);
//                         if (reasons.length === promise.length) {
//                             // reject(new AggreagateError(reasons));
//                             reject(reasons);
//                         }
//                     }
//                 );
//             });
//         });
//     }
// }

// const p1 = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         console.log("--- 1 ---");
//         resolve(111);
//     });
// }).finally(res => {
//     console.log("p1 res :>> ", res);
// });

// const p2 = new MyPromise((resolve, reject) => {
//     console.log("--- 2 ---");
//     resolve(222);
// });

// const p3 = new MyPromise((resolve, reject) => {
//     console.log("--- 3 ---");
//     resolve(333);
// });

// const p4 = new MyPromise((resolve, reject) => {
//     console.log("--- 4 ---");
//     reject(444);
// });

// MyPromise.all([p2, p3]).then(res => {
//     console.log("p2&p3 res :>> ", res);
// });

// MyPromise.all([p2, p4])
//     .then(res => {
//         console.log("p2&p4 res :>> ", res);
//     })
//     .catch(err => {
//         console.log("err :>> ", err);
//     });

// --- 2 ---
// --- 3 ---
// --- 4 ---
// p2&p3 res :>>  [ 222, 333 ]
// err :>>  444
// --- 1 ---
// p1 res :>>  111