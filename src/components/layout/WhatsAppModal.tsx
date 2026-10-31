import React, { useState } from 'react';
import { X, Send, CheckCheck, Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react';
import { formatINR } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MessageItem {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  action?: boolean;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'wa-1',
      sender: 'bot',
      text: 'Namaste Anil ji! 🙏\n\nYour GSTR-3B return for **October 2026** is due in **20 days** (20 Nov 2026).\n\n• Tax Payable: *₹1,04,800*\n• Status: Prepared & Verified\n\nReply *PAY* to authorize payment, or *DETAILS* to view ITC breakdown.',
      time: '10:30 AM',
    },
  ]);
  const [input, setInput] = useState('PAY');

  if (!isOpen) return null;

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    const newMsgs: MessageItem[] = [
      ...messages,
      { id: `wa-u-${Date.now()}`, sender: 'user' as const, text: userMsg, time: 'Just now' },
    ];
    setMessages(newMsgs);
    setInput('');

    setTimeout(() => {
      if (userMsg.toUpperCase() === 'PAY') {
        setMessages((prev) => [
          ...prev,
          {
            id: `wa-b-${Date.now()}`,
            sender: 'bot' as const,
            text: `Payment link initiated for ${formatINR(104800)} via UPI / NetBanking.\n\nAlternatively, you can finalize directly on the GST Copilot with instant OTP.`,
            time: 'Just now',
            action: true,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `wa-b-${Date.now()}`,
            sender: 'bot' as const,
            text: `Your books report 48 sales (Tax ₹2,23,200) and 31 purchases (ITC ₹1,18,400). Net payable: ₹1,04,800.`,
            time: 'Just now',
          },
        ]);
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-sm rounded-[36px] bg-[#111B21] border-[8px] border-[#2A3942] shadow-2xl overflow-hidden flex flex-col h-[640px]">
        {/* Phone Speaker Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-b-xl z-20" />

        {/* WhatsApp Header */}
        <div className="bg-[#008069] text-white pt-7 pb-3 px-3 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="p-1 hover:bg-black/10 rounded-full">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
              GST
            </div>
            <div>
              <p className="font-semibold text-sm leading-tight">GST Compliance Bot</p>
              <p className="text-[11px] text-white/80">Official Business Account</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <Phone className="w-4 h-4" />
            <Video className="w-4 h-4" />
            <button onClick={onClose} className="p-1 hover:bg-black/10 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* WhatsApp Chat Wallpaper & Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#EFEAE2] flex flex-col justify-end">
          <div className="text-center">
            <span className="text-[10px] bg-white/90 text-slate-600 px-3 py-1 rounded-md shadow-sm">
              Messages are end-to-end encrypted · GSTN Partner
            </span>
          </div>

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed shadow-sm ${
                  m.sender === 'user' ? 'bg-[#D9FDD3] text-[#111B21]' : 'bg-white text-[#111B21]'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>
                {m.action && (
                  <button
                    onClick={() => {
                      onClose();
                      navigate('/app/copilot');
                    }}
                    className="mt-2 w-full py-1.5 px-3 bg-[#008069] text-white text-[11px] font-bold rounded-md hover:bg-[#00705c] transition-colors"
                  >
                    Open GST Copilot →
                  </button>
                )}
                <div className="mt-1 flex items-center justify-end gap-1 text-[9px] text-slate-500">
                  <span>{m.time}</span>
                  {m.sender === 'user' && <CheckCheck className="w-3 h-3 text-[#53bdeb]" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="bg-[#F0F2F5] p-2 flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type PAY or message..."
            className="flex-1 bg-white text-xs px-3.5 py-2.5 rounded-full border border-line focus:outline-none focus:ring-1 focus:ring-[#008069]"
          />
          <button
            onClick={handleSend}
            className="w-9 h-9 rounded-full bg-[#008069] text-white flex items-center justify-center shrink-0 hover:bg-[#00705c]"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
