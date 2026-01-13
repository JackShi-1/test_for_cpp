// 实现一个带并发限制的异步调度器
class Scheduler {
  constructor(limit = 2) {
    // 并发限制数
    this.limit = limit;
    // 正在执行的任务数
    this.running = 0;
    // 等待队列
    this.queue = [];
  }

  // 添加异步任务
  add(promiseCreator) {
    return new Promise((resolve, reject) => {
      // 将任务和 resolve/reject 存入队列
      this.queue.push({
        promiseCreator,
        resolve,
        reject,
      });
      // 尝试执行任务
      this.run();
    });
  }

  // 执行任务的核心方法
  run() {
    // 若正在执行的任务数 >= 限制，或队列无任务，直接返回
    if (this.running >= this.limit || this.queue.length === 0) {
      return;
    }

    // 取出队列头部任务
    const { promiseCreator, resolve, reject } = this.queue.shift();
    // 正在执行任务数 +1
    this.running++;

    // 执行异步任务
    promiseCreator()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      })
      .finally(() => {
        // 任务完成后，正在执行任务数 -1
        this.running--;
        // 递归执行下一个任务
        this.run();
      });
  }
}

// 事件发射器类
// 定义事件回调函数的类型
class EventEmitter {
  constructor() {
    // 存储事件与对应回调函数的映射：{ eventName: [callback1, callback2] }
    this.events = Object.create(null); // 空对象，无原型链污染
  }

  /**
   * 绑定事件（可重复绑定同一个事件的多个回调）
   * @param {string} eventName - 事件名称
   * @param {Function} callback - 事件触发时执行的回调函数
   * @returns {EventEmitter} - 返回实例，支持链式调用
   */
  on(eventName, callback) {
    // 校验参数合法性
    if (typeof eventName !== "string" || typeof callback !== "function") {
      throw new Error("事件名必须是字符串，回调必须是函数");
    }

    // 初始化事件对应的回调数组（不存在则创建空数组）
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    // 将回调添加到数组中（允许同一个回调重复绑定）
    this.events[eventName].push(callback);
    return this; // 链式调用
  }

  /**
   * 触发事件（可传递任意参数给回调函数）
   * @param {string} eventName - 事件名称
   * @param  {...any} args - 传递给回调函数的参数
   * @returns {EventEmitter} - 返回实例，支持链式调用
   */
  emit(eventName, ...args) {
    // 若事件无绑定回调，直接返回
    if (!this.events[eventName]) return this;

    // 遍历执行所有回调（复制数组避免执行中数组被修改）
    const callbacks = [...this.events[eventName]];
    callbacks.forEach((callback) => {
      try {
        callback.apply(this, args); // 绑定 this 为实例，传递参数
      } catch (error) {
        console.error(`事件 ${eventName} 回调执行出错：`, error);
      }
    });
    return this;
  }

  /**
   * 解绑事件（可解绑单个回调、全部回调）
   * @param {string} eventName - 事件名称
   * @param {Function} [callback] - 可选，指定要解绑的回调（不传则解绑该事件所有回调）
   * @returns {EventEmitter} - 返回实例，支持链式调用
   */
  off(eventName, callback) {
    // 事件无绑定回调，直接返回
    if (!this.events[eventName]) return this;

    // 1. 不传 callback：清空该事件所有回调
    if (typeof callback !== "function") {
      this.events[eventName] = [];
      return this;
    }

    // 2. 传 callback：只解绑指定的回调
    this.events[eventName] = this.events[eventName].filter(
      (cb) => cb !== callback
    );
    return this;
  }

  /**
   * 绑定一次性事件（触发一次后自动解绑）
   * @param {string} eventName - 事件名称
   * @param {Function} callback - 事件触发时执行的回调函数
   * @returns {EventEmitter} - 返回实例，支持链式调用
   */
  once(eventName, callback) {
    // 包装回调：执行原回调后立即解绑
    const wrapCallback = (...args) => {
      callback.apply(this, args); // 执行原回调
      this.off(eventName, wrapCallback); // 解绑包装后的回调
    };

    // 绑定包装后的回调（而非原回调）
    this.on(eventName, wrapCallback);
    return this;
  }
}
