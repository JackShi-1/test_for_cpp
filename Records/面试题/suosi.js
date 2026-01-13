// 在网页上展示如下数字三角形，
// 要求：
// 1. 一个文本框输入n
// 2. 按照1，2，3，4，5。。。。的顺序出现
// n=5
// 1
// 2 12
// 3 13 11
// 4 14 15 10
// 5 6 7 8 9

function spiralFill(n) {
  const result = new Array(n).fill(0).map((_, i) => new Array(n).fill(0));
  const nums = (n * n + n) / 2;
  let i = 0,
    j = 0;
  let num = 1;
  let flag = "下";

  while (num <= nums) {
    result[i][j] = num;
    num++;
    if (flag === "下") {
      i++;
    } else if (flag === "右") {
      j++;
    } else if (flag === "左上") {
      i--;
      j--;
    }
    if (flag === "下" && (i >= n - 1 || result[i][j] !== 0)) {
      flag = "右";
      // 要退回去并且改方向
      if (result[i][j]) {
        i--;
        j++;
      }
    } else if (flag === "右" && (j >= n - 1 || result[i][j] !== 0)) {
      flag = "左上";
      // 要退回去并且改方向
      if (result[i][j]) {
        j--;
        i--;
        j--;
      }
    } else if (flag === "左上" && result[i][j] !== 0) {
      flag = "下";
      // 要退回去并且改方向
      if (result[i][j]) {
        i++;
        j++;
        i++;
      }
    }
  }
  console.log(result);
}
spiralFill(5);
spiralFill(6);

/**
 * 生成指定层数的数字三角形（纯JS核心函数）
 * @param {number} n - 三角形层数（正整数）
 * @returns {Array} - 二维数组，每个子数组对应一行的数字
 * @throws {Error} - 输入非正整数时抛出错误
 */
function generateNumberTriangle(n) {
  // 输入校验
  if (!Number.isInteger(n) || n < 1) {
    throw new Error("参数必须是正整数！");
  }

  // 初始化 n x n 的二维数组，填充0
  const matrix = Array.from({ length: n }, () => Array(n).fill(0));

  let currentNum = 1; // 当前要填充的数字
  let top = 0; // 上边界（行）
  let bottom = n - 1; // 下边界（行）
  let left = 0; // 左边界（列）

  // 核心：螺旋填充数字（匹配要求的顺序）
  while (top <= bottom && left <= bottom) {
    // 1. 从上到下填充左列（top → bottom，固定left列）
    for (let i = top; i <= bottom; i++) {
      matrix[i][left] = currentNum++;
    }
    left++; // 左边界右移
    top++; // 上边界下移（避免重复填充）

    // 2. 从左到右填充底行（left → bottom，固定bottom行）
    for (let i = left; i <= bottom; i++) {
      matrix[bottom][i] = currentNum++;
    }
    bottom--; // 下边界上移

    // 3. 从下到上填充右列（bottom → top，固定bottom+1列）
    for (let i = bottom; i >= top; i--) {
      matrix[i][bottom + 1] = currentNum++;
    }
  }

  // 处理为三角形格式：第i行只保留前i+1个数字
  const triangle = [];
  for (let i = 0; i < n; i++) {
    triangle.push(matrix[i].slice(0, i + 1));
  }

  return triangle;
}

// ------------------- 测试示例 -------------------
// 测试n=5的情况
const n = 5;
try {
  const triangle = generateNumberTriangle(n);
  // 格式化打印结果（模拟网页展示的换行+空格效果）
  console.log(`n=${n} 的数字三角形：`);
  triangle.forEach((row) => {
    console.log(row.join(" "));
  });
} catch (error) {
  console.error(error.message);
}
