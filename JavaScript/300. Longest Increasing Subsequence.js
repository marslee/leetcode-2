// Given an unsorted array of integers, find the length of longest increasing subsequence.
//
// Example:
//
// Input: [10,9,2,5,3,7,101,18]
// Output: 4
// Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
//
// Note:
//
//   There may be more than one LIS combination, it is only necessary for you to return the length.
//   Your algorithm should run in O(n^2) complexity.
//
// Follow up: Could you improve it to O(n log n) time complexity?

/**
 * @param {number[]} nums
 * @return {number}
 */

/** 1) Dynamic programming */
// Similar
// 279. Perfect Squares
// 300. Longest Increasing Subsequence
// 322. Coin Change
//
// Time O(n^2)
// Space O(n)
//
// Example
// nums: [10,9,2,5,3,7,101,18]
// dp:   [ 1,1,1,2,2,3,  4, 4]
// res:  4
function lengthOfLIS1(nums) {
  if (nums.length === 0) return 0;

  const dp = new Array(nums.length).fill(1);

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(
          dp[i],
          dp[j] + 1,
        );
      }
    }
  }

  return Math.max(...dp);
}

/** 2) Dynamic programming with binary search */
// https://leetcode.com/problems/longest-increasing-subsequence/discuss/74824/JavaPython-Binary-search-O(nlogn)-time-with-explanation
//
// Time O(n log n)
// Space O(n)
//
// Example
// nums = [10, 9, 2, 5, 3, 7, 101, 18]
//
// tails =
// [10]
// [9]
// [2]
// [2, 5]
// [2, 3]
// [2, 3, 7]
// [2, 3, 7, 101]
// [2, 3, 7, 18]
function lengthOfLIS(nums) {
  if (nums.length === 0) return 0;

  const tails = [nums[0]];

  for (let n of nums) {
    let i = 0;
    let j = tails.length;

    while (j > i) {
      const mid = ~~((i + j) / 2);

      if (tails[mid] < n) i = mid + 1;
      else j = mid;
    }

    tails[j] = n;
  }

  return tails.length;
}
