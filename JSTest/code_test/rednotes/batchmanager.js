// 实现batchManager.request方法，将指定时间间隔M ms内的最多N个请求参数合并，减少接口调用次数。
// 功能解析
// 代码意图：
// 多次调用batchManager.request(url, 参数)，希望将这些请求的参数合并后批量发送；
// 第一个请求的then回调中打印 “res1”，说明请求会返回 Promise，支持异步链式调用。
// 核心需求：
// 合并规则：
// 时间维度：在M ms的时间窗口内的请求会被合并；
// 数量维度：同一窗口内最多合并N个请求的参数。
// 最终行为：合并后的请求会统一发送，响应后再分发给各个原请求的 Promise。

class BatchManager {
  constructor(maxBatchSize = N, delay = M) {
    this.maxBatchSize = maxBatchSize; // 最多合并N个请求
    this.delay = delay; // 时间间隔M ms
    this.queue = []; // 暂存请求的参数和Promise回调
    this.timer = null; // 延迟定时器
  }

  request(url, param) {
    return new Promise((resolve) => {
      // 1. 将请求参数和resolve存入队列
      this.queue.push({ url, param, resolve });

      // 2. 启动延迟定时器，到时间后合并请求
      if (!this.timer) {
        this.timer = setTimeout(() => this.flush(), this.delay);
      }

      // 3. 若队列长度达到上限，立即合并
      if (this.queue.length >= this.maxBatchSize) {
        clearTimeout(this.timer);
        this.timer = null;
        this.flush();
      }
    });
  }

  // 合并请求并发送
  async flush() {
    if (this.queue.length === 0) return;
    const batch = [...this.queue];
    this.queue = [];

    // 提取合并后的参数（示例：按url分组，收集param）
    const grouped = batch.reduce((map, item) => {
      if (!map[item.url]) map[item.url] = { url: item.url, params: [] };
      map[item.url].params.push(item.param);
      return map;
    }, {});

    // 批量发送请求（实际项目中替换为真实接口调用）
    for (const { url, params } of Object.values(grouped)) {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(params),
      });
      const data = await res.json();

      // 将响应分发给每个原请求的Promise
      batch
        .filter((item) => item.url === url)
        .forEach((item, idx) => item.resolve(data[idx]));
    }
  }
}

// 使用示例
const batchManager = new BatchManager(3, 100); // 最多合并3个请求，间隔100ms
batchManager.request("/api", 1).then(() => console.log("res1"));
batchManager.request("/api", 2);
batchManager.request("/api", 3);
batchManager.request("/api", 3); // 若N=3，此请求会触发新的合并
