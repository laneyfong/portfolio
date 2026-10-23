import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { tokens } from "../tokens";
import profilePhoto from "../assets/laney-photo.webp";
import { useChatState } from "../ChatContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  hasResume?: boolean;
  resumeUrl?: string;
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
};

export const PortfolioAssistant = () => {
  const location = useLocation();
  const { isOpen, setIsOpen } = useChatState();
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
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Check if we're on a case study page
  const isCaseStudy = [
    "/myshake-design",
    "/verisupply",
    "/idbridge-design",
    "/nvidia-ai-ux-agent",
  ].includes(location.pathname);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const pageWrapper = document.querySelector(".page-wrapper");
    if (pageWrapper) {
      if (isOpen) {
        pageWrapper.classList.add("chat-visible");
      } else {
        pageWrapper.classList.remove("chat-visible");
      }

      if (isCaseStudy && isOpen) {
        pageWrapper.classList.add("chat-open");
      } else {
        pageWrapper.classList.remove("chat-open");
      }
    }
  }, [isOpen, isCaseStudy]);

  const handleDragStart = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const handleDragMove = (moveEvent: MouseEvent) => {
      const dragDistance = startX - moveEvent.clientX;
      if (dragDistance > 50) {
        setIsOpen(false);
      } else if (dragDistance < -50) {
        setIsOpen(true);
      }
    };
    const handleDragEnd = () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
    };
    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
  };

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
      console.log("Sending message:", inputValue);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.map((m) => ({ role: m.role, content: m.content })).concat([userMessage]),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Got response:", data);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
        hasResume: data.hasResume,
        resumeUrl: data.resumeUrl,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error details:", error);
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
      {/* Peek Tab (visible when closed on case studies) */}
      {isCaseStudy && !isOpen && (
        <div
          data-chat-peek
          style={{
            position: "fixed",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            padding: "12px 8px",
            background: "#F3F3F3",
            border: "1px solid rgba(26, 26, 26, 0.08)",
            borderRadius: "12px 0 0 12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            cursor: "pointer",
            zIndex: 899,
            transition: "all 0.3s ease",
          }}
          onMouseDown={handleDragStart}
          onClick={() => setIsOpen(true)}
          title="Click or drag to open chat"
        >
          {/* Sparkle Icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 0.5L6.5 3L9 4.5L6.5 6L5.5 8.5L4.5 6L2 4.5L4.5 3L5.5 0.5Z"
              fill="#254DFA"
            />
          </svg>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 500,
              color: "#254DFA",
              fontFamily: tokens.font.sans,
              letterSpacing: "-0.5px",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            AI
          </span>
        </div>
      )}

      {/* Drag Handle */}
      <div
        onMouseDown={handleDragStart}
        style={{
          position: "fixed",
          right: isOpen ? "25%" : isCaseStudy && !isOpen ? "32px" : "0",
          top: 0,
          bottom: 0,
          width: "8px",
          background: "transparent",
          cursor: "col-resize",
          zIndex: 901,
          transition: "right 0.3s ease",
        }}
      />

      {/* Right Sidebar Chat */}
      <div
        ref={sidebarRef}
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
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
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
            <div
              style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: 400,
                fontFamily: tokens.font.sans,
                letterSpacing: "-0.7px",
                lineHeight: "22px",
                display: "flex",
                gap: "4px",
                padding: "4px 8px",
              }}
            >
              <span style={{ color: "#254DFA" }}>AI</span>
              <span style={{ color: "#8D8D8D" }}>ney</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
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

            {/* Close Button (for case studies) */}
            {isCaseStudy && (
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                  color: "#8D8D8D",
                  padding: "4px 8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1A1A1A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8D8D8D")}
                title="Close chat"
              >
                ✕
              </button>
            )}
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
            <div key={msg.id} style={{ display: "flex", flexDirection: msg.role === "assistant" ? "row" : "row-reverse", gap: "8px", alignItems: "flex-end" }}>
              {msg.role === "assistant" && (
                <img
                  src={profilePhoto}
                  alt="Laney"
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                <div
                  style={{
                    padding: "14px 16px",
                    background: msg.role === "assistant" ? "#FFFFFF" : "#4060C8",
                    border: msg.role === "assistant" ? "1px solid rgba(26, 26, 26, 0.08)" : "none",
                    borderRadius: "22px",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: msg.role === "assistant" ? "#1A1A1A" : "#FFFFFF",
                    fontFamily: tokens.font.sans,
                    lineHeight: "22px",
                    letterSpacing: "-0.7px",
                  }}
                >
                  {msg.content}
                </div>
                {msg.hasResume && msg.resumeUrl && (
                  <a
                    href={msg.resumeUrl}
                    download
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 14px",
                      background: "#4060C8",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "18px",
                      fontSize: "13px",
                      fontWeight: 500,
                      fontFamily: tokens.font.sans,
                      textDecoration: "none",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      marginLeft: "36px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#3050B0";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#4060C8";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <span>Download Resume</span>
                  </a>
                )}
                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#8D8D8D",
                    fontFamily: tokens.font.sans,
                    letterSpacing: "0.5px",
                    paddingLeft: msg.role === "assistant" ? "36px" : "16px",
                    paddingRight: msg.role === "user" ? "16px" : "0px",
                    lineHeight: "19px",
                  }}
                >
                  {formatTime(msg.timestamp)}
                </p>
              </div>
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

          [data-chat-peek]:hover {
            box-shadow: 0 8px 20px rgba(64, 96, 200, 0.4) !important;
            transform: translateY(-50%) scale(1.05);
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
