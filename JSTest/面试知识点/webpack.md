### 掌握 Webpack

#### 1. 安装 Webpack

在项目中安装 Webpack 和 Webpack CLI：

```bash
npm install webpack webpack-cli --save-dev
```

#### 2. 配置 Webpack

在项目根目录下创建一个 `webpack.config.js` 文件，以下是一个简单的配置示例：

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};
```

#### 3. 编写入口文件

在项目中创建 `src` 目录，并在其中创建 `index.js` 文件，编写一些代码：

```javascript
const message = "Hello, Webpack!";
console.log(message);
```

#### 4. 运行 Webpack

在 `package.json` 的 `scripts` 中添加一个脚本：

```json
{
  "scripts": {
    "build": "webpack"
  }
}
```

然后在命令行中运行：

```bash
npm run build
```

Webpack 会根据配置文件将 `src/index.js` 打包到 `dist/bundle.js` 中。

#### 5. 学习 Webpack 加载器和插件

Webpack 可以使用加载器（Loader）处理不同类型的文件，如 CSS、图片等，使用插件（Plugin）扩展功能，如代码压缩、分割代码等。例如，安装并配置 `style-loader` 和 `css-loader` 来处理 CSS 文件：

```bash
npm install style-loader css-loader --save-dev
```

在 `webpack.config.js` 中添加加载器配置：

```javascript
module.exports = {
  // ... 其他配置
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

---

### 6. Webpack

> `webpack`是一个打包工具，他的宗旨是一切静态资源皆可打包。

- 为什么要 webpack？
  - webpack 是现代前端技术的基石，常规的开发方式，比如 jquery,html,css 静态网页开发已经落后了。
  - 现在是 MVVM 的时代，数据驱动界面。webpack 它做的事情是，分析你的项目结构，找到 JavaScript 模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript 等），并将其打包为合适的格式以供浏览器使用。

#### 6.1 webpack 核心概念

模块化：Webpack 将项目中的各种文件（包括 JavaScript、CSS、图片等）都视作模块，这些模块可以相互依赖、引用，并通过 loader 进行处理。它支持多种模块化规范（如 CommonJS、AMD、ES Modules 等），能够将不同类型的资源都视作模块进行处理和管理

1. **Entry（入口）**：指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
2. **Output（出口）**：告诉 webpack 在哪里输出它所创建的结果文件，以及如何命名这些文件，默认值为./dist。
3. Loader（模块转换器）：将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。
   Webpack 通过 Loader 来处理非 JavaScript 文件，比如处理 CSS、图片、字体等资源文件，将它们转换成模块可以直接引用的形式。Loader 允许开发者在构建过程中预处理文件，例如使用 Babel 处理 ES6+ 语法、使用 PostCSS 处理 CSS、压缩图片等
4. Plugins（插件）：在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。通过各种插件提供了丰富的功能和优化方式，例如压缩代码、代码分割、资源优化、环境变量注入等
5. **Module(模块)**：开发者将程序分解成离散功能块，并称之为模块，在 webpack 里一个模块对应着一个文件，webpack 会从配置的 Entry 开始递归找出所有依赖的模块。

#### 6.2 Webpack 执行流程

- webpack 启动后会在 entry 里配置的 module 开始递归解析 entry 所依赖的所有 module，
- 每找到一个 module, 就会根据配置的 loader 去找相应的转换规则，对 module 进行转换后在解析当前 module 所依赖的 module，这些模块会以 entry 为分组，一个 entry 和所有相依赖的 module 也就是一个 chunk，
- 最后 webpack 会把所有 chunk 转换成文件输出，在整个流程中 webpack 会在恰当的时机执行 plugin 的逻辑

#### 6.3 如何提⾼ webpack 的打包速度?

##### 1. 优化 Loader

> 🌰: Babel 会将代码转为字符串生成 AST，然后对 AST 继续进行转变最后再生成新的代码，项目越大，转换代码越多，效率就越低。当然了，这是可以优化的

1.  优化 `Loader` 的文件搜索范围
2.  将 `Babel` 编译过的文件**缓存**起来

##### 2. HappyPack

- `Webpack` 在打包的过程中也是单线程的，特别是在执行 `Loader` 的时候，长时间编译的任务很多，这样就会导致等待的情况
- `HappyPack` 可以将 `Loader` 的同步执行转换为并行的，这样就能充分利用系统资源来加快打包效率了

##### 3. DllPlugin

`DllPlugin` 可以将特定的类库提前打包然后引入。这种方式可以极大的减少打包类库的次数，只有当类库更新版本才有需要重新打包，并且也实现了将公共代码抽离成单独文件的优化方案。

##### 4. 代码压缩

- `Webpack3`: 一般使用 `UglifyJS` 来压缩代码，但是这个是单线程运行的，为了加快效率，可以使用 webpack-parallel-uglify-plugin 来并行运行 UglifyJS，从而提高效率。
- `Webpack4` 中，mode => production 就可以默认开启以上功能。代码压缩也是我们必做的性能优化方案，当然我们不止可以压缩 JS 代码，还可以压缩 HTML、CSS 代码，并且在压缩 JS 代码的过程中，我们还可以通过配置实现比如删除 console.log 这类代码的功能。

##### 其他

可以通过一些小的优化点来加快打包速度

- resolve.extensions：用来表明文件后缀列表，默认查找顺序是 ['.js', '.json']，如果你的导入文件没有添加后缀就会按照这个顺序查找文件。我们应该尽可能减少后缀列表长度，然后将出现频率高的后缀排在前面
- resolve.alias：可以通过别名的方式来映射一个路径，能让 Webpack 更快找到路径
- module.noParse：如果你确定一个文件下没有其他依赖，就可以使用该属性让 Webpack 不扫描该文件，这种方式对于大型的类库很有帮助

1.  使用合适的 Loader 和 Plugin：
    Loader： 确保使用最轻量级的 Loader 来处理文件，避免不必要的转换和处理。
    Plugin： 只使用必要的插件，避免过多的插件配置。
2.  缩小文件搜索范围：
    resolve 配置： 在 Webpack 配置中使用 resolve 配置项，缩小模块搜索范围。
    exclude/include 配置： 在 Loader 配置中使用 exclude 和 include 来缩小 Loader 处理的文件范围。
3.  使用 DllPlugin 提前打包：
    使用 DllPlugin 预先打包第三方库，减少打包时间，加快构建速度。
4.  开启缓存：
    使用缓存（cache）：开启 Webpack 的缓存功能，可以减少构建时间。
    使用 hard-source-webpack-plugin 等插件，将模块缓存到磁盘，提高二次构建速度。
5.  多线程/并行构建：
    使用 HappyPack 或 thread-loader 等插件，实现多线程或并行构建，加快构建速度。
6.  代码分割和懒加载：
    使用代码分割（Code Splitting）和懒加载（Lazy Loading），避免一次性加载过多资源。
7.  Tree Shaking：
    开启 Tree Shaking，删除未使用的代码，减少打包体积和构建时间。
8.  减少模块数量：
    尽可能减少不必要的模块依赖，避免构建过多的模块。
9.  升级 Webpack：
    使用最新版本的 Webpack，新版本通常会有性能优化和改进。
10. 监控构建时间：
    使用 Webpack Bundle Analyzer 等工具，分析构建产物，找出体积较大的模块或库，优化打包策略。
    这些优化措施可以根据具体项目需求进行选择和组合，综合利用可以显著提升 Webpack 的构建速度，提高开发效率。

#### 6.4 如何减少 `Webpack` 打包体积

1. 按需加载
   > 可以使用按需加载，将每个路由页面单独打包为一个文件
2. `Scope Hoisting`
   > `Scope Hoisting` 会分析出模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中去
   > wp4: `optimization.concatenateModules`设置为`true`
3. Tree Shaking
   > 实现删除项目中未被引用的代码

#### 6.5 如何⽤ webpack 来优化前端性能？

> ⽤ webpack 优化前端性能是指优化 webpack 的输出结果，让打包的最终结果在浏览器运⾏快速⾼效。

- 压缩代码：删除多余的代码、注释、简化代码的写法等等⽅式。可以利⽤ webpack 的 UglifyJsPlugin 和 ParallelUglifyPlugin 来压缩 JS ⽂件， 利⽤ cssnano （css-loader?minimize）来压缩 css
- 利⽤ CDN 加速: 在构建过程中，将引⽤的静态资源路径修改为 CDN 上对应的路径。可以利⽤ webpack 对于 output 参数和各 loader 的 publicPath 参数来修改资源路径
- Tree Shaking: 将代码中永远不会⾛到的⽚段删除掉。可以通过在启动 webpack 时追加参数 --optimize-minimize 来实现
- Code Splitting: 将代码按路由维度或者组件分块(chunk),这样做到按需加载,同时可以充分利⽤浏览器缓存
- 提取公共第三⽅库: `SplitChunksPlugin`插件来进⾏公共模块抽取,利⽤浏览器缓存可以⻓期缓存这些⽆需频繁变动的公共代码

#### 6.6 如何提⾼ webpack 的构建速度？

1. 多⼊⼝情况下，使⽤ `CommonsChunkPlugin` 来提取公共代码
2. 通过 `externals` 配置来提取常⽤库
3. 利⽤ `DllPlugin` 和 `DllReferencePlugin` 预编译资源模块 通过 `DllPlugin` 来对那些我们引⽤但是绝对不会修改的 npm 包来进⾏预编译，再通过 `DllReferencePlugin` 将预编译的模块加载进来。
4. 使⽤ `Happypack` 实现多线程加速编译
5. 使⽤ `webpack-uglify-parallel` 来提升 `uglifyPlugin` 的压缩速度。 原理上 `webpack-uglify-parallel` 采⽤了多核并⾏压缩来提升压缩速度
6. 使⽤ `Tree-shaking` 和 `Scope Hoisting` 来剔除多余代码

---

# 如何写一个 webpack 插件

Webpack 插件是一个具有 `apply` 方法的 JavaScript 对象，`apply` 方法会在 Webpack 编译器（compiler）实例化时被调用，并接收编译器对象作为参数。以下是编写一个 Webpack 插件的详细步骤和示例：

### 1. 理解 Webpack 插件的基本概念

Webpack 插件通过监听 Webpack 编译器的各种钩子（hooks）来执行特定的任务。钩子是 Webpack 提供的一些事件，允许插件在编译过程的不同阶段插入自定义逻辑。

### 2. 创建插件文件

通常，我们会创建一个独立的 JavaScript 文件来定义插件。以下是一个简单的插件示例，用于在编译完成后输出一条自定义消息：

```javascript
// MyWebpackPlugin.js
class MyWebpackPlugin {
  // 构造函数，可用于接收插件配置参数
  constructor(options) {
    this.options = options;
  }

  // apply 方法是插件的核心，会在 Webpack 编译器实例化时被调用
  apply(compiler) {
    // 监听 compilation 钩子，该钩子在编译开始时触发
    compiler.hooks.compile.tap("MyWebpackPlugin", () => {
      console.log("Compilation is starting...");
    });

    // 监听 done 钩子，该钩子在编译完成时触发
    compiler.hooks.done.tap("MyWebpackPlugin", (stats) => {
      if (this.options && this.options.message) {
        console.log(this.options.message);
      } else {
        console.log("Compilation is done!");
      }
    });
  }
}

module.exports = MyWebpackPlugin;
```

### 3. 在 Webpack 配置中使用插件

在 `webpack.config.js` 文件中引入并使用刚刚创建的插件：

```javascript
const path = require("path");
const MyWebpackPlugin = require("./MyWebpackPlugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    // 实例化插件并传入配置参数
    new MyWebpackPlugin({
      message: "Custom compilation done message!",
    }),
  ],
};
```

### 4. 详细解释

- **类定义**：创建一个 JavaScript 类，类名即为插件名。在类的构造函数中，可以接收插件的配置参数。
- **`apply` 方法**：这是插件的核心方法，Webpack 编译器会调用该方法，并传入 `compiler` 对象。`compiler` 对象代表了整个 Webpack 编译过程，包含了许多钩子（hooks），可以通过监听这些钩子来执行自定义逻辑。
- **钩子监听**：使用 `compiler.hooks.<hookName>.tap` 方法来监听特定的钩子。`hookName` 是 Webpack 提供的钩子名称，`tap` 方法用于注册一个同步钩子，第一个参数是插件名称，第二个参数是一个回调函数，在钩子触发时执行。

### 5. 更多复杂示例：生成文件插件

以下是一个更复杂的示例，用于在编译完成后生成一个自定义的文件：

```javascript
// GenerateFilePlugin.js
const fs = require("fs");
const path = require("path");

class GenerateFilePlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.done.tap("GenerateFilePlugin", () => {
      const outputPath = path.resolve(
        compiler.options.output.path,
        this.options.filename
      );
      const content = this.options.content || "This is a generated file.";

      fs.writeFile(outputPath, content, (err) => {
        if (err) {
          console.error("Error generating file:", err);
        } else {
          console.log(`File ${this.options.filename} generated successfully.`);
        }
      });
    });
  }
}

module.exports = GenerateFilePlugin;
```

在 `webpack.config.js` 中使用该插件：

```javascript
const path = require("path");
const GenerateFilePlugin = require("./GenerateFilePlugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new GenerateFilePlugin({
      filename: "generated.txt",
      content: "Hello, this is a custom generated file!",
    }),
  ],
};
```

通过以上步骤，你可以根据自己的需求编写各种功能的 Webpack 插件，实现对 Webpack 编译过程的定制化控制。
