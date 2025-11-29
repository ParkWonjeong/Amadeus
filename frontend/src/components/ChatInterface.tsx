import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const ChatInterface = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: '안녕하세요. Amadeus입니다. 무엇을 도와드릴까요?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/chat', { message: userMessage });
            setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "죄송합니다. 현재 신경망 연결에 문제가 발생했습니다." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto">
            <div className="flex-1 overflow-y-auto space-y-6 pr-4 pb-4">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? 'bg-amadeus-accent' : 'bg-purple-600'
                            }`}>
                            {msg.role === 'assistant' ? <Bot size={18} className="text-white" /> : <User size={18} className="text-white" />}
                        </div>

                        <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'assistant'
                            ? 'bg-amadeus-card border border-gray-800 text-gray-100 rounded-tl-none'
                            : 'bg-amadeus-accent text-white rounded-tr-none'
                            }`}>
                            <div className="prose prose-invert prose-sm max-w-none">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-amadeus-accent flex items-center justify-center flex-shrink-0">
                            <Bot size={18} className="text-white" />
                        </div>
                        <div className="bg-amadeus-card border border-gray-800 p-4 rounded-2xl rounded-tl-none">
                            <Loader2 className="animate-spin text-amadeus-accent" size={20} />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="mt-4">
                <form onSubmit={sendMessage} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Amadeus에게 물어보세요..."
                        className="w-full bg-amadeus-card border border-gray-800 text-white rounded-xl pl-6 pr-14 py-4 focus:outline-none focus:border-amadeus-accent focus:ring-1 focus:ring-amadeus-accent transition-all placeholder-gray-600"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-amadeus-accent text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatInterface;
