class RequestQueue {
  constructor(maxLength: number) {}
  count = 0;
  queue = [];

  request<T>(func: () => Promise<T>): Promise<T> {
    // do something
    return new Promise((resolve, reject) => {
      count++;
      if (count < maxLength) {
        const res = await func();
        count--;
        resolve(res);
      } else if (count >= maxLength) {
        const res = () => {
          const test = await func();
          count--;
          resolve(res);
        };
        this.queue.push(test);
      }
    });
  }
}

const instance = new RequestQueue(3);

const promise1 = instance.request(async () => {
  await delay(100);
  return 1;
});
const promise2 = instance.request(async () => {
  await delay(1000);
  return 2;
});
const promise3 = instance.request(async () => {
  await delay(700);
  return 3;
});
const promise4 = instance.request(async () => {
  // 等待100ms后执行
  await delay(900);
  return 4;
});

await promise1; // 1
await promise4; // 4
