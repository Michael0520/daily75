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
    starterPy: `def twoSum(nums: list[int], target: int) -> list[int]:
    pass`,
    solutionJs: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
}`,
    solutionPy: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, n in enumerate(nums):
        diff = target - n
        if diff in seen:
            return [seen[diff], i]
        seen[n] = i`,
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
    starterPy: `def maxProfit(prices: list[int]) -> int:
    pass`,
    solutionJs: `function maxProfit(prices) {
  let minPrice = Infinity, maxProfit = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}`,
    solutionPy: `def maxProfit(prices: list[int]) -> int:
    min_price, max_profit = float('inf'), 0
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    return max_profit`,
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
    starterPy: `def containsDuplicate(nums: list[int]) -> bool:
    pass`,
    solutionJs: `function containsDuplicate(nums) {
  return new Set(nums).size !== nums.length;
}`,
    solutionPy: `def containsDuplicate(nums: list[int]) -> bool:
    return len(set(nums)) != len(nums)`,
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
    starterPy: `def productExceptSelf(nums: list[int]) -> list[int]:
    pass`,
    solutionJs: `function productExceptSelf(nums) {
  const n = nums.length, result = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) { result[i] = prefix; prefix *= nums[i]; }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) { result[i] *= suffix; suffix *= nums[i]; }
  return result;
}`,
    solutionPy: `def productExceptSelf(nums: list[int]) -> list[int]:
    n = len(nums)
    result = [1] * n
    prefix = 1
    for i in range(n):
        result[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):
        result[i] *= suffix
        suffix *= nums[i]
    return result`,
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
    starterPy: `def maxSubArray(nums: list[int]) -> int:
    pass`,
    solutionJs: `function maxSubArray(nums) {
  let maxSum = nums[0], current = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    maxSum = Math.max(maxSum, current);
  }
  return maxSum;
}`,
    solutionPy: `def maxSubArray(nums: list[int]) -> int:
    max_sum = cur = nums[0]
    for n in nums[1:]:
        cur = max(n, cur + n)
        max_sum = max(max_sum, cur)
    return max_sum`,
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
    starterPy: `def maxProduct(nums: list[int]) -> int:
    pass`,
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
    solutionPy: `def maxProduct(nums: list[int]) -> int:
    res = max(nums)
    cur_min = cur_max = 1
    for n in nums:
        if n == 0:
            cur_min = cur_max = 1
            continue
        tmp = cur_max * n
        cur_max = max(n, cur_max * n, cur_min * n)
        cur_min = min(n, tmp, cur_min * n)
        res = max(res, cur_max)
    return res`,
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
    starterPy: `def findMin(nums: list[int]) -> int:
    pass`,
    solutionJs: `function findMin(nums) {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const m = (l + r) >> 1;
    if (nums[m] > nums[r]) l = m + 1;
    else r = m;
  }
  return nums[l];
}`,
    solutionPy: `def findMin(nums: list[int]) -> int:
    l, r = 0, len(nums) - 1
    while l < r:
        m = (l + r) // 2
        if nums[m] > nums[r]:
            l = m + 1
        else:
            r = m
    return nums[l]`,
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
    starterPy: `def search(nums: list[int], target: int) -> int:
    pass`,
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
    solutionPy: `def search(nums: list[int], target: int) -> int:
    l, r = 0, len(nums) - 1
    while l <= r:
        m = (l + r) // 2
        if nums[m] == target:
            return m
        if nums[l] <= nums[m]:
            if nums[l] <= target < nums[m]:
                r = m - 1
            else:
                l = m + 1
        else:
            if nums[m] < target <= nums[r]:
                l = m + 1
            else:
                r = m - 1
    return -1`,
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
    starterPy: `def threeSum(nums: list[int]) -> list[list[int]]:
    pass`,
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
    solutionPy: `def threeSum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    result = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        l, r = i + 1, len(nums) - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s == 0:
                result.append([nums[i], nums[l], nums[r]])
                while l < r and nums[l] == nums[l + 1]: l += 1
                while l < r and nums[r] == nums[r - 1]: r -= 1
                l += 1; r -= 1
            elif s < 0:
                l += 1
            else:
                r -= 1
    return result`,
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
    starterPy: `def maxArea(height: list[int]) -> int:
    pass`,
    solutionJs: `function maxArea(height) {
  let l = 0, r = height.length - 1, max = 0;
  while (l < r) {
    max = Math.max(max, Math.min(height[l], height[r]) * (r - l));
    if (height[l] < height[r]) l++;
    else r--;
  }
  return max;
}`,
    solutionPy: `def maxArea(height: list[int]) -> int:
    l, r, max_area = 0, len(height) - 1, 0
    while l < r:
        max_area = max(max_area, min(height[l], height[r]) * (r - l))
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1
    return max_area`,
    solutionExplanation:
      "Two pointers from both ends. Move the shorter line inward to potentially find a taller boundary. Time: O(n), Space: O(1).",
  },
];

export const TOTAL_PROBLEMS = 75;
