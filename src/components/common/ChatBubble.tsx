import React from 'react';
import { cn } from '../../lib/utils';
import { Bot, User } from 'lucide-react';

interface ChatBubbleProps {
  sender: 'user' | 'assistant';
  content: string;
  timestamp?: string;
  tag?: string;
  className?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  sender,
  content,
  timestamp,
  tag,
  className,
}) => {
  const isAssistant = sender === 'assistant';

  return (
    <div
      className={cn(
        'flex gap-3 text-sm leading-relaxed',
        isAssistant ? 'items-start' : 'items-start flex-row-reverse',
        className
      )}
    >
      <div
        className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold shadow-soft',
          isAssistant ? 'bg-brand text-white' : 'bg-surface border border-line text-ink'
        )}
      >
        {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4 text-muted" />}
      </div>

      <div
        className={cn(
          'max-w-xl rounded-2xl px-4 py-3 shadow-soft',
          isAssistant
            ? 'bg-surface border border-line text-ink rounded-tl-sm'
            : 'bg-brand text-white rounded-tr-sm'
        )}
      >
        {tag && isAssistant && (
          <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-brand bg-brand-soft px-2 py-0.5 rounded-chip mb-2">
            {tag}
          </span>
        )}
        <div className="whitespace-pre-line text-xs sm:text-sm font-normal">
          {content}
        </div>
        {timestamp && (
          <div
            className={cn(
              'mt-1.5 text-[10px]',
              isAssistant ? 'text-muted' : 'text-white/70 text-right'
            )}
          >
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
};

