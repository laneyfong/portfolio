import type { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import NavPill from "./NavPill";

const ROUTES: Record<string, string> = {
  Work: "/",
  About: "/about",
};

const Header: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const active = location.pathname === "/about" ? "About" : "Work";

  const handleSelect = (item: string) => {
    const path = ROUTES[item];
    if (path) navigate(path);
  };

  return (
    <>
      {/* Logo — left, scrolls with the page (not sticky/fixed) */}
      <div style={{ padding: "20px clamp(16px, 6vw, 64px) 0" }}>
        <Logo />
      </div>

      {/* Nav pill — the only piece that stays fixed in view while scrolling */}
      <div
        style={{
          position: "fixed",
          top: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
        }}
      >
        <NavPill active={active} onSelect={handleSelect} />
      </div>
    </>
  );
};

export default Header;
