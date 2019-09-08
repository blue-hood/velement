export function appendChildren(element, ...children) {
    children.forEach(child => {
        element.appendChild(
            typeof child == 'string' ? document.createTextNode(child) : child instanceof HTMLElement ? child : child.element
        );
    });
}

export function createElement(type, attributes = undefined, ...children) {
    const htmlElement = document.createElement(type);

    for (const name in attributes) {
        const value = attributes[name];

        if (typeof value == 'string') {
            htmlElement.setAttribute(name, value);
        } else {
            htmlElement[name] = value;
        }
    }

    appendChildren(htmlElement, ...children);
    return htmlElement;
}

export function createVirtualElement(type, props = undefined, ...children) {
    const virtualElement = new type(null, props);

    appendChildren(virtualElement.element, ...children);
    return virtualElement;
}

export default class VirtualElement {
    constructor(element) {
        if (typeof element === 'string') {
            this.element = document.createElement(element);
        } else {
            this.element = element;
        }
    }
}
