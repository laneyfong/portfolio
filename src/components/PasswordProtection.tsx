import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../tokens";

interface PasswordProtectionProps {
  onUnlock: () => void;
}

const PasswordProtection: FC<PasswordProtectionProps> = ({ onUnlock }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    setTimeout(() => {
      if (password === "verisupply") {
        onUnlock();
      } else {
        setError("Incorrect password");
        setPassword("");
      }
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-primary)",
        zIndex: 9999,
        transition: "background 0.3s ease",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        aria-label="Back to home"
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "transparent",
          border: "1px solid var(--border-color)",
          color: "var(--text-dark)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10000,
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--surface-light)";
          e.currentTarget.style.borderColor = "var(--text-muted)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.borderColor = "var(--border-color)";
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <style>{`
        @media (max-width: 768px) {
          .password-container {
            padding: 40px 20px !important;
            max-width: 100% !important;
          }
          .password-input {
            font-size: 16px !important;
          }
        }
      `}</style>

      <div
        className="password-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "400px",
          width: "100%",
          padding: "60px 40px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h1
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: tokens.text.lg,
              color: "var(--text-dark)",
              margin: 0,
              letterSpacing: "-0.05em",
            }}
          >
            Password required
          </h1>
          <p
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.regular,
              fontSize: tokens.text.sm,
              color: "var(--text-secondary)",
              margin: 0,
              lineHeight: tokens.leading.normal,
            }}
          >
            This case study is confidential. Enter the password to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <input
              className="password-input"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter password"
              disabled={isSubmitting}
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                padding: "12px 14px",
                borderRadius: tokens.radius.sm,
                border: error ? "1px solid #DC2626" : "1px solid var(--border-color)",
                background: "var(--bg-primary)",
                color: "var(--text-dark)",
                outline: "none",
                transition: "border-color 0.2s ease, background 0.3s ease",
                opacity: isSubmitting ? 0.6 : 1,
                cursor: isSubmitting ? "not-allowed" : "text",
                boxSizing: "border-box",
                WebkitFontSmoothing: "antialiased",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isSubmitting) {
                  handleSubmit(e as any);
                }
              }}
            />
            {error && (
              <p
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: tokens.text.sm,
                  color: "#DC2626",
                  margin: 0,
                  letterSpacing: "-0.05em",
                }}
              >
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !password.trim()}
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: tokens.text.sm,
              padding: "11px 16px",
              borderRadius: tokens.radius.sm,
              border: "none",
              backgroundColor: password.trim() && !isSubmitting ? "var(--text-dark)" : "var(--border-color)",
              color: password.trim() && !isSubmitting ? "white" : "var(--text-muted)",
              cursor: password.trim() && !isSubmitting ? "pointer" : "default",
              transition: "background-color 0.2s ease, color 0.2s ease",
              letterSpacing: "-0.05em",
              opacity: isSubmitting ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (password.trim() && !isSubmitting) {
                e.currentTarget.style.backgroundColor = "var(--text-dark)";
                e.currentTarget.style.opacity = "0.9";
              }
            }}
            onMouseLeave={(e) => {
              if (password.trim() && !isSubmitting) {
                e.currentTarget.style.backgroundColor = "var(--text-dark)";
                e.currentTarget.style.opacity = "1";
              }
            }}
          >
            {isSubmitting ? "Unlocking..." : "Unlock"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordProtection;
