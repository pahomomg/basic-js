const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }
  if (arr.length == 0) return arr;

  let newArr = [];
  newArr = arr.slice();

  if (newArr[0] == "--discard-prev" || newArr[0] == "--double-prev")
    newArr.shift();
  if (
    newArr[newArr.length - 1] == "--double-next" ||
    newArr[newArr.length - 1] == "--discard-next"
  )
    newArr.pop();

  for (let i = 0; i < newArr.length; i++) {
    if (newArr[i] == "--discard-next" && typeof newArr[i + 2] == "string")
      newArr.splice(i, 3);
    if (newArr[i] == "--double-next" && newArr[i + 2] == "--discard-prev")
      return newArr.filter((el) => typeof el === "number");
    if (newArr[i] == "--double-next" && newArr[i + 2] !== "--discard-prev")
      newArr[i] = newArr[i + 1];
    if (newArr[i] == "--double-prev") newArr[i] = newArr[i - 1];
  }
  return newArr;
}

module.exports = {
  transform,
};
