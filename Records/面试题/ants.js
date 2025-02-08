class EventBus {
  constructor() {
    this.events = {};
  }

  // on
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    if (!this.events[eventName].find((i) => i === callback)) {
      this.events[eventName].push(callback);
    }
  }

  //emit
  emit(eventName, ...args) {
    if (this.events[eventName]) {
      for (const callback of this.events[eventName]) {
        callback(...args);
      }
    }
  }

  //off
  off(eventName, callback) {
    if (this.events[eventName]) {
      if (!callback) {
        this.events[eventName] = [];
      } else {
        this.events[eventName] = this.events[eventName].filter(
          (i) => i !== callback
        );
      }
    } else {
      this.events[eventName] = null;
    }
  }
}

function handleSleep1() {
  console.log("sleep1");
}

function handleSleep2() {
  console.log("sleep2");
}

function handleSleep3() {
  console.log("sleep3");
}
const eventBus = new EventBus();
// 一堆监听
eventBus.on("sleep", handleSleep1);
eventBus.on("sleep", handleSleep2);
eventBus.on("sleep", handleSleep1);
eventBus.on("sleep", handleSleep3);
// 取消一个
eventBus.off("sleep", handleSleep3);
// 触发
eventBus.emit("sleep");

// 预期正确输出是（重复监听不生效、按监听顺序执行、取消的不生效）
// sleep1
// sleep2

// 全部取消
eventBus.off("sleep");
// 触发
eventBus.emit("sleep");
// 预期的正确输出是：没有输出
