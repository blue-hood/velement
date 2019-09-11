import { getByText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import VirtualElement, { createElement } from '..';

test('should create HTMLElement', async () => {
    const div = createElement<null, HTMLDivElement>('div', null);
    div.innerHTML = `HTMLDivElement`;

    expect(div).toMatchSnapshot();
});

test('should create VirtualElement', async () => {
    class Div extends VirtualElement<HTMLDivElement> {
        public constructor(element: HTMLDivElement | null) {
            super(element || 'div');

            this.element.innerHTML = 'VirtualDivElement';
        }
    }

    const div = createElement<null, Div>(Div, null);

    expect(div.element).toMatchSnapshot();
});
