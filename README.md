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

## Utility methods

## 結論

velement を使うと、React の素晴らしさを体感することができるでしょう。
