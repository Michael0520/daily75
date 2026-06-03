import type { Problem } from "./types.ts";

export const blind75: Problem[] = [
  {
    id: 1,
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    topics: ["Array"],
    description:
      "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] == 9",
      },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "Only one valid answer exists.",
    ],
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] },
    ],
    starterJs: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {

}`,
    solutionJs: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
}`,
    solutionExplanation:
      "Use a hash map to store each number's index. For each number, check if its complement (target - num) is already in the map. Time: O(n), Space: O(n).",
  },
  {
    id: 2,
    slug: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    topics: ["Array"],
    description:
      "You are given an array `prices` where `prices[i]` is the price of a given stock on the i-th day.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.",
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price=1), sell on day 5 (price=6), profit = 5.",
      },
      { input: "prices = [7,6,4,3,1]", output: "0", explanation: "No profit possible." },
    ],
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    testCases: [
      { input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
      { input: [[7, 6, 4, 3, 1]], expected: 0 },
      { input: [[1, 2]], expected: 1 },
    ],
    starterJs: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {

}`,
    solutionJs: `function maxProfit(prices) {
  let minPrice = Infinity, maxProfit = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}`,
    solutionExplanation:
      "Track the minimum price seen so far and the maximum profit achievable. Single pass. Time: O(n), Space: O(1).",
  },
  {
    id: 3,
    slug: "contains-duplicate",
    title: "Contains Duplicate",
    difficulty: "Easy",
    topics: ["Array"],
    description:
      "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
    examples: [
      { input: "nums = [1,2,3,1]", output: "true" },
      { input: "nums = [1,2,3,4]", output: "false" },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    testCases: [
      { input: [[1, 2, 3, 1]], expected: true },
      { input: [[1, 2, 3, 4]], expected: false },
      { input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
    ],
    starterJs: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {

}`,
    solutionJs: `function containsDuplicate(nums) {
  return new Set(nums).size !== nums.length;
}`,
    solutionExplanation:
      "Use a Set to detect duplicates. If Set size differs from array length, duplicates exist. Time: O(n), Space: O(n).",
  },
  {
    id: 4,
    slug: "product-of-array-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    topics: ["Array"],
    description:
      "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nYou must write an algorithm that runs in O(n) time and without using the division operation.",
    examples: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
      { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
    ],
    constraints: ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30"],
    testCases: [
      { input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
      { input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] },
    ],
    starterJs: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function productExceptSelf(nums) {

}`,
    solutionJs: `function productExceptSelf(nums) {
  const n = nums.length, result = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) { result[i] = prefix; prefix *= nums[i]; }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) { result[i] *= suffix; suffix *= nums[i]; }
  return result;
}`,
    solutionExplanation:
      "Two passes: first build prefix products, then multiply by suffix products. Time: O(n), Space: O(1) (output array excluded).",
  },
  {
    id: 5,
    slug: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    topics: ["Array", "Dynamic Programming"],
    description:
      "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "Subarray [4,-1,2,1] has the largest sum 6.",
      },
      { input: "nums = [1]", output: "1" },
      { input: "nums = [5,4,-1,7,8]", output: "23" },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    testCases: [
      { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { input: [[1]], expected: 1 },
      { input: [[5, 4, -1, 7, 8]], expected: 23 },
    ],
    starterJs: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {

}`,
    solutionJs: `function maxSubArray(nums) {
  let maxSum = nums[0], current = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    maxSum = Math.max(maxSum, current);
  }
  return maxSum;
}`,
    solutionExplanation:
      "Kadane's algorithm: extend current subarray or start fresh at each element. Time: O(n), Space: O(1).",
  },
  {
    id: 6,
    slug: "maximum-product-subarray",
    title: "Maximum Product Subarray",
    difficulty: "Medium",
    topics: ["Array", "Dynamic Programming"],
    description:
      "Given an integer array `nums`, find a subarray that has the largest product, and return the product.",
    examples: [
      { input: "nums = [2,3,-2,4]", output: "6", explanation: "[2,3] has the largest product 6." },
      { input: "nums = [-2,0,-1]", output: "0" },
    ],
    constraints: ["1 <= nums.length <= 2 * 10^4", "-10 <= nums[i] <= 10"],
    testCases: [
      { input: [[2, 3, -2, 4]], expected: 6 },
      { input: [[-2, 0, -1]], expected: 0 },
      { input: [[-2, 3, -4]], expected: 24 },
    ],
    starterJs: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxProduct(nums) {

}`,
    solutionJs: `function maxProduct(nums) {
  let res = Math.max(...nums), curMin = 1, curMax = 1;
  for (const n of nums) {
    if (n === 0) { curMin = curMax = 1; continue; }
    const tmp = curMax * n;
    curMax = Math.max(n, curMax * n, curMin * n);
    curMin = Math.min(n, tmp, curMin * n);
    res = Math.max(res, curMax);
  }
  return res;
}`,
    solutionExplanation:
      "Track both min and max product ending at each position (negatives can flip signs). Time: O(n), Space: O(1).",
  },
  {
    id: 7,
    slug: "find-minimum-in-rotated-sorted-array",
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    topics: ["Array"],
    description:
      "Suppose an array of length `n` sorted in ascending order is rotated between 1 and n times. Given the rotated array `nums`, return the minimum element.",
    examples: [
      { input: "nums = [3,4,5,1,2]", output: "1" },
      { input: "nums = [4,5,6,7,0,1,2]", output: "0" },
      { input: "nums = [11,13,15,17]", output: "11" },
    ],
    constraints: [
      "n == nums.length",
      "1 <= n <= 5000",
      "-5000 <= nums[i] <= 5000",
      "All integers are unique.",
    ],
    testCases: [
      { input: [[3, 4, 5, 1, 2]], expected: 1 },
      { input: [[4, 5, 6, 7, 0, 1, 2]], expected: 0 },
      { input: [[11, 13, 15, 17]], expected: 11 },
    ],
    starterJs: `/**
 * @param {number[]} nums
 * @return {number}
 */
function findMin(nums) {

}`,
    solutionJs: `function findMin(nums) {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const m = (l + r) >> 1;
    if (nums[m] > nums[r]) l = m + 1;
    else r = m;
  }
  return nums[l];
}`,
    solutionExplanation:
      "Binary search: if mid > right, minimum is in the right half; otherwise it's in the left half including mid. Time: O(log n).",
  },
  {
    id: 8,
    slug: "search-in-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    topics: ["Array"],
    description:
      "Given the rotated array `nums` and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not.",
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
    ],
    constraints: ["1 <= nums.length <= 5000", "-10^4 <= nums[i] <= 10^4", "All values are unique."],
    testCases: [
      { input: [[4, 5, 6, 7, 0, 1, 2], 0], expected: 4 },
      { input: [[4, 5, 6, 7, 0, 1, 2], 3], expected: -1 },
      { input: [[1], 0], expected: -1 },
    ],
    starterJs: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {

}`,
    solutionJs: `function search(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const m = (l + r) >> 1;
    if (nums[m] === target) return m;
    if (nums[l] <= nums[m]) {
      if (target >= nums[l] && target < nums[m]) r = m - 1;
      else l = m + 1;
    } else {
      if (target > nums[m] && target <= nums[r]) l = m + 1;
      else r = m - 1;
    }
  }
  return -1;
}`,
    solutionExplanation:
      "Binary search with rotation awareness: determine which half is sorted, then check if target falls in that range. Time: O(log n).",
  },
  {
    id: 9,
    slug: "3sum",
    title: "3Sum",
    difficulty: "Medium",
    topics: ["Array"],
    description:
      "Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nThe solution set must not contain duplicate triplets.",
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,1,1]", output: "[]" },
      { input: "nums = [0,0,0]", output: "[[0,0,0]]" },
    ],
    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
    testCases: [
      {
        input: [[-1, 0, 1, 2, -1, -4]],
        expected: [
          [-1, -1, 2],
          [-1, 0, 1],
        ],
      },
      { input: [[0, 1, 1]], expected: [] },
      { input: [[0, 0, 0]], expected: [[0, 0, 0]] },
    ],
    starterJs: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {

}`,
    solutionJs: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        result.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++; r--;
      } else if (sum < 0) l++;
      else r--;
    }
  }
  return result;
}`,
    solutionExplanation:
      "Sort array, then for each element use two pointers to find pairs summing to its negative. Skip duplicates. Time: O(n²), Space: O(1).",
  },
  {
    id: 10,
    slug: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    topics: ["Array"],
    description:
      "You are given an integer array `height` of length `n`. There are `n` vertical lines. Find two lines that together with the x-axis form a container that contains the most water. Return the maximum amount of water a container can store.",
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" },
    ],
    constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
    testCases: [
      { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
      { input: [[1, 1]], expected: 1 },
      { input: [[4, 3, 2, 1, 4]], expected: 16 },
    ],
    starterJs: `/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {

}`,
    solutionJs: `function maxArea(height) {
  let l = 0, r = height.length - 1, max = 0;
  while (l < r) {
    max = Math.max(max, Math.min(height[l], height[r]) * (r - l));
    if (height[l] < height[r]) l++;
    else r--;
  }
  return max;
}`,
    solutionExplanation:
      "Two pointers from both ends. Move the shorter line inward to potentially find a taller boundary. Time: O(n), Space: O(1).",
  },

  // ==================== BINARY ====================
  {
    id: 11,
    slug: "sum-of-two-integers",
    title: "Sum of Two Integers",
    difficulty: "Medium",
    topics: ["Binary"],
    description:
      "Given two integers `a` and `b`, return the sum of the two integers without using the operators `+` and `-`.",
    examples: [
      { input: "a = 1, b = 2", output: "3" },
      { input: "a = 2, b = 3", output: "5" },
    ],
    constraints: ["-1000 <= a, b <= 1000"],
    testCases: [
      { input: [1, 2], expected: 3 },
      { input: [2, 3], expected: 5 },
      { input: [-1, 1], expected: 0 },
    ],
    starterJs: `function getSum(a, b) {

}`,
    solutionJs: `function getSum(a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}`,
    solutionExplanation:
      "XOR gives sum without carry; AND+shift gives carry bits. Repeat until carry is 0. Handle Python's arbitrary precision with a 32-bit mask. Time: O(1), Space: O(1).",
  },
  {
    id: 12,
    slug: "number-of-1-bits",
    title: "Number of 1 Bits",
    difficulty: "Easy",
    topics: ["Binary"],
    description:
      "Write a function that takes a positive integer and returns the number of set bits in its binary representation (also known as the Hamming weight).",
    examples: [
      {
        input: "n = 11",
        output: "3",
        explanation: "11 in binary is 1011, which has 3 set bits.",
      },
      { input: "n = 128", output: "1", explanation: "128 in binary is 10000000." },
    ],
    constraints: ["1 <= n <= 2^31 - 1"],
    testCases: [
      { input: [11], expected: 3 },
      { input: [128], expected: 1 },
      { input: [15], expected: 4 },
    ],
    starterJs: `function hammingWeight(n) {

}`,
    solutionJs: `function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    count += n & 1;
    n >>>= 1;
  }
  return count;
}`,
    solutionExplanation:
      "Check LSB with n & 1, right-shift n, repeat until 0. Use unsigned right shift (>>>) in JS to avoid infinite loop on negative numbers. Time: O(32), Space: O(1).",
  },
  {
    id: 13,
    slug: "counting-bits",
    title: "Counting Bits",
    difficulty: "Easy",
    topics: ["Binary"],
    description:
      "Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (0 <= i <= n), `ans[i]` is the number of 1's in the binary representation of `i`.",
    examples: [
      { input: "n = 2", output: "[0,1,1]" },
      { input: "n = 5", output: "[0,1,1,2,1,2]" },
    ],
    constraints: ["0 <= n <= 10^5"],
    testCases: [
      { input: [2], expected: [0, 1, 1] },
      { input: [5], expected: [0, 1, 1, 2, 1, 2] },
      { input: [0], expected: [0] },
    ],
    starterJs: `function countBits(n) {

}`,
    solutionJs: `function countBits(n) {
  const dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    dp[i] = dp[i >> 1] + (i & 1);
  }
  return dp;
}`,
    solutionExplanation:
      "DP: dp[i] = dp[i>>1] + (i & 1). Every number equals its right-shifted half plus its lowest bit. Time: O(n), Space: O(n).",
  },
  {
    id: 14,
    slug: "missing-number",
    title: "Missing Number",
    difficulty: "Easy",
    topics: ["Binary"],
    description:
      "Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.",
    examples: [
      { input: "nums = [3,0,1]", output: "2" },
      { input: "nums = [0,1]", output: "2" },
      { input: "nums = [9,6,4,2,3,5,7,0,1]", output: "8" },
    ],
    constraints: ["n == nums.length", "1 <= n <= 10^4", "All numbers in nums are unique."],
    testCases: [
      { input: [[3, 0, 1]], expected: 2 },
      { input: [[0, 1]], expected: 2 },
      { input: [[9, 6, 4, 2, 3, 5, 7, 0, 1]], expected: 8 },
    ],
    starterJs: `function missingNumber(nums) {

}`,
    solutionJs: `function missingNumber(nums) {
  const n = nums.length;
  return (n * (n + 1)) / 2 - nums.reduce((a, b) => a + b, 0);
}`,
    solutionExplanation:
      "Expected sum (Gauss formula) minus actual sum gives the missing number. Alternatively use XOR. Time: O(n), Space: O(1).",
  },
  {
    id: 15,
    slug: "reverse-bits",
    title: "Reverse Bits",
    difficulty: "Easy",
    topics: ["Binary"],
    description: "Reverse bits of a given 32-bit unsigned integer.",
    examples: [
      {
        input: "n = 43261596",
        output: "964176192",
        explanation: "00000010100101000001111010011100 reversed = 00111001011110000010100101000000",
      },
    ],
    constraints: ["The input is a 32-bit unsigned integer."],
    testCases: [
      { input: [43261596], expected: 964176192 },
      { input: [0], expected: 0 },
      { input: [1], expected: 2147483648 },
    ],
    starterJs: `function reverseBits(n) {

}`,
    solutionJs: `function reverseBits(n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result * 2) + (n & 1);
    n >>>= 1;
  }
  return result >>> 0;
}`,
    solutionExplanation:
      "Iterate 32 times: extract LSB of n, append to result (shift left). Use >>> 0 in JS to ensure unsigned 32-bit output. Time: O(32), Space: O(1).",
  },

  // ==================== DYNAMIC PROGRAMMING ====================
  {
    id: 16,
    slug: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    topics: ["Dynamic Programming"],
    description:
      "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      { input: "n = 2", output: "2", explanation: "1+1 or 2" },
      { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, or 2+1" },
    ],
    constraints: ["1 <= n <= 45"],
    testCases: [
      { input: [2], expected: 2 },
      { input: [3], expected: 3 },
      { input: [10], expected: 89 },
    ],
    starterJs: `function climbStairs(n) {

}`,
    solutionJs: `function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}`,
    solutionExplanation:
      "Fibonacci pattern: ways(n) = ways(n-1) + ways(n-2). Use two variables instead of an array. Time: O(n), Space: O(1).",
  },
  {
    id: 17,
    slug: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    description:
      "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins needed to make up that amount. If that amount cannot be made up by any combination of coins, return `-1`.",
    examples: [
      { input: "coins = [1,5,10], amount = 12", output: "3", explanation: "10 + 1 + 1" },
      { input: "coins = [2], amount = 3", output: "-1" },
    ],
    constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10^4"],
    testCases: [
      { input: [[1, 5, 10], 12], expected: 3 },
      { input: [[2], 3], expected: -1 },
      { input: [[1, 2, 5], 11], expected: 3 },
    ],
    starterJs: `function coinChange(coins, amount) {

}`,
    solutionJs: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    solutionExplanation:
      "Bottom-up DP: dp[i] = min coins to make amount i. For each amount, try every coin. Time: O(amount × coins), Space: O(amount).",
  },
  {
    id: 18,
    slug: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    description:
      "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.",
    examples: [
      { input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "[2,3,7,101]" },
      { input: "nums = [0,1,0,3,2,3]", output: "4" },
    ],
    constraints: ["1 <= nums.length <= 2500", "-10^4 <= nums[i] <= 10^4"],
    testCases: [
      { input: [[10, 9, 2, 5, 3, 7, 101, 18]], expected: 4 },
      { input: [[0, 1, 0, 3, 2, 3]], expected: 4 },
      { input: [[7, 7, 7, 7, 7]], expected: 1 },
    ],
    starterJs: `function lengthOfLIS(nums) {

}`,
    solutionJs: `function lengthOfLIS(nums) {
  const dp = new Array(nums.length).fill(1);
  let max = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    max = Math.max(max, dp[i]);
  }
  return max;
}`,
    solutionExplanation:
      "dp[i] = length of LIS ending at index i. For each i, check all j < i where nums[j] < nums[i]. Time: O(n²), Space: O(n). O(n log n) possible with patience sorting.",
  },
  {
    id: 19,
    slug: "longest-common-subsequence",
    title: "Longest Common Subsequence",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    description:
      "Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return `0`.",
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: "3", explanation: '"ace"' },
      { input: 'text1 = "abc", text2 = "abc"', output: "3" },
      { input: 'text1 = "abc", text2 = "def"', output: "0" },
    ],
    constraints: ["1 <= text1.length, text2.length <= 1000"],
    testCases: [
      { input: ["abcde", "ace"], expected: 3 },
      { input: ["abc", "abc"], expected: 3 },
      { input: ["abc", "def"], expected: 0 },
    ],
    starterJs: `function longestCommonSubsequence(text1, text2) {

}`,
    solutionJs: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}`,
    solutionExplanation:
      "2D DP: if chars match, dp[i][j] = dp[i-1][j-1]+1; else take max of skipping either char. Time: O(m×n), Space: O(m×n).",
  },
  {
    id: 20,
    slug: "word-break",
    title: "Word Break",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    description:
      "Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.",
    examples: [
      {
        input: 's = "leetcode", wordDict = ["leet","code"]',
        output: "true",
      },
      {
        input: 's = "applepenapple", wordDict = ["apple","pen"]',
        output: "true",
      },
      {
        input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]',
        output: "false",
      },
    ],
    constraints: ["1 <= s.length <= 300", "1 <= wordDict.length <= 1000"],
    testCases: [
      { input: ["leetcode", ["leet", "code"]], expected: true },
      { input: ["applepenapple", ["apple", "pen"]], expected: true },
      { input: ["catsandog", ["cats", "dog", "sand", "and", "cat"]], expected: false },
    ],
    starterJs: `function wordBreak(s, wordDict) {

}`,
    solutionJs: `function wordBreak(s, wordDict) {
  const set = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && set.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}`,
    solutionExplanation:
      "dp[i] = true if s[0..i] can be segmented. For each position, check if any valid split point j exists where dp[j] is true and s[j..i] is in the dictionary. Time: O(n²), Space: O(n).",
  },
  {
    id: 21,
    slug: "combination-sum-iv",
    title: "Combination Sum IV",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    description:
      "Given an array of distinct integers `nums` and a target integer `target`, return the number of possible combinations that add up to `target`. The order of numbers matters.",
    examples: [
      {
        input: "nums = [1,2,3], target = 4",
        output: "7",
        explanation: "(1,1,1,1), (1,1,2), (1,2,1), (1,3), (2,1,1), (2,2), (3,1)",
      },
      { input: "nums = [9], target = 3", output: "0" },
    ],
    constraints: ["1 <= nums.length <= 200", "1 <= nums[i] <= 1000", "1 <= target <= 1000"],
    testCases: [
      { input: [[1, 2, 3], 4], expected: 7 },
      { input: [[9], 3], expected: 0 },
      { input: [[1, 2, 3], 0], expected: 1 },
    ],
    starterJs: `function combinationSum4(nums, target) {

}`,
    solutionJs: `function combinationSum4(nums, target) {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= target; i++) {
    for (const num of nums) {
      if (num <= i) dp[i] += dp[i - num];
    }
  }
  return dp[target];
}`,
    solutionExplanation:
      "dp[i] = number of ordered combinations that sum to i. For each amount, try each number. Order matters so we loop amount first, then numbers. Time: O(target × nums), Space: O(target).",
  },
  {
    id: 22,
    slug: "house-robber",
    title: "House Robber",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    description:
      "You are a robber planning to rob houses along a street. Adjacent houses have security systems and will alert the police if two adjacent houses are broken into on the same night. Given an integer array `nums` representing money in each house, return the maximum amount you can rob tonight without alerting the police.",
    examples: [
      { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 1 (1) then house 3 (3)." },
      { input: "nums = [2,7,9,3,1]", output: "12", explanation: "Rob houses 1, 3, 5 (2+9+1=12)." },
    ],
    constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 400"],
    testCases: [
      { input: [[1, 2, 3, 1]], expected: 4 },
      { input: [[2, 7, 9, 3, 1]], expected: 12 },
      { input: [[5]], expected: 5 },
    ],
    starterJs: `function rob(nums) {

}`,
    solutionJs: `function rob(nums) {
  let prev2 = 0, prev1 = 0;
  for (const n of nums) {
    const curr = Math.max(prev1, prev2 + n);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
    solutionExplanation:
      "At each house, either skip it (take prev1) or rob it (take prev2 + current). Track two variables instead of an array. Time: O(n), Space: O(1).",
  },
  {
    id: 23,
    slug: "house-robber-ii",
    title: "House Robber II",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    description:
      "All houses are arranged in a circle. The first and last house are adjacent. Given an integer array `nums` representing money in each house, return the maximum amount you can rob without alerting the police (cannot rob two adjacent houses).",
    examples: [
      { input: "nums = [2,3,2]", output: "3" },
      { input: "nums = [1,2,3,1]", output: "4" },
    ],
    constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 1000"],
    testCases: [
      { input: [[2, 3, 2]], expected: 3 },
      { input: [[1, 2, 3, 1]], expected: 4 },
      { input: [[1, 2, 3]], expected: 3 },
    ],
    starterJs: `function rob(nums) {

}`,
    solutionJs: `function rob(nums) {
  if (nums.length === 1) return nums[0];
  function robRange(start, end) {
    let prev2 = 0, prev1 = 0;
    for (let i = start; i <= end; i++) {
      const curr = Math.max(prev1, prev2 + nums[i]);
      prev2 = prev1;
      prev1 = curr;
    }
    return prev1;
  }
  return Math.max(robRange(0, nums.length - 2), robRange(1, nums.length - 1));
}`,
    solutionExplanation:
      "Since first and last are adjacent, either include or exclude the first house. Run House Robber I on [0..n-2] and [1..n-1], take the max. Time: O(n), Space: O(1).",
  },
  {
    id: 24,
    slug: "decode-ways",
    title: "Decode Ways",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    description:
      "A message containing letters A-Z can be encoded into numbers (A=1, B=2, ..., Z=26). Given a string `s` containing only digits, return the number of ways to decode it.",
    examples: [
      { input: 's = "12"', output: "2", explanation: '"AB" (1 2) or "L" (12)' },
      { input: 's = "226"', output: "3", explanation: '"BZ" (2 26), "VF" (22 6), "BBF" (2 2 6)' },
      { input: 's = "06"', output: "0", explanation: '"06" cannot be decoded.' },
    ],
    constraints: ["1 <= s.length <= 100", "s contains only digits"],
    testCases: [
      { input: ["12"], expected: 2 },
      { input: ["226"], expected: 3 },
      { input: ["06"], expected: 0 },
    ],
    starterJs: `function numDecodings(s) {

}`,
    solutionJs: `function numDecodings(s) {
  const n = s.length;
  let prev2 = 1, prev1 = s[0] !== '0' ? 1 : 0;
  for (let i = 1; i < n; i++) {
    let curr = 0;
    if (s[i] !== '0') curr += prev1;
    const two = parseInt(s.slice(i - 1, i + 1));
    if (two >= 10 && two <= 26) curr += prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
    solutionExplanation:
      "dp[i] = ways to decode s[0..i]. Single digit (1-9) adds dp[i-1]; two digits (10-26) adds dp[i-2]. Track two variables. Time: O(n), Space: O(1).",
  },
  {
    id: 25,
    slug: "unique-paths",
    title: "Unique Paths",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    description:
      "A robot is on an `m x n` grid at the top-left corner. It can only move right or down. How many unique paths are there to reach the bottom-right corner?",
    examples: [
      { input: "m = 3, n = 7", output: "28" },
      { input: "m = 3, n = 2", output: "3" },
    ],
    constraints: ["1 <= m, n <= 100"],
    testCases: [
      { input: [3, 7], expected: 28 },
      { input: [3, 2], expected: 3 },
      { input: [1, 1], expected: 1 },
    ],
    starterJs: `function uniquePaths(m, n) {

}`,
    solutionJs: `function uniquePaths(m, n) {
  const dp = new Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }
  return dp[n - 1];
}`,
    solutionExplanation:
      "dp[j] = paths to reach column j on current row. Each cell = paths from left + paths from above. First row/col always 1. Time: O(m×n), Space: O(n).",
  },
  {
    id: 26,
    slug: "jump-game",
    title: "Jump Game",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    description:
      "You are given an integer array `nums`. You are initially at `nums[0]`. Each element represents your maximum jump length. Return `true` if you can reach the last index.",
    examples: [
      { input: "nums = [2,3,1,1,4]", output: "true" },
      { input: "nums = [3,2,1,0,4]", output: "false" },
    ],
    constraints: ["1 <= nums.length <= 10^4", "0 <= nums[i] <= 10^5"],
    testCases: [
      { input: [[2, 3, 1, 1, 4]], expected: true },
      { input: [[3, 2, 1, 0, 4]], expected: false },
      { input: [[0]], expected: true },
    ],
    starterJs: `function canJump(nums) {

}`,
    solutionJs: `function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}`,
    solutionExplanation:
      "Greedy: track the furthest index reachable. If current index exceeds max reach, we're stuck. Time: O(n), Space: O(1).",
  },

  // ==================== GRAPH ====================
  {
    id: 27,
    slug: "clone-graph",
    title: "Clone Graph",
    difficulty: "Medium",
    topics: ["Graph"],
    description:
      "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.\n\nEach node contains a `val` (int) and a `neighbors` list (array of Node). For this problem, the graph is represented as an adjacency list: `adjList[i]` is a list of nodes adjacent to node `i+1`.",
    examples: [
      {
        input: "adjList = [[2,4],[1,3],[2,4],[1,3]]",
        output: "[[2,4],[1,3],[2,4],[1,3]]",
        explanation: "Each node has been cloned.",
      },
    ],
    constraints: ["1 <= n <= 100", "Node.val is unique and equals its 1-indexed position."],
    testCases: [
      {
        input: [
          [
            [2, 4],
            [1, 3],
            [2, 4],
            [1, 3],
          ],
        ],
        expected: [
          [2, 4],
          [1, 3],
          [2, 4],
          [1, 3],
        ],
      },
      { input: [[[]]], expected: [[]] },
    ],
    starterJs: `// Node class is available globally
