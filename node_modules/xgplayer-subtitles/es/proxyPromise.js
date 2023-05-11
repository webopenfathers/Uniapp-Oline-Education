import { createClass as _createClass, classCallCheck as _classCallCheck } from "./_virtual/_rollupPluginBabelHelpers.js";
var ProxyPromise = /* @__PURE__ */ function() {
  function ProxyPromise2() {
    _classCallCheck(this, ProxyPromise2);
    var resolvePromise;
    var rejectPromise;
    var promise = new Promise(function(resolve, reject) {
      resolvePromise = resolve;
      rejectPromise = reject;
    });
    var publicPromise = promise;
    publicPromise.resolve = function(data) {
      resolvePromise(data);
      publicPromise.state = "fulfilled";
    };
    publicPromise.reject = function(error) {
      rejectPromise(error);
      publicPromise.state = "rejected";
      publicPromise.isBreak = error === "DESTROYED";
    };
    publicPromise.state = "pending";
    return publicPromise;
  }
  _createClass(ProxyPromise2, [{
    key: "resolve",
    value: function resolve(value) {
    }
  }, {
    key: "reject",
    value: function reject(reason) {
    }
  }]);
  return ProxyPromise2;
}();
export { ProxyPromise as default };
