type Child = HTMLElement | VirtualElement | string;

export function appendChildren(element: HTMLElement, ...children: Child[]): void {
    children.forEach(child => {
        element.appendChild(
            typeof child == 'string' ? document.createTextNode(child) : child instanceof HTMLElement ? child : child.element
        );
    });
}

export function createElement<HElement extends HTMLElement>(
    type: keyof HTMLElementTagNameMap,
    attributes: { [name: string]: any } | null,
    ...children: Child[]
): HElement {
    const htmlElement = document.createElement(type) as HElement;

    for (const name in attributes) {
        const value = attributes[name];

        if (typeof value == 'string') {
            htmlElement.setAttribute(name, value);
        } else {
            (htmlElement as any)[name] = value;
        }
    }

    appendChildren(htmlElement, ...children);
    return htmlElement;
}

export function createVirtualElement<VElement extends VirtualElement, Props = null>(
    type: { new (element: null, props: Props): VElement },
    props: Props,
    ...children: Child[]
): VElement {
    const virtualElement = new type(null, props);

    appendChildren(virtualElement.element, ...children);
    return virtualElement;
}

export default class VirtualElement<HElement extends HTMLElement = HTMLElement> {
    public element: HElement;
    public constructor(element: HElement | keyof HTMLElementTagNameMap) {
        if (typeof element === 'string') {
            this.element = document.createElement(element) as HElement;
        } else {
            this.element = element;
        }
    }
}
