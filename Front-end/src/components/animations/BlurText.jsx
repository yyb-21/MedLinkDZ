import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import './BlurText.css';

/**
 * BlurText - Word-by-word blur-in animation
 * Inspired by ReactBits text-animations/blur-text
 */
export default function BlurText({
  text = '',
  delay = 80,
  className = '',
  once = true,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once });
  const words = text.split(' ');

  return (
    <span ref={ref} className={`blur-text-root ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="blur-text-word"
          initial={{ opacity: 0, filter: 'blur(12px)', y: 10 }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: i * (delay / 1000),
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </span>
  );
}
