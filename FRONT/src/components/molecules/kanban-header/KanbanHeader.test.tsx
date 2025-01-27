import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import KanbanHeader from './KanbanHeader';
import { KanbanColumnEnum } from '../../../types/enums/kanban-columns.enum';

describe('KanbanHeader', () => {
    const mockOnButtonClick = vi.fn();
    const props = {
        titulo: 'To Do',
        lista: KanbanColumnEnum.Todo,
        onButtonClick: mockOnButtonClick,
    };

    beforeEach(() => {
        render(<KanbanHeader {...props} />);
    });

    it('should render the heading with the correct title', () => {
        const headingElement = screen.getByText(props.titulo);
        expect(headingElement).toBeInTheDocument();
    });

    it('should render the add button icon', () => {
        const addButton = screen.getByTestId('btnAdd');
        expect(addButton).toBeInTheDocument();
    });

    it('should call onButtonClick with the correct column when the add button is clicked', () => {
        const addButton = screen.getByTestId('btnAdd');
        fireEvent.click(addButton);
        expect(mockOnButtonClick).toHaveBeenCalledWith(props.lista);
    });
});