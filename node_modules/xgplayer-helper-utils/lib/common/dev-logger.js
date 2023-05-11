'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DevLogger = function () {
  function DevLogger() {
    var _this = this;

    _classCallCheck(this, DevLogger);

    try {
      var matched = /xgd=(\d)/.exec(document.cookie);
      this._status = !!matched;
      this._level = matched && matched[1];
    } catch (e) {
      this._status = false;
    }

    ['group', 'groupEnd', 'log', 'warn', 'error'].forEach(function (funName) {
      _this[funName] = function (arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
        var _console;

        if (!_this._status) return;
        var tagName = arg1;
        var args = [arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10].filter(function (x) {
          return x !== undefined;
        });
        (_console = console)[funName].apply(_console, ['[' + tagName + ']:'].concat(_toConsumableArray(args)));
      };
    });
  }

  /**
   * @return {*|boolean|boolean}
   */


  _createClass(DevLogger, [{
    key: 'enable',
    get: function get() {
      return this._status;
    }

    /**
     * @return {boolean}
     */

  }, {
    key: 'long',
    get: function get() {
      return this._level === '2';
    }
  }]);

  return DevLogger;
}();

exports.default = new DevLogger();