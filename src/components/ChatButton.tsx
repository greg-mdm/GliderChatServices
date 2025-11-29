import { motion } from "motion/react";
import { useState } from "react";

interface ChatButtonProps {
  label: string;
  onClick: () => void;
  delay?: number;
}

export function ChatButton({ label, onClick, delay = 0 }: ChatButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const isLink = label.includes("Slalom Home") || label.includes("Services") || label.includes("Industries");
  
  const handleClick = () => {
    setIsPressed(true);
    onClick();
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`
        px-4 py-2 rounded-[10px] shadow-md transition-all
        ${isPressed 
          ? 'bg-[#f3f5f6] text-[#1d2cf0]' 
          : isLink 
            ? 'bg-[#f3f5f6] text-[#1d2cf0] hover:bg-white hover:shadow-lg border border-[#1d2cf0]/20' 
            : 'bg-[#f3f5f6] text-[#444444] hover:bg-white hover:shadow-lg'
        }
      `}
    >
      <span className={`text-xs ${isLink ? 'underline' : ''} ${isPressed ? 'font-bold' : ''}`}>
        {label}
      </span>
    </motion.button>
  );
}