// class Node { constructor(val, neighbors=[]) { this.val=val; this.neighbors=neighbors; } }

function cloneGraph(adjList) {
  // adjList[i] = array of neighbor vals for node (i+1)
  // Return cloned adjacency list in same format

}`,
    solutionJs: `function cloneGraph(adjList) {
  return adjList.map(neighbors => [...neighbors]);
}`,
    solutionExplanation:
      "For this simplified adjacency list version, clone each neighbor list. In the standard LeetCode version (Node objects), use BFS/DFS with a visited map to clone each node once: clone = new Node(node.val); map[node] = clone; then recursively clone neighbors.",
  },
  {
    id: 28,
    slug: "course-schedule",
    title: "Course Schedule",
    difficulty: "Medium",
    topics: ["Graph"],
    description:
      "There are `numCourses` courses labeled from `0` to `numCourses-1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` means you must take course `bi` first to take course `ai`. Return `true` if you can finish all courses.",
    examples: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
      {
        input: "numCourses = 2, prerequisites = [[1,0],[0,1]]",
        output: "false",
        explanation: "Cycle detected.",
      },
    ],
    constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000"],
    testCases: [
      { input: [2, [[1, 0]]], expected: true },
      {
        input: [
          2,
          [
            [1, 0],
            [0, 1],
          ],
        ],
        expected: false,
      },
      {
        input: [
          4,
          [
            [1, 0],
            [2, 0],
            [3, 1],
            [3, 2],
          ],
        ],
        expected: true,
      },
    ],
    starterJs: `function canFinish(numCourses, prerequisites) {

}`,
    solutionJs: `function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) graph[b].push(a);
  const state = new Array(numCourses).fill(0); // 0=unvisited, 1=visiting, 2=visited
  function dfs(node) {
    if (state[node] === 1) return false;
    if (state[node] === 2) return true;
    state[node] = 1;
    for (const neighbor of graph[node]) {
      if (!dfs(neighbor)) return false;
    }
    state[node] = 2;
    return true;
  }
  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) return false;
  }
  return true;
}`,
    solutionExplanation:
      "Detect cycle via DFS with 3 states: unvisited (0), in-progress (1), done (2). If we revisit an in-progress node, there's a cycle. Time: O(V+E), Space: O(V+E).",
  },
  {
    id: 29,
    slug: "pacific-atlantic-water-flow",
    title: "Pacific Atlantic Water Flow",
    difficulty: "Medium",
    topics: ["Graph"],
    description:
      "Given an `m x n` matrix of integers `heights` where `heights[r][c]` is the height at cell `(r,c)`, find all cells that can flow water to both the Pacific Ocean (top/left edges) and Atlantic Ocean (bottom/right edges). Water flows to adjacent cells with equal or lower height.",
    examples: [
      {
        input: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
        output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]",
      },
    ],
    constraints: ["m == heights.length", "n == heights[r].length", "1 <= m, n <= 200"],
    testCases: [
      {
        input: [
          [
            [1, 2, 2, 3, 5],
            [3, 2, 3, 4, 4],
            [2, 4, 5, 3, 1],
            [6, 7, 1, 4, 5],
            [5, 1, 1, 2, 4],
          ],
        ],
        expected: [
          [0, 4],
          [1, 3],
          [1, 4],
          [2, 2],
          [3, 0],
          [3, 1],
          [4, 0],
        ],
      },
      { input: [[[1]]], expected: [[0, 0]] },
    ],
    starterJs: `function pacificAtlantic(heights) {

}`,
    solutionJs: `function pacificAtlantic(heights) {
  const m = heights.length, n = heights[0].length;
  const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
  function bfs(starts) {
    const visited = Array.from({ length: m }, () => new Array(n).fill(false));
    const q = [...starts];
    for (const [r, c] of starts) visited[r][c] = true;
    while (q.length) {
      const [r, c] = q.shift();
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && heights[nr][nc] >= heights[r][c]) {
          visited[nr][nc] = true;
          q.push([nr, nc]);
        }
      }
    }
    return visited;
  }
  const pac = [], atl = [];
  for (let r = 0; r < m; r++) { pac.push([r, 0]); atl.push([r, n - 1]); }
  for (let c = 0; c < n; c++) { pac.push([0, c]); atl.push([m - 1, c]); }
  const pV = bfs(pac), aV = bfs(atl);
  const res = [];
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++)
      if (pV[r][c] && aV[r][c]) res.push([r, c]);
  return res;
}`,
    solutionExplanation:
      "Reverse BFS from ocean borders: water can flow UP (equal or higher height). Find cells reachable from both oceans. Time: O(m×n), Space: O(m×n).",
  },
  {
    id: 30,
    slug: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    topics: ["Graph"],
    description:
      "Given an `m x n` 2D binary grid where `'1'` is land and `'0'` is water, return the number of islands. An island is surrounded by water and formed by connecting adjacent land cells horizontally or vertically.",
    examples: [
      {
        input:
          'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: "1",
      },
      {
        input:
          'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        output: "3",
      },
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "grid[i][j] is '0' or '1'"],
    testCases: [
      {
        input: [
          [
            ["1", "1", "1", "1", "0"],
            ["1", "1", "0", "1", "0"],
            ["1", "1", "0", "0", "0"],
            ["0", "0", "0", "0", "0"],
          ],
        ],
        expected: 1,
      },
      {
        input: [
          [
            ["1", "1", "0", "0", "0"],
            ["1", "1", "0", "0", "0"],
            ["0", "0", "1", "0", "0"],
            ["0", "0", "0", "1", "1"],
          ],
        ],
        expected: 3,
      },
    ],
    starterJs: `function numIslands(grid) {

}`,
    solutionJs: `function numIslands(grid) {
  const m = grid.length, n = grid[0].length;
  let count = 0;
  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  }
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++)
      if (grid[r][c] === '1') { dfs(r, c); count++; }
  return count;
}`,
    solutionExplanation:
      "DFS: for each unvisited land cell, flood-fill (mark visited as '0') to consume the whole island, increment count. Time: O(m×n), Space: O(m×n) stack.",
  },
  {
    id: 31,
    slug: "longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    topics: ["Graph"],
    description:
      "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",
    examples: [
      { input: "nums = [100,4,200,1,3,2]", output: "4", explanation: "[1,2,3,4]" },
      { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9" },
    ],
    constraints: ["0 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    testCases: [
      { input: [[100, 4, 200, 1, 3, 2]], expected: 4 },
      { input: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], expected: 9 },
      { input: [[]], expected: 0 },
    ],
    starterJs: `function longestConsecutive(nums) {

}`,
    solutionJs: `function longestConsecutive(nums) {
  const set = new Set(nums);
  let max = 0;
  for (const n of set) {
    if (!set.has(n - 1)) {
      let curr = n, length = 1;
      while (set.has(curr + 1)) { curr++; length++; }
      max = Math.max(max, length);
    }
  }
  return max;
}`,
    solutionExplanation:
      "Put all numbers in a hash set. For each sequence start (no n-1 in set), count consecutive elements. Each number is visited at most twice. Time: O(n), Space: O(n).",
  },
  {
    id: 32,
    slug: "graph-valid-tree",
    title: "Graph Valid Tree",
    difficulty: "Medium",
    topics: ["Graph"],
    description:
      "Given `n` nodes labeled `0` to `n-1` and a list of undirected edges, determine if these edges form a valid tree. A valid tree has exactly `n-1` edges and is fully connected (no cycles).",
    examples: [
      { input: "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]", output: "true" },
      { input: "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]", output: "false" },
    ],
    constraints: ["1 <= n <= 2000", "0 <= edges.length <= 5000"],
    testCases: [
      {
        input: [
          5,
          [
            [0, 1],
            [0, 2],
            [0, 3],
            [1, 4],
          ],
        ],
        expected: true,
      },
      {
        input: [
          5,
          [
            [0, 1],
            [1, 2],
            [2, 3],
            [1, 3],
            [1, 4],
          ],
        ],
        expected: false,
      },
      { input: [1, []], expected: true },
    ],
    starterJs: `function validTree(n, edges) {

}`,
    solutionJs: `function validTree(n, edges) {
  if (edges.length !== n - 1) return false;
  const graph = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) { graph[a].push(b); graph[b].push(a); }
  const visited = new Set();
  function dfs(node) {
    if (visited.has(node)) return;
    visited.add(node);
    for (const neighbor of graph[node]) dfs(neighbor);
  }
  dfs(0);
  return visited.size === n;
}`,
    solutionExplanation:
      "A valid tree has exactly n-1 edges and is fully connected. Check edge count first, then verify all nodes are reachable from node 0 via DFS. Time: O(V+E), Space: O(V+E).",
  },

  // ==================== INTERVAL ====================
  {
    id: 33,
    slug: "insert-interval",
    title: "Insert Interval",
    difficulty: "Medium",
    topics: ["Interval"],
    description:
      "You are given an array of non-overlapping intervals `intervals` sorted by start time, and a `newInterval`. Insert `newInterval` into `intervals` (merge if necessary) and return the result.",
    examples: [
      { input: "intervals = [[1,3],[6,9]], newInterval = [2,5]", output: "[[1,5],[6,9]]" },
      {
        input: "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]",
        output: "[[1,2],[3,10],[12,16]]",
      },
    ],
    constraints: ["0 <= intervals.length <= 10^4", "intervals is sorted by start time."],
    testCases: [
      {
        input: [
          [
            [1, 3],
            [6, 9],
          ],
          [2, 5],
        ],
        expected: [
          [1, 5],
          [6, 9],
        ],
      },
      {
        input: [
          [
            [1, 2],
            [3, 5],
            [6, 7],
            [8, 10],
            [12, 16],
          ],
          [4, 8],
        ],
        expected: [
          [1, 2],
          [3, 10],
          [12, 16],
        ],
      },
      { input: [[], [5, 7]], expected: [[5, 7]] },
    ],
    starterJs: `function insert(intervals, newInterval) {

}`,
    solutionJs: `function insert(intervals, newInterval) {
  const res = [];
  let i = 0;
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    res.push(intervals[i++]);
  }
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  res.push(newInterval);
  while (i < intervals.length) res.push(intervals[i++]);
  return res;
}`,
    solutionExplanation:
      "Three passes: add intervals ending before new one, merge overlapping intervals into newInterval, add remaining. Time: O(n), Space: O(n).",
  },
  {
    id: 34,
    slug: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    topics: ["Interval"],
    description:
      "Given an array of intervals where `intervals[i] = [starti, endi]`, merge all overlapping intervals and return an array of the non-overlapping intervals.",
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" },
      { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]" },
    ],
    constraints: ["1 <= intervals.length <= 10^4"],
    testCases: [
      {
        input: [
          [
            [1, 3],
            [2, 6],
            [8, 10],
            [15, 18],
          ],
        ],
        expected: [
          [1, 6],
          [8, 10],
          [15, 18],
        ],
      },
      {
        input: [
          [
            [1, 4],
            [4, 5],
          ],
        ],
        expected: [[1, 5]],
      },
      {
        input: [
          [
            [1, 4],
            [0, 4],
          ],
        ],
        expected: [[0, 4]],
      },
    ],
    starterJs: `function merge(intervals) {

}`,
    solutionJs: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = res[res.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      res.push(intervals[i]);
    }
  }
  return res;
}`,
    solutionExplanation:
      "Sort by start time. Merge each interval into the last result interval if they overlap (start <= last end). Time: O(n log n), Space: O(n).",
  },
  {
    id: 35,
    slug: "non-overlapping-intervals",
    title: "Non-overlapping Intervals",
    difficulty: "Medium",
    topics: ["Interval"],
    description:
      "Given an array of intervals, return the minimum number of intervals you need to remove to make the rest non-overlapping.",
    examples: [
      { input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1", explanation: "Remove [1,3]." },
      { input: "intervals = [[1,2],[1,2],[1,2]]", output: "2" },
    ],
    constraints: ["1 <= intervals.length <= 10^5"],
    testCases: [
      {
        input: [
          [
            [1, 2],
            [2, 3],
            [3, 4],
            [1, 3],
          ],
        ],
        expected: 1,
      },
      {
        input: [
          [
            [1, 2],
            [1, 2],
            [1, 2],
          ],
        ],
        expected: 2,
      },
      {
        input: [
          [
            [1, 2],
            [2, 3],
          ],
        ],
        expected: 0,
      },
    ],
    starterJs: `function eraseOverlapIntervals(intervals) {

}`,
    solutionJs: `function eraseOverlapIntervals(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 0, prevEnd = -Infinity;
  for (const [start, end] of intervals) {
    if (start >= prevEnd) {
      prevEnd = end;
    } else {
      count++;
    }
  }
  return count;
}`,
    solutionExplanation:
      "Greedy: sort by end time, keep as many non-overlapping intervals as possible (always keep the one ending earliest). Count removals = total - kept. Time: O(n log n), Space: O(1).",
  },
  {
    id: 36,
    slug: "meeting-rooms",
    title: "Meeting Rooms",
    difficulty: "Easy",
    topics: ["Interval"],
    description:
      "Given an array of meeting time intervals where `intervals[i] = [starti, endi]`, determine if a person could attend all meetings (no overlaps).",
    examples: [
      { input: "intervals = [[0,30],[5,10],[15,20]]", output: "false" },
      { input: "intervals = [[7,10],[2,4]]", output: "true" },
    ],
    constraints: ["0 <= intervals.length <= 10^4"],
    testCases: [
      {
        input: [
          [
            [0, 30],
            [5, 10],
            [15, 20],
          ],
        ],
        expected: false,
      },
      {
        input: [
          [
            [7, 10],
            [2, 4],
          ],
        ],
        expected: true,
      },
      { input: [[]], expected: true },
    ],
    starterJs: `function canAttendMeetings(intervals) {

}`,
    solutionJs: `function canAttendMeetings(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) return false;
  }
  return true;
}`,
    solutionExplanation:
      "Sort by start time. If any meeting starts before the previous one ends, there's a conflict. Time: O(n log n), Space: O(1).",
  },
  {
    id: 37,
    slug: "meeting-rooms-ii",
    title: "Meeting Rooms II",
    difficulty: "Medium",
    topics: ["Interval"],
    description:
      "Given an array of meeting time intervals, return the minimum number of conference rooms required.",
    examples: [
      { input: "intervals = [[0,30],[5,10],[15,20]]", output: "2" },
      { input: "intervals = [[7,10],[2,4]]", output: "1" },
    ],
    constraints: ["1 <= intervals.length <= 10^4"],
    testCases: [
      {
        input: [
          [
            [0, 30],
            [5, 10],
            [15, 20],
          ],
        ],
        expected: 2,
      },
      {
        input: [
          [
            [7, 10],
            [2, 4],
          ],
        ],
        expected: 1,
      },
      {
        input: [
          [
            [1, 5],
            [2, 6],
            [3, 7],
          ],
        ],
        expected: 3,
      },
    ],
    starterJs: `function minMeetingRooms(intervals) {

}`,
    solutionJs: `function minMeetingRooms(intervals) {
  const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
  const ends = intervals.map(i => i[1]).sort((a, b) => a - b);
  let rooms = 0, maxRooms = 0, e = 0;
  for (let s = 0; s < starts.length; s++) {
    if (starts[s] < ends[e]) {
      rooms++;
    } else {
      e++;
    }
    maxRooms = Math.max(maxRooms, rooms);
  }
  return maxRooms;
}`,
    solutionExplanation:
      "Two-pointer on sorted starts/ends arrays. If next meeting starts before earliest end, need new room. Otherwise, reuse the room that freed up. Time: O(n log n), Space: O(n).",
  },

  // ==================== LINKED LIST ====================
  {
    id: 38,
    slug: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    topics: ["Linked List"],
    description:
      "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" },
    ],
    constraints: ["0 <= Node.val <= 5000", "The number of nodes is in [0, 5000]."],
    testCases: [
      {
        input: [[1, 2, 3, 4, 5]],
        expected: [5, 4, 3, 2, 1],
        inputTypes: ["list"],
        expectedType: "list",
      },
      { input: [[1, 2]], expected: [2, 1], inputTypes: ["list"], expectedType: "list" },
      { input: [[]], expected: [], inputTypes: ["list"], expectedType: "list" },
    ],
    starterJs: `// ListNode is available globally
function reverseList(head) {

}`,
    solutionJs: `function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
    solutionExplanation:
      "Iterative: track prev and curr pointers. Reverse the next pointer, then advance both. Return prev (new head). Time: O(n), Space: O(1).",
  },
  {
    id: 39,
    slug: "linked-list-cycle",
    title: "Linked List Cycle",
    difficulty: "Easy",
    topics: ["Linked List"],
    description:
      "Given the `head` of a linked list, determine if the linked list has a cycle in it. Return `true` if there is a cycle.\n\nNote: Cycle test cases cannot be fully automated (JSON can't represent cyclic structures), so test cases here verify non-cyclic inputs.",
    examples: [
      {
        input: "head = [3,2,0,-4], pos = 1",
        output: "true",
        explanation: "Tail connects to node at index 1.",
      },
      { input: "head = [1], pos = -1", output: "false" },
    ],
    constraints: ["The number of nodes is in [0, 10^4]."],
    testCases: [
      { input: [[3, 2, 0, -4]], expected: false, inputTypes: ["list"] },
      { input: [[1, 2]], expected: false, inputTypes: ["list"] },
      { input: [[]], expected: false, inputTypes: ["list"] },
    ],
    starterJs: `// ListNode is available globally
