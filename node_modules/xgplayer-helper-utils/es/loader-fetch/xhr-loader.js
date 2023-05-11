var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-undef */

import EVENTS from '../events';

var LOADER_EVENTS = EVENTS.LOADER_EVENTS;
var READ_TEXT = 1; // text
var READ_JSON = 2; // json
var READ_BUFFER = 3; // arraybuffer

var DEFAULT_TIMEOUT_IMMS = 2000;

var XhrLoader = function () {
  function XhrLoader(configs) {
    _classCallCheck(this, XhrLoader);

    this._xhr = null;
    this.configs = Object.assign({}, configs);
    this.loading = false;
    this._readtype = this.configs.readtype;
    this._bufferType = this.configs.buffer || 'LOADER_BUFFER';
    this._requestInfo = null;
    this._onReadyStateChange = this._onReadyStateChange.bind(this);
    this._onError = this._onError.bind(this);
    this._onAbort = this._onAbort.bind(this);
    this._onTimeout = this._onTimeout.bind(this);
  }

  _createClass(XhrLoader, [{
    key: 'init',
    value: function init() {
      this.on(LOADER_EVENTS.LADER_START, this.load.bind(this));
    }
  }, {
    key: '_createXhr',
    value: function _createXhr() {
      var xhr = void 0;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
      }
      return xhr;
    }
  }, {
    key: 'load',
    value: function load(url) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var retryTimes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var delayTime = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      var options = Object.assign({}, opts);
      this._requestInfo = {
        url: url,
        options: options,
        retryTimes: retryTimes,
        totalRetry: retryTimes,
        delayTime: delayTime
      };
      this._xhr = this._createXhr();
      this.loading = true;

      try {
        this._bindEvents();
        this._loadInternal(url, options);
      } catch (e) {
        this._whenError({
          code: this._xhr.status,
          message: e && e.message
        });
      }
    }
  }, {
    key: '_loadInternal',
    value: function _loadInternal(url, options) {
      var xhr = this._xhr;
      xhr.open('GET', url, true);
      this._setTimeout(xhr, options);
      this._setCredentails(xhr, options);
      this._setHeaders(xhr, options);
      this._setResponseType(xhr);
      xhr.send();
    }
  }, {
    key: '_bindEvents',
    value: function _bindEvents() {
      var xhr = this._xhr;
      xhr.addEventListener('readystatechange', this._onReadyStateChange);
      xhr.addEventListener('timeout', this._onTimeout);
      xhr.addEventListener('error', this._onError);
      xhr.addEventListener('abort', this._onAbort);
    }
  }, {
    key: '_setTimeout',
    value: function _setTimeout(xhr, options) {
      xhr.timeout = options.timeout || DEFAULT_TIMEOUT_IMMS;
    }
  }, {
    key: '_setCredentails',
    value: function _setCredentails(xhr, options) {
      if (options.withCredentials) {
        xhr.withCredentials = true;
      }
    }

    // call after open(), before send()

  }, {
    key: '_setHeaders',
    value: function _setHeaders(xhr, options) {
      if (_typeof(options.headers) === 'object') {
        var optHeaders = options.headers;
        for (var key in optHeaders) {
          if (optHeaders.hasOwnProperty(key)) {
            xhr.setRequestHeader(key, optHeaders[key]);
          }
        }
      }
    }
  }, {
    key: '_setResponseType',
    value: function _setResponseType(xhr) {
      switch (this._readtype) {
        case READ_BUFFER:
          xhr.responseType = 'arraybuffer';
          break;
        case READ_JSON:
          xhr.responseType = 'json';
          break;
        case READ_TEXT:
        default:
          xhr.responseType = '';
      }
    }
  }, {
    key: '_onReadyStateChange',
    value: function _onReadyStateChange() {
      var _xhr = this._xhr,
          readyState = _xhr.readyState,
          status = _xhr.status;


      if (readyState === 4) {
        if (status >= 200 && status < 300) {
          this._onComplete(this._xhr);
          return;
        }

        // abort、timeout都会走到这, status === 0, 这些情况在事件监听中执行
        if (status === 0) return;

        this._onError();
      }
    }
  }, {
    key: '_onComplete',
    value: function _onComplete(xhr) {
      var data = void 0;
      switch (this._readtype) {
        case READ_JSON:
          try {
            data = JSON.parse(xhr.responseText);
          } catch (e) {}
          break;
        case READ_BUFFER:
          var buffer = xhr.response;
          data = new Uint8Array(buffer);
          break;
        case READ_TEXT:
        default:
          data = xhr.responseText;
      }
      if (this.bufferIns) {
        this.bufferIns.push(data);
        this.emit(LOADER_EVENTS.LOADER_COMPLETE, this.bufferIns);
      } else {
        this.emit(LOADER_EVENTS.LOADER_COMPLETE, data);
      }
      this.loading = false;
    }
  }, {
    key: '_onError',
    value: function _onError() {
      var xhr = this._xhr;
      var err = {
        code: xhr.status || 21,
        message: xhr.statusText
      };
      this._whenError(err);
    }
  }, {
    key: '_onTimeout',
    value: function _onTimeout() {
      console.warn('timeout');
      this._whenError({
        code: 999,
        message: 'fetch timeout'
      });
    }
  }, {
    key: '_onAbort',
    value: function _onAbort() {
      console.warn('abort');
    }
  }, {
    key: '_whenError',
    value: function _whenError(info) {
      var _this = this;

      var _requestInfo = this._requestInfo,
          url = _requestInfo.url,
          options = _requestInfo.options,
          totalRetry = _requestInfo.totalRetry,
          retryTimes = _requestInfo.retryTimes,
          delayTime = _requestInfo.delayTime;


      if (!retryTimes) {
        // emit error
        this.loading = false;
        this.emit(LOADER_EVENTS.LOADER_ERROR, this.TAG, info);
        return;
      }

      retryTimes--;

      setTimeout(function () {
        _this.emit(LOADER_EVENTS.LOADER_RETRY, _this.TAG, {
          response: info,
          reason: 'response not ok',
          retryTime: totalRetry - retryTimes
        });
        _this.load(url, options, retryTimes, delayTime);
      }, delayTime);
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      if (this._xhr.readyState !== 4) {
        this._xhr.abort();
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.cancel();
      if (this._xhr) {
        this._xhr.removeEventListener('readystatechange', this._onReadyStateChange);
        this._xhr.removeEventListener('timeout', this._onTimeout);
        this._xhr.removeEventListener('error', this._onError);
        this._xhr.removeEventListener('abort', this._onAbort);
        this._xhr = null;
      }
    }
  }, {
    key: 'bufferIns',
    get: function get() {
      return this._context.getInstance(this._bufferType);
    }
  }], [{
    key: 'type',
    get: function get() {
      return 'loader';
    }
  }]);

  return XhrLoader;
}();

export default XhrLoader;