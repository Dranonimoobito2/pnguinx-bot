'use client';

import { motion } from 'framer-motion';

export function PenguinAvatar({ size = 'normal' }) {
  const sizeClasses = {
    small: 'w-8 h-8 text-lg',
    normal: 'w-10 h-10 text-2xl'
  };

  const wiggleAnimation = {
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatDelay: 4 + Math.random() * 6
    }
  };

  return (
    <motion.div
      animate={wiggleAnimation}
      className={`${sizeClasses[size]} rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0`}
    >
      🐧
    </motion.div>
  );
}