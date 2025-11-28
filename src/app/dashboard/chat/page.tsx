"use client";

import { useState, useRef, useEffect } from "react";
import { Button, Input, Card } from "@/components/ui";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { DashboardHeader } from "../_components";
// NEW IMPORTS
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Hello! I have access to the full university handbook. What would you like to know?" 
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    const newHistory = [...messages, userMsg];
    
    setMessages(newHistory);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");

      const data = await response.json();
      
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: data.content 
      }]);

    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: "Sorry, I encountered an error connecting to the server. Please try again." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100svh-4rem)]">
      <DashboardHeader title="Chat Assistant" />
      
      <div className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col max-w-4xl mx-auto w-full min-h-0">
        <Card className="flex-1 flex flex-col shadow-sm border bg-background/50 backdrop-blur-sm min-h-0">
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                )}
                
                <div 
                  className={`max-w-[85%] md:max-w-[75%] p-4 rounded-2xl text-sm md:text-base leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-muted rounded-tl-sm"
                  }`}
                >
                  {/* UPDATED: Logic to render Markdown for assistant, plain text for user */}
                  {msg.role === "assistant" ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        // Custom styling for specific Markdown elements
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                        li: ({ children }) => <li>{children}</li>,
                        h1: ({ children }) => <h1 className="text-xl font-bold mb-2 mt-4">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-lg font-bold mb-2 mt-3">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-base font-semibold mb-1 mt-2">{children}</h3>,
                        strong: ({ children }) => <span className="font-bold text-foreground/90">{children}</span>,
                        a: ({ href, children }) => (
                          <a 
                            href={href} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-primary underline underline-offset-4 hover:opacity-80 font-medium"
                          >
                            {children}
                          </a>
                        ),
                        code: ({ children }) => <code className="bg-muted-foreground/20 px-1 py-0.5 rounded text-xs font-mono">{children}</code>
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>

                {msg.role === "user" && (
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-muted p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Analyzing handbook...</span>
                </div>
              </div>
            )}
            <div className="h-px" /> 
          </div>

          <div className="p-4 border-t bg-background mt-auto">
            <div className="flex gap-2 relative">
              <Input
                placeholder="Ask a question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pr-12 py-6 text-base"
                disabled={loading}
              />
              <Button 
                size="icon" 
                className="absolute right-1 top-1 h-10 w-10" 
                onClick={handleSend}
                disabled={!input.trim() || loading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}