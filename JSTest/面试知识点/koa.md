# koa
基本组成
- Application 基本服务端框架
- Context 服务器框架基本数据机构封装，用来http请求解析及响应
- Middleware中间件 洋葱模型
> 简化示例
```js
const Koa = require("koa");
const app = new Koa();  // Aplication + Server

app.use(async (ctx, next) => {
    console.log("Middleware 1 Start"); // 错误处理，权限校验，路由，日志，限流等等
    await next();
    console.log("Middleware 1 End");
});

app.use(async (ctx, next) => {
    console.log("Middleware 2 Start");
    await next();
    console.log("Middleware 2 End");
    ctx.body = "hello, world";
});

app.listen(3000);
 
// output
// Middleware 1 Start
// Middleware 2 Start
// Middleware 2 End
// Middleware 1 End
```
>

#### 构建Application
- app.listen: 处理请求及响应，并且监听端口
- app.use: 中间件函数，处理请求并完成响应
```js
// 用node基本的http API
const http = require('http');
const server = http.createServer((req,res)=>{
    res.end("hello world");
});
server.listen(3000);

// 简易版koa
const http = require('http');
const Application {
    constructor(){
        this.middleware = null;
    }

    listen(...args){
        const server = http.createServer(this.middleware);
        server.listen(...args);
    }

    use(middleware){
        this.middleware = middleware;
    }
}

// 使用简易koa
const app = new Application();
app.use((req, res) => {
  res.end("hello, world");
});
app.listen(3000);
```
- 由于 app.use 的回调函数依然是原生的 http.crateServer 回调函数，而在 koa 中回调参数是一个 Context 对象。

#### 构建Context
> app.use 的回调参数为一个 ctx 对象，而非原生的 req/res。因此在这一步要构建一个 Context 对象，并使用 ctx.body 构建响应：
- app.use(ctx => ctx.body = 'hello, world'): 通过在 http.createServer 回调函数中进一步封装 Context 实现
- Context(req, res): 以 request/response 数据结构为主体构造 Context 对象
```js
const http = require("http");
 
class Application {
  constructor() {}
  use() {}
 
  listen(...args) {
    const server = http.createServer((req, res) => {
      // 构造 Context 对象
      const ctx = new Context(req, res);
 
      // 此时处理为与 koa 兼容 Context 的 app.use 函数
      this.middleware(ctx);
 
      // ctx.body 为响应内容
      ctx.res.end(ctx.body);
    });
    server.listen(...args);
  }
}
 
// 构造一个 Context 的类
class Context {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
}
```

#### 构建中间件
- app.middlewares: 收集中间件回调函数数组，并并使用 compose 串联起来

```js
// 中间件函数通过compose达到抽象
await compose(this.middlewares, ctx); // 对 Context 对象作为参数，来接收请求及处理响应
// koa mini 进化
const http = require("http");
class Application {
  constructor() {
    this.middlewares = [];
  }
 
  listen(...args) {
    const server = http.createServer(async (req, res) => {
      const ctx = new Context(req, res);
 
      // 对中间件回调函数串联，形成洋葱模型
      const fn = compose(this.middlewares);
      await fn(ctx);
 
      ctx.res.end(ctx.body);
    });
    server.listen(...args);
  }
 
  use(middleware) {
    // 中间件回调函数变为了数组
    this.middlewares.push(middleware);
  }
}
```
#### compose函数封装
- middleware: 第一个中间件将会执行
- next: 每个中间件将会通过 next 来执行下一个中间件
```js
function compose(middlewares) {
  return (ctx) => {
    const dispatch = (i) => {
      const middleware = middlewares[i];
      if (i === middlewares.length) {
        return;
      }
      return middleware(ctx, () => dispatch(i + 1));
    };
    return dispatch(0);
  };
}
```

#### 异常记录
```js
try {
  const fn = compose(this.middlewares);
  await fn(ctx);
} catch (e) {
  console.error(e);
  ctx.res.statusCode = 500;
  ctx.res.write("Internel Server Error");
}
// 框架层
// 错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // 1. 异常结构化
    // 2. 异常分类
    // 3. 异常级别
    // 4. 异常上报
  }
});
```
