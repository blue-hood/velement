declare type Child = HTMLElement | VirtualElement | string;
interface Attributes {
    [name: string]: any;
}
export declare function appendChildren(element: HTMLElement, ...children: Child[]): void;
export declare function createElement<TagName extends keyof HTMLElementTagNameMap>(type: TagName, props: Attributes | null, ...children: Child[]): HTMLElementTagNameMap[TagName];
export declare function createElement<HElement extends HTMLElement>(type: string, props: Attributes | null, ...children: Child[]): HElement;
export declare function createElement<VElement extends VirtualElement, Props>(type: {
    new (element: null, props: Props): VElement;
}, props: Props, ...children: Child[]): VElement;
export default class VirtualElement<HElement extends HTMLElement = HTMLElement> {
    element: HElement;
    constructor(element: HElement | keyof HTMLElementTagNameMap);
}
export {};
