import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useChat } from './useChat';

// Mocking localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    clear: () => { store = {}; }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mocking GoogleGenerativeAI
vi.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: vi.fn().mockImplementation(function (this: any) {
      this.getGenerativeModel = vi.fn().mockReturnValue({
        startChat: vi.fn().mockReturnValue({
          sendMessage: vi.fn().mockResolvedValue({
            response: {
              text: () => 'Mocked AI Response'
            }
          })
        })
      });
      return this;
    })
  };
});

describe('useChat', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  it('initializes with empty histories', () => {
    const { result } = renderHook(() => useChat());
    expect(result.current.histories).toEqual({});
  });

  it('sets error if API key is missing', async () => {
    const { result } = renderHook(() => useChat());
    await act(async () => {
      await result.current.sendMessage('ECI', 'Hello', 'Prompt');
    });
    expect(result.current.error).toBe('Please provide a Gemini API key in settings.');
  });

  it('sends message and updates history when API key exists', async () => {
    window.localStorage.setItem('matdan_api_key', 'valid-key');
    const { result } = renderHook(() => useChat());
    
    await act(async () => {
      await result.current.sendMessage('ECI', 'Hello', 'Prompt');
    });

    expect(result.current.error).toBeNull();
    expect(result.current.histories['ECI']).toHaveLength(2);
    expect(result.current.histories['ECI'][0].role).toBe('user');
    expect(result.current.histories['ECI'][1].role).toBe('model');
    expect(result.current.histories['ECI'][1].parts[0].text).toBe('Mocked AI Response');
  });

  it('clears history correctly', async () => {
    window.localStorage.setItem('matdan_api_key', 'valid-key');
    const { result } = renderHook(() => useChat());
    
    await act(async () => {
      await result.current.sendMessage('ECI', 'Hello', 'Prompt');
    });
    expect(result.current.histories['ECI']).toHaveLength(2);

    act(() => {
      result.current.clearHistory('ECI');
    });
    expect(result.current.histories['ECI']).toHaveLength(0);
  });
});
