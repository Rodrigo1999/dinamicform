"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _react = _interopRequireWildcard(require("react"));

var _Grid = _interopRequireDefault(require("./Grid"));

var _style = require("./style");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _default(props, ref) {
  var fields = props.fields,
      fixedValues = props.fixedValues,
      _props$fixedFields = props.fixedFields,
      fixedFields = _props$fixedFields === void 0 ? [] : _props$fixedFields,
      beforeButton = props.beforeButton,
      afterButton = props.afterButton,
      onSubmit = props.onSubmit,
      hiddenButtonSubmit = props.hiddenButtonSubmit,
      spacing = props.spacing,
      _props$grid = props.grid,
      grid = _props$grid === void 0 ? {} : _props$grid,
      formData = props.formData,
      _props$_onSubmit = props._onSubmit,
      _onSubmit = _props$_onSubmit === void 0 ? function () {
    return null;
  } : _props$_onSubmit,
      _props$onChangeField = props.onChangeField,
      onChangeField = _props$onChangeField === void 0 ? function () {
    return null;
  } : _props$onChangeField,
      _props$init = props.init,
      init = _props$init === void 0 ? function () {
    return null;
  } : _props$init,
      innerRef = props.innerRef,
      alignItems = props.alignItems,
      justify = props.justify,
      alignContent = props.alignContent,
      direction = props.direction,
      className = props.className;

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      values = _useState2[0],
      setValues = _useState2[1];

  var _useState3 = (0, _react.useState)({}),
      _useState4 = _slicedToArray(_useState3, 2),
      errors = _useState4[0],
      setErrors = _useState4[1]; //---------------------------------------------- retorna todos os campos-------------------------------------


  var getAllFields = (0, _react.useCallback)(function (fields) {
    return fields.flatMap(function (e) {
      return e.fields ? getAllFields(e.fields) : e;
    });
  }, [fields]); //---------------------------------------------- limpesa dos formulários-------------------------------------

  var clean = (0, _react.useCallback)(function () {
    var fd = getAllFields(fields).filter(function (e) {
      return e.visible != false;
    }).concat(fixedFields.filter(function (e) {
      return e.visible != false;
    }));
    setValues(fd.reduce(function (obj, e) {
      obj[e.name] = undefined;
      return obj;
    }, {}));
  }, [fields, fixedFields]); //---------------------------------------------- alteração de valores -------------------------------------

  var changeValue = (0, _react.useCallback)(function (name, val, selected) {
    var allFd = getAllFields(fields);
    var fd = allFd.filter(function (e) {
      return e.visible != false;
    }).find(function (e) {
      return e.name == name;
    });
    if (!fd) return false;
    setValues(function (values) {
      if (fd.dependence) {
        var dependence = fd.dependence.split('-');
        allFd.forEach(function (e) {
          if (!e.dependence) return false;
          var myDependence = e.dependence.split('-');

          if (dependence[0] == myDependence[0] && parseInt(myDependence[1]) > parseInt(dependence[1])) {
            values[e.name] = undefined;
          }
        });
      }

      return _objectSpread(_objectSpread({}, values), {}, _defineProperty({}, name, val));
    });
    onChangeField(fd, val, selected);
  }, [fields]); //---------------------------------------------- seta as confgurações externas -------------------------------------

  var _this = this({
    props: props,
    errors: errors,
    values: values,
    changeValue: changeValue,
    submit: submit,
    clean: clean,
    getAllFields: getAllFields
  }),
      _this$errors = _this.errors,
      controlErrors = _this$errors === void 0 ? [] : _this$errors,
      components = _this.components,
      _this$onError = _this.onError,
      onError = _this$onError === void 0 ? function () {
    return null;
  } : _this$onError,
      breakpoints = _this.breakpoints,
      button = _this.button; //---------------------------------------------- useEffects -------------------------------------


  (0, _react.useEffect)(function () {
    setInitialValues();
  }, [props.values]);
  (0, _react.useEffect)(function () {
    if (Object.values(errors).length) {
      var _errors = treatErrors();

      setErrors(_errors);
    }
  }, [values]); //---------------------------------------------- seta o valor inicial do formulário -------------------------------------

  var setInitialValues = (0, _react.useCallback)(function () {
    var _fields = getAllFields(fields).filter(function (e) {
      return e.visible != false;
    });

    var _values = Object.assign({}, props.values, fixedValues);

    if (_values) {
      var this_values = Object.assign({}, values);

      _fields.forEach(function (e) {
        if (e.name && e.input) {
          _values[e.name] = e.input(_values[e.name]);
        }
      });

      Object.keys(_values).forEach(function (k) {
        if (this_values[k] === undefined) {
          this_values[k] = _values[k];
        }
      });
      setValues(this_values);
    }
  }, [props.values, fields]); //---------------------------------------------- tratamento de erros -------------------------------------

  var treatErrors = (0, _react.useCallback)(function () {
    var allFd = getAllFields(fields);
    var fd = allFd.filter(function (e) {
      return e.visible != false;
    }).concat(fixedFields.filter(function (e) {
      return e.visible != false;
    }));

    var _errors = Object.assign({}, errors);

    fd.forEach(function (field) {
      delete _errors[field.name];
      controlErrors.forEach(function (e) {
        var err = e(field);

        if (err) {
          _errors[field.name] = err;
        }
      });

      if (field.error) {
        var err = field.error({
          fields: allFd,
          field: field,
          values: values,
          value: values[field.name]
        });

        if (err) {
          _errors[field.name] = err;
        }
      }
    });
    return _errors;
  }, [fields, fixedFields]); //---------------------------------------------- submição de formulário -------------------------------------

  function submit(evt) {
    evt.preventDefault();

    var _errors = treatErrors();

    var _values = Object.assign({}, values);

    var fd = getAllFields(fields).filter(function (e) {
      return e.visible != false;
    }).concat(fixedFields.filter(function (e) {
      return e.visible != false;
    }));
    fd.filter(function (e) {
      return e.output && e.visible != false;
    }).forEach(function (e) {
      _values[e.name] = e.output(values[e.name]);
    });

    _onSubmit(_values);

    if (!!Object.values(_errors).length) {
      setErrors(_errors);
      onError(_errors);
      return false;
    } else {
      if (formData) {
        _values = (0, _utils.objectToForm)(_values);
      }

      if (onSubmit) onSubmit(_values);
      if (props.clean) clean();
      return true;
    }
  } //---------------------------------------------- controle de referência -------------------------------------


  (0, _react.useImperativeHandle)(Object.keys(innerRef || ref || {}).length ? innerRef || ref : {
    current: null
  }, function () {
    return {
      changeValue: changeValue,
      submit: submit,
      clean: clean,
      fields: fields,
      getAllFields: getAllFields(fields)
    };
  });
  init({
    changeValue: changeValue,
    submit: submit,
    clean: clean,
    fields: fields,
    getAllFields: getAllFields(fields)
  }); //---------------------------------------------- controle de linhas e colunas -------------------------------------

  var comp = (0, _react.useCallback)(function (f) {
    return components.find(function (c) {
      return [].concat(c.type).includes(f.type);
    });
  }, [components]);

  function _fields(f) {
    if (f.fields) return render(f.fields);
    if (f.type == 'component') return f === null || f === void 0 ? void 0 : f.content(_objectSpread(_objectSpread({}, props), {}, {
      changeValue: changeValue,
      submit: submit,
      clean: clean,
      values: values,
      fields: fields,
      getAllFields: getAllFields(fields)
    }));
    return (comp(f) || components.find(function (e) {
      return [].concat(e.type).includes('default');
    })).content(f);
  }

  var render = (0, _react.useCallback)(function (fields) {
    return /*#__PURE__*/_react["default"].createElement(_Grid["default"], _extends({
      row: true,
      alignItems: alignItems || 'flex-start',
      justify: justify,
      alignContent: alignContent,
      direction: direction,
      spacing: spacing || 2
    }, grid.row), fields.filter(function (e) {
      return e.visible != false;
    }).map(function (f) {
      var _grid$col, _field$contentProps, _f$contentProps, _field$contentProps2, _f$contentProps2;

      var field = comp(f) || components.find(function (e) {
        return [].concat(e.type).includes('default');
      });
      return /*#__PURE__*/_react["default"].createElement(_Grid["default"], _extends({
        breakpoints: breakpoints,
        xs: f.col || 12,
        xl: f.xl,
        sm: f.sm,
        md: f.md,
        lg: f.lg,
        key: f.name
      }, field.contentProps, grid.col, f.contentProps, {
        style: _objectSpread(_objectSpread(_objectSpread({}, (_grid$col = grid.col) === null || _grid$col === void 0 ? void 0 : _grid$col.style), (_field$contentProps = field.contentProps) === null || _field$contentProps === void 0 ? void 0 : _field$contentProps.style), (_f$contentProps = f.contentProps) === null || _f$contentProps === void 0 ? void 0 : _f$contentProps.style),
        className: ['form-field', (_field$contentProps2 = field.contentProps) === null || _field$contentProps2 === void 0 ? void 0 : _field$contentProps2.className, (_f$contentProps2 = f.contentProps) === null || _f$contentProps2 === void 0 ? void 0 : _f$contentProps2.className].filter(Boolean).join(' ')
      }), f.beforeContent, f.wrap ? f.wrap(_fields(f)) : _fields(f), f.afterContent);
    }));
  }, [fields, breakpoints, grid, spacing]); //---------------------------------------------- COMPONENTE -------------------------------------

  return /*#__PURE__*/_react["default"].createElement(_style.Form, {
    onSubmit: submit,
    className: className
  }, render(fields), !hiddenButtonSubmit && (beforeButton || onSubmit || afterButton) && /*#__PURE__*/_react["default"].createElement("div", {
    className: "content-buttons"
  }, beforeButton, onSubmit && button, afterButton));
}