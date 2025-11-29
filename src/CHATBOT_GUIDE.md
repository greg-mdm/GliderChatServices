# Glider Chatbot - Knowledge Base & Integration Guide

## Current Setup

Your chatbot currently uses **pre-defined scripts** (not AI). Responses are hard-coded in `/components/ChatInterface.tsx` using a switch statement.

---

## Option 1: Editing the Pre-defined Script (Quick & Simple)

### Step 1: Locate the Switch Statement

Open `/components/ChatInterface.tsx` and find the `handleButtonClick` function around line 54. Inside, you'll see a switch statement starting around line 69.

### Step 2: Add New Conversation Paths

To add a new response, add a new case to the switch statement:

```typescript
case "your-action-name":
  addBotMessage(
    "Your message content here.\n\nYou can use:\n• Bullet points\n• Emojis 🎯\n• Multiple paragraphs",
    [
      { label: "Button Text 1", action: "next-action-1" },
      { label: "Button Text 2", action: "next-action-2" },
      { label: "Back to Main Menu", action: "main" }
    ]
  );
  break;
```

### Step 3: Fix Dead Ends

Here are the current buttons that hit dead ends and how to fix them:

#### Dead End Actions to Fix:
1. **"profiles"** - View Team Profiles
2. **"culture"** - Learn About Our Culture
3. **"careers"** - See Open Positions
4. **"ai"** - Artificial Intelligence
5. **"data-eng"** - Data Engineering
6. **"analytics"** - Analytics & Insights
7. **"cloud-migration"** - Cloud Migration
8. **"systems"** - Systems Implementation
9. **"cx"** - Customer Experience
10. **"product"** - Product Innovation
11. **"digital"** - Digital Product Building
12. **"approach"** - How We Work
13. **"book"** - Book a Meeting
14. **"financial", "healthcare", "retail"** - Industry-specific pages

### Step 4: Example - Adding Missing Cases

Add these to the switch statement in `/components/ChatInterface.tsx`:

```typescript
case "ai":
  addBotMessage(
    "Artificial Intelligence is revolutionizing business. 🤖\n\nWe help you leverage:\n\n• Machine Learning - Predictive models and automation\n• Generative AI - ChatGPT, image generation, and more\n• Intelligent Products - AI-powered features for your customers\n\nOur team has deep expertise in responsible AI implementation that drives real business value.\n\nWhat AI challenge are you looking to solve?",
    [
      { label: "Generative AI", action: "gen-ai" },
      { label: "Machine Learning", action: "ml" },
      { label: "AI Strategy", action: "ai-strategy" },
      { label: "Back to Data & AI", action: "data" },
      { label: "Schedule a Call", action: "schedule" }
    ]
  );
  break;

case "careers":
  addBotMessage(
    "Join our team! 🌟\n\nWe're always looking for talented consultants, designers, engineers, and strategists who are passionate about making an impact.\n\nOur culture is built on collaboration, innovation, and personal growth.\n\nWould you like to:",
    [
      { label: "View Open Positions", action: "careers-link" },
      { label: "Learn About Benefits", action: "benefits" },
      { label: "Meet the Team", action: "team" },
      { label: "Main Menu", action: "main" }
    ]
  );
  break;

case "careers-link":
  window.open("https://www.slalom.com/careers", "_blank");
  addBotMessage(
    "I've opened our careers page in a new tab! 🚀\n\nWhat else can I help you with?",
    [
      { label: "Learn About Our Culture", action: "culture" },
      { label: "Explore Services", action: "services" },
      { label: "Main Menu", action: "main" }
    ]
  );
  break;

case "book":
  window.open("https://calendly.com/slalom-toronto", "_blank"); // Replace with actual booking link
  addBotMessage(
    "I've opened our scheduling tool! 📅\n\nYou can also reach us directly at:\n\n✉️ toronto@slalom.com\n📞 [Phone number]\n\nWhat else can I help you with?",
    [
      { label: "Explore Services", action: "services" },
      { label: "Meet Our Team", action: "team" },
      { label: "Main Menu", action: "main" }
    ]
  );
  break;
```

### Step 5: Best Practices

1. **Always provide navigation** - Every response should have buttons
2. **Include "Back" options** - Let users navigate backward
3. **Link to "Main Menu"** - Give users an escape route
4. **Keep messages conversational** - Use emojis and friendly language
5. **Use the default case** - It catches undefined actions

---

## Option 2: AI-Powered Chatbot with ChatGPT (Advanced)

### What You'll Need:
- OpenAI API key
- Backend server (Node.js/Express recommended)
- Knowledge base (Slalom website content)

### Architecture Overview:

```
User Input → Frontend (React) → Backend API → OpenAI API → Response
                                      ↓
                                 Knowledge Base
```

### Step 1: Set Up Backend Server

Create a new file `/server/api.js`:

