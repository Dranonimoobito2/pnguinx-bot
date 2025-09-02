'use client';

import { motion } from 'framer-motion';
import { PenguinAvatar } from './PenguinAvatar';

export function MessageBubble({ message }) {
  const isUser = message.sender === 'user';
  const isPenguinMessage = message.sender === 'penguin';
  
  // Check if message is ASCII art
  const isAsciiArt = message.text.includes('(•_•)') || message.text.includes('<)   )╯');
  
  // Check if message is a big sound (all caps with exclamation)
  const isBigSound = message.text.includes('!!!') || (message.text.toUpperCase() === message.text && message.text.length > 4);

  const bubbleVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.4
      }
    }
  };

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      className={`flex items-end gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {isPenguinMessage && <PenguinAvatar />}
      
      <motion.div
        whileHover={{ scale: 1.01 }}
        className={`max-w-xs p-4 rounded-2xl ${
          isUser
            ? 'bg-slate-700 text-white rounded-br-md'
            : 'bg-blue-600 text-white rounded-bl-md'
        } ${isAsciiArt ? 'font-mono text-xs' : ''} ${isBigSound ? 'text-lg' : ''}`}
      >
        <pre className={`${isAsciiArt ? 'whitespace-pre' : 'whitespace-pre-wrap'} font-sans ${isAsciiArt ? 'font-mono' : ''}`}>
          {message.text}
        </pre>
      </motion.div>
    </motion.div>
  );
}