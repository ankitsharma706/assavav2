import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface ScrollIndicatorProps {
  text?: string;
  className?: string;
  onClick?: () => void;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ 
  text = "Scroll to Discover", 
  className = "",
  onClick
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 1 }}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-4 cursor-pointer select-none",
        className
      )}
    >
      <span className="text-[9px] uppercase tracking-[0.5em] text-cream/40 font-bold whitespace-nowrap">
        {text}
      </span>
      
      <div className="relative w-[20px] h-[34px] border border-white/10 rounded-full flex justify-center p-1.5 bg-white/2 backdrop-blur-sm">
        <motion.div 
          animate={{ 
            y: [0, 12, 0],
            opacity: [1, 0.4, 1],
            scaleY: [1, 1.5, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-[2px] h-[7px] bg-caramel rounded-full origin-top shadow-[0_0_8px_rgba(198,142,93,0.5)]"
        />
      </div>

      <motion.div
        animate={{ 
          y: [0, 4, 0],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut"
        }}
      >
        <ChevronDown className="w-4 h-4 text-caramel/60" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