```javascript
const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Knowledge base context
const SLALOM_CONTEXT = `
You are Glider, a helpful AI assistant for Slalom Toronto. 

ABOUT SLALOM:
Slalom is a modern consulting firm focused on strategy, technology, and business transformation.

SERVICES:
- Strategy: Business strategy, customer strategy, data strategy, technology strategy
- Data & AI: Data engineering, analytics, machine learning, generative AI
- Cloud: Migration, modernization, optimization
- Experience Design: Customer experience, product design
- Digital Products: Product engineering, platform development
- Operations: Process improvement, change management

TONE:
- Friendly and conversational
- Professional but approachable
- Use emojis sparingly
- Be concise but informative

RESTRICTIONS:
- Only answer questions about Slalom services, team, and capabilities
- For detailed technical questions, suggest scheduling a call
- Don't make up information - if you don't know, say so
- Always provide actionable next steps
`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    const messages = [
      { role: 'system', content: SLALOM_CONTEXT },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages,
      max_tokens: 300,
      temperature: 0.7
    });

    const response = completion.choices[0].message.content;

    res.json({ 
      response,
      buttons: generateButtons(response) // Optional: generate dynamic buttons
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get response' });
  }
});

// Helper function to suggest relevant buttons based on response
function generateButtons(response) {
  const buttons = [];
  
  if (response.toLowerCase().includes('service')) {
    buttons.push({ label: 'Explore Services', action: 'services' });
  }
  if (response.toLowerCase().includes('team') || response.toLowerCase().includes('people')) {
    buttons.push({ label: 'Meet Our Team', action: 'team' });
  }
  if (response.toLowerCase().includes('call') || response.toLowerCase().includes('schedule')) {
    buttons.push({ label: 'Schedule a Call', action: 'schedule' });
  }
  
  buttons.push({ label: 'Main Menu', action: 'main' });
  
  return buttons;
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### Step 2: Update Frontend to Use AI

Create a new file `/components/AIChatInterface.tsx`:

```typescript
import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { motion, AnimatePresence } from "motion/react";
import Logo from "../imports/Logo";

export function AIChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "bot",
      content: "Hi there 👋 I'm Glider — your AI-powered guide at Slalom Toronto. Ask me anything about our services, team, or how we can help!",
      timestamp: "7:20"
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);

  const sendMessage = async (message) => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Call your backend API
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          conversationHistory
        })
      });

      const data = await response.json();

      // Add bot response
      const botMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: data.response,
        buttons: data.buttons,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
      setConversationHistory([
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: data.response }
      ]);

    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: "Sorry, I'm having trouble connecting right now. Please try again or contact us directly at toronto@slalom.com",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsTyping(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
    }
  };

  // ... rest of the component with UI
}
```

### Step 3: Use Make.com for No-Code Integration

If you want to avoid building a backend, use Make.com:

1. **Create a Make.com account** at https://www.make.com
2. **Create a new scenario**
3. **Add modules:**
   - Webhook (to receive from your React app)
   - OpenAI > Create a Completion
   - Webhook Response (to send back to React)
4. **Configure OpenAI module:**
   - Add your API key
   - Set system prompt with Slalom context
   - Set model to gpt-4 or gpt-3.5-turbo
5. **Get webhook URL** and use it in your React app

### Step 4: Frontend Integration with Make.com

```typescript
const sendMessage = async (message) => {
  const response = await fetch('YOUR_MAKE_WEBHOOK_URL', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      message,
      context: "You are Glider, Slalom Toronto's AI assistant..."
    })
  });
  
  const data = await response.json();
  // Handle response
};
```

---

## Comparison: Script vs AI

### Pre-defined Script (Current)
✅ Fast and reliable
✅ Complete control over responses
✅ No API costs
✅ Works offline
❌ Limited flexibility
❌ Requires manual updates
❌ Can't handle unexpected questions

### AI-Powered (ChatGPT)
✅ Handles any question
✅ Natural conversations
✅ Adapts to user needs
✅ Can reference knowledge base
❌ Requires API costs (~$0.002 per message)
❌ Needs backend infrastructure
❌ May give incorrect information
❌ Slower response times

---

## Recommended Hybrid Approach

**Best of both worlds:**

1. Use **scripted responses** for common paths (services, team, contact)
2. Add an **"Ask anything"** button that uses AI
3. Keep important CTAs (schedule call, contact) as buttons
4. Use AI for complex or unexpected questions

This gives you reliability for core flows + flexibility for edge cases.

---

## Next Steps

### For Scripted Approach:
1. Open `/components/ChatInterface.tsx`
2. Add missing case statements for dead-end actions
3. Test each conversation path
4. Add more content from Slalom website

### For AI Approach:
1. Get OpenAI API key
2. Set up Make.com scenario OR build backend
3. Create knowledge base from Slalom content
4. Test and refine system prompts
5. Add fallback to human contact

---

## Questions?

Let me know which approach you want to pursue and I can help implement it!
