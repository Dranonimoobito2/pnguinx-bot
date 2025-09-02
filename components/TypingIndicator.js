'use client';

import { motion } from 'framer-motion';

export function TypingIndicator() {
  return (
    <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-bl-md">
      <div className="flex gap-1">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}