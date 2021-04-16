"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    width: ", ";\n    margin: ", ";\n    display:flex;\n    flex-direction: ", ";\n    justify-content: ", ";\n    align-content: ", ";\n    align-items: ", ";\n    box-sizing: border-box;\n    flex-wrap:wrap;\n    .grid-col{\n        padding: ", ";\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Row = _styledComponents["default"].div(_templateObject(), function (props) {
  return "calc(100% + ".concat(props.spacing * 2, "px)");
}, function (props) {
  return "-".concat(props.spacing, "px");
}, function (props) {
  return props.direction;
}, function (props) {
  return props.justify;
}, function (props) {
  return props.alignContent;
}, function (props) {
  return props.alignItems;
}, function (props) {
  return "".concat(props.spacing, "px");
});

var Col = _styledComponents["default"].div(_templateObject2(), function (props) {
  var literal = '';
  ['xs', 'xl', 'sm', 'md', 'lg'].forEach(function (e) {
    literal += "\n                @media(min-width: ".concat(props.breakpoints[e], "px) {\n                    max-width: ").concat(props[e] ? "".concat(100 * props[e] / 12, "%") : undefined, ";\n                    flex-basis: ").concat(props[e] ? "".concat(100 * props[e] / 12, "%") : undefined, ";\n                }\n            ");
  });
  return literal;
});

function _default(_ref) {
  var row = _ref.row,
      _ref$spacing = _ref.spacing,
      spacing = _ref$spacing === void 0 ? 0 : _ref$spacing,
      direction = _ref.direction,
      justify = _ref.justify,
      alignItems = _ref.alignItems,
      alignContent = _ref.alignContent,
      children = _ref.children,
      _breakpoints = _ref.breakpoints,
      _ref$xs = _ref.xs,
      xs = _ref$xs === void 0 ? 12 : _ref$xs,
      xl = _ref.xl,
      sm = _ref.sm,
      md = _ref.md,
      lg = _ref.lg,
      className = _ref.className,
      other = _objectWithoutProperties(_ref, ["row", "spacing", "direction", "justify", "alignItems", "alignContent", "children", "breakpoints", "xs", "xl", "sm", "md", "lg", "className"]);

  var breakpoints = {
    xs: (_breakpoints === null || _breakpoints === void 0 ? void 0 : _breakpoints.xs) || 0,
    sm: (_breakpoints === null || _breakpoints === void 0 ? void 0 : _breakpoints.sm) || 600,
    md: (_breakpoints === null || _breakpoints === void 0 ? void 0 : _breakpoints.md) || 960,
    lg: (_breakpoints === null || _breakpoints === void 0 ? void 0 : _breakpoints.lg) || 1280,
    xl: (_breakpoints === null || _breakpoints === void 0 ? void 0 : _breakpoints.xl) || 1920
  };
  return row ? /*#__PURE__*/_react["default"].createElement(Row, {
    spacing: spacing * 4,
    justify: justify,
    alignContent: alignContent,
    direction: direction,
    alignItems: alignItems
  }, children) : /*#__PURE__*/_react["default"].createElement(Col, _extends({}, other, {
    className: 'grid-col ' + className,
    breakpoints: breakpoints,
    xs: xs,
    xl: xl,
    sm: sm,
    md: md,
    lg: lg
  }), children);
}