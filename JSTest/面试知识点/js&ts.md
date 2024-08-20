#### JS
##### 1. 闭包和作用域
> 闭包是作用域应用的特殊场景。 js中常见的作用域包括全局作用域、函数作用域、块级作用域。要知道 **Js中自由变量的查找是在函数定义的地方，向上级作用域查找，不是在执行的地方**。 常见的闭包使用有两种场景：一种是函数作为参数被传递；一种是函数作为返回值被返回。
> 闭包是指有权访问另一个函数作用域中变量的函数 (闭包中的变量存储的位置是堆内存)

##### 2. 函数中的arguments
- 只有函数才有arguments
- 每个函数都有一个内置好了的argument，不用手动去创建
- arguments具有length属性
- arguments按索引方式存储数据
- arguments不具有数组的push/pop等操作

#### 3. [一秒理解call，apply，bind](https://www.runoob.com/w3cnote/js-call-apply-bind.html)
作用：重定义this指向
1. bind返回一个函数方法
  ```js
  var name='小王',age=17;
  var obj={
    name:'小张'
    objAge:this.age,
    myFun:function(){
      console.log(this.name+"年龄"+this.age);
    }
  }
  var db={
    name:'德玛',
    age:99,
  }

  obj.objAge;  // 17
  obj.myFun()  // 小张年龄 undefined
  obj.myFun.call()；　　　　// 指向windows
  obj.myFun.call(db)；　　　　// 德玛年龄 99
  obj.myFun.apply(db);　　　 // 德玛年龄 99
  obj.myFun.bind(db)();　　　// 德玛年龄 99 
  // bind 返回的是一个新的函数，你必须调用它才会被执行
  ```
2. `call`、`bind`、`apply`这三个函数的第一个参数都是`this`的指向对象，第二个参数差别就来了：
   1. `call`的参数是直接放进去的，第二第三第`n`个参数全都用逗号分隔，直接放到后面`obj.myFun.call(db,'成都', ... ,'string' )`。
   2. `apply`的所有参数都必须放在一个数组里面传进去`obj.myFun.apply(db,['成都', ..., 'string' ])`。
   3. `bind`除了返回是函数以外，它的参数和`call`一样。
   4. 三者的参数不限定是 string 类型，允许是各种类型，包括函数 、 object 等等
  ```js
  var name='小王',age=17;
  var obj={
    name:'小张'
    objAge:this.age,
    myFun:function(fm,t){
      console.log(this.name+"年龄"+this.age,"来自"+fm+"去往"+t);
    }
  }
  var db={
    name:'德玛',
    age:99,
  }

  obj.myFun.call(db,'成都','上海');//德玛年龄99来自成都去往上海
  obj.myFun.apply(db,['成都','上海']);//德玛年龄99来自成都去往上海  
  obj.myFun.bind(db,'成都','上海')();// 德玛年龄99来自成都去往上海
  obj.myFun.bind(db,['成都','上海'])();//德玛年龄99来自成都, 上海去往 undefined
  ```
#### 4. [一秒理解this](https://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html)
> 函数运行时，在函数体内部自动生成的一个对象，只能在函数体内部使用
1. 函数调用
  函数的最通常用法，属于全局性调用，因此this就代表全局对象
  ```js
  var x = 1;
  function test() {
    console.log(this.x);
  }
  test();  // 1
  ```
2. 作为对象方法的调用
作为某个对象的方法调用，这时this就指这个`上级对象`。
```js
function test() {
  console.log(this.x);
}

var obj = {};
obj.x = 1;
obj.m = test;

obj.m(); // 1
```
3. 作为构造函数调用
通过这个函数，可以生成一个新对象。这时，this就指这个新对象
```js
function test() {
　this.x = 1;
}

var obj = new test();
obj.x // 1
```
4. apply 调用
apply()是函数的一个方法，作用是改变函数的调用对象。它的第一个参数就表示改变后的调用这个函数的对象。因此，这时this指的就是这第一个参数。
```js
var x = 0;
function test() {
　console.log(this.x);
}

var obj = {};
obj.x = 1;
obj.m = test;
obj.m.apply() // 0
obj.m.apply(obj); //1
```
apply()的参数为空时，默认调用全局对象。因此，这时的运行结果为0，证明this指的是全局对象。

