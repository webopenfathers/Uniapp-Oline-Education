import { createClass as _createClass, classCallCheck as _classCallCheck } from "./_virtual/_rollupPluginBabelHelpers.js";
var ResizeObserver = /* @__PURE__ */ function() {
  function ResizeObserver2() {
    var _this = this;
    _classCallCheck(this, ResizeObserver2);
    this.__handlers = [];
    if (!window.ResizeObserver) {
      return;
    }
    this.observer = new window.ResizeObserver(function(entries) {
      _this.__trigger(entries);
    });
  }
  _createClass(ResizeObserver2, [{
    key: "addObserver",
    value: function addObserver2(target, handler) {
      if (!this.observer) {
        return;
      }
      this.observer && this.observer.observe(target);
      var __handlers = this.__handlers;
      var index = -1;
      for (var i = 0; i < __handlers.length; i++) {
        if (__handlers[i] && target === __handlers[i].target) {
          index = i;
        }
      }
      if (index > -1) {
        this.__handlers[index].handler.push(handler);
      } else {
        this.__handlers.push({
          target,
          handler: [handler]
        });
      }
    }
  }, {
    key: "unObserver",
    value: function unObserver2(target) {
      var i = -1;
      this.__handlers.map(function(item, index) {
        if (target === item.target) {
          i = index;
        }
      });
      this.observer && this.observer.unobserve(target);
      i > -1 && this.__handlers.splice(i, 1);
    }
  }, {
    key: "destroyObserver",
    value: function destroyObserver() {
      this.observer && this.observer.disconnect();
      this.observer = null;
      this.__handlers = null;
    }
  }, {
    key: "__runHandler",
    value: function __runHandler(target, cr) {
      var __handlers = this.__handlers;
      for (var i = 0; i < __handlers.length; i++) {
        if (__handlers[i] && target === __handlers[i].target) {
          __handlers[i].handler && __handlers[i].handler.forEach(function(handler) {
            try {
              handler(target, cr);
            } catch (error) {
              console.error(error);
            }
          });
          break;
        }
      }
    }
  }, {
    key: "__trigger",
    value: function __trigger(entries) {
      var _this2 = this;
      entries.map(function(item) {
        var cr = item.contentRect;
        _this2.__runHandler(item.target, cr);
      });
    }
  }]);
  return ResizeObserver2;
}();
var resizeObserver = null;
function addObserver(target, handler) {
  if (!resizeObserver) {
    resizeObserver = new ResizeObserver();
  }
  resizeObserver.addObserver(target, handler);
}
function unObserver(target, handler) {
  if (!resizeObserver) {
    return;
  }
  resizeObserver.unObserver(target, handler);
}
export { addObserver, unObserver };
