[![CircleCI](https://circleci.com/gh/blue-hood/velement.svg?style=svg)](https://circleci.com/gh/blue-hood/velement)
[![Maintainability](https://api.codeclimate.com/v1/badges/60e3d09a3df359d52606/maintainability)](https://codeclimate.com/github/blue-hood/velement/maintainability)
[![Release](https://img.shields.io/github/release/blue-hood/velement.svg)](https://github.com/blue-hood/velement/releases/latest)

# velement

A minimal DOM renderer.

## Usage

With JavaScript:

```JavaScript
import VirtualElement, {appendChildren, createElement} from 'velement';

class Div extends VirtualElement {
  constructor(element) {
    super(element || 'div');
    this.element.innerHTML = 'VirtualDivElement';
  }
}

const container = document.createElement('div');

const htmlElement = createElement('div', null);
htmlElement.innerHTML = `HTMLDivElement`;
const virtualElement = createElement(Div, {});

appendChildren(container, 'TextNode', htmlElement, virtualElement);
```

Then with TypeScript:

```TypeScript
import VirtualElement, {appendChildren, createElement} from 'velement';

class Div extends VirtualElement<HTMLDivElement> {
  public constructor(element: HTMLDivElement | null) {
    super(element || 'div');
    this.element.innerHTML = 'VirtualDivElement';
  }
}

const container = document.createElement('div');

const htmlElement = createElement<HTMLDivElement>('div', null);
htmlElement.innerHTML = `HTMLDivElement`;
const virtualElement = createElement<Div, {}>(Div, {});

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

## VirtualElement class

VirtualElements are wrapper elements of HTML elements.
Typically, a minimum VirtualElement with HTMLDivElement is defined as:

```TypeScript
import VirtualElement from 'velement';

class Div extends VirtualElement<HTMLDivElement> {
  public constructor(element: HTMLDivElement | null) {
    super(element || 'div');
  }
}

new Div(null);
```

Then, the constructor can have properties.
The inner HTML element can be accessed through `this.element`.

```TypeScript
import VirtualElement from 'velement';

interface DivProps {
  text: string;
}

class Div extends VirtualElement<HTMLDivElement> {
  public constructor(element: HTMLDivElement | null, props: DivProps) {
    super(element || 'div');

    this.element.innerHTML = props.text;
  }
}

new Div(null, {
  text: 'VirtualDivElement. '
});
```

VirtualElement also can be rendered to existing element.

```TypeScript
const div = document.createElement('div');
new Div(div, {
    text: 'VirtualDivElement. '
});
```

## Utility methods

### createElement

```TypeScript
interface Attributes {
  [name: string]: any;
}
type Child = HTMLElement | VirtualElement | string;

export function createElement<HElement extends HTMLElement>
  (type: keyof HTMLElementTagNameMap, props: Attributes | null, ...children: Child[]): HElement;

export function createElement<VElement extends VirtualElement, Props>
  (type: { new (element: null, props: Props): VElement }, props: Props, ...children: Child[]): VElement;
```

Create HTML element or VirtualElement with properties.
And render children to the inner element, this is equal to `appendChildren` function.

ex. HTMLDivElement

```TypeScript
import {createElement} from 'velement';

createElement<HTMLDivElement>('div', {
  style: `
    color: red;
  `
}, 'HTMLDivElement. ');
```

ex. VirtualElement

```TypeScript
import VirtualElement, {createElement} from 'velement';

interface DivProps {
  color: string
}

class Div extends VirtualElement<HTMLDivElement> {
  public constructor(element: HTMLDivElement | null, props: DivProps) {
    super(element || 'div');

    this.element.style.color = props.color;
  }
}

createElement<Div, DivProps>(Div, {
  color: 'red'
}, 'VirtualDivElement. ');
```

### appendChildren

```TypeScript
type Child = HTMLElement | VirtualElement | string;

function appendChildren(element: HTMLElement, ...children: Child[]): void;
```

Append children - HTML element, VirtualElement, text - to HTML element.

ex.

```TypeScript
import VirtualElement, {appendChildren, createElement} from 'velement';

class Div extends VirtualElement<HTMLDivElement> {
  public constructor(element: HTMLDivElement | null) {
    super(element || 'div');
  }
}

const container = document.createElement('div');
appendChildren(container, createElement<Div, {}>(Div, {}), createElement<HTMLDivElement>('div', null), 'TextNode. ');
```

## 総括

velement を使うと、React がいかに洗練されているかを体感することができるでしょう。
