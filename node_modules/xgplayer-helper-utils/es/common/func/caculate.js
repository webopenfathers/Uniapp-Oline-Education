/**
 *
 * @param {number} num
 * @param {number} fixed
 * @return {number}
 */
var fixedFloat = function fixedFloat(num, fixed) {
  return parseFloat(Number(num).toFixed(fixed));
};
export default {
  fixedFloat: fixedFloat
};