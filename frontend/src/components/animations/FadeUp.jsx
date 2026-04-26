import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * FadeUp - Fade + translate-up on scroll enter
 */
export default function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  once = true,
  className = '',
  y = 24,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
