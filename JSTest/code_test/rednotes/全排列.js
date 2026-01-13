// 全排列核心思路
// 全排列的本质是枚举所有可能的元素排列组合，且每个元素仅出现一次。以数组 [1,2,3] 为例，全排列结果是 [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]。
// 实现思路（回溯法）：
// 路径：记录当前已选择的元素（比如已选 [1]）；
// 选择列表：记录当前可选择的元素（比如选了 [1] 后，可选 [2,3]）；
// 终止条件：路径长度等于原数组长度，说明已生成一个完整排列，加入结果集；
// 回溯操作：选择一个元素→递归→撤销选择（回溯），尝试下一个元素。
/**
 * 生成数组的全排列
 * @param {number[]} nums - 输入数组（无重复元素）
 * @returns {number[][]} 所有全排列结果
 */
function permute(nums) {
  const result = []; // 存储最终全排列结果
  const path = []; // 记录当前路径（已选元素）
  const used = new Array(nums.length).fill(false); // 标记元素是否已被使用

  // 回溯函数
  const backtrack = () => {
    // 终止条件：路径长度等于数组长度，保存当前排列
    if (path.length === nums.length) {
      result.push([...path]); // 深拷贝，避免后续修改影响结果
      return;
    }

    // 遍历所有可选元素
    for (let i = 0; i < nums.length; i++) {
      // 跳过已使用的元素
      if (used[i]) continue;

      // 选择当前元素
      used[i] = true;
      path.push(nums[i]);

      // 递归：继续选择下一个元素
      backtrack();

      // 回溯：撤销选择，尝试下一个可能
      path.pop();
      used[i] = false;
    }
  };

  backtrack();
  return result;
}

// 测试用例
const nums = [1, 2, 3];
const permutations = permute(nums);
console.log("数组 [1,2,3] 的全排列：");
console.log(permutations);
