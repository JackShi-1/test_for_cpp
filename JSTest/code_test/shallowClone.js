// >- `Object.assign()`
// >- 扩展运算符 `let cloneObj = { ...obj };`
// >- 数组方法实现数组浅拷贝
//     >- `Array.prototype.slice`
//     >- `Array.prototype.concat`
function shallowCopy(object) {
    // 只拷贝对象
    if (!object || typeof object !== "object") return;
    // 根据 object 的类型判断是新建一个数组还是对象
    let newObject = Array.isArray(object) ? [] : {};
    // 遍历 object，并且判断是 object 的属性才拷贝
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            newObject[key] = object[key];
            // 区别在这里
        }
    }
    return newObject;
}// 浅拷贝的实现;