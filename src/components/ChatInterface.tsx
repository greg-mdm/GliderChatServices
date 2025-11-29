import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatButton } from "./ChatButton";
import { motion, AnimatePresence } from "motion/react";
import Logo from "../imports/Logo";
import { ContactFormInline } from "./ContactFormInline";
import { ProjectDetailsInput } from "./ProjectDetailsInput";

export interface Message {
  id: string;
  type: "bot" | "user";
  content: string;
  buttons?: Array<{ label: string; action: string }>;
  timestamp: string;
  showForm?: boolean;
  showProjectInput?: boolean;
  inputFormType?: "schedule" | "pricing";
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hi there 👋 I'm Glider — your digital guide at Slalom Toronto. I can help you explore our services, meet the local team, or schedule a quick chat.\n\nWhat would you like to do today?",
      buttons: [
        { label: "Explore Services", action: "services" },
        { label: "Meet Our Team", action: "team" },
        { label: "Ask a Question", action: "question" },
        { label: "Schedule a Call", action: "schedule" },
      ],
      timestamp: "7:20",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [pricingFlowActive, setPricingFlowActive] = useState(false);
  const [pricingStep, setPricingStep] = useState(0); // Track pricing conversation step
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Save user data across the conversation
  const [savedUserName, setSavedUserName] = useState(""); // Full name
  const [savedFirstName, setSavedFirstName] = useState(""); // First name only
  const [savedProjectDetails, setSavedProjectDetails] = useState("");

