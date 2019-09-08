'use strict';
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
    return r;
  };
exports.__esModule = true;
function appendChildren(element) {
  var children = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    children[_i - 1] = arguments[_i];
  }
  children.forEach(function(child) {
    element.appendChild(
      typeof child == 'string' ? document.createTextNode(child) : child instanceof HTMLElement ? child : child.element
    );
  });
}
exports.appendChildren = appendChildren;
function createElement(type, attributes) {
  var children = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    children[_i - 2] = arguments[_i];
  }
  var htmlElement = document.createElement(type);
  for (var name_1 in attributes) {
    var value = attributes[name_1];
    if (typeof value == 'string') {
      htmlElement.setAttribute(name_1, value);
    } else {
      htmlElement[name_1] = value;
    }
  }
  appendChildren.apply(void 0, __spreadArrays([htmlElement], children));
  return htmlElement;
}
exports.createElement = createElement;
function createVirtualElement(type, props) {
  var children = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    children[_i - 2] = arguments[_i];
  }
  var virtualElement = new type(null, props);
  appendChildren.apply(void 0, __spreadArrays([virtualElement.element], children));
  return virtualElement;
}
exports.createVirtualElement = createVirtualElement;
var VirtualElement = /** @class */ (function() {
  function VirtualElement(element) {
    if (typeof element === 'string') {
      this.element = document.createElement(element);
    } else {
      this.element = element;
    }
  }
  return VirtualElement;
})();
exports['default'] = VirtualElement;
