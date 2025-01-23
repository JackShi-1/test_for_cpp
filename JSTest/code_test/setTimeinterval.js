// 简易版
setTimeout(function () {
  // 任务
  setTimeout(arguments.callee, 1000);
}, 1000);

let timeMap = {};
let id = 0; // 简单实现id唯一
const mySetInterval = (cb, time) => {
  let timeId = id; // 将timeId赋予id
  id++; // id 自增实现唯一id
  let fn = () => {
    cb();
    timeMap[timeId] = setTimeout(() => {
      fn();
    }, time);
  };
  timeMap[timeId] = setTimeout(fn, time);
  return timeId; // 返回timeId
};

const myClearInterval = (id) => {
  clearTimeout(timeMap[id]); // 通过timeMap[id]获取真正的id
  delete timeMap[id];
};

function mySetTimeout(func, delay) {
  //timer用来接收setInterval返回的编号，用于后面清除setInterval
  //setInterval会一直执行，但是在setInterval里面执行clearInterval()将会被清除
  const timer = setInterval(() => {
    //执行传入函数
    func();
    //清除该次setInterval
    clearInterval(timer);
  }, delay);
}
