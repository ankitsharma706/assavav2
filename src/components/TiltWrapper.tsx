import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function TiltWrapper({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setRotation({
          x: (event.clientY - bounds.top - bounds.height / 2) / 25,
          y: (bounds.width / 2 - (event.clientX - bounds.left)) / 25,
        });
      }}
      onMouseLeave={() => setRotation({ x: 0, y: 0 })}
      style={{ perspective: 1000, rotateX: rotation.x, rotateY: rotation.y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
