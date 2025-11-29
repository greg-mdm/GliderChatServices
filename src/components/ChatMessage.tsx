import { motion } from "motion/react";
import { Message } from "./ChatInterface";
import { ChatButton } from "./ChatButton";
import Logo from "../imports/Logo";
import { ContactFormInline } from "./ContactFormInline";
import { ProjectDetailsInput } from "./ProjectDetailsInput";
import { forwardRef, useState, useEffect } from "react";

interface ChatMessageProps {
  message: Message;
  onButtonClick: (action: string, label: string) => void;
  onFormSubmit?: () => void;
  onProjectDetailsSubmit?: (projectDetails: string, userName: string) => void;
  savedUserName?: string;
  savedProjectDetails?: string;
  isLatest: boolean;
}

export const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ message, onButtonClick, onFormSubmit, onProjectDetailsSubmit, savedUserName, savedProjectDetails, isLatest }, ref) => {
    const [showForm, setShowForm] = useState(false);

    // Delay showing the form by 3 seconds
    useEffect(() => {
      if (message.showForm) {
        const timer = setTimeout(() => {
          setShowForm(true);
        }, 3000); // 3 second delay

        return () => clearTimeout(timer);
      }
    }, [message.showForm]);

    // Function to render message content with clickable email addresses
    const renderMessageContent = (content: string) => {
      // Replace escaped newlines with actual newlines
      const cleanedContent = content.replace(/\\n/g, '\n');
      const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
      const parts = cleanedContent.split(emailRegex);
      
      return parts.map((part, index) => {
        if (part.match(emailRegex)) {
          return (
            <a
              key={index}
              href={`mailto:${part}`}
              className="underline hover:opacity-80 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              {part}
            </a>
          );
        }
        return part;
      });
    };

    if (message.type === "user") {
      return (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex justify-end"
        >
          <div className="bg-[#f3f5f6] rounded-bl-[12px] rounded-tl-[12px] rounded-tr-[12px] px-5 py-3 max-w-[80%] shadow-sm">
            <p className="text-[#444444] whitespace-pre-wrap">{message.content}</p>
            <p className="text-[10px] text-[#888888] mt-2">{message.timestamp}</p>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-3"
      >
        {/* Bot Avatar */}
        <div className="w-12 h-12 rounded-full flex-shrink-0 mt-1">
          <Logo />
        </div>

        <div className="flex-1 space-y-3">
          {/* Message Bubble */}
          <div className="relative">
            <div className="bg-[#1d2cf0] rounded-br-[12px] rounded-tl-[12px] rounded-tr-[12px] px-5 py-4 shadow-lg max-w-[90%]">
              <p className="text-white whitespace-pre-wrap leading-relaxed">
                {renderMessageContent(message.content)}
              </p>
            </div>
            <p className="text-[10px] text-[#888888] mt-2 ml-1">{message.timestamp}</p>
          </div>

          {/* Show Project Details Input if this message has showProjectInput flag */}
          {message.showProjectInput && onProjectDetailsSubmit && isLatest && (
            <ProjectDetailsInput 
              onSubmit={onProjectDetailsSubmit}
              savedUserName={savedUserName}
              savedProjectDetails={savedProjectDetails}
              leftPlaceholder={message.inputFormType === "pricing" ? "Enter Email" : "Enter project details…"}
              rightPlaceholder={message.inputFormType === "pricing" ? "Add your name" : "Add your name here…"}
            />
          )}

          {/* Show Contact Form after 3 second delay if this message has showForm flag */}
          {showForm && onFormSubmit && (
            <ContactFormInline 
              onSubmit={onFormSubmit}
              savedUserName={savedUserName}
              savedProjectDetails={savedProjectDetails}
            />
          )}

          {/* Action Buttons */}
          {message.buttons && message.buttons.length > 0 && isLatest && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2 justify-center"
            >
              {message.buttons.map((button, index) => (
                <ChatButton
                  key={index}
                  label={button.label}
                  onClick={() => onButtonClick(button.action, button.label)}
                  delay={index * 0.1}
                />
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  }
);

ChatMessage.displayName = "ChatMessage";