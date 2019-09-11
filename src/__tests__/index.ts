import { getByText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

test('should render HTMLElement', async () => {
    const root = document.createElement('div');
    root.innerHTML = `HTMLDivElement`;

    expect(root).toMatchSnapshot();
});
