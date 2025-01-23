var maxSlidingWindow = function (nums, k) {
  const len = nums.length;
  const q = [];

  for (let i = 0; i < k; i++) {
    while (q.length && nums[i] >= nums[q[q.length - 1]]) {
      q.pop();
    }
    q.push(i);
  }

  const ans = [nums[q[0]]];
  for (let j = k; j < len; j++) {
    while (q.length && nums[j] >= nums[q[q.length - 1]]) {
      q.pop();
    }
    q.push(j);

    while (q[0] <= j - k) {
      q.shift();
    }

    console.log(q, "===current q");
    ans.push(nums[q[0]]);
  }
  return ans;
};

console.log(maxSlidingWindow([1, 3, 1, 2, 0, 5], 3));
