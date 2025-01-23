function objectFactory() {
    let newObject = null;
    let initFunc = Array.prototype.shift.call(arguments);
    // 取得构造器 / 新建一个构造器init /
    // =》 取实参的第一项 伪数组本身没有shift方法
    let result = null;
    // 判断参数是否是一个函数
    if (typeof initFunc !== "function") {
        console.error("type error");
        return;
    }
    // 新建一个空对象，对象的原型为构造函数的 prototype 对象
    newObject = Object.create(initFunc.prototype);
    // 将 this 指向新建对象，并执行函数
    result = initFunc.apply(newObject, arguments);
    // 判断返回对象
    // 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象
    let flag = result && (typeof result === "object" || typeof result === "function");
    // 判断返回结果
    return flag ? result : newObject;
}
// 使用方法
objectFactory(构造函数, 初始化参数);