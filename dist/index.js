export function appendChildren(element, ...children) {
    children.forEach(child => {
        element.appendChild(typeof child == 'string' ? document.createTextNode(child) : child instanceof HTMLElement ? child : child.element);
    });
}
export function createElement(type, props, ...children) {
    let element;
    if (typeof type == 'string') {
        element = document.createElement(type);
        for (const name in props) {
            const value = props[name];
            if (typeof value == 'string') {
                element.setAttribute(name, value);
            }
            else {
                element[name] = value;
            }
        }
        appendChildren(element, ...children);
    }
    else {
        element = new type(null, props);
        appendChildren(element.element, ...children);
    }
    return element;
}
export default class VirtualElement {
    constructor(element) {
        if (typeof element == 'string') {
            this.element = document.createElement(element);
        }
        else {
            this.element = element;
        }
    }
}
