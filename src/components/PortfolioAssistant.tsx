import { useState, useRef, useEffect } from "react";
import { tokens } from "../tokens";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export const PortfolioAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! 👋 I'm here to help you learn about Laney's work. Ask me about their projects, skills, or how to get in touch.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.map((m) => ({ role: m.role, content: m.content })).concat([userMessage]),
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: "Sorry, I couldn't process that. Try asking about my projects or skills!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Bubble (Hidden on Mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: tokens.color.accent,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(64, 96, 200, 0.3)",
          display: isOpen ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
          transition: "all 0.2s ease",
          color: "white",
          fontSize: "24px",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(64, 96, 200, 0.4)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 12px rgba(64, 96, 200, 0.3)";
        }}
        aria-label="Open chat"
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            width: "380px",
            height: "600px",
            background: "var(--bg-primary)",
            borderRadius: "12px",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
            border: "1px solid var(--border-color)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px",
              borderBottom: "1px solid var(--border-color)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: 0, fontFamily: tokens.font.sans, fontSize: "16px", fontWeight: 600, color: "var(--text-dark)" }}>
              Portfolio Assistant
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "var(--text-muted)",
              }}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    background: msg.role === "user" ? tokens.color.accent : "var(--surface-light)",
                    color: msg.role === "user" ? "white" : "var(--text-secondary)",
                    fontSize: "14px",
                    lineHeight: "1.4",
                    fontFamily: tokens.font.sans,
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--text-muted)",
                    animation: "bounce 1.4s infinite",
                  }}
                />
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--text-muted)",
                    animation: "bounce 1.4s infinite 0.2s",
                  }}
                />
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--text-muted)",
                    animation: "bounce 1.4s infinite 0.4s",
                  }}
                />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            style={{
              padding: "12px",
              borderTop: "1px solid var(--border-color)",
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about my work..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: "10px 12px",
                border: "1px solid var(--border-color)",
                borderRadius: "6px",
                fontFamily: tokens.font.sans,
                fontSize: "14px",
                background: "var(--bg-primary)",
                color: "var(--text-dark)",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              style={{
                padding: "10px 16px",
                background: tokens.color.accent,
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: isLoading ? "not-allowed" : "pointer",
                fontFamily: tokens.font.sans,
                fontWeight: 600,
                fontSize: "14px",
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              Send
            </button>
          </form>

          <style>{`
            @keyframes bounce {
              0%, 80%, 100% {
                opacity: 0.5;
                transform: translateY(0);
              }
              40% {
                opacity: 1;
                transform: translateY(-8px);
              }
            }
          `}</style>
        </div>
      )}

      {/* Mobile Hidden Styles */}
      <style>{`
        @media (max-width: 768px) {
          [aria-label="Open chat"],
          [role="dialog"] {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