function hasCycle(head) {

}`,
    solutionJs: `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    solutionExplanation:
      "Floyd's algorithm: slow pointer moves 1 step, fast moves 2. If they meet, there's a cycle. If fast reaches null, no cycle. Time: O(n), Space: O(1).",
  },
  {
    id: 40,
    slug: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    topics: ["Linked List"],
    description:
      "You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list. Return the head of the merged list.",
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = []", output: "[]" },
    ],
    constraints: ["The number of nodes in both lists is in [0, 50]."],
    testCases: [
      {
        input: [
          [1, 2, 4],
          [1, 3, 4],
        ],
        expected: [1, 1, 2, 3, 4, 4],
        inputTypes: ["list", "list"],
        expectedType: "list",
      },
      { input: [[], []], expected: [], inputTypes: ["list", "list"], expectedType: "list" },
      { input: [[], [0]], expected: [0], inputTypes: ["list", "list"], expectedType: "list" },
    ],
    starterJs: `// ListNode is available globally
function mergeTwoLists(list1, list2) {

}`,
    solutionJs: `function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let curr = dummy;
  while (list1 && list2) {
    if (list1.val <= list2.val) { curr.next = list1; list1 = list1.next; }
    else { curr.next = list2; list2 = list2.next; }
    curr = curr.next;
  }
  curr.next = list1 || list2;
  return dummy.next;
}`,
    solutionExplanation:
      "Use a dummy head, repeatedly pick the smaller front node from either list, append remaining tail. Time: O(m+n), Space: O(1).",
  },
  {
    id: 41,
    slug: "merge-k-sorted-lists",
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    topics: ["Linked List", "Heap"],
    description:
      "You are given an array of `k` linked-lists `lists`, each sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    examples: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
      { input: "lists = []", output: "[]" },
    ],
    constraints: ["k == lists.length", "0 <= k <= 10^4", "0 <= Node.val <= 10^4"],
    testCases: [
      {
        input: [
          [
            [1, 4, 5],
            [1, 3, 4],
            [2, 6],
          ],
        ],
        expected: [1, 1, 2, 3, 4, 4, 5, 6],
        inputTypes: ["list[]"],
        expectedType: "list",
      },
      { input: [[[]]], expected: [], inputTypes: ["list[]"], expectedType: "list" },
    ],
    starterJs: `// ListNode is available globally
function mergeKLists(lists) {

}`,
    solutionJs: `function mergeKLists(lists) {
  function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0);
    let curr = dummy;
    while (l1 && l2) {
      if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }
      else { curr.next = l2; l2 = l2.next; }
      curr = curr.next;
    }
    curr.next = l1 || l2;
    return dummy.next;
  }
  if (!lists.length) return null;
  while (lists.length > 1) {
    const merged = [];
    for (let i = 0; i < lists.length; i += 2) {
      merged.push(mergeTwoLists(lists[i], lists[i + 1] || null));
    }
    lists = merged;
  }
  return lists[0];
}`,
    solutionExplanation:
      "Divide and conquer: repeatedly merge pairs of lists, halving the count each round. Total work O(n log k). Space: O(log k) for recursion stack.",
  },
  {
    id: 42,
    slug: "remove-nth-node-from-end-of-list",
    title: "Remove Nth Node From End of List",
    difficulty: "Medium",
    topics: ["Linked List"],
    description:
      "Given the `head` of a linked list, remove the `n`th node from the end of the list and return its head.",
    examples: [
      { input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]" },
      { input: "head = [1], n = 1", output: "[]" },
    ],
    constraints: ["The number of nodes is sz.", "1 <= sz <= 30", "1 <= n <= sz"],
    testCases: [
      {
        input: [[1, 2, 3, 4, 5], 2],
        expected: [1, 2, 3, 5],
        inputTypes: ["list", null],
        expectedType: "list",
      },
      { input: [[1], 1], expected: [], inputTypes: ["list", null], expectedType: "list" },
      { input: [[1, 2], 1], expected: [1], inputTypes: ["list", null], expectedType: "list" },
    ],
    starterJs: `// ListNode is available globally
function removeNthFromEnd(head, n) {

}`,
    solutionJs: `function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let fast = dummy, slow = dummy;
  for (let i = 0; i <= n; i++) fast = fast.next;
  while (fast) { fast = fast.next; slow = slow.next; }
  slow.next = slow.next.next;
  return dummy.next;
}`,
    solutionExplanation:
      "Two pointers n+1 apart: advance fast n+1 steps, then move both until fast is null. Slow is now before the node to remove. Time: O(sz), Space: O(1).",
  },
  {
    id: 43,
    slug: "reorder-list",
    title: "Reorder List",
    difficulty: "Medium",
    topics: ["Linked List"],
    description:
      "You are given the head of a singly linked list: L0 → L1 → ... → Ln. Reorder it to: L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ... Modify the list in-place and return the head.",
    examples: [
      { input: "head = [1,2,3,4]", output: "[1,4,2,3]" },
      { input: "head = [1,2,3,4,5]", output: "[1,5,2,4,3]" },
    ],
    constraints: ["1 <= Node.val <= 50", "1 <= sz <= 5 * 10^4"],
    testCases: [
      { input: [[1, 2, 3, 4]], expected: [1, 4, 2, 3], inputTypes: ["list"], expectedType: "list" },
      {
        input: [[1, 2, 3, 4, 5]],
        expected: [1, 5, 2, 4, 3],
        inputTypes: ["list"],
        expectedType: "list",
      },
    ],
    starterJs: `// ListNode is available globally
// Return the head after reordering
function reorderList(head) {

}`,
    solutionJs: `function reorderList(head) {
  // Find middle
  let slow = head, fast = head;
  while (fast.next && fast.next.next) { slow = slow.next; fast = fast.next.next; }
  // Reverse second half
  let prev = null, curr = slow.next;
  slow.next = null;
  while (curr) { const next = curr.next; curr.next = prev; prev = curr; curr = next; }
  // Merge two halves
  let first = head, second = prev;
  while (second) {
    const tmp1 = first.next, tmp2 = second.next;
    first.next = second; second.next = tmp1;
    first = tmp1; second = tmp2;
  }
  return head;
}`,
    solutionExplanation:
      "Three steps: (1) find middle via slow/fast, (2) reverse second half, (3) interleave both halves. Time: O(n), Space: O(1).",
  },

  // ==================== MATRIX ====================
  {
    id: 44,
    slug: "set-matrix-zeroes",
    title: "Set Matrix Zeroes",
    difficulty: "Medium",
    topics: ["Matrix"],
    description:
      "Given an `m x n` integer matrix, if an element is `0`, set its entire row and column to `0`'s. Return the modified matrix.",
    examples: [
      { input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]" },
      {
        input: "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]",
        output: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]",
      },
    ],
    constraints: ["m == matrix.length", "n == matrix[0].length", "1 <= m, n <= 200"],
    testCases: [
      {
        input: [
          [
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1],
          ],
        ],
        expected: [
          [1, 0, 1],
          [0, 0, 0],
          [1, 0, 1],
        ],
      },
      {
        input: [
          [
            [0, 1, 2, 0],
            [3, 4, 5, 2],
            [1, 3, 1, 5],
          ],
        ],
        expected: [
          [0, 0, 0, 0],
          [0, 4, 5, 0],
          [0, 3, 1, 0],
        ],
      },
    ],
    starterJs: `// Return the modified matrix
function setZeroes(matrix) {

}`,
    solutionJs: `function setZeroes(matrix) {
  const rows = new Set(), cols = new Set();
  for (let r = 0; r < matrix.length; r++)
    for (let c = 0; c < matrix[0].length; c++)
      if (matrix[r][c] === 0) { rows.add(r); cols.add(c); }
  for (let r = 0; r < matrix.length; r++)
    for (let c = 0; c < matrix[0].length; c++)
      if (rows.has(r) || cols.has(c)) matrix[r][c] = 0;
  return matrix;
}`,
    solutionExplanation:
      "First pass: record rows/cols containing zeros. Second pass: zero them out. O(1) space variant: use first row/col as markers. Time: O(m×n), Space: O(m+n).",
  },
  {
    id: 45,
    slug: "spiral-matrix",
    title: "Spiral Matrix",
    difficulty: "Medium",
    topics: ["Matrix"],
    description: "Given an `m x n` matrix, return all elements of the matrix in spiral order.",
    examples: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" },
      {
        input: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
        output: "[1,2,3,4,8,12,11,10,9,5,6,7]",
      },
    ],
    constraints: ["m == matrix.length", "n == matrix[i].length", "1 <= m, n <= 10"],
    testCases: [
      {
        input: [
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
          ],
        ],
        expected: [1, 2, 3, 6, 9, 8, 7, 4, 5],
      },
      {
        input: [
          [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
          ],
        ],
        expected: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
      },
    ],
    starterJs: `function spiralOrder(matrix) {

}`,
    solutionJs: `function spiralOrder(matrix) {
  const res = [];
  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) res.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) res.push(matrix[r][right]);
    right--;
    if (top <= bottom) { for (let c = right; c >= left; c--) res.push(matrix[bottom][c]); bottom--; }
    if (left <= right) { for (let r = bottom; r >= top; r--) res.push(matrix[r][left]); left++; }
  }
  return res;
}`,
    solutionExplanation:
      "Shrink boundaries (top, bottom, left, right) after each direction traversal. Check boundaries before going left/up to avoid double-counting single rows/cols. Time: O(m×n), Space: O(1).",
  },
  {
    id: 46,
    slug: "rotate-image",
    title: "Rotate Image",
    difficulty: "Medium",
    topics: ["Matrix"],
    description:
      "You are given an `n x n` 2D matrix representing an image. Rotate the image by 90 degrees clockwise in-place. Return the rotated matrix.",
    examples: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]" },
    ],
    constraints: ["n == matrix.length == matrix[i].length", "1 <= n <= 20"],
    testCases: [
      {
        input: [
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
          ],
        ],
        expected: [
          [7, 4, 1],
          [8, 5, 2],
          [9, 6, 3],
        ],
      },
      {
        input: [
          [
            [5, 1, 9, 11],
            [2, 4, 8, 10],
            [13, 3, 6, 7],
            [15, 14, 12, 16],
          ],
        ],
        expected: [
          [15, 13, 2, 5],
          [14, 3, 4, 1],
          [12, 6, 8, 9],
          [16, 7, 10, 11],
        ],
      },
    ],
    starterJs: `// Return the rotated matrix
function rotate(matrix) {

}`,
    solutionJs: `function rotate(matrix) {
  const n = matrix.length;
  // Transpose
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
  // Reverse each row
  for (let i = 0; i < n; i++) matrix[i].reverse();
  return matrix;
}`,
    solutionExplanation:
      "Transpose (swap across diagonal) then reverse each row = 90° clockwise rotation. Time: O(n²), Space: O(1).",
  },
  {
    id: 47,
    slug: "word-search",
    title: "Word Search",
    difficulty: "Medium",
    topics: ["Matrix"],
    description:
      "Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid. The word must be constructed from letters of sequentially adjacent cells (horizontally or vertically), and the same cell may not be used more than once.",
    examples: [
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
        output: "true",
      },
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
        output: "false",
      },
    ],
    constraints: ["m == board.length", "n == board[i].length", "1 <= m, n <= 6"],
    testCases: [
      {
        input: [
          [
            ["A", "B", "C", "E"],
            ["S", "F", "C", "S"],
            ["A", "D", "E", "E"],
          ],
          "ABCCED",
        ],
        expected: true,
      },
      {
        input: [
          [
            ["A", "B", "C", "E"],
            ["S", "F", "C", "S"],
            ["A", "D", "E", "E"],
          ],
          "ABCB",
        ],
        expected: false,
      },
    ],
    starterJs: `function exist(board, word) {

}`,
    solutionJs: `function exist(board, word) {
  const m = board.length, n = board[0].length;
  function dfs(r, c, i) {
    if (i === word.length) return true;
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[i]) return false;
    const tmp = board[r][c];
    board[r][c] = '#';
    const found = dfs(r+1,c,i+1) || dfs(r-1,c,i+1) || dfs(r,c+1,i+1) || dfs(r,c-1,i+1);
    board[r][c] = tmp;
    return found;
  }
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++)
      if (dfs(r, c, 0)) return true;
  return false;
}`,
    solutionExplanation:
      "DFS backtracking: mark cell as visited (#), explore 4 directions, restore. Start DFS from every cell. Time: O(m×n×4^L) worst case, Space: O(L) recursion.",
  },

  // ==================== STRING ====================
  {
    id: 48,
    slug: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topics: ["String"],
    description:
      "Given a string `s`, find the length of the longest substring without repeating characters.",
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: '"abc"' },
      { input: 's = "bbbbb"', output: "1" },
      { input: 's = "pwwkew"', output: "3", explanation: '"wke"' },
    ],
    constraints: ["0 <= s.length <= 5 * 10^4"],
    testCases: [
      { input: ["abcabcbb"], expected: 3 },
      { input: ["bbbbb"], expected: 1 },
      { input: ["pwwkew"], expected: 3 },
    ],
    starterJs: `function lengthOfLongestSubstring(s) {

}`,
    solutionJs: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let max = 0, left = 0;
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) left = Math.max(left, map.get(s[right]) + 1);
    map.set(s[right], right);
    max = Math.max(max, right - left + 1);
  }
  return max;
}`,
    solutionExplanation:
      "Sliding window: track last seen index of each char. If char repeats, move left pointer past the previous occurrence. Time: O(n), Space: O(min(n, charset)).",
  },
  {
    id: 49,
    slug: "longest-repeating-character-replacement",
    title: "Longest Repeating Character Replacement",
    difficulty: "Medium",
    topics: ["String"],
    description:
      "You are given a string `s` and an integer `k`. You can choose any character in the string and change it to any other uppercase English character. Perform this operation at most `k` times. Return the length of the longest substring containing the same letter you can get after performing the operations.",
    examples: [
      { input: 's = "ABAB", k = 2', output: "4" },
      { input: 's = "AABABBA", k = 1', output: "4" },
    ],
    constraints: [
      "1 <= s.length <= 10^5",
      "s consists of uppercase English letters",
      "0 <= k <= s.length",
    ],
    testCases: [
      { input: ["ABAB", 2], expected: 4 },
      { input: ["AABABBA", 1], expected: 4 },
      { input: ["AAAA", 0], expected: 4 },
    ],
    starterJs: `function characterReplacement(s, k) {

}`,
    solutionJs: `function characterReplacement(s, k) {
  const count = {};
  let left = 0, maxCount = 0, max = 0;
  for (let right = 0; right < s.length; right++) {
    count[s[right]] = (count[s[right]] || 0) + 1;
    maxCount = Math.max(maxCount, count[s[right]]);
    while ((right - left + 1) - maxCount > k) {
      count[s[left]]--;
      left++;
    }
    max = Math.max(max, right - left + 1);
  }
  return max;
}`,
    solutionExplanation:
      "Sliding window: window size - max frequency ≤ k means we can replace the rest. Shrink left when this condition fails. Time: O(n), Space: O(1).",
  },
  {
    id: 50,
    slug: "minimum-window-substring",
    title: "Minimum Window Substring",
    difficulty: "Hard",
    topics: ["String"],
    description:
      "Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included. If there is no such substring, return the empty string.",
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
      { input: 's = "a", t = "a"', output: '"a"' },
      { input: 's = "a", t = "aa"', output: '""' },
    ],
    constraints: ["1 <= s.length, t.length <= 10^5"],
    testCases: [
      { input: ["ADOBECODEBANC", "ABC"], expected: "BANC" },
      { input: ["a", "a"], expected: "a" },
      { input: ["a", "aa"], expected: "" },
    ],
    starterJs: `function minWindow(s, t) {

}`,
    solutionJs: `function minWindow(s, t) {
  const need = new Map();
  for (const c of t) need.set(c, (need.get(c) || 0) + 1);
  let have = 0, required = need.size, left = 0, res = '', minLen = Infinity;
  const window = new Map();
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window.set(c, (window.get(c) || 0) + 1);
    if (need.has(c) && window.get(c) === need.get(c)) have++;
    while (have === required) {
      if (right - left + 1 < minLen) { minLen = right - left + 1; res = s.slice(left, right + 1); }
      const lc = s[left++];
      window.set(lc, window.get(lc) - 1);
      if (need.has(lc) && window.get(lc) < need.get(lc)) have--;
    }
  }
  return res;
}`,
    solutionExplanation:
      "Sliding window with two hash maps: need (t's freq) and window (current). 'have' counts chars meeting their required frequency. Shrink left when all chars are satisfied. Time: O(|s|+|t|), Space: O(|t|).",
  },
  {
    id: 51,
    slug: "valid-anagram",
    title: "Valid Anagram",
    difficulty: "Easy",
    topics: ["String"],
    description:
      "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.",
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: "true" },
      { input: 's = "rat", t = "car"', output: "false" },
    ],
    constraints: [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters.",
    ],
    testCases: [
      { input: ["anagram", "nagaram"], expected: true },
      { input: ["rat", "car"], expected: false },
      { input: ["a", "ab"], expected: false },
    ],
    starterJs: `function isAnagram(s, t) {

}`,
    solutionJs: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (const c of s) count[c] = (count[c] || 0) + 1;
  for (const c of t) {
    if (!count[c]) return false;
    count[c]--;
  }
  return true;
}`,
    solutionExplanation:
      "Count character frequencies in both strings and compare. Time: O(n), Space: O(1) (at most 26 letters).",
  },
  {
    id: 52,
    slug: "group-anagrams",
    title: "Group Anagrams",
    difficulty: "Medium",
    topics: ["String"],
    description:
      "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.",
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
      },
    ],
    constraints: ["1 <= strs.length <= 10^4", "0 <= strs[i].length <= 100"],
    testCases: [
      { input: [["a"]], expected: [["a"]] },
      { input: [[""]], expected: [[""]] },
      { input: [["ab", "ba"]], expected: [["ab", "ba"]] },
    ],
    starterJs: `function groupAnagrams(strs) {

}`,
    solutionJs: `function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return [...map.values()];
}`,
    solutionExplanation:
      "Use sorted string as hash map key — anagrams have the same sorted form. Group strings by key. Time: O(n × k log k) where k is max string length, Space: O(n×k).",
  },
  {
    id: 53,
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    topics: ["String"],
    description:
      "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid. An input string is valid if open brackets are closed by the same type in the correct order.",
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
    constraints: ["1 <= s.length <= 10^4"],
    testCases: [
      { input: ["()[]{}"], expected: true },
      { input: ["([)]"], expected: false },
      { input: ["{[]}"], expected: true },
    ],
    starterJs: `function isValid(s) {

}`,
    solutionJs: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const c of s) {
    if ('([{'.includes(c)) stack.push(c);
    else if (stack.pop() !== map[c]) return false;
  }
  return stack.length === 0;
}`,
    solutionExplanation:
      "Stack-based: push open brackets, pop on close and verify it matches. If stack is empty at end, all brackets matched. Time: O(n), Space: O(n).",
  },
  {
    id: 54,
    slug: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    topics: ["String"],
    description:
      "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string `s`, return `true` if it is a palindrome.",
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
      },
      { input: 's = "race a car"', output: "false" },
    ],
    constraints: ["1 <= s.length <= 2 * 10^5"],
    testCases: [
      { input: ["A man, a plan, a canal: Panama"], expected: true },
      { input: ["race a car"], expected: false },
      { input: [""], expected: true },
    ],
    starterJs: `function isPalindrome(s) {

}`,
    solutionJs: `function isPalindrome(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    while (left < right && !s[left].match(/[a-zA-Z0-9]/)) left++;
    while (left < right && !s[right].match(/[a-zA-Z0-9]/)) right--;
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++; right--;
  }
  return true;
}`,
    solutionExplanation:
      "Two pointers from both ends, skip non-alphanumeric, compare case-insensitively. Time: O(n), Space: O(1).",
  },
  {
    id: 55,
    slug: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    topics: ["String"],
    description: "Given a string `s`, return the longest palindromic substring in `s`.",
    examples: [
      { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also acceptable.' },
      { input: 's = "cbbd"', output: '"bb"' },
    ],
    constraints: ["1 <= s.length <= 1000"],
    testCases: [
      { input: ["cbbd"], expected: "bb" },
      { input: ["racecar"], expected: "racecar" },
      { input: ["a"], expected: "a" },
    ],
    starterJs: `function longestPalindrome(s) {

}`,
    solutionJs: `function longestPalindrome(s) {
  let res = '';
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    if (r - l - 1 > res.length) res = s.slice(l + 1, r);
  }
  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // odd
    expand(i, i + 1); // even
  }
  return res;
}`,
    solutionExplanation:
      "Expand around center for each position (odd and even length). Track longest found. Time: O(n²), Space: O(1). Manacher's algorithm achieves O(n).",
  },
  {
    id: 56,
    slug: "palindromic-substrings",
    title: "Palindromic Substrings",
    difficulty: "Medium",
    topics: ["String"],
    description:
      "Given a string `s`, return the number of palindromic substrings in it. A substring is a contiguous sequence of characters within the string.",
    examples: [
      { input: 's = "abc"', output: "3", explanation: '"a", "b", "c"' },
      { input: 's = "aaa"', output: "6", explanation: '"a", "a", "a", "aa", "aa", "aaa"' },
    ],
    constraints: ["1 <= s.length <= 1000"],
    testCases: [
      { input: ["abc"], expected: 3 },
      { input: ["aaa"], expected: 6 },
      { input: ["a"], expected: 1 },
    ],
    starterJs: `function countSubstrings(s) {

}`,
    solutionJs: `function countSubstrings(s) {
  let count = 0;
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) { count++; l--; r++; }
  }
  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return count;
}`,
    solutionExplanation:
      "Expand around each center (odd + even). Increment count for every valid expansion. Time: O(n²), Space: O(1).",
  },
  {
    id: 57,
    slug: "encode-decode-strings",
    title: "Encode and Decode Strings",
    difficulty: "Medium",
    topics: ["String"],
    description:
      "Design an algorithm to encode a list of strings to a single string. The encoded string is then sent over the network and decoded back to the original list of strings.\n\nImplement both `encode(strs)` and `decode(s)` functions. Test them by implementing `encodeAndDecode(strs)` that calls both and returns the decoded result.",
    examples: [
      { input: 'strs = ["hello","world"]', output: '["hello","world"]' },
      { input: 'strs = [""]', output: '[""]' },
    ],
    constraints: ["1 <= strs.length <= 200", "0 <= strs[i].length <= 200"],
    testCases: [
      { input: [["hello", "world"]], expected: ["hello", "world"] },
      { input: [[""]], expected: [""] },
      { input: [["a", "b", "c"]], expected: ["a", "b", "c"] },
    ],
    starterJs: `function encode(strs) {
  // Encode list to single string

}

