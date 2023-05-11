"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Speed = function () {
  function Speed() {
    _classCallCheck(this, Speed);

    // milliseconds
    this._firstCheckpoint = 0;
    this._lastCheckpoint = 0;
    this._intervalBytes = 0;
    this._lastSamplingBytes = 0;

    this._now = Date.now;
  }

  _createClass(Speed, [{
    key: "reset",
    value: function reset() {
      this._firstCheckpoint = this._lastCheckpoint = 0;
      this._intervalBytes = 0;
      this._lastSamplingBytes = 0;
    }
  }, {
    key: "addBytes",
    value: function addBytes(bytes) {
      var duration = this._now() - this._lastCheckpoint;
      if (this._firstCheckpoint === 0) {
        this._firstCheckpoint = this._now();
        this._lastCheckpoint = this._firstCheckpoint;
        this._intervalBytes += bytes;
      } else if (duration < 5000) {
        this._intervalBytes += bytes;
      } else {
        // duration >= 1000
        this._lastSamplingBytes = this._intervalBytes / (duration / 1000);
        this._intervalBytes = bytes;
        this._lastCheckpoint = this._now();
      }
    }
  }, {
    key: "currentKBps",
    get: function get() {
      this.addBytes(0);

      var durationSeconds = (this._now() - this._lastCheckpoint) / 1000;
      if (durationSeconds === 0) durationSeconds = 1;
      return this._intervalBytes / durationSeconds / 1024;
    }
  }, {
    key: "lastSamplingKBps",
    get: function get() {
      this.addBytes(0);

      if (this._lastSamplingBytes !== 0) {
        return this._lastSamplingBytes / 1024;
      } else {
        // lastSecondBytes === 0
        if (this._now() - this._lastCheckpoint >= 500) {
          // if time interval since last checkpoint has exceeded 500ms
          // the speed is nearly accurate
          return this.currentKBps;
        } else {
          // We don't know
          return 0;
        }
      }
    }
  }]);

  return Speed;
}();

exports.default = Speed;