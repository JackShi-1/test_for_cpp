// 要解决版本号排序问题，核心是按版本号的 “段” 逐位比较（比如0.1.1拆分为[0,1,1]，2.3.3拆分为[2,3,3]），遵循 “数字大小优先、段数不足补 0” 的规则。
// 排序思路
// 拆分版本号：将每个版本号按.拆分为数字数组（如'0.3002.1'→[0, 3002, 1]）；
// 逐段比较：对两个版本号的数组，从第 0 段开始逐位比较数字大小；
// 补 0 对齐：若两个版本号的段数不同，段数少的补 0 后再比较（如4.2→[4,2,0]，与4.3.5→[4,3,5]比较）。

const versions = ["0.1.1", "2.3.3", "0.3002.1", "4.2", "4.3.5", "4.3.4.5"];

// 自定义排序规则
versions.sort((a, b) => {
  // 拆分版本号为数字数组
  const arrA = a.split(".").map(Number);
  const arrB = b.split(".").map(Number);

  // 逐段比较，取较长的段数作为循环次数
  const maxLen = Math.max(arrA.length, arrB.length);
  for (let i = 0; i < maxLen; i++) {
    // 段数不足则补0
    const numA = arrA[i] || 0;
    const numB = arrB[i] || 0;

    // 比较当前段的数字大小
    if (numA > numB) return 1;
    if (numA < numB) return -1;
  }
  // 所有段都相等，返回0
  return 0;
});

console.log(versions);
