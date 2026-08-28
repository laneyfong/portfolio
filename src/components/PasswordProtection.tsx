import type { FC } from "react";
import { useState } from "react";
import { tokens } from "../tokens";

interface PasswordProtectionProps {
  onUnlock: () => void;
}

const PasswordProtection: FC<PasswordProtectionProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simulate slight delay for UX
    setTimeout(() => {
      // Password is "verisupply" - hash this in production
      if (password === "verisupply") {
        onUnlock();
      } else {
        setError("Incorrect password. Please try again.");
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(4px)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
          maxWidth: 480,
          padding: "60px 40px",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h1
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: tokens.text["2xl"],
              color: tokens.color.ink,
              margin: 0,
            }}
          >
            Confidential Case Study
          </h1>
          <p
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.regular,
              fontSize: tokens.text.base,
              color: tokens.color.body,
              margin: 0,
            }}
          >
            This case study is password-protected.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <input
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
                padding: "12px 16px",
                borderRadius: tokens.radius.md,
                border: error ? `1px solid #cc3333` : `1px solid ${tokens.color.cardBorder}`,
                backgroundColor: tokens.color.white,
                color: tokens.color.ink,
                outline: "none",
                transition: "border-color 0.2s ease",
                opacity: isSubmitting ? 0.6 : 1,
                cursor: isSubmitting ? "not-allowed" : "text",
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
                  color: "#cc3333",
                  margin: 0,
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
              fontSize: tokens.text.base,
              padding: "12px 24px",
              borderRadius: tokens.radius.md,
              border: "none",
              backgroundColor: password.trim() && !isSubmitting ? tokens.color.ink : tokens.color.stroke,
              color: tokens.color.white,
              cursor: password.trim() && !isSubmitting ? "pointer" : "default",
              transition: "background-color 0.2s ease",
              opacity: isSubmitting ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (password.trim() && !isSubmitting) {
                e.currentTarget.style.backgroundColor = tokens.color.ink;
                e.currentTarget.style.opacity = "0.85";
              }
            }}
            onMouseLeave={(e) => {
              if (password.trim() && !isSubmitting) {
                e.currentTarget.style.backgroundColor = tokens.color.ink;
                e.currentTarget.style.opacity = "1";
              }
            }}
          >
            {isSubmitting ? "Unlocking..." : "Unlock"}
          </button>
        </form>

        <p
          style={{
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.regular,
            fontSize: tokens.text.sm,
            color: tokens.color.muted,
            margin: 0,
          }}
        >
          🔒 This content is confidential and password-protected.
        </p>
      </div>
    </div>
  );
};

export default PasswordProtection;
