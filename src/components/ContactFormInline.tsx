import { useState } from "react";
import { motion } from "motion/react";

interface ContactFormInlineProps {
  onSubmit: () => void;
  savedUserName?: string;
  savedProjectDetails?: string;
}

export function ContactFormInline({ onSubmit, savedUserName = "", savedProjectDetails = "" }: ContactFormInlineProps) {
  const [fullName, setFullName] = useState(savedUserName);
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");

  // Pre-filled project details (now editable)
  const [projectDetails, setProjectDetails] = useState(
    savedProjectDetails || "I'm exploring a new digital project and would appreciate guidance on scope, timeline, and next steps."
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-[500px] mt-4 ml-16"
    >
      <form onSubmit={handleSubmit} className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-white space-y-4">
        {/* Full Name Field */}
        <div>
          <label htmlFor="fullName" className="block text-sm text-[#444444] mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d2cf0] focus:border-transparent"
            placeholder=""
            autoFocus
          />
        </div>

        {/* Company / Organization */}
        <div>
          <label htmlFor="company" className="block text-sm text-[#444444] mb-2">
            Company / Organization
          </label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d2cf0] focus:border-transparent"
            placeholder=""
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm text-[#444444] mb-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d2cf0] focus:border-transparent"
            placeholder=""
          />
        </div>

        {/* Project Details / Any Questions? - Pre-filled */}
        <div>
          <label htmlFor="projectDetails" className="block text-sm text-[#444444] mb-2">
            Project Details / Any Questions?
          </label>
          <textarea
            id="projectDetails"
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d2cf0] focus:border-transparent text-[#444444]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#2b2b2b] text-white py-3 rounded-md hover:bg-[#1d2cf0] transition-colors"
        >
          Submit
        </button>
      </form>
    </motion.div>
  );
}