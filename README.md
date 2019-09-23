[![CircleCI](https://circleci.com/gh/blue-hood/velement.svg?style=svg)](https://circleci.com/gh/blue-hood/velement)
[![Maintainability](https://api.codeclimate.com/v1/badges/60e3d09a3df359d52606/maintainability)](https://codeclimate.com/github/blue-hood/velement/maintainability)
[![Release](https://img.shields.io/github/release/blue-hood/velement.svg)](https://github.com/blue-hood/velement/releases/latest)

# velement

A minimal DOM renderer for legacy browsers

## Usage

With JavaScript:

```js
import VirtualElement, { appendChildren, createElement } from 'velement';

class JSDiv extends VirtualElement {
  constructor(element) {
    super(element || 'div');
    this.element.innerHTML = 'VirtualDivElement';
  }
}

const container = document.createElement('div');

const htmlElement = createElement('div', null);
htmlElement.innerHTML = `HTMLDivElement`;
const virtualElement = createElement(JSDiv, {});

appendChildren(container, 'TextNode', htmlElement, virtualElement);
```

Then with TypeScript:

```ts
import VirtualElement, { appendChildren, createElement } from 'velement';

class TSDiv extends VirtualElement<HTMLDivElement> {
  public constructor(element: HTMLDivElement | null) {
    super(element || 'div');
    this.element.innerHTML = 'VirtualDivElement';
  }
}

declare module 'velement' {
  function createElement(type: typeof TSDiv, props: {}, ...children: Child[]): TSDiv;
}

const container = document.createElement('div');

const htmlElement = createElement('div', null);
htmlElement.innerHTML = `HTMLDivElement`;
const virtualElement = createElement(TSDiv, {});

appendChildren(container, 'TextNode', htmlElement, virtualElement);
```

Container element will be rendered like:

```
<div>
  TextNode
  <div>
    HTMLDivElement
  </div>
  <div>
    VirtualDivElement
  </div>
</div>
```

## Install

Just run `npm install velement` or `yarn add velement`.

## Source

[src/index.ts](https://github.com/blue-hood/velement/blob/master/src/index.ts)

The transpiled code for ES3 target ES2015 Modules is located at [dist/](https://github.com/blue-hood/velement/tree/master/dist).

## VirtualElement class

VirtualElements are wrapper elements of HTML elements.
Typically, a minimum VirtualElement with HTMLDivElement is defined as:

```ts
import VirtualElement from 'velement';

class TSDiv extends VirtualElement<HTMLDivElement> {
  public constructor(element: HTMLDivElement | null) {
    super(element || 'div');
    this.element.innerHTML = 'VirtualDivElement';
  }
}

new TSDiv(null);
```

Then, the constructor can have properties.
The inner HTML element can be accessed through `this.element`.

```ts
import VirtualElement from 'velement';

interface TextDivProps {
  text: string;
}

class TextDiv extends VirtualElement<HTMLDivElement> {
  public constructor(element: HTMLDivElement | null, props: TextDivProps) {
    super(element || 'div');

    this.element.innerHTML = props.text;
  }
}

new TextDiv(null, {
  text: 'VirtualDivElement. '
});
```

VirtualElement also can be rendered to existing element.

```ts
const div = document.createElement('div');
new TextDiv(div, {
  text: 'VirtualDivElement. '
});
```

## Utility methods

### createElement

```ts
interface Attributes {
  [name: string]: any;
}
type Child = HTMLElement | VirtualElement | string;

export function createElement<HElement extends HTMLElement>(
  type: keyof HTMLElementTagNameMap,
  props: Attributes | null,
  ...children: Child[]
): HElement;

export function createElement<VElement extends VirtualElement, Props>(
  type: { new (element: null, props: Props): VElement },
  props: Props,
  ...children: Child[]
): VElement;
```

Create HTML element or VirtualElement with properties.
And render children to the inner element, this is equal to `appendChildren` function.

ex. HTMLDivElement

```ts
import { createElement } from 'velement';

createElement(
  'div',
  {
    style: `
    color: red;
  `
  },
  'HTMLDivElement. '
);
```

ex. VirtualElement

```ts
import VirtualElement, { createElement } from 'velement';

interface ColorDivProps {
  color: string;
}

class ColorDiv extends VirtualElement<HTMLDivElement> {
  public constructor(element: HTMLDivElement | null, props: ColorDivProps) {
    super(element || 'div');

    this.element.style.color = props.color;
  }
}

declare module 'velement' {
  function createElement(type: typeof ColorDiv, props: ColorDivProps, ...children: Child[]): ColorDiv;
}

createElement(
  ColorDiv,
  {
    color: 'red'
  },
  'VirtualDivElement. '
);
```

### appendChildren

```ts
type Child = HTMLElement | VirtualElement | string;

function appendChildren(element: HTMLElement, ...children: Child[]): void;
```

Append children - HTML element, VirtualElement, text - to HTML element.

ex.

```ts
import VirtualElement, { appendChildren, createElement } from 'velement';

class TSDiv extends VirtualElement<HTMLDivElement> {
  public constructor(element: HTMLDivElement | null) {
    super(element || 'div');
    this.element.innerHTML = 'VirtualDivElement';
  }
}

declare module 'velement' {
  function createElement(type: typeof TSDiv, props: {}, ...children: Child[]): TSDiv;
}

const container = document.createElement('div');

const htmlElement = createElement('div', null);
htmlElement.innerHTML = `HTMLDivElement`;

appendChildren(container, createElement(TSDiv, {}), htmlElement, 'TextNode. ');
```
