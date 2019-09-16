import '@testing-library/jest-dom/extend-expect';
import VirtualElement, { appendChildren, createElement } from '..';

test('Usage with JavaScript', async () => {
  class Div extends VirtualElement {
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
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
  expect(container).toMatchSnapshot();
});

test('Usage with TypeScript', async () => {
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
  expect(container).toMatchSnapshot();
});