#### 5. WeakMap & WeakSet & Map & Set & Object
>- 原生的 WeakMap 持有的是每个键对象的“弱引用”，这意味着在没有其他引用存在时垃圾回收能正确进行。原生 WeakMap 的结构是特殊且有效的，其用于映射的`key`_只有_在其没有被回收时才是有效的。
>- 由于这样的弱引用，`WeakMap`的`key`是**不可枚举的**(没有方法能给出所有的`key`)。如果`key`是可枚举的话，其列表将会受垃圾回收机制的影响，从而得到不确定的结果。因此，如果你想要这种类型对象的`key`值的列表，你应该使用 Map
## Set
1. 一堆无序的、相关联的，且不重复的内存结构
2. add() delete() has() clear()
3. 遍历方法：
   1. keys()：返回键名的遍历器
   2. values()：返回键值的遍历器
   3. entries()：返回键值对的遍历器
   4. forEach()：使用回调函数遍历每个成员，没有返回值，键值、键名都相等
## Map
1. 一些元素的集合。每个元素有一个称作key 的域，不同元素的key 各不相同
2. size 属性 set() get() has() delete() clear()
3. 遍历方法：
   1. keys()：返回键名的遍历器
   2. values()：返回键值的遍历器
   3. entries()：返回键值对的遍历器
   4. forEach()：使用回调函数遍历每个成员，遍历顺序就是插入顺序
#
## Object
## WeakSet && WeakMap
- WeakSet：
  - 可以接受一个具有 Iterable接口的对象作为参数
    ```js
      const a = [[1, 2], [3, 4]];
      const ws = new WeakSet(a);
    ```
    - WeakSet只能成员只能是引用类型，而不能是其他类型的值
    - 不是引用类型, 会报错
  - 没有遍历操作的API，没有size属性
  - WeakSet里面的引用只要在外部消失，它在 WeakSet里面的引用就会自动消失
- WeakMap
  - 没有遍历操作的API，没有clear清空方法
  - WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名
  - WeakMap的键名所指向的对象，一旦不再需要，里面的键名对象和所对应的键值对会自动消失，不用手动删除引用
## Map和Object区别
1. Key类型：Object：key 必须是简单数据类型（整数，字符串或者是 symbol）， Map： JavaScript 支持的所有数据类型，也就是说可以用一个 Object 来当做一个Map元素的 key；
2. 元素顺序：Map元素的顺序遵循插入的顺序，Object无序
3. 继承：Map 继承自 Object 对象，仅支持构造函数构建；Object 支持多种方法来创建新的实例
4. 数据访问：Map原生方法，Object 可以通过 . 和 [ ] 来访问
5. 获取size：Map 自身有 size 属性，可以自己维持 size 的变化。Object 则需要借助 Object.keys() 来计算
6. Map 自身支持迭代，Object 不支持


#### 6. setTimeout 和 setInterval
- setTimeout()方法用于在指定毫秒数后再调用函数或者计算表达式（以毫秒为单位）
- setInterval() 方法用于按照指定的周期（以毫秒计）来循环调用函数或计算表达式，直到 clearInterval() 被调用或窗口关闭，由 setInterval() 返回的 ID 值可用作 clearInterval() 方法的参数
- setInterval() 缺点：
  - 1、无视代码错误
setInterval执行过程中会无视自己调用的代码，会持续不断地调用该代码；
  - 2、无视网络延迟
无视对网络请求的响应是否完成，会不断发送请求；
  - 3、不保证执行
到了时间间隔，如果setInterval需要调用的函数需要花费时间较长，可能就会被直接忽略。

