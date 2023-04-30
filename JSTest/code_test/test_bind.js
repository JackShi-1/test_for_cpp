Function.prototype.fakeBind = function (obj, ...args) {
    return (...rest) => this.call(obj, ...args, ...rest);
};

Function.prototype.myBind = function (target, ...args) {
    return (...rest) =>
        this.apply(target, args.concat(rest).slice(0, this.length));
};

// Function.prototype.myBind = function (context, ...args) {
//     const self = this;
//     const fn = function (...newArgs) {
//         self.apply(this instanceof fn ? this : context, args.concat(newArgs));
//     };

//     fn.prototype = Object.create(this.prototype);

//     return fn;
// };

// Function.prototype.softBind = function (obj, ...rest) {
//     const fn = this
//     const bound = function (...args) {
//         const o = !this || this === (window || global) ? obj : this
//         return fn.apply(o, [...rest, ...args])
//     }

//     bound.prototype = Object.create(fn.prototype)
//     return bound
// }
// Function.prototype.softBind = function (obj, ...args) {
//     const fn = this;
//     return function (...args2) {
//         return fn.apply(this === global ? obj : this, args.concat(args2));
//     };
// };

// function f(arg) {
//     console.log(this.a, arg);
// }

// // output: 3, 4
// f.bind({ a: 3 })(4);

// // output: 3, 4
// f.fakeBind({ a: 3 })(4);
// f.myBind({ a: 3 })(4);

function pMap(arr, fn, concurrency = Number.MAX_SAFE_INTEGER) {
    return new Promise((resolve) => {
        let ret = [];
        let index = -1;
        function next() {
            ++index;
            Promise.resolve(arr[index])
                .then((val) => fn(val, index))
                .then((res) => {
                    ret.push(res);
                    if (ret.length === arr.length) {
                        resolve(ret);
                    } else if (index < arr.length) {
                        next();
                    }
                });
        }

        for (let i = 0; i < arr.length && i < concurrency; i++) {
            next();
        }
    });
}

pMap([1, 2, 3, 4, 5], (x) => Promise.resolve(x + 1));

pMap([Promise.resolve(1), Promise.resolve(2)], (x) => x + 1);

// 注意输出时间控制
pMap([1, 1, 1, 1, 1, 1, 1, 1], (x) => sleep(1000), { concurrency: 2 });
