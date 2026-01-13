// 10.广度搜索方向，见原题：
// 2 0 1 0 0 0
// 1 0 1 0 0 0
// 1 1 2 2 0 0
// 0 0 0 0 0 0
// 0 海洋
// 1 海贼 -> 海贼团
// 2 海军 -> 海军团

// 海贼团数量 <= 周围海军团里人数之和
// 找到能抓到的最大海贼团

// 你想要解决的问题是基于广度优先搜索（BFS）的网格分析问题：在由海洋 (0)、海贼 (1)、海军 (2) 组成的网格中，统计每个 “海贼团” 的人数，再计算其周围 “海军团” 的总人数，筛选出满足「海贼团人数 ≤ 周围海军团总人数」的海贼团，并找出其中最大的那个。
// 核心解题思路
// 网格预处理：
// 标记已访问的单元格，避免重复统计；
// 定义四个方向（上下左右），用于 BFS 遍历相邻单元格。
// 分步骤处理：
// 第一步：遍历网格，用 BFS 找出所有海军团，记录每个海军团的人数，并给每个海军团分配唯一标识，同时记录每个海军单元格所属的海军团（避免重复计算周围海军人数）；
// 第二步：遍历网格，用 BFS 找出所有海贼团，统计该海贼团人数，再遍历其所有相邻单元格，收集周围不重复的海军团，计算这些海军团的总人数；
// 第三步：筛选出满足条件的海贼团，找出人数最大的那个。

/**
 * 求解能抓到的最大海贼团
 * @param {number[][]} grid - 网格数组，0=海洋，1=海贼，2=海军
 * @returns {number} 满足条件的最大海贼团人数（无则返回0）
 */
function findMaxCapturablePirateGroup(grid) {
  if (!grid || grid.length === 0 || grid[0].length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]; // 上下左右四个方向

  // ------------- 第一步：处理所有海军团，记录每个海军团的人数和所属标识 -------------
  const navyVisited = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  ); // 标记海军是否已访问
  const navyGroupId = Array.from({ length: rows }, () => Array(cols).fill(-1)); // 记录每个海军单元格所属的海军团ID
  const navyGroupSize = new Map(); // 键：海军团ID，值：该团人数
  let currentNavyId = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // 找到未访问的海军单元格，开始BFS统计海军团
      if (grid[i][j] === 2 && !navyVisited[i][j]) {
        const queue = [[i, j]];
        navyVisited[i][j] = true;
        navyGroupId[i][j] = currentNavyId;
        let size = 0;

        while (queue.length > 0) {
          const [x, y] = queue.shift();
          size++;

          // 遍历四个方向
          for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;
            // 边界检查 + 是海军 + 未访问
            if (
              nx >= 0 &&
              nx < rows &&
              ny >= 0 &&
              ny < cols &&
              grid[nx][ny] === 2 &&
              !navyVisited[nx][ny]
            ) {
              navyVisited[nx][ny] = true;
              navyGroupId[nx][ny] = currentNavyId;
              queue.push([nx, ny]);
            }
          }
        }

        // 记录该海军团的人数
        navyGroupSize.set(currentNavyId, size);
        currentNavyId++;
      }
    }
  }

  // ------------- 第二步：处理所有海贼团，统计人数并检查周围海军团总人数 -------------
  const pirateVisited = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  ); // 标记海贼是否已访问
  let maxPirateSize = 0; // 记录满足条件的最大海贼团人数

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // 找到未访问的海贼单元格，开始BFS统计海贼团
      if (grid[i][j] === 1 && !pirateVisited[i][j]) {
        const queue = [[i, j]];
        pirateVisited[i][j] = true;
        let pirateSize = 0;
        const adjacentNavyGroups = new Set(); // 存储该海贼团周围的海军团ID（去重）

        while (queue.length > 0) {
          const [x, y] = queue.shift();
          pirateSize++;

          // 遍历当前海贼单元格的四个方向，收集周围海军团
          for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;
            // 边界检查
            if (nx >= 0 && nx < rows && ny >= 0 && ny < cols) {
              // 是海军，且该海军团未被记录过
              if (grid[nx][ny] === 2 && navyGroupId[nx][ny] !== -1) {
                adjacentNavyGroups.add(navyGroupId[nx][ny]);
              }
              // 是未访问的海贼，加入队列
              else if (grid[nx][ny] === 1 && !pirateVisited[nx][ny]) {
                pirateVisited[nx][ny] = true;
                queue.push([nx, ny]);
              }
            }
          }
        }

        // 计算周围海军团的总人数
        let totalNavySize = 0;
        for (const id of adjacentNavyGroups) {
          totalNavySize += navyGroupSize.get(id) || 0;
        }

        // 检查条件：海贼团人数 ≤ 周围海军团总人数，更新最大人数
        if (pirateSize <= totalNavySize && pirateSize > maxPirateSize) {
          maxPirateSize = pirateSize;
        }
      }
    }
  }

  return maxPirateSize;
}

// 测试用例（题目给出的网格）
const testGrid = [
  [2, 0, 1, 0, 0, 0],
  [1, 0, 1, 0, 0, 0],
  [1, 1, 2, 2, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

const maxPirate = findMaxCapturablePirateGroup(testGrid);
console.log("能抓到的最大海贼团人数：", maxPirate);
