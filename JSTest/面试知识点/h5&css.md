#### h5 & css

##### 1. 水平垂直居中方案

- flex 布局

  ```css
  .father {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .son {
    ...;
  }

  // 方法二
  .box {
    display: flex;
  }

  .item {
    margin: auto;
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
- 绝对定位配合 transform 实现
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
- Grid 布局

  ```css
  .father {
    height: 100%;
    display: grid;
  }
  .son {
    /* thing to center */
    margin: auto;
  }

  // 一维布局
  // justify-content||justify-items && align-content||align-items
  // place-content||place-items
  ```

##### 2. 图片懒加载

> 1.如何判断图片出现在了当前视口 （即如何判断我们能够看到图片） 2.如何控制图片的加载

- 方案一：位置计算 + 滚动事件 (Scroll) + DataSet API
  - **`el.offsetTop <= viewPortHeight + document.documentElement.scrollTop`**
  - 判断在当前视口:`clientTop`，`offsetTop`，`clientHeight` 以及 `scrollTop` 各种关于图片的高度作比对
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
    <img src="test01.jpg" alt="1" />
    <img src="test02.jpg" alt="2" />
    <img data-src="test03.jpg" alt="3" />
    <img data-src="test04jpg" alt="4" />
    <img data-src="test05.jpg" alt="5" />
    <img data-src="test06.jpg" alt="6" />
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

  1. 创建观察者

  ```js
  const options = {
   // 表示重叠面积占被观察者的比例，从 0 - 1 取值，
   // 1 表示完全被包含
   threshold: 1.0,
   root:document.querySelector('#scrollArea') // 必须是目标元素的父级元素
  };
  ​const callback = (entries, observer) => { ....}
  ​
  const observer = new IntersectionObserver(callback, options);
  // 通过new IntersectionObserver创建了观察者 observer，传入的参数 callback 在重叠比例超过 threshold 时会被执行

  // 上段代码中被省略的 callback
  const callback = function(entries, observer) {
     entries.forEach(entry => {
         entry.time;               // 触发的时间
         entry.rootBounds;         // 根元素的位置矩形，这种情况下为视窗位置
         entry.boundingClientRect; // 被观察者的位置举行
         entry.intersectionRect;   // 重叠区域的位置矩形
         entry.intersectionRatio;  // 重叠区域占被观察者面积的比例（被观察者不是矩形时也按照矩形计算）
         entry.target;             // 被观察者
     });
  };
  ```

  1. 传入被观察者

  ```js
  const target = document.querySelector(".target");
  observer.observe(target);
  ```

- 方案四：`LazyLoading` 属性 浏览器属性
  ```html
  <img src="test.jpg" loading="lazy" />
  ```

```js
// <img src="default.png" data-src="https://xxxx/real.png">
function isVisible(el) {
  const position = el.getBoundingClientRect();
  const windowHeight = document.documentElement.clientHeight;
  // 顶部边缘可见
  const topVisible = position.top > 0 && position.top < windowHeight;
  // 底部边缘可见
  const bottomVisible = position.bottom < windowHeight && position.bottom > 0;
  return topVisible || bottomVisible;
}

function imageLazyLoad() {
  const images = document.querySelectorAll("img");
  for (let img of images) {
    const realSrc = img.dataset.src;
    if (!realSrc) continue;
    if (isVisible(img)) {
      img.src = realSrc;
      img.dataset.src = "";
    }
  }
}

// 测试
window.addEventListener("load", imageLazyLoad);
window.addEventListener("scroll", imageLazyLoad);
// or
window.addEventListener("scroll", throttle(imageLazyLoad, 1000));
```

##### 3. CSRF

> 跨站请求伪造（英语：Cross-site request forgery），也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF，
> 是一种挟制用户在当前已登录的 Web 应用程序上执行非本意的操作的攻击方法。
> 跟跨网站脚本（XSS）相比，XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。

- 使用 JSON API。当进行 CSRF 攻击时，请求体通过 `<form>` 构建，请求头为 application/www-form-urlencoded。它难以发送 JSON 数据被服务器所理解。
- CSRF Token。生成一个随机的 token，切勿放在 cookie 中，每次请求手动携带该 token 进行校验。
- SameSite Cookie。设置为 Lax 或者 Strict，禁止发送第三方 Cookie。

##### 4. 响应式布局

- rem: 根据根元素(即 html)的 font-size
- em: 根据自身元素的 font-size
- vw: viewport width
- vh: viewport height

##### 5. BFC

> 块格式化上下文（Block Formatting Context，BFC）是 Web 页面的可视化 CSS 渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。

> - BFC 是一个独立的布局环境,可以理解为一个容器,在这个容器中按照一定规则进行物品摆放,并且不会影响其它环境中的物品。
> - 如果一个元素符合触发 BFC 的条件，则 BFC 中的元素布局不受外部影响。
> - 浮动元素会创建 BFC，则浮动元素内部子元素主要受该浮动元素影响，所以两个浮动元素之间是互不影响的。

- 创建条件

  - 根元素或包含根元素的元素
  - 浮动元素 float ＝ left | right 或 inherit（≠ none）
  - 绝对定位元素 position ＝ absolute 或 fixed
  - display ＝ inline-block | flex | inline-flex | table-cell 或 table-caption
  - overflow ＝ hidden | auto 或 scroll (≠ visible)

- 消除浮动 解决高度塌陷问题（脱离文档流，无法计算准确高度）
  - 解决方法：
    - 在容器中创建 BFC
    - `overflow: hidden`,会造成溢出隐藏，影响与 JS 交互效果
    - clearfix