function decode(s) {
  // Decode single string back to list

}

// Test wrapper - do not modify
function encodeAndDecode(strs) {
  return decode(encode(strs));
}`,
    solutionJs: `function encode(strs) {
  return strs.map(s => s.length + '#' + s).join('');
}

function decode(s) {
  const res = [];
  let i = 0;
  while (i < s.length) {
    const j = s.indexOf('#', i);
    const len = parseInt(s.slice(i, j));
    res.push(s.slice(j + 1, j + 1 + len));
    i = j + 1 + len;
  }
  return res;
}

function encodeAndDecode(strs) {
  return decode(encode(strs));
}`,
    solutionExplanation:
      "Length-prefix encoding: for each string, prepend 'len#string'. During decode, read until '#' to get length, then extract that many chars. Handles any character including '#'. Time: O(n), Space: O(n).",
  },

  // ==================== TREE ====================
  {
    id: 58,
    slug: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    topics: ["Tree"],
    description:
      "Given the `root` of a binary tree, return its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]", output: "2" },
    ],
    constraints: ["0 <= The number of nodes <= 10^4", "-100 <= Node.val <= 100"],
    testCases: [
      { input: [[3, 9, 20, null, null, 15, 7]], expected: 3, inputTypes: ["tree"] },
      { input: [[1, null, 2]], expected: 2, inputTypes: ["tree"] },
      { input: [[]], expected: 0, inputTypes: ["tree"] },
    ],
    starterJs: `// TreeNode is available globally
