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

  const handleClick = () => {
    setIsOpen(true);
    // Dispatch custom event with selected text
    window.dispatchEvent(
      new CustomEvent("ainey:selected-text", { detail: selectedText })
    );
    setShowButton(false);
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
        padding: "8px 16px",
        background: "#4060C8",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "13px",
        fontWeight: 500,
        fontFamily: tokens.font.sans,
        cursor: "pointer",
        letterSpacing: "-0.5px",
        boxShadow: "0 4px 12px rgba(64, 96, 200, 0.3)",
        whiteSpace: "nowrap",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#2A4B99";
        e.currentTarget.style.transform = "translateX(-50%) scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#4060C8";
        e.currentTarget.style.transform = "translateX(-50%) scale(1)";
      }}
      title="Ask AIney about this"
    >
      Ask AIney
    </button>
  );
};
