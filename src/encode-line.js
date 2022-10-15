const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  let arr = str.split("");
  count = 1;
  let newArr = [];
  for (let i = 0; i <= arr.length; i++) {
    for (let j = i + 1; j <= arr.length; j++) {
      if (arr[i] == arr[j]) {
        count += 1;
      } else {
        newArr.push([count, arr[i]]);
        count = 1;
        i = j - 1;
        break;
      }
    }
  }
  return newArr.join("").replaceAll(",", "").replaceAll("1", "");
}

module.exports = {
  encodeLine,
};
