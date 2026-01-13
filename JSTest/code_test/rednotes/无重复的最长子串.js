// 这个问题最优的解法是滑动窗口（双指针）+ 哈希集合：
// 滑动窗口：用两个指针（左指针 left、右指针 right）表示当前正在检查的子串区间，窗口内始终是无重复字符的子串。
// 哈希集合：存储当前窗口内的字符，快速判断右指针指向的字符是否重复。
// 核心逻辑：
// 右指针逐个遍历字符，若当前字符不在集合中，加入集合并更新最长子串长度；
// 若当前字符重复，左指针右移，同时从集合中移除左指针离开的字符，直到窗口内无重复；
// 遍历结束后，返回最长子串的长度（也可记录子串内容）。
/**
 * 查找无重复字符的最长子串，返回其长度（可扩展返回子串）
 * @param {string} s - 输入字符串
 * @returns {number} 最长无重复子串的长度
 */
function lengthOfLongestSubstring(s) {
  // 哈希集合：存储当前窗口内的字符
  const charSet = new Set();
  let left = 0; // 滑动窗口左指针
  let maxLength = 0; // 记录最长子串长度

  // 右指针遍历字符串
  for (let right = 0; right < s.length; right++) {
    // 若当前字符已在集合中，左指针右移，直到移除重复字符
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }
    // 将当前字符加入集合
    charSet.add(s[right]);
    // 更新最长子串长度（窗口长度：right - left + 1）
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

// 扩展：返回无重复字符的最长子串（而非仅长度）
function longestSubstringWithoutRepeating(s) {
  const charSet = new Set();
  let left = 0;
  let maxLength = 0;
  let startIndex = 0; // 记录最长子串的起始索引

  for (let right = 0; right < s.length; right++) {
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }
    charSet.add(s[right]);
    // 若当前窗口更长，更新最大长度和起始索引
    if (right - left + 1 > maxLength) {
      maxLength = right - left + 1;
      startIndex = left;
    }
  }

  // 截取最长子串
  return s.substring(startIndex, startIndex + maxLength);
}

// 测试用例
console.log("测试1：输入 'abcabcbb'");
console.log("最长长度：", lengthOfLongestSubstring("abcabcbb")); // 输出 3
console.log("最长子串：", longestSubstringWithoutRepeating("abcabcbb")); // 输出 'abc'

console.log("\n测试2：输入 'bbbbb'");
console.log("最长长度：", lengthOfLongestSubstring("bbbbb")); // 输出 1
console.log("最长子串：", longestSubstringWithoutRepeating("bbbbb")); // 输出 'b'

console.log("\n测试3：输入 'pwwkew'");
console.log("最长长度：", lengthOfLongestSubstring("pwwkew")); // 输出 3
console.log("最长子串：", longestSubstringWithoutRepeating("pwwkew")); // 输出 'wke'
