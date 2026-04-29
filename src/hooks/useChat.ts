import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatMessage, ChatHistories } from '../types';

export function useChat() {
  const [histories, setHistories] = useState<ChatHistories>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getApiKey = () => localStorage.getItem('matdan_api_key');
  const setApiKey = (key: string) => localStorage.setItem('matdan_api_key', key);

  const sendMessage = async (chatKey: string, userText: string, systemPrompt: string) => {
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
        model: "gemini-1.5-flash-latest",
        systemInstruction: systemPrompt
      });

      const currentHistory = histories[chatKey] || [];
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

      setHistories(prev => ({
        ...prev,
        [chatKey]: [...(prev[chatKey] || []), newUserMessage, newAiMessage]
      }));
    } catch (err: any) {
      let friendlyError = err.message || 'Failed to get response from Gemini';
      
      if (err.message?.includes('404') || err.message?.includes('not found')) {
        friendlyError = "Model not found. Try using a different API key or check your AI Studio region settings.";
      } else if (err.message?.includes('401')) {
        friendlyError = "Invalid API Key. Please check your credentials in settings.";
      }

      setError(friendlyError);
      console.error('Chat Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = (chatKey: string) => {
    setHistories(prev => ({
      ...prev,
      [chatKey]: []
    }));
  };

  return { histories, sendMessage, clearHistory, isLoading, error, getApiKey, setApiKey };
}
