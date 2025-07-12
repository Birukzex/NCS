
import React, { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import { generateChatResponseStream } from '../services/geminiService';
import { Message } from '../types';
import { Icon } from './Icon';

const GeminiChat: React.FC = () => {
  const { chat } = useContext(AppContext)!;
  const [messages, setMessages] = useState<Message[]>([{ role: 'model', text: 'Hello! How can I help you with neurophysiology today?' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError(null);
    
    try {
        if (!chat) {
            throw new Error("Chat not initialized.");
        }
      
        setMessages(prev => [...prev, {role: 'model', text: ''}]);

        const stream = await generateChatResponseStream(chat, input);

        for await (const chunk of stream) {
            const chunkText = chunk.text;
            setMessages(prev => {
                const lastMessage = prev[prev.length - 1];
                if (lastMessage.role === 'model') {
                    return [...prev.slice(0, -1), { ...lastMessage, text: lastMessage.text + chunkText }];
                }
                return prev;
            });
        }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMsg);
      setMessages(prev => [...prev, {role: 'model', text: `Sorry, I encountered an error: ${errorMsg}`}])
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md max-w-4xl mx-auto flex flex-col h-[calc(100vh-12rem)]">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white p-4 border-b border-gray-200 dark:border-gray-600">Gemini Live Chat</h2>
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
             {msg.role === 'model' && <Icon name="bot" className="w-6 h-6 text-blue-500 flex-shrink-0" />}
            <div className={`rounded-lg px-4 py-2 max-w-lg ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
             {msg.role === 'user' && <Icon name="user" className="w-6 h-6 text-gray-500 flex-shrink-0" />}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {error && <p className="text-red-500 text-sm px-4 pb-2">Error: {error}</p>}
      <div className="p-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about NCS findings, differential diagnosis, etc."
            className="flex-grow rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-800"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
                <Icon name="send" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiChat;