function maxDepth(root) {

}`,
    solutionJs: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
    solutionExplanation:
      "Recursive DFS: max depth = 1 + max(depth of left subtree, depth of right subtree). Base case: null node returns 0. Time: O(n), Space: O(h) where h is tree height.",
  },
  {
    id: 59,
    slug: "same-tree",
    title: "Same Tree",
    difficulty: "Easy",
    topics: ["Tree"],
    description:
      "Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.",
    examples: [
      { input: "p = [1,2,3], q = [1,2,3]", output: "true" },
      { input: "p = [1,2], q = [1,null,2]", output: "false" },
    ],
    constraints: ["0 <= The number of nodes <= 100", "-10^4 <= Node.val <= 10^4"],
    testCases: [
      {
        input: [
          [1, 2, 3],
          [1, 2, 3],
        ],
        expected: true,
        inputTypes: ["tree", "tree"],
      },
      {
        input: [
          [1, 2],
          [1, null, 2],
        ],
        expected: false,
        inputTypes: ["tree", "tree"],
      },
      { input: [[], []], expected: true, inputTypes: ["tree", "tree"] },
    ],
    starterJs: `// TreeNode is available globally
function isSameTree(p, q) {

}`,
    solutionJs: `function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
    solutionExplanation:
      "Recursive: both null → true; one null or different values → false; recurse on both subtrees. Time: O(n), Space: O(h).",
  },
  {
    id: 60,
    slug: "invert-binary-tree",
    title: "Invert/Flip Binary Tree",
    difficulty: "Easy",
    topics: ["Tree"],
    description: "Given the `root` of a binary tree, invert the tree, and return its root.",
    examples: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
      { input: "root = [2,1,3]", output: "[2,3,1]" },
    ],
    constraints: ["0 <= The number of nodes <= 100"],
    testCases: [
      {
        input: [[4, 2, 7, 1, 3, 6, 9]],
        expected: [4, 7, 2, 9, 6, 3, 1],
        inputTypes: ["tree"],
        expectedType: "tree",
      },
      { input: [[2, 1, 3]], expected: [2, 3, 1], inputTypes: ["tree"], expectedType: "tree" },
      { input: [[]], expected: [], inputTypes: ["tree"], expectedType: "tree" },
    ],
    starterJs: `// TreeNode is available globally
function invertTree(root) {

}`,
    solutionJs: `function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}`,
    solutionExplanation:
      "Recursively swap left and right children at each node (post-order style). Time: O(n), Space: O(h).",
  },
  {
    id: 61,
    slug: "binary-tree-maximum-path-sum",
    title: "Binary Tree Maximum Path Sum",
    difficulty: "Hard",
    topics: ["Tree"],
    description:
      "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge connecting them. A node can only appear once. Given the `root` of a binary tree, return the maximum path sum of any non-empty path.",
    examples: [
      { input: "root = [1,2,3]", output: "6", explanation: "Path: 2 → 1 → 3" },
      { input: "root = [-10,9,20,null,null,15,7]", output: "42", explanation: "Path: 15 → 20 → 7" },
    ],
    constraints: ["-1000 <= Node.val <= 1000"],
    testCases: [
      { input: [[1, 2, 3]], expected: 6, inputTypes: ["tree"] },
      { input: [[-10, 9, 20, null, null, 15, 7]], expected: 42, inputTypes: ["tree"] },
      { input: [[-3]], expected: -3, inputTypes: ["tree"] },
    ],
    starterJs: `// TreeNode is available globally
function maxPathSum(root) {

}`,
    solutionJs: `function maxPathSum(root) {
  let max = -Infinity;
  function dfs(node) {
    if (!node) return 0;
    const left = Math.max(0, dfs(node.left));
    const right = Math.max(0, dfs(node.right));
    max = Math.max(max, node.val + left + right);
    return node.val + Math.max(left, right);
  }
  dfs(root);
  return max;
}`,
    solutionExplanation:
      "DFS: at each node, candidate path sum = node.val + max(0, left) + max(0, right). Update global max. Return to parent: node.val + max(0, max(left, right)) — can only extend one direction. Time: O(n), Space: O(h).",
  },
  {
    id: 62,
    slug: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    topics: ["Tree"],
    description:
      "Given the `root` of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
      { input: "root = [1]", output: "[[1]]" },
    ],
    constraints: ["0 <= The number of nodes <= 2000"],
    testCases: [
      {
        input: [[3, 9, 20, null, null, 15, 7]],
        expected: [[3], [9, 20], [15, 7]],
        inputTypes: ["tree"],
      },
      { input: [[1]], expected: [[1]], inputTypes: ["tree"] },
      { input: [[]], expected: [], inputTypes: ["tree"] },
    ],
    starterJs: `// TreeNode is available globally
function levelOrder(root) {

}`,
    solutionJs: `function levelOrder(root) {
  if (!root) return [];
  const res = [], q = [root];
  while (q.length) {
    const level = [], size = q.length;
    for (let i = 0; i < size; i++) {
      const node = q.shift();
      level.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.push(level);
  }
  return res;
}`,
    solutionExplanation:
      "BFS with a queue. Process each level by snapshotting queue size at level start, then enqueue children. Time: O(n), Space: O(n).",
  },
  {
    id: 63,
    slug: "serialize-deserialize-binary-tree",
    title: "Serialize and Deserialize Binary Tree",
    difficulty: "Hard",
    topics: ["Tree"],
    description:
      "Design an algorithm to serialize (tree → string) and deserialize (string → tree) a binary tree.\n\nImplement `serialize(root)` and `deserialize(data)`. Test with `encodeTree(root)` which does a round-trip and returns the re-built tree.",
    examples: [{ input: "root = [1,2,3,null,null,4,5]", output: "[1,2,3,null,null,4,5]" }],
    constraints: ["0 <= The number of nodes <= 10^4"],
    testCases: [
      {
        input: [[1, 2, 3, null, null, 4, 5]],
        expected: [1, 2, 3, null, null, 4, 5],
        inputTypes: ["tree"],
        expectedType: "tree",
      },
      { input: [[]], expected: [], inputTypes: ["tree"], expectedType: "tree" },
    ],
    starterJs: `// TreeNode is available globally
function serialize(root) {
  // Return a string representation of the tree

}

function deserialize(data) {
  // Reconstruct tree from string

}

// Test wrapper - do not modify
function encodeTree(root) {
  return deserialize(serialize(root));
}`,
    solutionJs: `function serialize(root) {
  if (!root) return 'N';
  return root.val + ',' + serialize(root.left) + ',' + serialize(root.right);
}

function deserialize(data) {
  const vals = data.split(',');
  let i = 0;
  function build() {
    if (vals[i] === 'N') { i++; return null; }
    const node = new TreeNode(parseInt(vals[i++]));
    node.left = build();
    node.right = build();
    return node;
  }
  return build();
}

function encodeTree(root) {
  return deserialize(serialize(root));
}`,
    solutionExplanation:
      "Pre-order DFS serialization: write 'N' for null, else 'val,left,right'. Deserialization rebuilds in the same pre-order. Time: O(n), Space: O(n).",
  },
  {
    id: 64,
    slug: "subtree-of-another-tree",
    title: "Subtree of Another Tree",
    difficulty: "Easy",
    topics: ["Tree"],
    description:
      "Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values as `subRoot`.",
    examples: [
      { input: "root = [3,4,5,1,2], subRoot = [4,1,2]", output: "true" },
      { input: "root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]", output: "false" },
    ],
    constraints: ["1 <= root nodes <= 2000", "1 <= subRoot nodes <= 1000"],
    testCases: [
      {
        input: [
          [3, 4, 5, 1, 2],
          [4, 1, 2],
        ],
        expected: true,
        inputTypes: ["tree", "tree"],
      },
      {
        input: [
          [3, 4, 5, 1, 2, null, null, null, null, 0],
          [4, 1, 2],
        ],
        expected: false,
        inputTypes: ["tree", "tree"],
      },
    ],
    starterJs: `// TreeNode is available globally
function isSubtree(root, subRoot) {

}`,
    solutionJs: `function isSubtree(root, subRoot) {
  function isSame(p, q) {
    if (!p && !q) return true;
    if (!p || !q || p.val !== q.val) return false;
    return isSame(p.left, q.left) && isSame(p.right, q.right);
  }
  if (!root) return false;
  if (isSame(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}`,
    solutionExplanation:
      "At each node, check if the subtree rooted there matches subRoot (isSameTree). Recurse left and right. Time: O(m×n) where m,n are tree sizes, Space: O(h).",
  },
  {
    id: 65,
    slug: "construct-binary-tree-from-preorder-inorder",
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    difficulty: "Medium",
    topics: ["Tree"],
    description:
      "Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal, construct and return the binary tree.",
    examples: [
      {
        input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]",
        output: "[3,9,20,null,null,15,7]",
      },
    ],
    constraints: ["1 <= n <= 3000", "All values are unique."],
    testCases: [
      {
        input: [
          [3, 9, 20, 15, 7],
          [9, 3, 15, 20, 7],
        ],
        expected: [3, 9, 20, null, null, 15, 7],
        expectedType: "tree",
      },
      { input: [[-1], [-1]], expected: [-1], expectedType: "tree" },
    ],
    starterJs: `// TreeNode is available globally
function buildTree(preorder, inorder) {

}`,
    solutionJs: `function buildTree(preorder, inorder) {
  if (!preorder.length) return null;
  const rootVal = preorder[0];
  const mid = inorder.indexOf(rootVal);
  const root = new TreeNode(rootVal);
  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
  return root;
}`,
    solutionExplanation:
      "Preorder's first element is always the root. Find it in inorder to split left/right subtrees. Recurse. Use hash map for O(1) inorder lookup. Time: O(n²) naive, O(n) with map.",
  },
  {
    id: 66,
    slug: "validate-binary-search-tree",
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    topics: ["Tree"],
    description:
      "Given the `root` of a binary tree, determine if it is a valid binary search tree (BST). A valid BST: left subtree contains only nodes with keys less than the node's key; right subtree contains only nodes with keys greater.",
    examples: [
      { input: "root = [2,1,3]", output: "true" },
      {
        input: "root = [5,1,4,null,null,3,6]",
        output: "false",
        explanation: "Root's right child (4) < root (5).",
      },
    ],
    constraints: ["-2^31 <= Node.val <= 2^31 - 1"],
    testCases: [
      { input: [[2, 1, 3]], expected: true, inputTypes: ["tree"] },
      { input: [[5, 1, 4, null, null, 3, 6]], expected: false, inputTypes: ["tree"] },
      { input: [[1]], expected: true, inputTypes: ["tree"] },
    ],
    starterJs: `// TreeNode is available globally
function isValidBST(root) {

}`,
    solutionJs: `function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
  }
  return validate(root, -Infinity, Infinity);
}`,
    solutionExplanation:
      "Pass valid range [min, max] to each node. Root can be anything; left subtree must be < root.val; right must be > root.val. Time: O(n), Space: O(h).",
  },
  {
    id: 67,
    slug: "kth-smallest-element-in-bst",
    title: "Kth Smallest Element in a BST",
    difficulty: "Medium",
    topics: ["Tree"],
    description:
      "Given the `root` of a binary search tree, and an integer `k`, return the `k`th smallest value (1-indexed) of all the values of the nodes in the tree.",
    examples: [
      { input: "root = [3,1,4,null,2], k = 1", output: "1" },
      { input: "root = [5,3,6,2,4,null,null,1], k = 3", output: "3" },
    ],
    constraints: ["1 <= k <= n <= 10^4"],
    testCases: [
      { input: [[3, 1, 4, null, 2], 1], expected: 1, inputTypes: ["tree", null] },
      { input: [[5, 3, 6, 2, 4, null, null, 1], 3], expected: 3, inputTypes: ["tree", null] },
    ],
    starterJs: `// TreeNode is available globally
function kthSmallest(root, k) {

}`,
    solutionJs: `function kthSmallest(root, k) {
  let count = 0, result = 0;
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    if (++count === k) { result = node.val; return; }
    inorder(node.right);
  }
  inorder(root);
  return result;
}`,
    solutionExplanation:
      "In-order traversal of BST yields sorted values. Count nodes visited; return on k-th. Iterative approach avoids recursion stack. Time: O(h+k), Space: O(h).",
  },
  {
    id: 68,
    slug: "lowest-common-ancestor-bst",
    title: "Lowest Common Ancestor of a BST",
    difficulty: "Medium",
    topics: ["Tree"],
    description:
      "Given a binary search tree (BST) and two nodes `p` and `q` (represented as integers), find their lowest common ancestor (LCA). The LCA is the lowest node that has both p and q as descendants.",
    examples: [
      { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8", output: "6" },
      { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4", output: "2" },
    ],
    constraints: ["2 <= number of nodes <= 10^5", "All Node.val are unique."],
    testCases: [
      {
        input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 8],
        expected: 6,
        inputTypes: ["tree", null, null],
      },
      {
        input: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 4],
        expected: 2,
        inputTypes: ["tree", null, null],
      },
    ],
    starterJs: `// TreeNode is available globally
// p and q are node VALUES (not TreeNode objects)
function lowestCommonAncestor(root, p, q) {

}`,
    solutionJs: `function lowestCommonAncestor(root, p, q) {
  while (root) {
    if (p < root.val && q < root.val) root = root.left;
    else if (p > root.val && q > root.val) root = root.right;
    else return root.val;
  }
}`,
    solutionExplanation:
      "BST property: if both p and q are less than root, LCA is in the left subtree; if both greater, in the right; else root is the LCA. Time: O(h), Space: O(1).",
  },

  // ==================== HEAP ====================
  {
    id: 69,
    slug: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    topics: ["Heap"],
    description:
      "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.",
    examples: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
      { input: "nums = [1], k = 1", output: "[1]" },
    ],
    constraints: ["1 <= nums.length <= 10^5", "k is in the range [1, number of unique elements]."],
    testCases: [
      { input: [[1], 1], expected: [1] },
      { input: [[1, 2], 2], expected: [1, 2] },
    ],
    starterJs: `function topKFrequent(nums, k) {

}`,
    solutionJs: `function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of freq) buckets[count].push(num);
  const res = [];
  for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) {
    res.push(...buckets[i]);
  }
  return res.slice(0, k);
}`,
    solutionExplanation:
      "Bucket sort by frequency: bucket[freq] = [nums with that freq]. Iterate from highest bucket down to collect top k. Time: O(n), Space: O(n).",
  },
  {
    id: 70,
    slug: "find-median-from-data-stream",
    title: "Find Median from Data Stream",
    difficulty: "Hard",
    topics: ["Heap"],
    description:
      "The MedianFinder class supports `addNum(num)` and `findMedian()`. Implement `medianStream(nums)` that processes an array of numbers and returns the median after each insertion.",
    examples: [
      { input: "nums = [1,2,3]", output: "[1.0, 1.5, 2.0]" },
      { input: "nums = [5,2,4]", output: "[5.0, 3.5, 4.0]" },
    ],
    constraints: ["-10^5 <= num <= 10^5"],
    testCases: [
      { input: [[1, 2, 3]], expected: [1.0, 1.5, 2.0] },
      { input: [[5, 2, 4]], expected: [5.0, 3.5, 4.0] },
    ],
    starterJs: `// Return array of medians after each insertion
function medianStream(nums) {

}`,
    solutionJs: `function medianStream(nums) {
  const lower = [], upper = [];
  function addNum(num) {
    if (!lower.length || num <= lower[0]) {
      lower.push(num); lower.sort((a, b) => b - a);
    } else {
      upper.push(num); upper.sort((a, b) => a - b);
    }
    if (lower.length > upper.length + 1) { upper.unshift(lower.shift()); upper.sort((a,b)=>a-b); }
    if (upper.length > lower.length) { lower.unshift(upper.shift()); lower.sort((a,b)=>b-a); }
  }
  function findMedian() {
    return lower.length === upper.length ? (lower[0] + upper[0]) / 2 : lower[0];
  }
  return nums.map(n => { addNum(n); return findMedian(); });
}`,
    solutionExplanation:
      "Two heaps: max-heap (lower half) and min-heap (upper half). Balance sizes to differ by ≤1. Median = max of lower (odd) or average of both tops (even). Time: O(n log n), Space: O(n).",
  },
  {
    id: 71,
    slug: "last-stone-weight",
    title: "Last Stone Weight",
    difficulty: "Easy",
    topics: ["Heap"],
    description:
      "You are given an array `stones`. Each turn, smash the two heaviest stones. If equal, both are destroyed; else the smaller is destroyed and the larger becomes the difference. Return the weight of the last remaining stone, or 0.",
    examples: [
      { input: "stones = [2,7,4,1,8,1]", output: "1" },
      { input: "stones = [1]", output: "1" },
    ],
    constraints: ["1 <= stones.length <= 30", "1 <= stones[i] <= 1000"],
    testCases: [
      { input: [[2, 7, 4, 1, 8, 1]], expected: 1 },
      { input: [[1]], expected: 1 },
      { input: [[3, 3]], expected: 0 },
    ],
    starterJs: `function lastStoneWeight(stones) {

}`,
    solutionJs: `function lastStoneWeight(stones) {
  stones.sort((a, b) => a - b);
  while (stones.length > 1) {
    const diff = stones.pop() - stones.pop();
    if (diff > 0) {
      let lo = 0, hi = stones.length;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (stones[mid] < diff) lo = mid + 1; else hi = mid;
      }
      stones.splice(lo, 0, diff);
    }
  }
  return stones[0] || 0;
}`,
    solutionExplanation:
      "Simulate with a sorted array as a max-heap: pop two largest, if unequal insert difference back (binary search for position). Time: O(n²), Space: O(1).",
  },

  // ==================== TRIE ====================
  {
    id: 72,
    slug: "implement-trie",
    title: "Implement Trie (Prefix Tree)",
    difficulty: "Medium",
    topics: ["Tree"],
    description:
      "Implement a Trie with `insert(word)`, `search(word)` (exact match), and `startsWith(prefix)`. Implement `trieOps(ops, args)` that runs a sequence of operations and returns results.",
    examples: [
      {
        input:
          'ops=["insert","search","search","startsWith","insert","search"], args=[["apple"],["apple"],["app"],["app"],["app"],["app"]]',
        output: "[null,true,false,true,null,true]",
      },
    ],
    constraints: ["1 <= word.length <= 2000"],
    testCases: [
      {
        input: [
          ["insert", "search", "search", "startsWith", "insert", "search"],
          [["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]],
        ],
        expected: [null, true, false, true, null, true],
      },
    ],
    starterJs: `class Trie {
  constructor() {

  }
  insert(word) {

  }
  search(word) {

  }
  startsWith(prefix) {

  }
}

function trieOps(ops, args) {
  const trie = new Trie();
  return ops.map((op, i) => {
    if (op === 'insert') { trie.insert(args[i][0]); return null; }
    if (op === 'search') return trie.search(args[i][0]);
    if (op === 'startsWith') return trie.startsWith(args[i][0]);
  });
}`,
    solutionJs: `class Trie {
  constructor() { this.root = {}; }
  insert(word) {
    let node = this.root;
    for (const c of word) { if (!node[c]) node[c] = {}; node = node[c]; }
    node['#'] = true;
  }
  search(word) {
    let node = this.root;
    for (const c of word) { if (!node[c]) return false; node = node[c]; }
    return Boolean(node['#']);
  }
  startsWith(prefix) {
    let node = this.root;
    for (const c of prefix) { if (!node[c]) return false; node = node[c]; }
    return true;
  }
}

function trieOps(ops, args) {
  const trie = new Trie();
  return ops.map((op, i) => {
    if (op === 'insert') { trie.insert(args[i][0]); return null; }
    if (op === 'search') return trie.search(args[i][0]);
    if (op === 'startsWith') return trie.startsWith(args[i][0]);
  });
}`,
    solutionExplanation:
      "Each Trie node is a plain object mapping chars to children. '#' marks end of word. All ops walk the path character by character. Time: O(m) per op where m is word length.",
  },
  {
    id: 73,
    slug: "design-add-search-words",
    title: "Design Add and Search Words Data Structure",
    difficulty: "Medium",
    topics: ["Tree"],
    description:
      "Design a data structure that supports `addWord(word)` and `search(word)` where `'.'` matches any single character. Implement `wordDictOps(ops, args)` that processes a sequence of operations.",
    examples: [
      {
        input:
          'ops=["addWord","addWord","addWord","search","search","search","search"], args=[["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]',
        output: "[null,null,null,false,true,true,true]",
      },
    ],
    constraints: ["1 <= word.length <= 25"],
    testCases: [
      {
        input: [
          ["addWord", "addWord", "addWord", "search", "search", "search", "search"],
          [["bad"], ["dad"], ["mad"], ["pad"], ["bad"], [".ad"], ["b.."]],
        ],
        expected: [null, null, null, false, true, true, true],
      },
    ],
    starterJs: `class WordDictionary {
  constructor() {

  }
  addWord(word) {

  }
  search(word) {

  }
}

function wordDictOps(ops, args) {
  const wd = new WordDictionary();
  return ops.map((op, i) => {
    if (op === 'addWord') { wd.addWord(args[i][0]); return null; }
    if (op === 'search') return wd.search(args[i][0]);
  });
}`,
    solutionJs: `class WordDictionary {
  constructor() { this.root = {}; }
  addWord(word) {
    let node = this.root;
    for (const c of word) { if (!node[c]) node[c] = {}; node = node[c]; }
    node['#'] = true;
  }
  search(word) {
    function dfs(node, i) {
      if (i === word.length) return Boolean(node['#']);
      const c = word[i];
      if (c === '.') return Object.keys(node).some(k => k !== '#' && dfs(node[k], i + 1));
      return node[c] ? dfs(node[c], i + 1) : false;
    }
    return dfs(this.root, 0);
  }
}

function wordDictOps(ops, args) {
  const wd = new WordDictionary();
  return ops.map((op, i) => {
    if (op === 'addWord') { wd.addWord(args[i][0]); return null; }
    if (op === 'search') return wd.search(args[i][0]);
  });
}`,
    solutionExplanation:
      "Trie with DFS for '.' wildcard: when '.' is encountered, try all children recursively. Time: O(m) add, O(26^m) worst-case search with many wildcards.",
  },
  {
    id: 74,
    slug: "word-search-ii",
    title: "Word Search II",
    difficulty: "Hard",
    topics: ["Tree", "Matrix"],
    description:
      "Given an `m x n` board and a list of `words`, return all words that exist in the board. Words must use sequentially adjacent cells (H/V), and each cell is used at most once per word.",
    examples: [
      {
        input:
          'board=[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words=["oath","pea","eat","rain"]',
        output: '["eat","oath"]',
      },
    ],
    constraints: ["1 <= m, n <= 12", "1 <= words.length <= 3 * 10^4"],
    testCases: [
      {
        input: [
          [
            ["o", "a", "a", "n"],
            ["e", "t", "a", "e"],
            ["i", "h", "k", "r"],
            ["i", "f", "l", "v"],
          ],
          ["oath", "pea", "eat", "rain"],
        ],
        expected: ["eat", "oath"],
      },
    ],
    starterJs: `function findWords(board, words) {

}`,
    solutionJs: `function findWords(board, words) {
  const trie = {};
  for (const w of words) {
    let node = trie;
    for (const c of w) { if (!node[c]) node[c] = {}; node = node[c]; }
    node['#'] = w;
  }
  const m = board.length, n = board[0].length, res = [];
  function dfs(r, c, node) {
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] === '#') return;
    const ch = board[r][c];
    if (!node[ch]) return;
    const next = node[ch];
    if (next['#']) { res.push(next['#']); delete next['#']; }
    board[r][c] = '#';
    dfs(r+1,c,next); dfs(r-1,c,next); dfs(r,c+1,next); dfs(r,c-1,next);
    board[r][c] = ch;
  }
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++)
      dfs(r, c, trie);
  return res.sort();
}`,
    solutionExplanation:
      "Build Trie from all words, DFS from every cell following trie nodes. When '#' found, record word and delete to avoid duplicates. Time: O(m×n×4^L), Space: O(total word chars).",
  },
  {
    id: 75,
    slug: "alien-dictionary",
    title: "Alien Dictionary",
    difficulty: "Hard",
    topics: ["Graph"],
    description:
      'Given a list of strings `words` sorted by an alien language\'s lexicographic order, return the character order. Return `""` if no valid ordering exists.',
    examples: [
      { input: 'words = ["wrt","wrf","er","ett","rftt"]', output: '"wertf"' },
      { input: 'words = ["z","x"]', output: '"zx"' },
      { input: 'words = ["z","x","z"]', output: '""' },
    ],
    constraints: ["1 <= words.length <= 100", "1 <= words[i].length <= 100"],
    testCases: [
      { input: [["wrt", "wrf", "er", "ett", "rftt"]], expected: "wertf" },
      { input: [["z", "x"]], expected: "zx" },
      { input: [["z", "x", "z"]], expected: "" },
    ],
    starterJs: `function alienOrder(words) {

}`,
    solutionJs: `function alienOrder(words) {
  const adj = new Map();
  for (const w of words) for (const c of w) if (!adj.has(c)) adj.set(c, new Set());
  for (let i = 0; i < words.length - 1; i++) {
    const [w1, w2] = [words[i], words[i + 1]];
    const minLen = Math.min(w1.length, w2.length);
    if (w1.length > w2.length && w1.slice(0, minLen) === w2.slice(0, minLen)) return '';
    for (let j = 0; j < minLen; j++) {
      if (w1[j] !== w2[j]) { adj.get(w1[j]).add(w2[j]); break; }
    }
  }
  const visited = new Map();
  const res = [];
  function dfs(c) {
    if (visited.has(c)) return visited.get(c);
    visited.set(c, true);
    for (const next of adj.get(c)) if (dfs(next)) return true;
    visited.set(c, false);
    res.push(c);
    return false;
  }
  for (const c of adj.keys()) if (dfs(c)) return '';
  return res.reverse().join('');
}`,
    solutionExplanation:
      "Build directed graph from adjacent word pairs (first differing char = edge). Topological sort via DFS with cycle detection. Return '' if cycle found. Time: O(total chars), Space: O(unique chars²).",
  },
];

export const TOTAL_PROBLEMS = 75;
