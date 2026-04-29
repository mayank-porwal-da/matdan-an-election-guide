import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ApiKeyModal from './ApiKeyModal';

describe('ApiKeyModal', () => {
  const mockOnClose = vi.fn();
  const mockOnSave = vi.fn();

  it('renders correctly when open', () => {
    render(
      <ApiKeyModal 
        isOpen={true} 
        onClose={mockOnClose} 
        currentKey="" 
        onSave={mockOnSave} 
      />
    );

    expect(screen.getByText('Gemini API Key')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Paste your key here...')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <ApiKeyModal 
        isOpen={false} 
        onClose={mockOnClose} 
        currentKey="" 
        onSave={mockOnSave} 
      />
    );

    expect(screen.queryByText('Gemini API Key')).not.toBeInTheDocument();
  });

  it('calls onSave and onClose when save button is clicked', () => {
    render(
      <ApiKeyModal 
        isOpen={true} 
        onClose={mockOnClose} 
        currentKey="" 
        onSave={mockOnSave} 
      />
    );

    const input = screen.getByPlaceholderText('Paste your key here...');
    fireEvent.change(input, { target: { value: 'test-key' } });

    const saveButton = screen.getByText('SAVE & ACTIVATE AI');
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledWith('test-key');
    expect(mockOnClose).toHaveBeenCalled();
  });
});
