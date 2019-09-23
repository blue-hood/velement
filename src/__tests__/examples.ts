import '@testing-library/jest-dom/extend-expect';
import VirtualElement, { appendChildren, createElement } from '..';

class JSDiv extends VirtualElement {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor(element) {
    super(element || 'div');
    this.element.innerHTML = 'VirtualDivElement';
  }
}

class TSDiv extends VirtualElement<HTMLDivElement> {
  public constructor(element: HTMLDivElement | null) {
    super(element || 'div');
    this.element.innerHTML = 'VirtualDivElement';
  }
}

declare module '..' {
  function createElement(type: typeof TSDiv, props: {}, ...children: Child[]): TSDiv;
}

interface TextDivProps {
  text: string;
}

class TextDiv extends VirtualElement<HTMLDivElement> {
  public constructor(element: HTMLDivElement | null, props: TextDivProps) {
    super(element || 'div');

    this.element.innerHTML = props.text;
  }
}

declare module '..' {
  function createElement(type: typeof TextDiv, props: TextDivProps, ...children: Child[]): TextDiv;
}

interface ColorDivProps {
  color: string;
}

class ColorDiv extends VirtualElement<HTMLDivElement> {
  public constructor(element: HTMLDivElement | null, props: ColorDivProps) {
    super(element || 'div');

    this.element.style.color = props.color;
  }
}

declare module '..' {
  function createElement(type: typeof ColorDiv, props: ColorDivProps, ...children: Child[]): ColorDiv;
}

test('usage with JavaScript', async () => {
  const container = document.createElement('div');

  const htmlElement = createElement('div', null);
  htmlElement.innerHTML = `HTMLDivElement`;
  const virtualElement = createElement(JSDiv, {});

  appendChildren(container, 'TextNode', htmlElement, virtualElement);
  expect(container).toMatchSnapshot();
});

test('usage with TypeScript', async () => {
  const container = document.createElement('div');

  const htmlElement = createElement('div', null);
  htmlElement.innerHTML = `HTMLDivElement`;
  const virtualElement = createElement(TSDiv, {});

  appendChildren(container, 'TextNode', htmlElement, virtualElement);
  expect(container).toMatchSnapshot();
});

test('minimum VirtualElement', async () => {
  expect(new TSDiv(null)).toMatchSnapshot();
});

test('VirtualElement with properties', async () => {
  expect(
    new TextDiv(null, {
      text: 'VirtualDivElement. '
    })
  ).toMatchSnapshot();
});

test('render to existing element', async () => {
  const div = document.createElement('div');

  expect(
    new TextDiv(div, {
      text: 'VirtualDivElement. '
    })
  ).toMatchSnapshot();
});

test('example of createElement of HTML element', async () => {
  expect(
    createElement(
      'div',
      {
        style: `
        color: red;
      `
      },
      'HTMLDivElement. '
    )
  ).toMatchSnapshot();
});

test('example of createElement of VirtualElement', async () => {
  expect(
    createElement(
      ColorDiv,
      {
        color: 'red'
      },
      'VirtualDivElement. '
    )
  ).toMatchSnapshot();
});

test('example of appendChildren', async () => {
  const container = document.createElement('div');

  const htmlElement = createElement('div', null);
  htmlElement.innerHTML = `HTMLDivElement`;

  appendChildren(container, createElement(TSDiv, {}), htmlElement, 'TextNode. ');
  expect(container).toMatchSnapshot();
});
