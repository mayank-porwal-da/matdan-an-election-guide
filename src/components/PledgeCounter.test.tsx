import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PledgeCounter from './PledgeCounter';
import { onSnapshot, getDoc, updateDoc } from 'firebase/firestore';

// Mock Firestore
vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  doc: vi.fn(),
  onSnapshot: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  increment: vi.fn(n => n),
  serverTimestamp: vi.fn(() => 'mock-timestamp')
}));

vi.mock('../lib/firebase', () => ({
  db: {},
  auth: { currentUser: null }
}));

describe('PledgeCounter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  it('renders initial state correctly', () => {
    (onSnapshot as any).mockImplementation((ref: any, callback: any) => {
      callback({
        exists: () => true,
        data: () => ({ count: 123 })
      });
      return () => {};
    });

    render(<PledgeCounter />);
    expect(screen.getByText(/Join 123 others/)).toBeInTheDocument();
  });

  it('handles pledge click', async () => {
     (onSnapshot as any).mockImplementation((ref: any, callback: any) => {
      callback({
        exists: () => true,
        data: () => ({ count: 123 })
      });
      return () => {};
    });

    (getDoc as any).mockResolvedValue({
      exists: () => true
    });

    render(<PledgeCounter />);
    const button = screen.getByText('I Pledge to Vote');
    fireEvent.click(button);

    await waitFor(() => {
      expect(updateDoc).toHaveBeenCalled();
    });
    
    expect(screen.getByText('Pledged')).toBeInTheDocument();
    expect(window.localStorage.getItem('matdan_pledged')).toBe('true');
  });
});
