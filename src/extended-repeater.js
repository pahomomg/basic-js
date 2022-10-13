const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  let {
    repeatTimes = 1,
    separator = "+",
    addition = "",
    additionRepeatTimes = 0,
    additionSeparator = "",
  } = options;

  if (
    (separator == "+" || typeof +separator == "number") &&
    !additionSeparator &&
    additionRepeatTimes > 1
  )
    return (
      str +
      (addition + "|")
        .repeat(additionRepeatTimes)
        .split("|")
        .splice(0, additionRepeatTimes)
        .join("|") +
      separator
    )
      .repeat(repeatTimes)
      .split(`${separator}`)
      .splice(0, repeatTimes)
      .join(`${separator}`);

  if (!addition && !additionSeparator)
    return (str + separator)
      .repeat(repeatTimes)
      .split(`${separator}`)
      .splice(0, repeatTimes)
      .join(`${separator}`);

  if (!additionSeparator)
    return (str + addition + separator)
      .repeat(repeatTimes)
      .split(`${separator}`)
      .splice(0, repeatTimes)
      .join(`${separator}`);

  if (repeatTimes == 1 && additionRepeatTimes == 0) return str + addition;
  else
    return (
      (str + (addition + additionSeparator).repeat(additionRepeatTimes))
        .split(`${additionSeparator}`)
        .splice(0, additionRepeatTimes)
        .join(`${additionSeparator}`) + separator
    )
      .repeat(repeatTimes)
      .split(`${separator}`)
      .splice(0, repeatTimes)
      .join(`${separator}`);
}
module.exports = {
  repeater,
};
