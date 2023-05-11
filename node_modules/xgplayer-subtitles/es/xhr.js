import { createClass as _createClass, classCallCheck as _classCallCheck } from "./_virtual/_rollupPluginBabelHelpers.js";
var XHR = /* @__PURE__ */ _createClass(function XHR2() {
  var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, url = _ref.url, _ref$method = _ref.method, method = _ref$method === void 0 ? "GET" : _ref$method, _ref$type = _ref.type, type = _ref$type === void 0 ? "arraybuffer" : _ref$type, _ref$timeout = _ref.timeout, timeout = _ref$timeout === void 0 ? 1e4 : _ref$timeout, _ref$data = _ref.data, data = _ref$data === void 0 ? {} : _ref$data;
  var context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  _classCallCheck(this, XHR2);
  return new Promise(function(resolve, reject) {
    var R = new window.XMLHttpRequest();
    var _method = method.toUpperCase();
    var _data = [];
    if (type) {
      R.responseType = type;
    }
    if (timeout) {
      R.timeout = timeout;
    }
    Object.keys(data).forEach(function(k) {
      _data.push("k=".concat(data[k]));
    });
    R.onload = function() {
      if (R.status === 200 || R.status === 206) {
        resolve({
          context,
          res: R
        });
      } else {
        reject(new Error({
          context,
          res: R,
          type: "error"
        }));
      }
    };
    R.onerror = function(e) {
      reject(new Error({
        context,
        res: R,
        type: "error"
      }));
    };
    R.ontimeout = function(e) {
      reject(new Error({
        context,
        res: R,
        type: "error"
      }));
    };
    R.onabort = function() {
      reject(new Error({
        context,
        res: R,
        type: "error"
      }));
    };
    if (_method === "GET") {
      R.open(_method, "".concat(url));
      R.send();
    } else if (_method === "post") {
      R.open(_method, url);
      R.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      R.send(_data.join("&"));
    } else {
      throw new Error("xhr ".concat(_method, " is not supported"));
    }
  });
});
export { XHR as default };
