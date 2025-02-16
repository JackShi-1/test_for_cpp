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
