// 排序+中位数  ，求最短距离 原题：有一个村庄，我们现在姑且用一个坐标轴来表示，村庄上有n户人家（通过坐标给出位置），现在村里人面临一个巨大的问题，就是 没有网络，而抠门的网络公司只愿意给出一条主干的电缆（电缆为直线），请问如果放置这根主干电缆才能让所有的家到电缆（每户单独牵线不）的距离总和最小（电缆只能与x轴或y轴平行）
// 9.输入：
// 10.n
// 11.x1 y1
// 12.x2 y2
// 13.…
// 14.xn yn
// 15.输出
// sig ans（sig为x或者y表示线缆平行x轴或y轴，ans为经过坐标轴的点的值）

// 你想要解决的问题是：在坐标轴上的村庄中，找到一条平行于 x 轴或 y 轴的主干电缆，使得所有住户到电缆的距离总和最小，并输出电缆的方向（x/y）和经过的坐标值。这个问题的核心是利用排序 + 中位数的特性来求解，因为中位数能让点到它的距离总和最小。
// 核心解题思路
// 问题拆解：
// 电缆平行 x 轴：等价于找一个 y 值，使得所有住户的 y 坐标到该值的距离总和最小；
// 电缆平行 y 轴：等价于找一个 x 值，使得所有住户的 x 坐标到该值的距离总和最小；
// 关键定理：对于一维数轴上的点集，中位数是使所有点到它的距离总和最小的点（这是本题的核心，比平均数更优）；
// 步骤：
// 提取所有住户的 x 坐标和 y 坐标，分别排序；
// 找到 x 坐标的中位数和 y 坐标的中位数；
// 计算所有点到 x 中位数的距离总和（对应平行 y 轴的电缆）、到 y 中位数的距离总和（对应平行 x 轴的电缆）；
// 比较两个总和，选择更小的那个，输出对应的方向和中位数；若相等，可任选（通常优先 x 或 y 均可）。

/**
 * 求解最优电缆位置：平行x/y轴，使距离总和最小
 * @param {Array<Array<number>>} houses - 住户坐标数组，格式 [[x1,y1], [x2,y2], ...]
 * @returns {Object} { sig: 'x'|'y', ans: number } 电缆方向和经过的坐标
 */
function findBestCable(houses) {
  // 1. 提取所有x、y坐标
  const xs = houses.map((house) => house[0]).sort((a, b) => a - b);
  const ys = houses.map((house) => house[1]).sort((a, b) => a - b);

  // 2. 找中位数（奇数个取中间，偶数个取中间任意一个，结果一致）
  const getMedian = (arr) => {
    const mid = Math.floor(arr.length / 2);
    return arr[mid];
  };
  const xMedian = getMedian(xs);
  const yMedian = getMedian(ys);

  // 3. 计算距离总和：平行y轴（x中位数）、平行x轴（y中位数）
  const calcTotalDistance = (arr, median) => {
    return arr.reduce((sum, val) => sum + Math.abs(val - median), 0);
  };
  const totalX = calcTotalDistance(xs, xMedian); // 平行y轴的总距离
  const totalY = calcTotalDistance(ys, yMedian); // 平行x轴的总距离

  // 4. 选择总距离更小的方向，若相等优先选x（可自定义）
  if (totalX < totalY) {
    return { sig: "y", ans: xMedian }; // 平行y轴，经过x=xMedian
  } else if (totalY < totalX) {
    return { sig: "x", ans: yMedian }; // 平行x轴，经过y=yMedian
  } else {
    // 距离相等时，任选一个（这里优先选x）
    return { sig: "x", ans: yMedian };
  }
}

// 测试用例
// 输入示例：5户人家，坐标分别为 [1,2], [3,4], [5,6], [7,8], [9,10]
const houses = [
  [1, 2],
  [3, 4],
  [5, 6],
  [7, 8],
  [9, 10],
];
const result = findBestCable(houses);
console.log(`电缆方向：${result.sig}，经过坐标值：${result.ans}`);

// 另一个测试用例（偶数个点）
const houses2 = [
  [1, 3],
  [2, 5],
  [4, 1],
  [5, 7],
];
const result2 = findBestCable(houses2);
console.log(`电缆方向：${result2.sig}，经过坐标值：${result2.ans}`);
