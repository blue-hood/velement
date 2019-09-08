export function appendChildren(element: HTMLElement, ...children: (HTMLElement | VirtualElement)[]): void;

export function createElement<HElement extends HTMLElement>(
    type: keyof HTMLElementTagNameMap,
    attributes?: { [name: string]: any } | null,
    ...children: (HTMLElement | VirtualElement)[]
): HElement;

export function createVirtualElement<VElement extends VirtualElement, Props = null>(
    type: { new (element: null, props: Props): VElement },
    props?: Props,
    ...children: (HTMLElement | VirtualElement)[]
): VElement;

export default class VirtualElement<HElement extends HTMLElement = HTMLElement> {
    public element: HElement;
    public constructor(element: HElement | keyof HTMLElementTagNameMap);
}
