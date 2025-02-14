function debounce(fn, wait) {
  let timer = null;

  return function (...args) {
    // 如果此时存在定时器的话，则取消之前的定时器重新记时
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    // 设置定时器，使事件间隔指定事件后执行
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);

    // if(!timer){
    //     timer = setTimeout(()=>{
    //         timer = null;
    //         fn.apply(this, args);
    //     }, wait);
    // }
    // thorttle2
  };
}

function throttle(fn, delay) {
  let curTime = Date.now();

  return function (...args) {
    let nowTime = Date.now();

    // 如果两次时间间隔超过了指定时间，则执行函数。
    if (nowTime - curTime >= delay) {
      curTime = Date.now();
      return fn.apply(this, args);
    }
  };
}
