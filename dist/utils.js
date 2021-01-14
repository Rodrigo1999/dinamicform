"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.delay = exports.objectToForm = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var expo = {
  objectToForm: function objectToForm(obj, form, level) {
    var f = form || new FormData();

    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        var levelProp = level ? level + '[' + k + ']' : k; // If it is a date, it parses to ISO format

        if (obj[k] instanceof Date) {
          f.set(levelProp, obj[k].toISOString());
          continue;
        } else if (obj[k] === null || obj[k] === undefined) {
          f.set(levelProp, '');
          continue;
        } else if (_typeof(obj[k]) === 'object' && !(obj[k] instanceof File) && !(obj[k] instanceof Blob)) {
          _objectToForm(obj[k], f, levelProp);

          continue;
        }

        f.set(levelProp, obj[k]);
      }
    }

    return f;
  },
  delay: function delay(fn, ms) {
    var timer = 0;
    return function () {
      clearTimeout(timer);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      timer = setTimeout(fn.bind.apply(fn, [this].concat(args)), ms || 0);
    };
  }
};
var _objectToForm = expo.objectToForm;
exports.objectToForm = _objectToForm;
var delay = expo.delay;
exports.delay = delay;
var _default = expo;
exports["default"] = _default;