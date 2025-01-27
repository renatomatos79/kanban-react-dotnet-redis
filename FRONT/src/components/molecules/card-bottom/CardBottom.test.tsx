import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CardBottom from './CardBottom';
import { TaskInterface } from '../../../types/interfaces/task.interface';
import { KanbanColumnEnum } from '../../../types/enums/kanban-columns.enum';

describe('CardBottom Component', () => {
    const mockTask: TaskInterface = {
        id: '1',
        titulo: 'Test Task',
        conteudo: 'Test Description',
        lista: KanbanColumnEnum.Doing,
    };

    const mockOnButtonClick = vi.fn();

    beforeEach(() => {
        mockOnButtonClick.mockReset()
    })

    it('should render navigation buttons when not editing', () => {
        const { getByTestId } = render(
            <CardBottom task={mockTask} isEditing={false} onButtonClick={mockOnButtonClick} />
        );

        expect(getByTestId('btnMoveLeft')).toBeInTheDocument();
        expect(getByTestId('btnDelete')).toBeInTheDocument();
        expect(getByTestId('btnMoveRight')).toBeInTheDocument();
    });

    it('should render edit buttons when editing', () => {
        const { getByTestId } = render(
            <CardBottom task={mockTask} isEditing={true} onButtonClick={mockOnButtonClick} />
        );

        expect(getByTestId('btnCancel')).toBeInTheDocument();
        expect(getByTestId('btnSave')).toBeInTheDocument();
    });

    it('should call onButtonClick with "left" when left button is clicked', () => {
        const { getByTestId } = render(
            <CardBottom task={mockTask} isEditing={false} onButtonClick={mockOnButtonClick} />
        );

        fireEvent.click(getByTestId('btnMoveLeft'));
        expect(mockOnButtonClick).toHaveBeenCalledWith(mockTask, 'left');
    });

    it('should call onButtonClick with "right" when right button is clicked', () => {
        const { getByTestId } = render(
            <CardBottom task={{ ...mockTask, lista: KanbanColumnEnum.Doing }} isEditing={false} onButtonClick={mockOnButtonClick} />
        );

        fireEvent.click(getByTestId('btnMoveRight'));
        expect(mockOnButtonClick).toHaveBeenCalledWith(mockTask, 'right');
    });

    it('should call onButtonClick with "delete" when delete button is clicked', () => {
        const { getByTestId } = render(
            <CardBottom task={mockTask} isEditing={false} onButtonClick={mockOnButtonClick} />
        );

        fireEvent.click(getByTestId('btnDelete'));
        expect(mockOnButtonClick).toHaveBeenCalledWith(mockTask, 'delete');
    });

    it('should call onButtonClick with "cancel" when cancel button is clicked', () => {
        const { getByTestId } = render(
            <CardBottom task={mockTask} isEditing={true} onButtonClick={mockOnButtonClick} />
        );

        fireEvent.click(getByTestId('btnCancel'));
        expect(mockOnButtonClick).toHaveBeenCalledWith(mockTask, 'cancel');
    });

    it('should call onButtonClick with "save" when save button is clicked', () => {
        const { getByTestId } = render(
            <CardBottom task={mockTask} isEditing={true} onButtonClick={mockOnButtonClick} />
        );

        fireEvent.click(getByTestId('btnSave'));
        expect(mockOnButtonClick).toHaveBeenCalledWith(mockTask, 'save');
    });
});