import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Heading from './Heading';

describe('Heading', () => {
    it('renders the correct heading level', () => {
        const { container } = render(<Heading tamanho={1} titulo="Test Title" />);
        const heading = container.querySelector('h1');
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('Test Title');
    });

    it('renders different heading levels', () => {
        const { container: container1 } = render(<Heading tamanho={3} titulo="Heading 3" />);
        const heading3 = container1.querySelector('h3');
        expect(heading3).toBeInTheDocument();
        expect(heading3).toHaveTextContent('Heading 3');

        const { container: container2 } = render(<Heading tamanho={4} titulo="Heading 4" />);
        const heading4 = container2.querySelector('h4');
        expect(heading4).toBeInTheDocument();
        expect(heading4).toHaveTextContent('Heading 4');
    });
});