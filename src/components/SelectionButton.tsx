import { useState, useEffect } from "react";
import { tokens } from "../tokens";

export const SelectionButton = () => {
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
    // Call the global function that PortfolioAssistant sets up
    const openChat = (window as any).__openAineyChat;
    if (openChat && typeof openChat === "function") {
      openChat(selectedText);
      setShowButton(false);
    } else {
      console.error("__openAineyChat function not found");
    }
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
        const askSpan = e.currentTarget.querySelector(".ask-text") as HTMLElement;
        if (askSpan) askSpan.style.color = "#FFFFFF";
        const aineySpan = e.currentTarget.querySelector(".ainey-text") as HTMLElement;
        if (aineySpan) aineySpan.style.color = "#FFFFFF";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#E4E4E4";
        const askSpan = e.currentTarget.querySelector(".ask-text") as HTMLElement;
        if (askSpan) askSpan.style.color = "#808080";
        const aineySpan = e.currentTarget.querySelector(".ainey-text") as HTMLElement;
        if (aineySpan) aineySpan.style.color = "#254DFA";
      }}
      title="Ask AIney about this"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 1430 1100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, transition: "fill 0.6s ease" }}
      >
        <path d="M681.334 163.718C698.242 161.314 715.628 174.162 720.691 189.864C726.954 209.279 726.633 231.393 728.204 251.638C732.037 301.075 746.658 349.661 772.787 391.93C810.136 454.32 886.684 471.188 954.155 475.057C983.726 476.753 1033.69 468.749 1051.81 498.971C1055.94 505.778 1057.22 513.944 1055.35 521.686C1048.5 548.954 1009.59 550.031 987.112 551.336C943.954 553.843 900.537 557.495 862.685 581.1C797.944 621.473 772.018 711.04 774.211 783.424C775.202 816.011 785.99 850.101 778.617 882.989C773.876 905.003 755.421 922.98 731.618 916.904C688.579 903.46 694.826 825.342 694.715 790.212C694.803 773.087 693.908 755.976 692.034 738.949C686.683 693.138 668.903 640.628 631.354 611.149C593.463 581.4 555.207 585.956 511.613 595.391C485.792 601.671 464.464 604.999 438.166 609.81C404.374 615.992 363.227 597.624 384.846 558.427C398.156 534.293 439.95 530.07 466.184 523.745C480.891 520.199 495.342 515.663 509.438 510.167C542.952 497.188 572.863 478.477 595.677 450.045C630.066 407.189 645.835 345.488 642.784 291.115C641.442 270.251 636.786 249.912 634.037 229.17C629.453 194.58 644.396 167.222 681.334 163.718Z" fill="#254DFA"/>
        <path d="M906.584 667.186C915.41 666.22 924.242 667.8 932.649 672.571C959.929 688.052 996.699 733.369 981.428 766.25C978.349 772.878 970.466 777.285 963.463 779.177C928.92 781.762 897.681 738.984 887.047 709.567C880.407 691.189 886.747 672.883 906.584 667.186Z" fill="#254DFA"/>
        <path d="M907.401 231.308C912.728 230.817 917.553 231.535 922.287 234.104C928.083 237.227 932.398 242.533 934.269 248.848C943.43 280.013 895.789 338.411 866.554 347.15C853.301 350.191 840.774 343.343 838.568 329.459C835.286 308.772 847.938 287.019 858.978 270.271C870.247 253.182 886.649 235.377 907.401 231.308Z" fill="#254DFA"/>
        <path d="M561.984 656.599C571.669 655.579 582.048 658.326 584.529 669.067C589.976 692.649 570.495 720.364 557.356 738.53C547.65 751.946 532.073 767.828 516.398 772.312C477.73 777.453 496.525 726 507.793 709.308C520.889 689.903 538 662.786 561.984 656.599Z" fill="#254DFA"/>
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
          color: "#254DFA",
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
