'use strict';

if (typeof window !== 'undefined') {
  window.TimeRanges.prototype.dump = function () {
    var len = this.length;
    var ret = '';

    for (var i = 0; i < len; i++) {
      ret += this.start(i) + '~' + this.end(i) + ' ';
    };
    console.log(ret);
  };
}