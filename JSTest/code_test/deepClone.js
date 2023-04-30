var obj = {
    number: 1,
    string: "abc",
    bool: true,
    undefined: undefined,
    null: null,
    symbol: Symbol("s"),
    arr: [1, 2, 3],
    date: new Date(),
    userInfo: {
        name: "Better",
        position: "front-end engineer",
        skill: ["React", "Vue", "Angular", "Nodejs", "mini programs"],
    },
    func: function () {
        console.log("hello better");
    },
};

var copyObj = JSON.parse(JSON.stringify(obj));

console.log(copyObj);

// 深拷贝的实现
function deepCopy(object, map = new WeakMap()) {
    if (!object || typeof object !== "object") return object;
    if (object === null) return object;
    if (object instanceof Date) return new Date(object);
    if (object instanceof RegExp) return new RegExp(object);

    if (map.has(object)) return map.get(object);

    let newObject = Array.isArray(object) ? [] : {};
    map.set(object, newObject);

    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            newObject[key] =
                typeof object[key] === "object" ? deepCopy(object[key]) : object[key];
        }
    }

    return newObject;
}
console.log(deepCopy(obj));

function shallowCopy(object) {
    // 只拷贝对象
    if (!object || typeof object !== "object") return;

    // 根据 object 的类型判断是新建一个数组还是对象
    let newObject = Array.isArray(object) ? [] : {};

    // 遍历 object，并且判断是 object 的属性才拷贝
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            newObject[key] = object[key];
        }
    }

    return newObject;
}// 浅拷贝的实现;

