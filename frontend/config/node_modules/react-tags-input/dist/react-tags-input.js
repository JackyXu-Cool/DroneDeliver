(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("classnames"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "classnames"], factory);
	else if(typeof exports === 'object')
		exports["ReactTagsInput"] = factory(require("react"), require("classnames"));
	else
		root["ReactTagsInput"] = factory(root["React"], root["classNames"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _objectAssign = __webpack_require__(2);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var TagsInput = _react2.default.createClass({
	  displayName: 'TagsInput',


	  propTypes: {
	    addKeys: _react2.default.PropTypes.array,
	    addOnBlur: _react2.default.PropTypes.bool,

	    /**
	     * When `true`, the same tag can be added multiple times.
	     *
	     * defaults to `false`
	     */
	    allowDuplicates: _react2.default.PropTypes.bool,

	    className: _react2.default.PropTypes.string,
	    inputProps: _react2.default.PropTypes.object,
	    onChange: _react2.default.PropTypes.func.isRequired,
	    removeKeys: _react2.default.PropTypes.array,
	    renderInput: _react2.default.PropTypes.func,
	    renderTag: _react2.default.PropTypes.func,
	    renderLayout: _react2.default.PropTypes.func,
	    tagProps: _react2.default.PropTypes.object,
	    value: _react2.default.PropTypes.array
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      addKeys: [9, // TAB
	      13 // ENTER
	      ],
	      allowDuplicates: false,
	      removeKeys: [8 // BACKSPACE
	      ],
	      renderInput: defaultRenderInput,
	      renderTag: defaultRenderTag,
	      renderLayout: defaultRenderLayout,
	      value: []
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      tags: ''
	    };
	  },
	  render: function render() {
	    var _this = this;

	    var _props = this.props;
	    var addKeys = _props.addKeys;
	    var addOnBlur = _props.addOnBlur;
	    var className = _props.className;
	    var _props$inputProps = _props.inputProps;
	    var inputProps = _props$inputProps === undefined ? {} : _props$inputProps;
	    var onChange = _props.onChange;
	    var removeKeys = _props.removeKeys;
	    var renderInput = _props.renderInput;
	    var renderTag = _props.renderTag;
	    var renderLayout = _props.renderLayout;
	    var _props$tagProps = _props.tagProps;
	    var tagProps = _props$tagProps === undefined ? {} : _props$tagProps;
	    var value = _props.value;

	    var props = _objectWithoutProperties(_props, ['addKeys', 'addOnBlur', 'className', 'inputProps', 'onChange', 'removeKeys', 'renderInput', 'renderTag', 'renderLayout', 'tagProps', 'value']);

	    var tag = this.state.tag;

	    var tagComponents = value.map(function (tag, index) {
	      var props = (0, _objectAssign2.default)({}, tagProps, {
	        key: index,
	        className: (0, _classnames2.default)(tagProps.className, 'TagsInput-tag'),
	        tag: tag,
	        onRemove: _this._handleRemove
	      });

	      if (!props.style) props.style = {};

	      return renderTag(props);
	    });
	    var inputComponent = renderInput((0, _objectAssign2.default)({}, inputProps, {
	      ref: 'input',
	      className: (0, _classnames2.default)(inputProps.className, 'TagsInput-input'),
	      onBlur: this._handleOnBlur,
	      onChange: this._handleChange,
	      onKeyDown: this._handleKeyDown,
	      value: tag
	    }));

	    return _react2.default.createElement(
	      'div',
	      _extends({}, props, {
	        ref: 'div',
	        className: (0, _classnames2.default)(className, 'TagsInput'),
	        onClick: this._handleClick
	      }),
	      renderLayout(tagComponents, inputComponent)
	    );
	  },
	  blur: function blur() {
	    this.refs.input.blur();
	  },
	  focus: function focus() {
	    this.refs.input.focus();
	  },
	  select: function select() {
	    this.refs.input.select();
	  },
	  _addTag: function _addTag(tag) {
	    if (tag !== '') {
	      var _props2 = this.props;
	      var allowDuplicates = _props2.allowDuplicates;
	      var onChange = _props2.onChange;
	      var value = _props2.value;


	      if (!allowDuplicates && value.length && value.indexOf(tag) != -1) {
	        return;
	      }

	      onChange(value.concat([tag]));
	      this._clearInput();
	    }
	  },
	  _clearInput: function _clearInput() {
	    this.setState({ tag: '' });
	  },
	  _handleOnBlur: function _handleOnBlur(event) {
	    var _props3 = this.props;
	    var addOnBlur = _props3.addOnBlur;
	    var _props3$inputProps = _props3.inputProps;
	    var inputProps = _props3$inputProps === undefined ? {} : _props3$inputProps;


	    if (addOnBlur) {
	      this._addTag(event.target.value);
	    }

	    if (inputProps.onBlur) {
	      inputProps.onBlur(event);
	    }
	  },
	  _handleChange: function _handleChange(event) {
	    var tag = event.target.value;
	    var _props$inputProps2 = this.props.inputProps;
	    var inputProps = _props$inputProps2 === undefined ? {} : _props$inputProps2;


	    if (inputProps.onChange) {
	      inputProps.onChange(event);
	    }

	    this.setState({ tag: tag });
	  },
	  _handleClick: function _handleClick(event) {
	    if (event.target === this.refs.div) {
	      this.focus();
	    }
	  },
	  _handleKeyDown: function _handleKeyDown(event) {
	    var _props4 = this.props;
	    var addKeys = _props4.addKeys;
	    var _props4$inputProps = _props4.inputProps;
	    var inputProps = _props4$inputProps === undefined ? {} : _props4$inputProps;
	    var removeKeys = _props4.removeKeys;
	    var value = _props4.value;
	    var tag = this.state.tag;

	    var add = addKeys.indexOf(event.keyCode) !== -1;

	    if (add) {
	      event.preventDefault();
	      this._addTag(tag);
	      return;
	    }

	    var empty = tag === '';
	    var remove = removeKeys.indexOf(event.keyCode) !== -1;

	    if (remove && value.length > 0 && empty) {
	      event.preventDefault();
	      this._removeTag(value.length - 1);
	    }

	    if (inputProps.onKeyDown) {
	      inputProps.onKeyDown(event);
	    }
	  },
	  _handleRemove: function _handleRemove(tag) {
	    this._removeTag(tag);
	  },
	  _removeTag: function _removeTag(index) {
	    var props = this.props;
	    var value = props.value.concat([]);

	    if (index > -1 && index < value.length) {
	      value.splice(index, 1);

	      props.onChange(value);
	    }
	  }
	});

	function defaultRenderTag(props) {
	  var key = props.key;
	  var onRemove = props.onRemove;
	  var classNameRemove = props.classNameRemove;
	  var style = props.style;
	  var tag = props.tag;

	  var other = _objectWithoutProperties(props, ['key', 'onRemove', 'classNameRemove', 'style', 'tag']);

	  return _react2.default.createElement(
	    'span',
	    _extends({}, other, { key: key, style: style }),
	    tag,
	    _react2.default.createElement('span', {
	      className: (0, _classnames2.default)(classNameRemove, 'TagsInput-remove'),
	      onClick: function onClick() {
	        return onRemove(key);
	      }
	    })
	  );
	}

	function defaultRenderInput(props) {
	  return _react2.default.createElement('input', _extends({}, props, { type: 'text' }));
	}

	function defaultRenderLayout(tagComponents, inputComponent) {
	  return _react2.default.createElement(
	    'span',
	    null,
	    tagComponents,
	    inputComponent
	  );
	}

	exports.default = TagsInput;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;