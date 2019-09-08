type Child = HTMLElement | VirtualElement | string;

export function appendChildren(element: HTMLElement, ...children: Child[]): void;

export function createElement<HElement extends HTMLElement>(
    type: keyof HTMLElementTagNameMap,
    attributes?: { [name: string]: any } | null,
    ...children: Child[]
): HElement;

export function createVirtualElement<VElement extends VirtualElement, Props = null>(
    type: { new (element: null, props: Props): VElement },
    props?: Props,
    ...children: Child[]
): VElement;

export default class VirtualElement<HElement extends HTMLElement = HTMLElement> {
    public element: HElement;
    public constructor(element: HElement | keyof HTMLElementTagNameMap);
}
