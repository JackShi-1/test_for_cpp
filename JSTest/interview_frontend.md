#### h5 & css
1. 水平垂直居中方案
- flex布局
   ```css
    .father {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .son {
        ...
    }
    ```
- margin:auto + 绝对定位
    ```css
    .father {
        position: relative;
    }
    .son {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }
    ```
- 绝对定位配合transform实现
    ```css
    .father {
        position: relative;
    }
    .son {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    ```




#### JS
1. 闭包和作用域
>闭包是作用域应用的特殊场景。 js中常见的作用域包括全局作用域、函数作用域、块级作用域。要知道 **Js中自由变量的查找是在函数定义的地方，向上级作用域查找，不是在执行的地方**。 常见的闭包使用有两种场景：一种是函数作为参数被传递；一种是函数作为返回值被返回。



#### TS
1. type和interface的区别
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