import { useState } from "react";
import { motion } from "motion/react";

interface ProjectDetailsInputProps {
  onSubmit: (projectDetails: string, userName: string) => void;
  savedUserName?: string;
  savedProjectDetails?: string;
  leftPlaceholder?: string;
  rightPlaceholder?: string;
}

export function ProjectDetailsInput({ 
  onSubmit, 
  savedUserName = "",
  savedProjectDetails = "",
  leftPlaceholder = "Enter project details…",
  rightPlaceholder = "Add your name here…"
}: ProjectDetailsInputProps) {
  const [projectDetails, setProjectDetails] = useState(savedProjectDetails);
  const [userName, setUserName] = useState(savedUserName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectDetails.trim() && userName.trim()) {
      onSubmit(projectDetails, userName);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-[500px] mt-4 ml-16"
    >
      <form onSubmit={handleSubmit} className="flex gap-2">
        {/* Project Details Field (Left) */}
        <input
          type="text"
          value={projectDetails}
          onChange={(e) => setProjectDetails(e.target.value)}
          placeholder={leftPlaceholder}
          className="flex-[2] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d2cf0] focus:border-transparent"
          autoFocus
        />
        
        {/* Name Field (Right) */}
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder={rightPlaceholder}
          className="flex-[1] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d2cf0] focus:border-transparent"
        />
        
        {/* Send Button */}
        <button
          type="submit"
          className="px-6 py-2 bg-[#1d2cf0] text-white rounded-lg hover:bg-[#1628c9] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!projectDetails.trim() || !userName.trim()}
        >
          Send
        </button>
      </form>
    </motion.div>
  );
}
