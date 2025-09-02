'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MessageBubble } from '@/components/MessageBubble';
import { PenguinAvatar } from '@/components/PenguinAvatar';
import { TypingIndicator } from '@/components/TypingIndicator';
import Link from 'next/link';

const penguinNoises = [
  'burh',
  'brrr',
  'burrrh',
  'bruhhh',
  'burrrrrrrrh',
  'brrrh zzz',
  'BURHHH!!!',
  'burh burh',
  'brrrrrrr',
  'burh? 🤔',
  'BURRRRH! 😤',
  'brr... burh',
  'burhhhhhhh',
  'bray',
  'awk-awk',
  'aaahhh',
  'aaaAAHHhhhhh',
  'Grrrrhh',
  'kraaak',
  'BURHHHH!!!',
  'peep-peep-peep',
  'eeeehh',
  '♪ chirp chirp ♪',
  '✨ burh ✨'
];

const asciiPenguin = `    (•_•)
   <)   )╯ burh
    /   \\`;

const fishResponse = 'YUM BURH 🍣🐟';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const savedMessages = localStorage.getItem('pnguinx-chat');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setTimeout(() => {
        setMessages([{
          id: Date.now(),
          text: 'burh! 👋',
          sender: 'penguin',
          timestamp: new Date().toISOString()
        }]);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('pnguinx-chat', JSON.stringify(messages));
    }
  }, [messages]);

  const generatePenguinReply = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('fish')) {
      return fishResponse;
    }
    
    if (Math.random() < 0.08) {
      return asciiPenguin;
    }
    return penguinNoises[Math.floor(Math.random() * penguinNoises.length)];
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const thinkingTime = Math.random() * 1500 + 1000;
    
    setTimeout(() => {
      setIsTyping(false);
      const penguinReply = {
        id: Date.now() + 1,
        text: generatePenguinReply(inputValue),
        sender: 'penguin',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, penguinReply]);
      inputRef.current?.focus();
    }, thinkingTime);
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('pnguinx-chat');
    setTimeout(() => {
      setMessages([{
        id: Date.now(),
        text: 'burh! 👋',
        sender: 'penguin',
        timestamp: new Date().toISOString()
      }]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <header className="max-w-2xl mx-auto mb-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Home className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐧</span>
            <span className="text-white font-light">pnguinx</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearChat}
            className="text-gray-400 hover:text-white text-xs"
          >
            clear
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="h-[calc(100vh-120px)] max-h-[800px] w-full max-w-4xl bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 flex flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </AnimatePresence>
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-end gap-3"
              >
                <PenguinAvatar size="small" />
                <TypingIndicator />
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t border-slate-700/50">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="say something..."
                className="flex-1 rounded-full border-slate-600 bg-slate-700/50 text-white placeholder:text-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || isTyping}
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-200"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
}