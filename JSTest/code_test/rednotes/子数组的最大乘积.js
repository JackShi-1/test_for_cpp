// 这个问题的核心难点在于：
// 负数的存在会让当前的最小乘积（比如一个很大的负数）乘以另一个负数后，变成最大乘积。
// 0 的存在会重置乘积的计算。
// 因此，我们不能只维护当前的最大乘积，还需要维护当前的最小乘积，具体思路：
// 初始化全局最大乘积 maxResult、当前最大乘积 currentMax、当前最小乘积 currentMin 为数组第一个元素。
// 从数组第二个元素开始遍历：
// 临时保存当前的 currentMax（因为更新 currentMin 时会用到原值）。
// 计算当前元素与 currentMax 的乘积、当前元素与 currentMin 的乘积、当前元素本身，取这三者的最大值作为新的 currentMax。
// 取这三者的最小值作为新的 currentMin。
// 更新 maxResult 为 maxResult 和 currentMax 中的较大值。
/**
 * 计算子数组的最大乘积
 * @param {number[]} nums 输入的数字数组
 * @returns {number} 子数组的最大乘积
 */
function maxProductSubarray(nums) {
  // 边界处理：空数组返回0，单元素数组返回自身
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  // 初始化：全局最大、当前最大、当前最小都为第一个元素
  let maxResult = nums[0];
  let currentMax = nums[0];
  let currentMin = nums[0];

  // 从第二个元素开始遍历
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];
    // 临时保存当前max，因为更新min时需要用到原始的currentMax
    const tempMax = currentMax;

    // 核心逻辑：当前max = max(当前数, 当前数*上一轮max, 当前数*上一轮min)
    currentMax = Math.max(num, num * tempMax, num * currentMin);
    // 当前min = min(当前数, 当前数*上一轮max, 当前数*上一轮min)
    currentMin = Math.min(num, num * tempMax, num * currentMin);

    // 更新全局最大乘积
    maxResult = Math.max(maxResult, currentMax);
  }

  return maxResult;
}

// 测试用例
console.log(maxProductSubarray([2, 3, -2, 4])); // 输出 6（子数组 [2,3]）
console.log(maxProductSubarray([-2, 0, -1])); // 输出 0（子数组 [0]）
console.log(maxProductSubarray([-2, 3, -4])); // 输出 24（子数组 [-2,3,-4]）
console.log(maxProductSubarray([0, 2])); // 输出 2（子数组 [2]）
