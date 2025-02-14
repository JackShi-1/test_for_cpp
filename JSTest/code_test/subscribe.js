// 定义发布订阅者类
class PubSub {
  constructor() {
    // 存储订阅者的回调函数，键为事件类型，值为回调函数数组
    this.subscribers = {};
  }

  // 订阅方法，用于添加订阅者的回调函数
  subscribe(eventType, callback) {
    // 如果该事件类型不存在，则创建一个新的回调函数数组
    if (!this.subscribers[eventType]) {
      this.subscribers[eventType] = [];
    }
    // 将回调函数添加到对应事件类型的数组中
    this.subscribers[eventType].push(callback);
  }

  // 发布方法，用于触发事件并执行所有订阅者的回调函数
  publish(eventType, data) {
    // 如果该事件类型有订阅者，则遍历并执行回调函数
    if (this.subscribers[eventType]) {
      this.subscribers[eventType].forEach((callback) => {
        callback(data);
      });
    }
  }

  // 取消订阅方法，用于移除订阅者的回调函数
  unsubscribe(eventType, callback) {
    // 如果该事件类型存在
    if (this.subscribers[eventType]) {
      // 过滤掉要取消的回调函数
      this.subscribers[eventType] = this.subscribers[eventType].filter(
        (cb) => cb !== callback
      );
    }
  }
}

// 使用示例
const pubSub = new PubSub();

// 订阅消息
const handleMessage = (data) => {
  console.log("收到消息:", data);
};
pubSub.subscribe("message", handleMessage);

// 发布消息
pubSub.publish("message", "这是一条测试消息");

// 取消订阅
pubSub.unsubscribe("message", handleMessage);

// 再次发布消息，不会再触发已取消订阅的回调函数
pubSub.publish("message", "另一条测试消息");
