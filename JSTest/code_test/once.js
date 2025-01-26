// #### 18. 同一页面三个组件请求同一个 API 发送了三次请求，如何优化
const fetchUser = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Fetch: ", id);
      resolve(id);
    }, 5000);
  });
};

const cache = {};
const cacheFetchUser = (id) => {
  if (cache[id]) {
    return cache[id];
  }
  cache[id] = fetchUser(id);
  return cache[id];
};

// 效果
cacheFetchUser(3).then((id) => console.log(id));
cacheFetchUser(3).then((id) => console.log(id));
cacheFetchUser(3).then((id) => console.log(id));

// Fetch:  3
// ​// 3
// ​// 3
// ​// 3

function once(f) {
  let result;
  let revoked = false;
  return (...args) => {
    if (revoked) return result;
    const r = f(...args);
    revoked = true;
    result = r;
    return r;
  };
}

// 惰性函数
function once(fn) {
  function o(...args) {
    const res = fn(...args);
    o = () => res;
    return o();
  }
  return o; // 函数重写
}

const memoize = function (func, content) {
  let cache = Object.create(null);
  content = content || this;
  return (...key) => {
    if (!cache[key]) {
      cache[key] = func.apply(content, key);
    }
    return cache[key];
  };
};
// 在当前函数作用域定义了一个空对象，用于缓存运行结果
// 运用柯里化返回一个函数，返回的函数由于闭包特性，可以访问到cache
// 然后判断输入参数是不是在cache的中。如果已经存在，直接返回cache的内容，如果没有存在，使用函数func对输入参数求值，然后把结果存储在cache中
