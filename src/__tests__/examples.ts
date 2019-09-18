import '@testing-library/jest-dom/extend-expect';
import VirtualElement, { appendChildren, createElement } from '..';

interface DivProps {
  text: string;
}

class PropsDiv extends VirtualElement<HTMLDivElement> {
  public constructor(element: HTMLDivElement | null, props: DivProps) {
    super(element || 'div');

    this.element.innerHTML = props.text;
  }
}

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

test('Minimum VirtualElement', async () => {
  class Div extends VirtualElement<HTMLDivElement> {
    public constructor(element: HTMLDivElement | null) {
      super(element || 'div');
    }
  }

  expect(new Div(null)).toMatchSnapshot();
});

test('VirtualElement with properties', async () => {
  expect(
    new PropsDiv(null, {
      text: 'VirtualDivElement. '
    })
  ).toMatchSnapshot();
});

test('Render to existing element', async () => {
  const div = document.createElement('div');

  expect(
    new PropsDiv(div, {
      text: 'VirtualDivElement. '
    })
  ).toMatchSnapshot();
});