- 用setTimeout实现 setInternal
```js
// 简易版
setTimeout(function () {
    // 任务
    setTimeout(arguments.callee, 1000);
}, 1000)


function mySetInternal(func,delay){
  //声明timer，用于后面清除定时器
  let timer = null
  const interval = () =>{
    //执行对应传入函数
    func()
    //用timer接收setTimeout返回的定时器编号
    //setTimeout接收interval和delay，等待delay结束后，再次执行setTimeout
    timer = setTimeout(interval,delay)
  }
  //第一次调用setTimeout，调用interval，时延为delay
  setTimeout(interval,delay)
  //返回一个cancel方法取消调用
  return {
    cancel: ()=>{
      //清除timer编号的定时器
      clearTimeout(timer)
    }
  }
}

// 测试
//传进一个console.log的函数，解构出cancel方法
const { cancel } = mySetInternal(() => console.log(888),1000)
setTimeout(()=>{
  cancel()
},4000)
```

```js
// 终极版
let timeMap = {}
let id = 0 // 简单实现id唯一
const mySetInterval = (cb, time) => {
  let timeId = id // 将timeId赋予id
  id++ // id 自增实现唯一id
  let fn = () => {
    cb()
    timeMap[timeId] = setTimeout(() => {
      fn()
    }, time)
  }
  timeMap[timeId] = setTimeout(fn, time)
  return timeId // 返回timeId
}

const myClearInterval = (id) => {
  clearTimeout(timeMap[id]) // 通过timeMap[id]获取真正的id
  delete timeMap[id]
}
```

- 用setInternal实现setTimeout
```js
function mySetTimeout(func,delay){
  //timer用来接收setInterval返回的编号，用于后面清除setInterval
  //setInterval会一直执行，但是在setInterval里面执行clearInterval()将会被清除
  const timer = setInterval(()=>{
    //执行传入函数
    func()
    //清除该次setInterval
    clearInterval(timer)
  },delay)
}
```

#### 7. 原型链和继承

#### 8. 判断对象是否存在循环引用 && 深拷贝
> 循环引用对象本来没有什么问题，但是序列化的时候就会发生问题，比如调用JSON.stringify()对该类对象进行序列化，就会报错: Converting circular structure to JSON.
> 下面方法可以用来判断一个对象中是否已存在循环引用：
```js
const isCycleObject = (obj, parent) => {
  const parentArr = parent || [obj];
  // 记录当前obj信息，与下一层级进行判断
  for (let i in obj) {
    if (typeof obj[i] === "object") {
      let flag = false;
      parentArr.forEach((item) => {
        if (item === obj[i]) {
          flag = true;
        }
      });
      if (flag) return true;
      // 递归判断
      flag = isCycleObject(obj[i], [...parentArr, obj[i]]);
      if (flag) return true;
    }
  }
  return false;
};
let obj1 = {};
let obj2 = {
  b: obj1,
};
obj1.a = obj2;
console.log(isCycleObject(obj1));
```
```js
/**
 * 深拷贝关注点:
 * 1. JavaScript内置对象的复制: Set、Map、Date、Regex等
 * 2. 循环引用问题
 * @param {*} object
 * @returns
 */
function deepCopy(object, map = new WeakMap()) {
    if (!object || typeof object !== "object") return object;
    // 内置对象的复制
    if (object === null) return object;
    if (object instanceof Date) return new Date(object);
    if (object instanceof RegExp) return new RegExp(object);

    // 解决循环引用问题
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
```


#### TS
##### 1. type和interface的区别
>interface可以重复声明，type不行，继承方式不一样，type使用交叉类型方式，interface使用extends实现。在对象扩展的情况下，使用接口继承要比交叉类型的性能更好。建议使用interface来描述对象对外暴露的借口，使用type将一组类型重命名（或对类型进行复杂编程）
```typescript
interface iMan {
  name: string;
  age: number;
}
// 接口可以进行声明合并
interface iMan {
  hobby: string;
}

type tMan = {
  name: string;
  age: number;
};
// type不能重复定义
// type tMan = {}

// 继承方式不同,接口继承使用extends
interface iManPlus extends iMan {
  height: string;
}
// type继承使用&，又称交叉类型
type tManPlus = { height: string } & tMan;

const aMan: iManPlus = {
  name: "aa",
  age: 15,
  height: "175cm",
  hobby: "eat",
};

const bMan: tManPlus = {
  name: "bb",
  age: 15,
  height: "150cm",
};
```
1. 