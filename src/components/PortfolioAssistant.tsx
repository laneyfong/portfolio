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
  const isInitialMount = useRef(true);

  // Check if we're on a case study page
  const isCaseStudy = [
    "/myshake-design",
    "/verisupply",
    "/idbridge-design",
    "/nvidia-ai-ux-agent",
  ].includes(location.pathname);

  // Close chat on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, setIsOpen]);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        if (!target.closest('[data-chat-peek]') && !target.closest('button[title*="AIney"]')) {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    const handlePrefillText = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const selectedText = customEvent.detail;
      setInputValue(`Ask about: "${selectedText}"`);
    };

    window.addEventListener("ainey:prefill-text", handlePrefillText);
    return () => window.removeEventListener("ainey:prefill-text", handlePrefillText);
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const chatContainer = messagesEndRef.current.closest('[style*="overflowY"]');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    // Only scroll if chat is open
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);


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

  const handleSendMessage = async (e: React.FormEvent | { preventDefault: () => void }, promptText?: string) => {
    e.preventDefault();
    const messageText = promptText || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
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
            padding: "16px 12px",
            background: "#F3F3F3",
            border: "none",
            borderRadius: "12px 0 0 12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            cursor: "pointer",
            zIndex: 899,
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(64, 96, 200, 0.15)",
          }}
          onMouseDown={handleDragStart}
          onClick={() => setIsOpen(true)}
          title="Click or drag to open chat"
        >
          {/* AI Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 1430 1100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M681.334 163.718C698.242 161.314 715.628 174.162 720.691 189.864C726.954 209.279 726.633 231.393 728.204 251.638C732.037 301.075 746.658 349.661 772.787 391.93C810.136 454.32 886.684 471.188 954.155 475.057C983.726 476.753 1033.69 468.749 1051.81 498.971C1055.94 505.778 1057.22 513.944 1055.35 521.686C1048.5 548.954 1009.59 550.031 987.112 551.336C943.954 553.843 900.537 557.495 862.685 581.1C797.944 621.473 772.018 711.04 774.211 783.424C775.202 816.011 785.99 850.101 778.617 882.989C773.876 905.003 755.421 922.98 731.618 916.904C688.579 903.46 694.826 825.342 694.715 790.212C694.803 773.087 693.908 755.976 692.034 738.949C686.683 693.138 668.903 640.628 631.354 611.149C593.463 581.4 555.207 585.956 511.613 595.391C485.792 601.671 464.464 604.999 438.166 609.81C404.374 615.992 363.227 597.624 384.846 558.427C398.156 534.293 439.95 530.07 466.184 523.745C480.891 520.199 495.342 515.663 509.438 510.167C542.952 497.188 572.863 478.477 595.677 450.045C630.066 407.189 645.835 345.488 642.784 291.115C641.442 270.251 636.786 249.912 634.037 229.17C629.453 194.58 644.396 167.222 681.334 163.718Z" fill="#254DFA"/>
            <path d="M906.584 667.186C915.41 666.22 924.242 667.8 932.649 672.571C959.929 688.052 996.699 733.369 981.428 766.25C978.349 772.878 970.466 777.285 963.463 779.177C928.92 781.762 897.681 738.984 887.047 709.567C880.407 691.189 886.747 672.883 906.584 667.186Z" fill="#254DFA"/>
            <path d="M907.401 231.308C912.728 230.817 917.553 231.535 922.287 234.104C928.083 237.227 932.398 242.533 934.269 248.848C943.43 280.013 895.789 338.411 866.554 347.15C853.301 350.191 840.774 343.343 838.568 329.459C835.286 308.772 847.938 287.019 858.978 270.271C870.247 253.182 886.649 235.377 907.401 231.308Z" fill="#254DFA"/>
            <path d="M561.984 656.599C571.669 655.579 582.048 658.326 584.529 669.067C589.976 692.649 570.495 720.364 557.356 738.53C547.65 751.946 532.073 767.828 516.398 772.312C477.73 777.453 496.525 726 507.793 709.308C520.889 689.903 538 662.786 561.984 656.599Z" fill="#254DFA"/>
          </svg>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 400,
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
          right: isOpen ? "calc(25% - 4px)" : isCaseStudy && !isOpen ? "32px" : "0",
          top: 0,
          bottom: 0,
          width: "8px",
          background: "transparent",
          cursor: "col-resize",
          zIndex: 901,
          transition: "right 0.3s ease",
        }}
      />

      {/* Right Sidebar Chat - 25% responsive width */}
      <div
        ref={sidebarRef}
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          width: "25%",
          padding: "40px 40px 16px",
          background: "rgba(250,250,251,1)",
          borderLeft: "0.5px solid rgba(26, 26, 26, 0.05)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          zIndex: 900,
          overflowY: "auto",
          boxSizing: "border-box",
          minWidth: "320px",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
        }}
      >
        {/* Close Button - visible on all pages when open */}
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "#E4E4E4",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
              color: "#1A1A1A",
              padding: "8px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.6s ease",
              borderRadius: "100px",
              width: "36px",
              height: "36px",
              zIndex: 1000,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#254DFA";
              e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#E4E4E4";
              e.currentTarget.style.color = "#1A1A1A";
            }}
            title="Close chat (Esc)"
          >
            ✕
          </button>
        )}

        {/* Intro */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              fontWeight: 400,
              color: "rgba(26,26,26,1)",
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
              color: "rgba(128,128,128,1)",
              fontFamily: tokens.font.sans,
              lineHeight: "11px",
              letterSpacing: "-0.4px",
            }}
          >
            Responses are generated based on this portfolio.
          </p>
        </div>

        {/* Suggested Prompts - only show when chat is fresh */}
        {messages.length === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              "What's your design approach?",
              "Tell me about your background",
              "Why me?"
            ].map((prompt) => (
              <button
                key={prompt}
                onClick={(e) => handleSendMessage(e, prompt)}
                style={{
                  padding: "12px 16px",
                  background: "rgba(64, 96, 200, 0.08)",
                  border: "0.5px solid rgba(64, 96, 200, 0.2)",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "rgba(26,26,26,1)",
                  fontFamily: tokens.font.sans,
                  cursor: "pointer",
                  letterSpacing: "-0.7px",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(64, 96, 200, 0.15)";
                  e.currentTarget.style.borderColor = "rgba(64, 96, 200, 0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(64, 96, 200, 0.08)";
                  e.currentTarget.style.borderColor = "rgba(64, 96, 200, 0.2)";
                }}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            overflowY: "auto",
            paddingRight: "8px",
          }}
        >
          {messages.map((msg) => (
            <div key={msg.id} style={{ display: "flex", flexDirection: msg.role === "assistant" ? "row" : "row-reverse", gap: "8px", width: "100%" }}>
              {msg.role === "assistant" && (
                <img
                  src={profilePhoto}
                  alt="Laney"
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1, maxWidth: "346px" }}>
                <div
                  style={{
                    padding: "14px 16px",
                    background: msg.role === "assistant" ? "rgba(255,255,255,1)" : "rgba(91,125,181,1)",
                    borderRadius: "22px",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: msg.role === "assistant" ? "rgba(26,26,26,1)" : "rgba(250,250,251,1)",
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
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 16px",
                      background: "#35489B",
                      color: "#FFFFFF",
                      borderRadius: "100px",
                      fontSize: "14px",
                      fontWeight: 400,
                      fontFamily: tokens.font.sans,
                      textDecoration: "none",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      height: "42px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#2A3A7F";
                      e.currentTarget.style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#35489B";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <span style={{ letterSpacing: "-0.7px" }}>Download Resume</span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ flexShrink: 0 }}
                    >
                      <path
                        d="M10 3V17M3 10L10 17L17 10"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{ display: "flex", gap: "4px", alignItems: "center", paddingLeft: "53px" }}>
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
            padding: "10px 16px",
            background: "rgba(255,255,255,1)",
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
              color: "rgba(117,117,117,1)",
              outline: "none",
              letterSpacing: "-0.7px",
              lineHeight: "19px",
              padding: "0px",
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            style={{
              width: "40px",
              height: "40px",
              background: "rgba(64,96,200,1)",
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
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 1L14 7M14 7L8 13M14 7H1"
                stroke="rgba(255,255,255,1)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
