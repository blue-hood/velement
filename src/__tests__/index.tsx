import '@testing-library/jest-dom/extend-expect';

import VirtualElement, { appendChildren, createElement } from '..';

interface DivProps {
  style?: string;
}

class Div extends VirtualElement<HTMLDivElement> {
  public constructor(element: HTMLDivElement | null, props: DivProps) {
    super(element || 'div');

    if (props.style) {
      this.element.setAttribute('style', props.style);
    }

    this.element.innerHTML = 'VirtualDivElement';
  }
}

declare module '..' {
  function createElement(type: typeof Div, props: DivProps, ...children: Child[]): Div;
}

test('should append children', async () => {
  const div = document.createElement('div');

  const htmlElement = createElement('div', null);
  htmlElement.innerHTML = `HTMLDivElement`;

  const virtualElement = createElement(Div, {});

  appendChildren(div, 'TextNode', htmlElement, virtualElement);

  expect(div).toMatchSnapshot();
});

test('should create HTMLElement', async () => {
  const div = createElement('div', {
    style: 'font-weight: bold;'
  });
  div.innerHTML = `HTMLDivElement`;

  expect(div).toMatchSnapshot();
});

test('should create VirtualElement', async () => {
  const div = createElement(Div, {
    style: 'font-weight: bold;'
  });

  expect(div.element).toMatchSnapshot();
});

test('should compose HTMLElement', async () => {
  const htmlElement = document.createElement('div');
  const virtualElement = new Div(htmlElement, {});

  expect(virtualElement.element).toMatchSnapshot();
});
