declare type Child = HTMLElement | VirtualElement | string;
interface Attributes {
  [name: string]: any;
}
export declare function appendChildren(element: HTMLElement, ...children: Child[]): void;
export declare function createElement<Props, Element extends HTMLElement | VirtualElement>(
  type:
    | keyof HTMLElementTagNameMap
    | {
        new (element: null, props: Props): VirtualElement;
      },
  props: Attributes | Props,
  ...children: Child[]
): Element;
export default class VirtualElement<HElement extends HTMLElement = HTMLElement> {
  element: HElement;
  constructor(element: HElement | keyof HTMLElementTagNameMap);
}
export {};
