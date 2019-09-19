var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
export function appendChildren(element) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    children.forEach(function (child) {
        element.appendChild(typeof child == 'string' ? document.createTextNode(child) : child instanceof HTMLElement ? child : child.element);
    });
}
export function createElement(type, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var element;
    if (typeof type == 'string') {
        element = document.createElement(type);
        for (var name_1 in props) {
            var value = props[name_1];
            if (typeof value == 'string') {
                element.setAttribute(name_1, value);
            }
            else {
                element[name_1] = value;
            }
        }
        appendChildren.apply(void 0, __spreadArrays([element], children));
    }
    else {
        element = new type(null, props);
        appendChildren.apply(void 0, __spreadArrays([element.element], children));
    }
    return element;
}
var VirtualElement = /** @class */ (function () {
    function VirtualElement(element) {
        if (typeof element == 'string') {
            this.element = document.createElement(element);
        }
        else {
            this.element = element;
        }
    }
    return VirtualElement;
}());
export default VirtualElement;
