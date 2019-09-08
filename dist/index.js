'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.appendChildren = appendChildren;
exports.createElement = createElement;
exports.createVirtualElement = createVirtualElement;
exports['default'] = void 0;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function appendChildren(element) {
  for (var _len = arguments.length, children = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    children[_key - 1] = arguments[_key];
  }

  children.forEach(function(child) {
    element.appendChild(
      typeof child == 'string' ? document.createTextNode(child) : child instanceof HTMLElement ? child : child.element
    );
  });
}

function createElement(type) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var htmlElement = document.createElement(type);

  for (var name in attributes) {
    var value = attributes[name];

    if (typeof value == 'string') {
      htmlElement.setAttribute(name, value);
    } else {
      htmlElement[name] = value;
    }
  }

  for (
    var _len2 = arguments.length, children = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2;
    _key2 < _len2;
    _key2++
  ) {
    children[_key2 - 2] = arguments[_key2];
  }

  appendChildren.apply(void 0, [htmlElement].concat(children));
  return htmlElement;
}

function createVirtualElement(type) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var virtualElement = new type(null, props);

  for (
    var _len3 = arguments.length, children = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2;
    _key3 < _len3;
    _key3++
  ) {
    children[_key3 - 2] = arguments[_key3];
  }

  appendChildren.apply(void 0, [virtualElement.element].concat(children));
  return virtualElement;
}

var VirtualElement = function VirtualElement(element) {
  _classCallCheck(this, VirtualElement);

  if (typeof element === 'string') {
    this.element = document.createElement(element);
  } else {
    this.element = element;
  }
};

exports['default'] = VirtualElement;