  // Smart scroll that shows the top of new messages
  const scrollToShowNewMessage = () => {
    if (lastMessageRef.current && chatContainerRef.current) {
      const container = chatContainerRef.current;
      const lastMessage = lastMessageRef.current;
      
      // Get the position of the last message relative to the container
      const messageTop = lastMessage.offsetTop;
      
      // Scroll to show the top of the message with some padding
      container.scrollTo({
        top: messageTop - 20, // 20px padding from top
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    // Small delay to let the DOM update before scrolling
    const timer = setTimeout(() => {
      scrollToShowNewMessage();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [messages.length]); // Only trigger when message count changes

  const addBotMessage = (
    content: string,
    buttons?: Array<{ label: string; action: string }>,
    showForm?: boolean,
    showProjectInput?: boolean,
    inputFormType?: "schedule" | "pricing"
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "bot",
      content,
      buttons,
      showForm,
      showProjectInput,
      inputFormType,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(false);
  };

  const handleButtonClick = (action: string, label: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: label,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      switch (action) {
        // -----------------------------
        // SERVICES & CAPABILITIES
        // -----------------------------
        case "services":
          addBotMessage(
            "Great choice! At Slalom, we offer a wide range of services across strategy, data, cloud, artificial intelligence, digital product development, and organizational change.\n\nOur capabilities span business and customer strategy, data and technology strategy, experience design, cloud migration and optimization, systems implementation, sustainability, operations, and privacy and security.\n\nIn Toronto, we bring these capabilities together with a unique strategic edge across strategy, digital transformation, finance, and engineering.\n\nWhich area would you like to dive into first?",
            [
              { label: "Strategy", action: "strategy" },
              { label: "Data & AI", action: "data" },
              { label: "Cloud & Systems", action: "cloud" },
              { label: "Experience & Design", action: "experience" },
              {
                label: "Organizational Change & Talent",
                action: "change",
              },
              { label: "Back to Main Menu", action: "main" },
            ]
          );
          break;

        case "strategy":
          addBotMessage(
            "Excellent! Let me tell you about our strategy expertise. 💡\n\nIn our era of tech transformation, we can help you decide when to improve, expand, redesign, or even reinvent your business. Our strategy services include:\n\n• Business Strategy - Drive transformation while staying grounded\n• Customer Strategy - Deep research to understand customer needs\n• Data Strategy - Identify and grow strategic data assets\n• Technology Strategy - Navigate rapid change with confidence\n• Business Transformation - Stand out with differentiated experiences\n• Innovation & Emerging Tech - Push boundaries and create your future\n\nWhat aspect of strategy would you like to explore?",
            [
              { label: "Business Strategy", action: "business-strategy" },
              { label: "Customer Strategy", action: "customer-strategy" },
              { label: "Data Strategy", action: "data-strategy" },
              { label: "Technology Strategy", action: "tech-strategy" },
              { label: "Back to Services", action: "services" },
            ]
          );
          break;

        case "business-strategy":
          addBotMessage(
            "Smart business strategy in today's tech transformation era 🚀\n\nWhether you're looking to optimize what you already do, make fundamental changes, or reinvent your company completely, we help you navigate that journey.\n\nOur approach is fiercely human, always putting people at the core. We work with leaders who are driving transformation while remaining steady in a climate of rapid change.\n\nReady to discuss how we can help transform your business?",
            [
              { label: "Schedule a Call", action: "schedule" },
              { label: "Learn More About Strategy", action: "strategy" },
              { label: "Explore Other Services", action: "services" },
              { label: "Contact Us", action: "contact" },
            ]
          );
          break;

        case "customer-strategy":
          addBotMessage(
            "Understanding your customers is everything. 🎯\n\nOur rigorous research methods help us understand who your customers are, what they need, and how they engage. Then we help you build a future-forward strategy that aligns with your overarching business principles.\n\nWe go beyond surface-level insights to create strategies that truly resonate with your audience and drive meaningful engagement.\n\nInterested in learning how we can help you better understand your customers?",
            [
              { label: "Schedule a Call", action: "schedule" },
              { label: "View Other Strategy Services", action: "strategy" },
              { label: "Back to Services", action: "services" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "data-strategy":
          addBotMessage(
            "Data is only powerful when you have a solid strategy. 📊\n\nYou need a strong foundation before you can put data to work to drive decision making and realize its value. Our goal is to help you identify, acquire, and grow the strategic data assets that will improve and transform your business performance.\n\nWe help you turn raw data into actionable insights that drive real business outcomes.\n\nWant to unlock the full potential of your data?",
            [
              { label: "Learn About Data & AI", action: "data" },
              { label: "Schedule a Consultation", action: "schedule" },
              { label: "Other Strategy Services", action: "strategy" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "tech-strategy":
          addBotMessage(
            "We know many tech leaders need to modernize quickly without disrupting the systems their business relies on every day. Slalom’s deep technology expertise and partnerships ensure you can modernize at speed without sacrificing stability.\n\nWe help you stay ahead of the curve while maintaining stability and driving real business value.\n\nReady to discuss your technology roadmap?",
            [
              { label: "Explore Cloud Services", action: "cloud" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "View All Strategy Services", action: "strategy" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;


        // -----------------------------
        // DATA & AI
        // -----------------------------
        case "data":
          addBotMessage(
            "When it comes to data and AI, Toronto taps into Slalom's global bench of 1.4K+ data consultants, 13.5K+ technology certifications, and 700+ partnerships with leading technology providers.\n\nOur job is to help you build trust in your data, tools, and practices so employees and customers can engage with confidence—covering engineering & architecture, management & governance, and literacy & analytics.\n\nWould you like to talk about data platforms, analytics & BI, or AI and intelligent products?",
            [
              { label: "Artificial Intelligence", action: "ai" },
              { label: "Data Engineering", action: "data-eng" },
              { label: "Analytics & Insights", action: "analytics" },
              { label: "Back to Services", action: "services" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "ai":
          addBotMessage(
            "Artificial Intelligence is revolutionizing how businesses operate. 🤖\n\nWe help you leverage:\n\n• Machine Learning - Predictive models and intelligent automation\n• Generative AI - Content and experience innovation\n• Intelligent Products - AI-powered features that delight customers\n• Responsible AI - Ethical implementation with governance\n\nOur team has deep expertise in practical AI that drives real business value.\n\nWhat AI opportunity interests you most?",
            [
              { label: "Generative AI", action: "gen-ai" },
              { label: "Machine Learning", action: "ml" },
              { label: "AI Strategy", action: "ai-strategy" },
              { label: "Back to Data & AI", action: "data" },
            ]
          );
          break;

        case "gen-ai":
          addBotMessage(
            "Generative AI is transforming content creation and customer experiences. ✨\n\nWe help you implement:\n\n• Chat experiences powered by LLMs\n• Content generation for marketing, product, and operations\n• AI-assisted development and code generation\n• Custom models tailored to your data and goals\n\nFrom strategy to deployment, we focus on responsible AI that creates measurable value.\n\nReady to explore generative AI for your business?",
            [
              { label: "Schedule a Consultation", action: "schedule" },
              { label: "View All AI Services", action: "ai" },
              { label: "Back to Services", action: "services" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "ml":
          addBotMessage(
            "Machine Learning powers intelligent decision-making. 📈\n\nOur ML services include:\n\n• Predictive Analytics - Forecast trends and outcomes\n• Recommendation Systems - Personalized experiences\n• Computer Vision - Image and video analysis\n• NLP - Text analysis and understanding\n• MLOps - Production-ready model deployment\n\nWe build ML solutions that are scalable, maintainable, and impactful.\n\nHow can ML transform your business?",
            [
              { label: "Discuss Your Use Case", action: "schedule" },
              { label: "Data Strategy", action: "data-strategy" },
              { label: "Back to AI Services", action: "ai" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "ai-strategy":
          addBotMessage(
            "A solid AI strategy is essential for successful implementation. 🎯\n\nWe help you:\n\n• Identify high-value AI opportunities\n• Assess data readiness and gaps\n• Build responsible AI governance\n• Create implementation roadmaps\n• Measure ROI and business impact\n\nOur strategic approach ensures AI investments drive real outcomes.\n\nLet's discuss your AI ambitions!",
            [
              { label: "Schedule a Strategy Session", action: "schedule" },
              { label: "View AI Solutions", action: "ai" },
              { label: "Data Strategy", action: "data-strategy" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "data-eng":
          addBotMessage(
            "Strong data engineering is the foundation of analytics and AI. 🏗️\n\nWe build:\n\n• Data Pipelines - Reliable, scalable data flows\n• Data Warehouses & Lakes - Centralized analytics platforms\n• Real-time Processing - Stream processing for instant insights\n• Data Quality - Governance and validation\n• Modern Data Stacks - Cloud-native architectures\n\nOur engineering teams create robust foundations for data-driven decisions.\n\nReady to modernize your data infrastructure?",
            [
              { label: "Cloud Services", action: "cloud" },
              { label: "Data Strategy", action: "data-strategy" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "analytics":
          addBotMessage(
            "Turn data into actionable insights. 📊\n\nOur analytics services:\n\n• Business Intelligence - Dashboards and reporting\n• Advanced Analytics - Statistical modeling and forecasting\n• Data Visualization - Compelling storytelling with data\n• Self-Service Analytics - Empower teams with tools\n• Analytics Governance - Ensure trust and accuracy\n\nWe help you build a data-driven culture where insights drive action.\n\nWhat analytics challenges are you facing?",
            [
              { label: "Data Literacy Programs", action: "data-literacy" },
              { label: "AI & Machine Learning", action: "ai" },
              { label: "Schedule a Consultation", action: "schedule" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "data-literacy":
          addBotMessage(
            "Data literacy empowers your entire organization. 📚\n\nWe provide:\n\n• Training programs, from basics to advanced analytics\n• Change management support for data-driven cultures\n• Tool enablement so teams get value from analytics platforms\n• Best practices for standards and governance\n\nWhen everyone speaks the language of data, better decisions happen faster.\n\nLet's build your data-driven culture!",
            [
              { label: "Analytics Services", action: "analytics" },
              { label: "Organizational Change", action: "change" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        // -----------------------------
        // CLOUD & SYSTEMS
        // -----------------------------
        case "cloud":
          addBotMessage(
            "Cloud plays a big role in helping teams move faster and work smarter.\nHere’s what we can support:\n• Migration & Modernization - Move to the cloud seamlessly\n• Optimization - Maximize performance and reduce costs\n• Infrastructure - Build scalable, secure foundations\n• Systems Implementation - Deploy customer and business applications\n• Integration - Connect systems for seamless operations\n\nLet me know what you’d like to explore next!",
            [
              { label: "Cloud Migration", action: "cloud-migration" },
              { label: "Systems Implementation", action: "systems" },
              { label: "Schedule a Consultation", action: "schedule" },
              { label: "Back to Services", action: "services" },
            ]
          );
          break;

        case "cloud-migration":
          addBotMessage(
            "Moving to the cloud unlocks agility and innovation. ☁️\n\nOur migration approach:\n\n• Assessment - Understand your current state\n• Strategy - Choose the right cloud path\n• Migration - Execute with minimal disruption\n• Optimization - Right-size and reduce costs\n• Training - Enable your teams\n\nWe've successfully migrated applications across AWS, Azure, and GCP.\n\nReady to accelerate your cloud journey?",
            [
              { label: "Cloud Optimization", action: "cloud-opt" },
              { label: "Multi-Cloud Strategy", action: "multi-cloud" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Back to Cloud", action: "cloud" },
            ]
          );
          break;

        case "cloud-opt":
          addBotMessage(
            "Optimize your cloud for performance and cost. 💰\n\nWe help you:\n\n• Reduce cloud spend through right-sizing and cost optimization\n• Improve performance through better architecture and scaling\n• Enhance security with best practices and compliance\n• Increase reliability with high availability and disaster recovery\n\nLet's optimize your cloud investment!",
            [
              { label: "Cloud Migration", action: "cloud-migration" },
              { label: "Schedule Assessment", action: "schedule" },
              { label: "Back to Cloud", action: "cloud" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "multi-cloud":
          addBotMessage(
            "Multi-cloud strategies provide flexibility and resilience. 🌐\n\nWe help you:\n\n• Design multi-cloud architectures\n• Avoid vendor lock-in\n• Optimize workload placement\n• Manage complexity across platforms\n• Ensure consistent security and governance\n\nOur partnerships with AWS, Azure, GCP, and others ensure expert guidance.\n\nExploring multi-cloud options?",
            [
              { label: "Cloud Migration", action: "cloud-migration" },
              { label: "Technology Strategy", action: "tech-strategy" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "systems":
          addBotMessage(
            "Modern systems implementation drives business transformation. 💻\n\nWe implement:\n\n• CRM Systems - Salesforce, Microsoft Dynamics\n• ERP Solutions - SAP, Oracle, NetSuite\n• Marketing Platforms - Adobe, HubSpot, Marketo\n• Custom Applications - Tailored to your needs\n• Integration - Connect your tech ecosystem\n\nOur approach balances best practices with your unique requirements.\n\nWhat system challenge can we help solve?",
            [
              { label: "Customer Applications", action: "customer-apps" },
              { label: "Business Applications", action: "business-apps" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Back to Cloud", action: "cloud" },
            ]
          );
          break;

        case "customer-apps":
          addBotMessage(
            "Customer-facing applications drive engagement and growth. 📱\n\nWe build:\n\n• Mobile apps\n• Web applications\n• E-commerce platforms\n• Customer portals\n• Omnichannel experiences across touchpoints\n\nBeautiful, fast, and scalable applications your customers will love.\n\nReady to build something amazing?",
            [
              { label: "Digital Product Building", action: "digital" },
              { label: "Experience Design", action: "experience" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "business-apps":
          addBotMessage(
            "Internal applications empower your teams. ⚙️\n\nWe create:\n\n• Process automation solutions\n• Internal portals and collaboration tools\n• Analytics dashboards for real-time insight\n• Integration platforms to connect systems\n• Productivity tools tailored to your workflows\n\nCustom solutions that fit your unique business processes.\n\nHow can we help improve your operations?",
            [
              { label: "Operations & Process", action: "operations-process" },
              { label: "Cloud Services", action: "cloud" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        // -----------------------------
        // EXPERIENCE & DIGITAL
        // -----------------------------
        case "experience":
          addBotMessage(
            "Our Experience Strategy & Design services include:\n\n• Customer & Employee Experience - Design journeys that delight\n• Product Strategy, Design & Innovation - Build products people want\n• Advertising & Marketing Transformation - Reach and engage effectively\n• Digital Product Building - Product, platform & data engineering\n\nIn an increasingly competitive business landscape, we help you stand out with differentiated experiences that make you memorable.\n\nWhat experience challenge can we help you solve?",
            [
              { label: "Customer Experience", action: "cx" },
              { label: "Product Innovation", action: "product" },
              { label: "Digital Product Building", action: "digital" },
              { label: "Back to Services", action: "services" },
            ]
          );
          break;

        case "cx":
          addBotMessage(
            "Great customer experiences create competitive advantage. ⭐\n\nOur CX services:\n\n• Journey mapping to understand customer paths\n• Experience strategy for meaningful interactions\n• Personalization at scale\n• Voice of customer research and insights\n• CX measurement to continually improve\n\nWe help you create experiences customers love and remember.\n\nWhat CX challenge are you facing?",
            [
              { label: "Customer Strategy", action: "customer-strategy" },
              { label: "Product Design", action: "product" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Back to Experience", action: "experience" },
            ]
          );
          break;

        case "product":
          addBotMessage(
            "Build products people actually want. 💡\n\nOur product innovation services:\n\n• Product strategy and roadmapping\n• User research to deeply understand needs\n• Design thinking and rapid prototyping\n• MVP development to test and learn quickly\n• Product management from concept to launch\n\nWe combine strategy, design, and technology to create successful products.\n\nReady to innovate?",
            [
              { label: "Digital Product Building", action: "digital" },
              { label: "Innovation Strategy", action: "innovation" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Back to Experience", action: "experience" },
            ]
          );
          break;

        case "innovation":
          addBotMessage(
            "Push the boundaries of what's possible. 🚀\n\nOur innovation services:\n\n• Emerging tech exploration (AI, AR/VR, IoT, and more)\n• Innovation labs and rapid experimentation\n• Design sprints to solve problems in days, not months\n• Proofs of concept to validate ideas quickly\n• Support to build innovation into your culture\n\nWe don't just talk about innovation—we help you experience it first-hand.\n\nWhat innovation opportunity excites you?",
            [
              { label: "Product Innovation", action: "product" },
              { label: "AI & Emerging Tech", action: "ai" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "digital":
          addBotMessage(
            "Build digital products with speed and quality. 🛠️\n\nOur digital product building expertise:\n\n• Product engineering\n• Platform engineering\n• Data engineering\n• DevOps and CI/CD\n• Quality engineering and testing\n\nWe use modern tech stacks and agile practices to deliver fast.\n\nLet's build your next digital product!",
            [
              { label: "Cloud Services", action: "cloud" },
              { label: "Data Engineering", action: "data-eng" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Back to Experience", action: "experience" },
            ]
          );
          break;

        // -----------------------------
        // TEAM & CULTURE
        // -----------------------------
        case "team":
          addBotMessage(
            "Our Toronto team is made up of passionate consultants, designers, and engineers who are dedicated to helping clients solve their biggest challenges.\n\nWould you like to:",
            [
              { label: "View Team Profiles", action: "profiles" },
              { label: "Learn About Our Culture", action: "culture" },
              { label: "See Open Positions", action: "careers" },
              { label: "Back to Main Menu", action: "main" },
            ]
          );
          break;

        case "profiles":
          addBotMessage(
            "Our Toronto team brings together diverse expertise across consulting, design, engineering, and strategy. 👥\n\nWe're passionate problem-solvers who love helping clients navigate complex challenges.\n\nWant to connect with someone specific or learn more about our capabilities?",
            [
              { label: "Schedule a Call", action: "schedule" },
              { label: "Learn About Our Culture", action: "culture" },
              { label: "See Open Positions", action: "careers" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "culture":
          addBotMessage(
            "At Slalom, we're fiercely human. 💙\n\nOur culture is built on collaboration, innovation, growth, impact, and balance. We believe great work comes from great people doing work they love.\n\nInterested in joining us?",
            [
              { label: "See Open Positions", action: "careers" },
              { label: "Meet the Team", action: "team" },
              { label: "Explore Our Services", action: "services" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "careers":
          window.open("https://www.slalom.com/careers", "_blank");
          addBotMessage(
            "I've opened our careers page! 🚀\n\nWe're always looking for talented consultants, designers, engineers, and strategists. Join a team that values your growth and impact.\n\nWhat else can I help you with?",
            [
              { label: "Learn About Our Culture", action: "culture" },
              { label: "Meet the Team", action: "team" },
              { label: "Explore Services", action: "services" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        // -----------------------------
        // APPROACH, CHANGE & TALENT
        // -----------------------------
        case "approach":
          addBotMessage(
            "Our approach is agile, collaborative, and results-driven. 🎯\n\nHow we work:\n\n• Discovery to understand your challenges deeply\n• Co-creation alongside your teams\n• Agile delivery for iterative, adaptive execution\n• Change management to drive adoption and impact\n• Continuous improvement to measure and optimize\n\nWe're not just consultants—we're partners in your success.\n\nReady to work together?",
            [
              { label: "Planning & Delivery", action: "planning" },
              { label: "Organizational Change", action: "change" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "planning":
          addBotMessage(
            "Great execution starts with great planning. 📋\n\nOur planning & delivery services help with:\n\n• Product management and roadmaps\n• Agile coaching\n• Program and portfolio management\n• PMO setup and governance\n\nWe help you deliver on time, on budget, and with quality.\n\nWhat delivery challenge can we solve?",
            [
              { label: "Agile Transformation", action: "agile" },
              { label: "Organizational Change", action: "change" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "agile":
          addBotMessage(
            "Become truly agile, not just do agile. 🔄\n\nOur agile services:\n\n• Agile assessments\n• Team coaching\n• Scaled agile frameworks\n• DevOps integration\n• Culture and mindset support\n\nWe help you build the muscle for continuous adaptation.\n\nReady to accelerate your agility?",
            [
              { label: "Planning & Delivery", action: "planning" },
              { label: "Organizational Change", action: "change" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "change":
          addBotMessage(
            "Digital transformation only works if people come with it. 👥\n\nSlalom’s organizational change & talent teams help shape mindsets, skillsets, and toolsets for what’s next—introducing new ways of thinking, strengthening skills, and designing structures that support people to love their work.\n\nOur Toronto projects often pair change specialists with strategy, data, and engineering leaders so that technology, process, and people move together.\n\nAre you more interested in change management, talent development & learning, or culture transformation?",
            [
              { label: "Change Management", action: "change" },
              { label: "Talent Development & Learning", action: "talent" },
              { label: "Culture Transformation", action: "culture" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "talent":
          addBotMessage(
            "Invest in your people, grow your business. 🌱\n\nWe help you imagine what you want your future workforce to look like, and then make smart investments to attract, train, and retain the people who’ll take your business as far as you want it to go.\n\nOur talent services focus on learning programs, leadership development, skills assessment, and clear growth pathways.\n\nHow can we support your talent development?",
            [
              { label: "Organizational Change", action: "change" },
              { label: "Culture", action: "culture" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "operations-process":
          addBotMessage(
            "Optimize operations for efficiency and growth. ⚡\n\nOur operations services include process improvement, operating model design, M&A integration, supply-chain optimization, and automation.\n\nWe help you do more with less while improving quality.\n\nWhat operational challenge should we tackle?",
            [
              { label: "Business Strategy", action: "business-strategy" },
              { label: "Organizational Change", action: "change" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        // -----------------------------
        // INDUSTRIES
        // -----------------------------
        case "industries":
        case "industries-link":
          addBotMessage(
            "Slalom serves clients across diverse industries:\n\n• Financial Services\n• Healthcare & Life Sciences\n• Retail & Consumer Goods\n• Technology, Media & Communications\n• Public & Social Impact\n\nWhich area would you like to explore?",
            [
              { label: "Financial Services", action: "financial" },
              { label: "Healthcare", action: "healthcare" },
              { label: "Retail", action: "retail" },
              {
                label: "Technology, Media & Communications",
                action: "techmedia",
              },
              { label: "Public & Social Impact", action: "public" },
              { label: "Back to Main Menu", action: "main" },
            ]
          );
          break;

        case "financial":
          addBotMessage(
            "Financial services is a core focus for Slalom in Toronto. Across Slalom, 75% of Fortune 500 financial services companies work with us. Our expertise in strategy, digital transformation, and engineering helps banks, insurers, payments providers, and wealth managers enhance customer satisfaction, outpace competitors, and innovate effectively.\n\nAre you more interested in banking & payments, capital markets, insurance, or wealth & asset management?",
            [
              { label: "Explore Services", action: "services" },
              {
                label: "Expanding business in Ontario or the Greater Toronto Area?",
                action: "financial-toronto",
              },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Other Industries", action: "industries" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "financial-toronto":
          addBotMessage(
            "Expanding business in Ontario or the Greater Toronto Area? Strong choice. Toronto is the financial capital of Canada and a major global center for banking, insurance, payments, and capital markets. With deep talent pools and a highly connected financial ecosystem, it’s an ideal place to scale financial services innovation.\n\nThe Toronto–Waterloo Corridor is one of North America’s top fintech and technology regions. Our Slalom Toronto office is closely connected to this ecosystem—partnering with local financial institutions, emerging fintech firms, and global teams to help organizations grow with confidence.",
            [
              { label: "Discuss your expansion plans", action: "schedule" },
              { label: "Back to Financial Services", action: "financial" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "techmedia":
          addBotMessage(
            "Toronto is rapidly emerging as a key technology hub and a center for media, entertainment, and culture. At Slalom, we've partnered with over 2,500 tech companies, with more than 800 experts supporting 1,400+ media and communications projects in 2022 alone.\n\nWe draw on this experience to empower hardware and software companies, gaming studios, marketing teams, and media organizations to navigate the fast-paced changes in their industries.\n\nAre you exploring opportunities in technology, gaming, marketing and advertising, or media and entertainment?",
            [
              {
                label: "Expanding business in Ontario or the Greater Toronto Area?",
                action: "tech-toronto",
              },
              { label: "Explore Services", action: "services" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Other Industries", action: "industries" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "tech-toronto":
          addBotMessage(
            "Expanding business in Ontario or the Greater Toronto Area? Great call. Toronto is helping shape the future of technology, business, media, and culture. With over 289,000 tech workers and one of the fastest-growing talent pools in the world, it’s an ideal launchpad for expansion.\n\nCombined with the Toronto–Waterloo Corridor, you get a powerhouse ecosystem that competes with some of the world’s top innovation regions. Our Slalom Toronto office is closely connected to that thriving ecosystem—partnering with local teams, industry leaders, and global networks to help organizations grow with confidence.",
            [
              { label: "Talk about expansion plans", action: "schedule" },
              {
                label: "Back to Technology, Media & Communications",
                action: "techmedia",
              },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "public":
          addBotMessage(
            "Alongside private-sector work, Slalom teams also support government, education, and nonprofit organizations. Globally, we've completed thousands of public and social impact projects, helping agencies modernize services, optimize operations, and deliver better outcomes for communities.\n\nIn a city like Toronto—where public services, universities, and nonprofits sit right beside major financial and tech players—that mix really matters.\n\nWould you like to explore government, education, or nonprofit and philanthropy use cases?",
            [
              { label: "Explore Services", action: "services" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Other Industries", action: "industries" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "healthcare":
          addBotMessage(
            "Transform healthcare delivery and experiences. 🏥\n\nOur healthcare solutions span patient experience, clinical systems, analytics, interoperability, and compliance.\n\nWe focus on improving outcomes while reducing costs.\n\nWhat healthcare challenge are you facing?",
            [
              { label: "Explore Services", action: "services" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Other Industries", action: "industries" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "retail":
          addBotMessage(
            "Reimagine retail for the digital age. 🛍️\n\nOur retail expertise includes omnichannel commerce, personalization, supply-chain optimization, store innovation, and customer loyalty.\n\nWe help retailers compete and win.\n\nReady to transform your retail experience?",
            [
              { label: "Explore Services", action: "services" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Other Industries", action: "industries" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        // -----------------------------
        // CONTACT, HOME, NAV
        // -----------------------------
        case "question":
          setShowInput(true);
          setTimeout(() => {
            inputRef.current?.focus();
          }, 100);
          addBotMessage(
            "Great! I'd love to help answer your questions. What topic would you like to discuss?",
            [
              { label: "Strategy & Planning", action: "question-strategy" },
              { label: "Data & AI Solutions", action: "question-data" },
              { label: "Technology & Cloud", action: "question-tech" },
              { label: "Management & Finance", action: "question-management" },
              { label: "Contact Directly", action: "contact" },
              { label: "Back to Main Menu", action: "main" },
            ]
          );
          break;

        case "question-strategy":
          addBotMessage(
            "Perfect! I can help you with strategy and planning questions. Our strategy expertise covers business strategy, customer strategy, data strategy, technology strategy, and business transformation.\n\nWould you like to explore our strategy services or schedule a call to discuss your specific needs?",
            [
              { label: "Explore Strategy Services", action: "strategy" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Ask About Another Topic", action: "question" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "question-data":
          addBotMessage(
            "Excellent choice! I can help with Data & AI questions. We offer comprehensive data and AI solutions including artificial intelligence, data engineering, analytics & insights, and data strategy.\n\nWould you like to dive into our data & AI capabilities or connect with an expert?",
            [
              { label: "Explore Data & AI", action: "data" },
              { label: "AI Solutions", action: "ai" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Ask About Another Topic", action: "question" },
            ]
          );
          break;

        case "question-tech":
          addBotMessage(
            "Great! I can help with technology and cloud questions. Our technology expertise includes cloud migration & modernization, systems implementation, infrastructure optimization, and integration solutions.\n\nWould you like to explore our cloud services or discuss your technology needs?",
            [
              { label: "Explore Cloud Services", action: "cloud" },
              { label: "Systems Implementation", action: "systems" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Ask About Another Topic", action: "question" },
            ]
          );
          break;

        case "question-management":
          addBotMessage(
            "Perfect! I can help with management and finance questions. We offer services in organizational change & talent, operations, planning & delivery, and financial transformation.\n\nWhat aspect would you like to explore?",
            [
              { label: "Organizational Change", action: "change" },
              { label: "Operations", action: "operations-process" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Ask About Another Topic", action: "question" },
            ]
          );
          break;

        case "schedule":
          addBotMessage(
            "Wonderful! I'd be happy to help you schedule a conversation with our team.\n\nTo connect you with the right person, could you share a bit about your project and your name?",
            undefined,
            false,
            true // Show project input
          );
          break;

        case "schedule-details":
          // This case is now handled by the dual-input component
          break;

        case "contact":
        case "email":
        case "call":
          addBotMessage(
            "Thanks for reaching out! If you'd like to connect directly, here's how to reach us:\n\n✉️ toronto@slalom.com\n\nWhat else can I help you with?",
            [
              { label: "Slalom Home", action: "home" },
              { label: "Services", action: "services-link" },
              { label: "Industries", action: "industries-link" },
              { label: "Back to Main Menu", action: "main" },
            ]
          );
          break;

        case "home":
          window.open("https://www.slalom.com/ca/en", "_blank");
          addBotMessage(
            "I've opened the Slalom homepage in a new tab. Is there anything else I can help you with?",
            [
              { label: "Explore Services", action: "services" },
              { label: "Meet Our Team", action: "team" },
              { label: "Schedule a Call", action: "schedule" },
            ]
          );
          break;

        case "services-link":
          window.open("https://www.slalom.com/ca/en/services", "_blank");
          addBotMessage(
            "I've opened our services page in a new tab. Would you like to discuss any specific service?",
            [
              { label: "Ask a Question", action: "question" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Back to Main Menu", action: "main" },
            ]
          );
          break;

        case "book":
          window.open("https://www.slalom.com/contact", "_blank");
          addBotMessage(
            "I've opened our contact page where you can schedule time with our team. 📅\n\nYou can also reach us directly at toronto@slalom.com.\n\nWhat else can I help you with?",
            [
              { label: "Explore Services", action: "services" },
              { label: "Meet Our Team", action: "team" },
              { label: "Ask a Question", action: "question" },
              { label: "Main Menu", action: "main" },
            ]
          );
          break;

        case "tech":
          addBotMessage(
            "Technology is the engine of transformation. 💻\n\nOur technology solutions span cloud transformation, application development, integration, infrastructure, and DevOps.\n\nWe combine deep technical expertise with business acumen.\n\nWhat technology challenge should we solve?",
            [
              { label: "Cloud Services", action: "cloud" },
              { label: "Systems Implementation", action: "systems" },
              { label: "Digital Product Building", action: "digital" },
              { label: "Back to Services", action: "services" },
            ]
          );
          break;

        case "main":
          addBotMessage(
            "No problem! What would you like to do next?",
            [
              { label: "Explore Services", action: "services" },
              { label: "Meet Our Team", action: "team" },
              { label: "Ask a Question", action: "question" },
              { label: "Schedule a Call", action: "schedule" },
            ]
          );
          break;

        default:
          addBotMessage(
            "Thanks for your interest! I'm here to help you learn more about Slalom Toronto.\n\nWhat would you like to explore?",
            [
              { label: "Explore Services", action: "services" },
              { label: "Meet Our Team", action: "team" },
              { label: "Schedule a Call", action: "schedule" },
              { label: "Contact Us", action: "contact" },
            ]
          );
      }
    }, 1200);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: userInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setShowInput(false);

    // Show typing indicator
    setIsTyping(true);

    // Bot responds with the form trigger message
    setTimeout(() => {
      addBotMessage(
        "I've noted your interests and will be happy to help. To match you with the best person on our team, could you please share your name, email address, and any relevant project details?\n\nIf you'd prefer to reach out directly, you can email us at toronto@slalom.com",
        undefined,
        true // Show form
      );
    }, 1200);
  };

  const handleBottomInputSend = () => {
    if (!userInput.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: userInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);
    
    const inputText = userInput.toLowerCase();
    setUserInput("");

    // Show typing indicator
    setIsTyping(true);

    // Bot responds based on the message content
    setTimeout(() => {
      // Check for pricing-related keywords
      if (inputText.includes("pricing") || inputText.includes("price") || inputText.includes("cost") || inputText.includes("rate") || inputText.includes("budget")) {
        if (!pricingFlowActive) {
          // First time pricing question - immediately ask for email
          setPricingFlowActive(true);
          setPricingStep(1);
          addBotMessage(
            "Absolutely — happy to help with that!\n\nOur pricing isn't one-size-fits-all. Slalom builds solutions the same way we work: no predetermined processes, no off-the-shelf packages — we roll up our sleeves and craft practical, end-to-end solutions around your goals.\n\nBefore I pass this along, could you share your name and email?\n\nI've already logged your interests — I just need those details to finish matching you with the right Toronto team member.",
            undefined,
            false,
            true, // Show dual input
            "pricing" // pricing type
          );
          return;
        }
      } else if (pricingFlowActive && pricingStep === 1) {
        // User provided name/email - Confirmation
        setPricingFlowActive(false);
        setPricingStep(0);
        addBotMessage(
          "Perfect. Someone from our Toronto team will reach out to you soon!",
          [
            { label: "Explore Services", action: "services" },
            { label: "Ask a Question", action: "question" },
            { label: "Main Menu", action: "main" },
          ]
        );
      } else {
        // Default response for other messages
        addBotMessage(
          "Thanks for your message! I'd be happy to help you with that. To better assist you, could you provide a bit more detail about what you're looking for?",
          [
            { label: "Explore Services", action: "services" },
            { label: "Schedule a Call", action: "schedule" },
            { label: "Ask a Question", action: "question" },
            { label: "Main Menu", action: "main" },
          ]
        );
      }
    }, 1200);
  };

  const handleProjectDetailsSubmit = (projectDetails: string, userName: string) => {
    // Handle Pricing Flow Submission
    if (pricingFlowActive) {
      setSavedUserName(userName);
      const firstName = userName.trim().split(/\s+/)[0];
      
      // Add user message showing what they entered (Email + Name)
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: `Email: ${projectDetails}\nName: ${userName}`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, userMessage]);

      setIsTyping(true);

      setTimeout(() => {
        addBotMessage(
          `Perfect. Thanks, ${firstName}. Someone from our Toronto team will reach out to you soon!`,
          [
            { label: "Explore Services", action: "services" },
            { label: "Ask a Question", action: "question" },
            { label: "Main Menu", action: "main" },
          ]
        );
        setPricingFlowActive(false);
        setPricingStep(0);
      }, 1200);
      return;
    }

    // Save the full user name and project details
    setSavedUserName(userName);
    setSavedProjectDetails(projectDetails);
    
    // Extract first name (first word only)
    const firstName = userName.trim().split(/\s+/)[0];
    setSavedFirstName(firstName);

    // Add user message showing what they entered
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: `Name: ${userName}\nProject: ${projectDetails}`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Show typing indicator
    setIsTyping(true);

    // Bot responds with the form, using first name  
    setTimeout(() => {
      addBotMessage(
        `Thanks, ${firstName}! Please confirm your details below. Once you hit submit, I'll match you with the right team member for a quick introductory call.\n\nYou can expect a meeting invite within 1–2 days.`,
        undefined,
        true // Show form with pre-filled data
      );
    }, 1200);
  };

  const handleFormSubmit = () => {
    setIsTyping(true);

    // Simulate form submission
    setTimeout(() => {
      addBotMessage(
        "Thank you! 🎉 We've received your information and someone from our Toronto team will reach out to you shortly.\n\nIn the meantime, is there anything else I can help you with?",
        [
          { label: "Explore Services", action: "services" },
          { label: "Meet Our Team", action: "team" },
          { label: "Main Menu", action: "main" },
        ]
      );
    }, 1500);
  };

  return (
    <div className="bg-white rounded-[20px] shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[80vh]">
      {/* Chat Messages Area */}
      <div 
        className="flex-1 overflow-y-auto px-6 py-8 space-y-6 scrollbar-visible" 
        ref={chatContainerRef}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 #f1f5f9'
        }}
      >
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              onButtonClick={handleButtonClick}
              onFormSubmit={handleFormSubmit}
              onProjectDetailsSubmit={handleProjectDetailsSubmit}
              savedUserName={savedUserName}
              savedProjectDetails={savedProjectDetails}
              isLatest={index === messages.length - 1}
              ref={index === messages.length - 1 ? lastMessageRef : null}
            />
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3"
          >
            <div className="w-12 h-12 rounded-full flex-shrink-0 mt-1">
              <Logo />
            </div>
            <div className="bg-[#1d2cf0] rounded-br-[12px] rounded-tl-[12px] rounded-tr-[12px] px-5 py-3">
              <div className="flex gap-1">
                <motion.span
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                />
                <motion.span
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                />
                <motion.span
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
        <p className="text-xs text-gray-500 mb-2 text-center">
          Try using the buttons above to navigate
        </p>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message..."
            className={`flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d2cf0] focus:border-transparent ${
              !showInput ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            }`}
            disabled={!showInput}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleBottomInputSend()}
          />
          <button
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              !showInput
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#1d2cf0] text-white hover:bg-blue-700"
            }`}
            disabled={!showInput}
            onClick={handleBottomInputSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}