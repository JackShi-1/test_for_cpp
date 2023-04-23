//  code 1
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