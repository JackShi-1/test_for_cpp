# CJS,AMD,ESM,UMD 区别[https://segmentfault.com/a/1190000040282826]

CJS（CommonJS）和 ESM（ES Modules）是 JavaScript 中两种不同的模块系统，它们在语法、加载方式、适用场景等方面存在诸多区别，下面为你详细介绍：

### 语法

- **CJS**
  - 使用`require()`函数来引入模块，使用`module.exports`或`exports`来导出模块内容。
  - 示例：

```javascript
// 导出模块
// math.js
const add = (a, b) => a + b;
module.exports = {
  add,
};

// 导入模块
// main.js
const math = require("./math.js");
console.log(math.add(1, 2));
```

- **ESM**
  - 使用`import`关键字来导入模块，使用`export`关键字来导出模块内容。`export`既可以导出单个变量、函数，也可以使用`export default`导出默认值。
  - 示例：

```javascript
// 导出模块
// math.js
export const add = (a, b) => a + b;

// 导入模块
// main.js
import { add } from "./math.js";
console.log(add(1, 2));
```

### 加载方式

- **CJS**
  - 是同步加载模块，在执行`require()`时，会暂停当前模块的执行，直到被加载的模块完全加载并执行完毕，然后将导出的内容返回。这种方式适用于服务器端环境，因为服务器端文件通常在本地磁盘，同步加载不会造成明显的性能问题。
- **ESM**
  - 是静态加载（编译时加载），在代码执行前，JavaScript 引擎会先分析`import`和`export`语句，确定模块之间的依赖关系，然后进行加载。同时，它也支持动态加载，使用`import()`函数，返回一个 Promise 对象，实现异步加载模块。ESM 的动态加载特性更适合浏览器环境，因为浏览器需要从网络加载模块，异步加载可以避免页面阻塞。

### 作用域

- **CJS**
  - 每个模块都有自己的独立作用域，`require()`引入的模块内容会被复制到当前模块的作用域中，形成一个新的对象。这意味着如果修改引入模块对象的属性，不会影响到原模块的导出对象。
- **ESM**
  - 模块之间是通过引用共享数据的。当一个模块导入另一个模块的内容时，实际上是获取了原模块导出内容的引用，对导入内容的修改会影响到原模块的导出内容。

### 适用场景

- **CJS**
  - 主要用于服务器端 Node.js 环境，Node.js 在早期版本就采用了 CommonJS 模块规范，大部分 Node.js 模块和库都是基于 CJS 开发的。
- **ESM**
  - 是 ECMAScript 标准的模块系统，既适用于现代浏览器环境，也逐渐被 Node.js 支持（Node.js 从 v13.2.0 开始全面支持 ESM）。随着 JavaScript 在前端和后端的发展，ESM 成为了更通用和推荐的模块系统。

### 兼容性

- **CJS**
  - 在 Node.js 中得到了广泛的支持，几乎所有版本的 Node.js 都支持 CommonJS 模块。但在浏览器中，需要借助打包工具（如 Webpack、Browserify 等）才能使用。
- **ESM**
  - 在现代浏览器中得到了较好的支持，但一些旧版本的浏览器可能不支持。在 Node.js 中使用时，需要将文件扩展名改为`.mjs`，或者在`package.json`中设置`"type": "module"`。
