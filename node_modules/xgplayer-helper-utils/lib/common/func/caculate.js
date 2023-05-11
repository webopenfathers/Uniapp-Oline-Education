"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 *
 * @param {number} num
 * @param {number} fixed
 * @return {number}
 */
var fixedFloat = function fixedFloat(num, fixed) {
  return parseFloat(Number(num).toFixed(fixed));
};
exports.default = {
  fixedFloat: fixedFloat
};