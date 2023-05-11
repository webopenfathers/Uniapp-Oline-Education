var ERROR = [{
  code: 0,
  msg: "SUCCESS"
}, {
  code: 1,
  msg: "LOAD_ERROR"
}, {
  code: 2,
  msg: "PARSER_ERROR"
}, {
  code: 3,
  msg: "FORMAT_NOT_SUPPORTED"
}, {
  code: 4,
  msg: "ID_OR_LANGUAGE_NOT_EXIST"
}, {
  code: 5,
  msg: "PARAMETERS_ERROR"
}, {
  code: 6,
  msg: "ABORT"
}, {
  code: 7,
  msg: "UNKNOWN"
}, {
  code: 8,
  msg: "DATA_ERROR:subtitle.url is null"
}, {
  code: 9,
  msg: "DATA_ERROR:subtitle.url length is 0"
}];
function _ERROR(code) {
  var error = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var ret = {
    code: ERROR[code].code,
    msg: ERROR[code].msg
  };
  Object.keys(error).map(function(key) {
    ret[key] = error[key];
  });
  return ret;
}
export { _ERROR };
