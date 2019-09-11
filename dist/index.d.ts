declare type Child = HTMLElement | VirtualElement | string;
export declare function appendChildren(element: HTMLElement, ...children: Child[]): void;
export declare function createElement<HElement extends HTMLElement>(
  type: keyof HTMLElementTagNameMap,
  attributes: {
    [name: string]: any;
  } | null,
  ...children: Child[]
): HElement;
export declare function createVirtualElement<Props, VElement extends VirtualElement>(
  type: {
    new (element: null, props: Props): VElement;
  },
  props: Props,
  ...children: Child[]
): VElement;
export default class VirtualElement<HElement extends HTMLElement = HTMLElement> {
  element: HElement;
  constructor(element: HElement | keyof HTMLElementTagNameMap);
}
export {};
