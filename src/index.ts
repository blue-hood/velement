type Child = HTMLElement | VirtualElement | string;
interface Attributes {
  [name: string]: any;
}

export function appendChildren(element: HTMLElement, ...children: Child[]): void {
  children.forEach(child => {
    element.appendChild(
      typeof child == 'string' ? document.createTextNode(child) : child instanceof HTMLElement ? child : child.element
    );
  });
}

export function createElement<Props, Element extends HTMLElement | VirtualElement>(
  type: keyof HTMLElementTagNameMap | { new (element: null, props: Props): VirtualElement },
  props: Attributes | Props,
  ...children: Child[]
): Element {
  let element;

  if (typeof type == 'string') {
    element = document.createElement(type);

    for (const name in props as Attributes) {
      const value = (props as Attributes)[name];

      if (typeof value == 'string') {
        element.setAttribute(name, value);
      } else {
        (element as any)[name] = value;
      }
    }

    appendChildren(element, ...children);
  } else {
    element = new type(null, props as Props);
    appendChildren(element.element, ...children);
  }

  return element as Element;
}

export default class VirtualElement<HElement extends HTMLElement = HTMLElement> {
  public element: HElement;
  public constructor(element: HElement | keyof HTMLElementTagNameMap) {
    if (typeof element == 'string') {
      this.element = document.createElement(element) as HElement;
    } else {
      this.element = element;
    }
  }
}
