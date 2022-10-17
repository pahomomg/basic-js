const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  domains = domains.map((e) =>
    e
      .split(".")
      .map((e) => "." + e)
      .reverse()
  );

  let newArr = [];
  for (let i = 0; i < domains.length; i++) {
    newArr.push([]);
    for (let j = 0; j < domains[i].length; j++) {
      if (newArr[i].length == 0) {
        newArr[i].push(domains[i][j]);
      } else newArr[i].push(newArr[i][j - 1] + domains[i][j]);
    }
  }

  newArr = newArr.flat(Infinity);
  const result = newArr.reduce((acc, rec, index) => {
    return typeof acc[rec] !== "undefined"
      ? { ...acc, [rec]: acc[rec] + 1 }
      : { ...acc, [rec]: 1 };
  }, {});
  return result;
}

module.exports = {
  getDNSStats,
};
