import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ElectionDates from './ElectionDates';

describe('ElectionDates', () => {
  it('renders picker view initially', () => {
    render(<ElectionDates />);
    expect(screen.getByText('🏛️ Lok Sabha')).toBeInTheDocument();
    expect(screen.getByText('🗳️ Vidhan Sabha')).toBeInTheDocument();
  });

  it('navigates to Lok Sabha view', async () => {
    render(<ElectionDates />);
    fireEvent.click(screen.getByText('🏛️ Lok Sabha'));
    expect(await screen.findByText('Lok Sabha General Election 2029')).toBeInTheDocument();
  });

  it('navigates to Vidhan Sabha state list', async () => {
    render(<ElectionDates />);
    fireEvent.click(screen.getByText('🗳️ Vidhan Sabha'));
    expect(await screen.findByPlaceholderText('Search State...')).toBeInTheDocument();
  });

  it('filters states by search', async () => {
    render(<ElectionDates />);
    fireEvent.click(screen.getByText('🗳️ Vidhan Sabha'));
    
    const searchInput = await screen.findByPlaceholderText('Search State...');
    fireEvent.change(searchInput, { target: { value: 'West Bengal' } });
    
    expect(await screen.findByText('West Bengal')).toBeInTheDocument();
    expect(screen.queryByText('Tamil Nadu')).not.toBeInTheDocument();
  });
});
