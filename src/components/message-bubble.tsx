"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MessageBubble({
  role,
  content,
  isStreaming = false,
}: {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
          isUser
            ? "bg-purple-600/80 text-white"
            : "bg-white/[0.05] text-gray-200 border border-white/[0.04]"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : content ? (
          <div className={`prose prose-invert prose-sm max-w-none prose-p:my-1.5 prose-li:my-0.5 prose-headings:mt-3 prose-headings:mb-1.5 prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/[0.06] prose-code:text-purple-300 prose-a:text-purple-400 prose-strong:text-white/90 ${isStreaming ? "streaming-cursor" : ""}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="flex gap-1.5 py-1">
            <span className="h-2 w-2 rounded-full bg-purple-400/40 animate-pulse" />
            <span className="h-2 w-2 rounded-full bg-purple-400/40 animate-pulse [animation-delay:0.15s]" />
            <span className="h-2 w-2 rounded-full bg-purple-400/40 animate-pulse [animation-delay:0.3s]" />
          </div>
        )}
      </div>
    </div>
  );
}
