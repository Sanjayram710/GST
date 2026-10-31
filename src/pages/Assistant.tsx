import React, { useState, useRef, useEffect } from 'react';
import { ASSISTANT_FAQS, AssistantMessage } from '../data/assistant';
import { ChatBubble } from '../components/common/ChatBubble';
import { Bot, Send, Sparkles, Calculator, HelpCircle } from 'lucide-react';

export const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: "Namaste Anil! I'm your GST Compliance Assistant for **Malabar Spice Traders**.\n\nI can explain your October returns, clarify ITC reconciliations, and review deadlines. How can I help today?",
      timestamp: '10:00 AM',
      tag: 'Digital Assistant',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: AssistantMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Find canned answer or fallback
    const matchedFaq = ASSISTANT_FAQS.find(
      (f) =>
        f.prompt.toLowerCase() === promptText.toLowerCase() ||
        promptText.toLowerCase().includes(f.prompt.toLowerCase())
    );

    setTimeout(() => {
      setIsTyping(false);
      if (matchedFaq) {
        setMessages((prev) => [
          ...prev,
          {
            id: `ast-${Date.now()}`,
            sender: 'assistant',
            text: matchedFaq.response,
            timestamp: 'Just now',
            tag: matchedFaq.tag,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `ast-${Date.now()}`,
            sender: 'assistant',
            text: "In the live product with full LLM connectivity, I would answer any question across the entire GST Act. For this interactive demo, please select one of the suggested compliance chips below!",
            timestamp: 'Just now',
            tag: 'Demo Mode',
          },
        ]);
      }
    }, 700);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto bg-surface rounded-card border border-line shadow-soft overflow-hidden">
      {/* Assistant Header */}
      <div className="p-4 bg-surface border-b border-line flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center shadow-soft">
            <Bot className="w-5 h-5 text-accent" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-bold text-base text-ink">GST AI Assistant</h2>
              <span className="text-[10px] font-bold text-brand bg-brand-soft px-2 py-0.5 rounded-chip">
                Online
              </span>
            </div>
            <p className="text-xs text-muted">Plain-language answers backed by statutory rules engine</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted">
          <Calculator className="w-3.5 h-3.5 text-brand" />
          <span>Rules-verified numbers</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-bg/40">
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            sender={msg.sender}
            content={msg.text}
            timestamp={msg.timestamp}
            tag={msg.tag}
          />
        ))}

        {isTyping && (
          <div className="flex items-center gap-3 text-xs text-muted">
            <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-surface px-4 py-2.5 rounded-2xl border border-line flex items-center gap-1.5 shadow-soft">
              <span className="w-2 h-2 rounded-full bg-brand animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-brand animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-brand animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 text-xs text-muted">Computing via rules...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts Chips */}
      <div className="p-3 bg-surface border-t border-line overflow-x-auto">
        <div className="flex gap-2 text-xs whitespace-nowrap">
          {ASSISTANT_FAQS.map((faq) => (
            <button
              key={faq.id}
              onClick={() => handleSendPrompt(faq.prompt)}
              className="px-3 py-1.5 rounded-chip bg-bg hover:bg-brand-soft hover:text-brand border border-line text-ink text-xs font-medium transition-colors shrink-0"
            >
              {faq.prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="p-3 sm:p-4 bg-surface border-t border-line">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendPrompt(inputValue);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask anything about your October GST return, ITC, or deadlines..."
            className="flex-1 px-4 py-2.5 bg-bg border border-line rounded-btn text-xs text-ink focus:outline-none focus:ring-1 focus:ring-brand"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-brand hover:bg-brand/90 text-white rounded-btn text-xs font-bold shadow-soft transition-transform active:scale-95 flex items-center gap-1.5 shrink-0"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Required Mandatory Footer Note */}
        <p className="mt-2 text-[11px] text-center text-muted">
          AI explains. Numbers come from deterministic statutory rules in <code className="font-mono">src/lib/gst.ts</code> and GST portal data.
        </p>
      </div>
    </div>
  );
};

