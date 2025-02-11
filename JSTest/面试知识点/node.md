### 基础准备

#### 1. 安装 Node.js 和 npm

- Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境，npm（Node Package Manager）是 Node.js 的包管理工具。从 [Node.js 官网](https://nodejs.org/) 下载并安装适合你操作系统的版本，安装完成后，在命令行中输入以下命令验证安装是否成功：

```bash
node -v
npm -v
```

#### 2. 学习 JavaScript 基础

Node.js 使用 JavaScript 进行开发，因此需要掌握 JavaScript 的基础知识，包括变量、数据类型、函数、对象、作用域、闭包等，同时要了解 ES6+ 的新特性，如箭头函数、模板字符串、解构赋值等。

### Node.js 开发入门

#### 1. 初始化项目

创建一个新的项目目录，进入该目录后，使用以下命令初始化项目，生成 `package.json` 文件：

```bash
npm init -y
```

#### 2. 编写简单的 Node.js 应用

创建一个名为 `app.js` 的文件，编写一个简单的 HTTP 服务器示例：

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!\n");
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
```

在命令行中运行该文件：

```bash
node app.js
```

打开浏览器访问 `http://localhost:3000`，你应该能看到 `Hello, World!` 的输出。

#### 3. 学习 Node.js 核心模块

Node.js 提供了许多核心模块，如 `fs`（文件系统）、`path`（路径处理）、`http`（HTTP 服务器和客户端）等，学习这些核心模块的使用方法，可以帮助你开发出更复杂的应用。

#### 4. 学习使用第三方模块

通过 npm 可以安装各种第三方模块，例如 `express` 是一个流行的 Web 应用框架，使用以下命令安装：

```bash
npm install express
```

以下是一个使用 `express` 的简单示例：

```javascript
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log(`Express app running at http://localhost:${port}/`);
});
```
