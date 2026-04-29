import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LandingPage from './LandingPage';

describe('LandingPage', () => {
  it('renders correctly', () => {
    render(<LandingPage onStart={() => {}} onStartParliament={() => {}} />);
    expect(screen.getByText('मतदान')).toBeInTheDocument();
    expect(screen.getByText('Matdan — How India Votes')).toBeInTheDocument();
  });

  it('calls onStart when button is clicked', () => {
    const mockOnStart = vi.fn();
    render(<LandingPage onStart={mockOnStart} onStartParliament={() => {}} />);
    fireEvent.click(screen.getByText('Begin the journey'));
    expect(mockOnStart).toHaveBeenCalled();
  });

  it('shows resume text when hasProgress is true', () => {
    render(<LandingPage onStart={() => {}} onStartParliament={() => {}} hasProgress={true} />);
    expect(screen.getByText('Resume Journey')).toBeInTheDocument();
  });
});
