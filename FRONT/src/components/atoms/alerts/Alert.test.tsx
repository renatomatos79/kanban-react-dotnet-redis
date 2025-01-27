import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Alert from './Alert';

describe('Alert', () => {
    it('should render the alert with the correct message and status', () => {
        render(<Alert message="Success message" status="success" />);
        expect(screen.getByText('Success message')).toBeInTheDocument();
        expect(screen.getByText('×')).toBeInTheDocument();
    });

    it('should render the alert with error status', () => {
        render(<Alert message="Error message" status="error" />);
        expect(screen.getByText('Error message')).toBeInTheDocument();
        expect(screen.getByText('×')).toBeInTheDocument();
    });

    it('should not render the alert when message is null', () => {
        render(<Alert message={null} status="success" />);
        expect(screen.queryByText('×')).not.toBeInTheDocument();
    });

    it('should hide the alert when close button is clicked', () => {
        render(<Alert message="Close me" status="success" />);
        fireEvent.click(screen.getByText('×'));
        expect(screen.queryByText('Close me')).not.toBeInTheDocument();
    });
});