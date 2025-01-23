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
cacheFetchUser(3).then((id) => console.log(id))
cacheFetchUser(3).then((id) => console.log(id))
cacheFetchUser(3).then((id) => console.log(id))

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