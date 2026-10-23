import { useState, useEffect } from "react";
import { useChatState } from "../ChatContext";
import { tokens } from "../tokens";

export const SelectionButton = () => {
  const { setIsOpen } = useChatState();
  const [showButton, setShowButton] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        const text = selection.toString().trim();
        setSelectedText(text);

        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        // Position button above selection
        setPosition({
          top: window.scrollY + rect.top - 50,
          left: window.scrollX + rect.left + rect.width / 2,
        });

        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    const handleMouseDown = () => {
      setShowButton(false);
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Ask AIney clicked, opening chat with text:", selectedText);
    // Open chat first
    setIsOpen(true);
    // Then dispatch event with selected text
    window.dispatchEvent(
      new CustomEvent("ainey:selected-text", { detail: selectedText })
    );
    // Hide button last
    setTimeout(() => {
      setShowButton(false);
    }, 50);
  };

  if (!showButton) return null;

  return (
    <button
      onClick={handleClick}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        transform: "translateX(-50%)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        gap: "4px",
        padding: "10px 16px",
        background: "#E4E4E4",
        border: "none",
        borderRadius: "100px",
        cursor: "pointer",
        transition: "all 0.6s ease",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#254DFA";
        const svg = e.currentTarget.querySelector("svg path") as SVGPathElement;
        if (svg) svg.setAttribute("fill", "#FFFFFF");
        const askSpan = e.currentTarget.querySelector(".ask-text") as HTMLElement;
        if (askSpan) askSpan.style.color = "#FFFFFF";
        const aineySpan = e.currentTarget.querySelector(".ainey-text") as HTMLElement;
        if (aineySpan) aineySpan.style.color = "#FFFFFF";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#E4E4E4";
        const svg = e.currentTarget.querySelector("svg path") as SVGPathElement;
        if (svg) svg.setAttribute("fill", "#254DFA");
        const askSpan = e.currentTarget.querySelector(".ask-text") as HTMLElement;
        if (askSpan) askSpan.style.color = "#808080";
        const aineySpan = e.currentTarget.querySelector(".ainey-text") as HTMLElement;
        if (aineySpan) aineySpan.style.color = "#254DFA";
      }}
      title="Ask AIney about this"
    >
      {/* Sparkle Icon */}
      <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, transition: "fill 0.6s ease" }}
      >
        <path
          d="M5.5 0.5L6.5 3L9 4.5L6.5 6L5.5 8.5L4.5 6L2 4.5L4.5 3L5.5 0.5Z"
          fill="#254DFA"
        />
      </svg>
      <span
        className="ask-text"
        style={{
          fontSize: "14px",
          fontWeight: "400",
          color: "#808080",
          fontFamily: tokens.font.sans,
          transition: "color 0.6s ease",
          letterSpacing: "-0.05em",
        }}
      >
        Ask
      </span>
      <span
        className="ainey-text"
        style={{
          fontSize: "14px",
          fontWeight: "400",
          color: "#4060C8",
          fontFamily: tokens.font.sans,
          transition: "color 0.6s ease",
          letterSpacing: "-0.05em",
        }}
      >
        AIney
      </span>
    </button>
  );
};
