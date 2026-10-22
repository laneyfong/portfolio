import { useState, useRef, useEffect } from "react";
import { tokens } from "../tokens";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
};

export const PortfolioAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi — I can help with case studies, design decisions, or quick summaries of the work on this page.",
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
      {/* Right Sidebar Chat */}
      <div
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          width: "25%",
          padding: "32px",
          background: "#FAFAFB",
          borderLeft: "1px solid rgba(26, 26, 26, 0.08)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          zIndex: 900,
          overflowY: "auto",
          boxSizing: "border-box",
          minWidth: "280px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
            height: "30px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: 400,
                color: "#8D8D8D",
                fontFamily: tokens.font.sans,
                letterSpacing: "-0.7px",
                lineHeight: "22px",
              }}
            >
              LAINEY
            </p>
          </div>

          {/* Status Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 10px",
              background: "#FFFFFF",
              border: "1px solid rgba(26, 26, 26, 0.08)",
              borderRadius: "9999px",
              height: "30px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#4060C8",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                fontWeight: 500,
                color: "#1A1A1A",
                fontFamily: tokens.font.sans,
                letterSpacing: "-0.7px",
              }}
            >
              Online
            </span>
          </div>
        </div>

        {/* Intro */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              fontWeight: 400,
              color: "#808080",
              fontFamily: tokens.font.sans,
              lineHeight: "22px",
              letterSpacing: "-0.7px",
            }}
          >
            Ask about projects, design systems, or how I approach 0 to 1 product work.
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "11px",
              fontWeight: 400,
              color: "#808080",
              fontFamily: tokens.font.sans,
              lineHeight: "11px",
              letterSpacing: "-0.4px",
            }}
          >
            Responses are generated based on this portfolio.
          </p>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            overflowY: "auto",
            paddingRight: "8px",
          }}
        >
          {messages.map((msg) => (
            <div key={msg.id} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div
                style={{
                  padding: "14px 16px",
                  background: "#FFFFFF",
                  border: "1px solid rgba(26, 26, 26, 0.08)",
                  borderRadius: "22px",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#1A1A1A",
                  fontFamily: tokens.font.sans,
                  lineHeight: "22px",
                  letterSpacing: "-0.7px",
                }}
              >
                {msg.content}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#8D8D8D",
                  fontFamily: tokens.font.sans,
                  letterSpacing: "0.5px",
                  paddingLeft: "16px",
                  lineHeight: "19px",
                }}
              >
                {formatTime(msg.timestamp)}
              </p>
            </div>
          ))}
          {isLoading && (
            <div style={{ display: "flex", gap: "4px", alignItems: "center", paddingLeft: "16px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#8D8D8D",
                  animation: "bounce 1.4s infinite",
                }}
              />
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#8D8D8D",
                  animation: "bounce 1.4s infinite 0.2s",
                }}
              />
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#8D8D8D",
                  animation: "bounce 1.4s infinite 0.4s",
                }}
              />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Composer */}
        <form
          onSubmit={handleSendMessage}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "12px",
            padding: "10px 16px 14px",
            background: "#FFFFFF",
            border: "1px solid rgba(26, 26, 26, 0.08)",
            borderRadius: "9999px",
            marginTop: "auto",
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything…"
            disabled={isLoading}
            style={{
              flex: 1,
              border: "none",
              background: "none",
              fontFamily: tokens.font.sans,
              fontSize: "14px",
              fontWeight: 400,
              color: "#1A1A1A",
              outline: "none",
              letterSpacing: "-0.7px",
              lineHeight: "19px",
              padding: "1px 0px 2px",
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            style={{
              width: "40px",
              height: "40px",
              background: "#4060C8",
              border: "none",
              borderRadius: "22px",
              cursor: isLoading || !inputValue.trim() ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: isLoading || !inputValue.trim() ? 0.6 : 1,
              transition: "opacity 0.2s ease",
              flexShrink: 0,
            }}
            aria-label="Send message"
          >
            <span style={{ fontSize: "16px" }}>→</span>
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

      {/* Hide on tablets/mobile */}
      <style>{`
        @media (max-width: 1024px) {
          div[style*="position: fixed"][style*="right: 0"] {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
