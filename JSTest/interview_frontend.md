#### h5 & css
##### 1. 水平垂直居中方案
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

##### 2. 图片懒加载
>1.如何判断图片出现在了当前视口 （即如何判断我们能够看到图片）
2.如何控制图片的加载
- 方案一：位置计算 + 滚动事件 (Scroll) + DataSet API
  - 判断在当前视口:`clientTop`，`offsetTop`，`clientHeight` 以及  `scrollTop` 各种关于图片的高度作比对
  - 监听 `window.scroll` 事件
  - `DataSet API`控制图片
- 方案二 [improve]：getBoundingClientRect API + Scroll with Throttle + DataSet API
  - `Element.getBoundingClientRect()` 方法返回元素的大小及其相对于视口的位置
  - 加入节流 优化监听时间
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>图片懒加载</title>
    <style>
      img {
        width: 100%;
        height: 600px;
      }
    </style>
  </head>
  <body>
    <img
      src="test01.jpg"
      alt="1"
    />
    <img
      src="test02.jpg"
      alt="2"
    />
    <img
      data-src="test03.jpg"
      alt="3"
    />
    <img
      data-src="test04jpg"
      alt="4"
    />
    <img
      data-src="test05.jpg"
      alt="5"
    />
    <img
      data-src="test06.jpg"
      alt="6"
    />
    <script src="https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.20/lodash.js"></script>
    <script>
      const images = document.querySelectorAll("img");
      const lazyLoad = () => {
        images.forEach((item) => {
          // 触发条件为img元素的CSSOM对象到视口顶部的距离 < 100px + 视口高度，+100px为了提前触发图片加载
          if (
            item.getBoundingClientRect().top <
            document.documentElement.clientHeight + 100
          ) {
            if ("src" in item.dataset) {
              item.src = item.dataset.src;
            }
          }
        });
      };
      document.addEventListener("scroll", _.throttle(lazyLoad, 200));
    </script>
  </body>
</html>
```
- 方案三：`IntersectionObserver` API + DataSet API
  - `IntersectionObserver` API，一个能够监听元素是否到了当前视口的事件，一步到位！
  - `IntersectionObserver` 除了给图片做懒加载外，还可以对单页应用资源做预加载
- 方案四：`LazyLoading` 属性 浏览器属性
  ```html
  <img src="test.jpg" loading="lazy" />
  ```

##### CSRF
>跨站请求伪造（英语：Cross-site request forgery），也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF， 
> 是一种挟制用户在当前已登录的 Web 应用程序上执行非本意的操作的攻击方法。
> 跟跨网站脚本（XSS）相比，XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。
> 
- 使用 JSON API。当进行 CSRF 攻击时，请求体通过 `<form>` 构建，请求头为 application/www-form-urlencoded。它难以发送 JSON 数据被服务器所理解。
- CSRF Token。生成一个随机的 token，切勿放在 cookie 中，每次请求手动携带该 token 进行校验。
- SameSite Cookie。设置为 Lax 或者 Strict，禁止发送第三方 Cookie。
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