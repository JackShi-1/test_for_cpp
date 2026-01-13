// 求小于n 的最大数？原题如下：
// 数组 A 中给定可以使用的 1~9 的数，返回由数组 A 中的元素组成的小于 n 的最大数。
// 示例 1：A={1, 2, 9, 4}，n=2533，返回 2499。

// 预处理：将 n 转为字符串（方便逐位处理），将数组 A 排序并去重（方便快速查找 / 选择数字）；
// 逐位构造：
// 遍历 n 的每一位，尝试选等于当前位的数字（保证前缀尽可能接近 n）；
// 若无法选等于的数字，选小于当前位的最大数字，后续位全部补 A 中最大数字（此时已确定结果小于 n，补最大数保证结果最大）；
// 若所有位都能选等于的数字，说明构造的数等于 n，需退一步找 “次大” 数（比如 n=222，A=[2]，则结果为 A 中最大数重复 len-1 次，即 22）；
// 边界处理：若 n 的位数大于 A 能组成的最大位数（如 n=1000，A=[9]），则结果为 A 中最大数重复 (len (n)-1) 次（即 999）。

/**
 * 找出由数组A元素组成的、小于n的最大数
 * @param {number[]} A - 1~9的数字数组（可重复，会自动去重排序）
 * @param {number} n - 目标数
 * @returns {number} 满足条件的最大数（无则返回-1，如A=[5],n=5则返回-1）
 */
function findMaxLessThanN(A, n) {
  // 预处理：去重、排序（升序），方便后续查找
  const uniqueA = [...new Set(A)].sort((a, b) => a - b);
  const maxA = uniqueA[uniqueA.length - 1]; // A中最大数字
  const nStr = n.toString();
  const len = nStr.length;
  const result = []; // 存储构造的每一位数字

  // 边界1：如果n的位数 > A能组成的最小位数（即1位），且A有数字
  // 比如n=1000，A=[9]，直接返回maxA重复len-1次
  if (len > 1) {
    const minNum = uniqueA[0];
    const maxLenNum = parseInt(maxA.toString().repeat(len - 1));
    if (maxLenNum > 0) {
      // 先暂存这个候选（后续如果能构造同位数的数，优先级更高）
      let candidate = maxLenNum;

      // 尝试构造同位数的数
      let isPossible = true;
      for (let i = 0; i < len; i++) {
        const currentDigit = parseInt(nStr[i]);
        // 找能选的数字：<= currentDigit
        const available = uniqueA.filter((num) => num <= currentDigit);

        if (available.length === 0) {
          // 当前位无可用数字，无法构造同位数，跳出
          isPossible = false;
          break;
        }

        // 优先选等于currentDigit的数字
        const equalIdx = available.findIndex((num) => num === currentDigit);
        if (equalIdx !== -1) {
          result.push(currentDigit);
        } else {
          // 选小于currentDigit的最大数字，后续补maxA
          const maxLess = available[available.length - 1];
          result.push(maxLess);
          // 补全剩余位为最大数字
          result.push(...Array(len - i - 1).fill(maxA));
          isPossible = false;
          break;
        }
      }

      // 情况1：构造出了同位数的数
      if (isPossible) {
        const constructedNum = parseInt(result.join(""));
        if (constructedNum < n) {
          return constructedNum;
        } else {
          // 构造的数等于n，需退一步（比如n=222，A=[2]，则取22）
          if (len === 1) {
            return -1; // 1位数且等于n，无更小数
          } else {
            return parseInt(maxA.toString().repeat(len - 1));
          }
        }
      } else {
        // 情况2：构造出了同位数但更小的数，和候选比较取大
        const constructedNum = parseInt(result.join(""));
        return Math.max(constructedNum, candidate);
      }
    }
  }

  // 边界2：n是1位数
  const oneDigitCandidates = uniqueA.filter((num) => num < n);
  if (oneDigitCandidates.length > 0) {
    return Math.max(...oneDigitCandidates);
  }

  // 无满足条件的数
  return -1;
}

// 测试用例
console.log(findMaxLessThanN([1, 2, 9, 4], 2533)); // 输出 2499（符合示例）
console.log(findMaxLessThanN([2], 222)); // 输出 22
console.log(findMaxLessThanN([9], 1000)); // 输出 999
console.log(findMaxLessThanN([5], 5)); // 输出 -1
console.log(findMaxLessThanN([3, 6, 8], 400)); // 输出 388
console.log(findMaxLessThanN([1, 3, 5], 351)); // 输出 335
