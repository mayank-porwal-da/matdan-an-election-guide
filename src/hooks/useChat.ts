import { useState } from 'react';
import { GoogleGenerativeAI, Content } from '@google/generative-ai';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export function useChat() {
  const [histories, setHistories] = useState<ChatMessage[][]>(Array(7).fill([]));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getApiKey = () => localStorage.getItem('matdan_api_key');
  const setApiKey = (key: string) => localStorage.setItem('matdan_api_key', key);

  const sendMessage = async (stageIndex: number, userText: string, systemPrompt: string) => {
    const apiKey = getApiKey();
    if (!apiKey) {
      setError('Please provide a Gemini API key in settings.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: systemPrompt
      });

      const currentHistory = histories[stageIndex];
      const chat = model.startChat({
        history: currentHistory.map(msg => ({
          role: msg.role,
          parts: msg.parts
        }))
      });

      const result = await chat.sendMessage(userText);
      const response = await result.response;
      const aiText = response.text();

      const newUserMessage: ChatMessage = { role: 'user', parts: [{ text: userText }] };
      const newAiMessage: ChatMessage = { role: 'model', parts: [{ text: aiText }] };

      setHistories(prev => {
        const next = [...prev];
        next[stageIndex] = [...next[stageIndex], newUserMessage, newAiMessage];
        return next;
      });
    } catch (err: any) {
      let friendlyError = err.message || 'Failed to get response from Gemini';
      
      if (err.message?.includes('404') || err.message?.includes('not found')) {
        friendlyError = "Model not found. This is often a region-based restriction for 'gemini-1.5-flash'. Try using a different API key or check your AI Studio region settings.";
      } else if (err.message?.includes('401')) {
        friendlyError = "Invalid API Key. Please check your credentials in settings.";
      }

      setError(friendlyError);
      console.error('Chat Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = (stageIndex: number) => {
    setHistories(prev => {
      const next = [...prev];
      next[stageIndex] = [];
      return next;
    });
  };

  return { histories, sendMessage, clearHistory, isLoading, error, getApiKey, setApiKey };
}
