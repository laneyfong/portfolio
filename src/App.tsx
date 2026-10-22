import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Portfolio from "./Portfolio";
import AboutPage from "./AboutPage";
import LabPage from "./LabPage";
import ProjectArchivePage from "./ProjectArchivePage";
import MyShakeCaseStudy from "./MyShakeCaseStudy";
import IDBridgeCaseStudy from "./IDBridgeCaseStudy";
import NvidiaCaseStudy from "./NvidiaCaseStudy";
import VeriSupplyCaseStudy from "./VeriSupplyCaseStudy";
import GlobalStyles from "./components/GlobalStyles";
import { PortfolioAssistant } from "./components/PortfolioAssistant";
import { ChatProvider } from "./ChatContext";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTopNow = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTopNow();

    // Multiple timing attempts with increasing delays to ensure layout is fully ready
    const timers = [0, 50, 100, 200, 300].map(delay =>
      setTimeout(scrollToTopNow, delay)
    );

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [pathname]);

  return null;
}

function PageFadeInWrapper() {
  const { pathname } = useLocation();
  const isCaseStudy = [
    "/myshake-design",
    "/verisupply",
    "/idbridge-design",
    "/nvidia-ai-ux-agent",
  ].includes(pathname);

  return (
    <div
      key={pathname}
      style={{
        animation: "pageFadeIn 2.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      }}
      className={`page-wrapper ${isCaseStudy ? "case-study" : ""}`}
    >
      <style>{`
        @keyframes pageFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (min-width: 1025px) {
          .page-wrapper {
            box-sizing: border-box;
            transition: max-width 0.3s ease;
            max-width: 100%;
          }

          .page-wrapper.chat-visible {
            max-width: 75%;
          }

          .page-wrapper.case-study {
            max-width: 100%;
          }

          .page-wrapper.case-study.chat-visible {
            max-width: 75%;
          }
        }
      `}</style>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/lab" element={<LabPage />} />
        <Route path="/archive" element={<ProjectArchivePage />} />
        <Route path="/myshake-design" element={<MyShakeCaseStudy />} />
        <Route path="/idbridge-design" element={<IDBridgeCaseStudy />} />
        <Route path="/nvidia-ai-ux-agent" element={<NvidiaCaseStudy />} />
        <Route path="/verisupply" element={<VeriSupplyCaseStudy />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ChatProvider>
        <ScrollToTop />
        <GlobalStyles />
        <PageFadeInWrapper />
        <PortfolioAssistant />
        <Analytics />
      </ChatProvider>
    </BrowserRouter>
  );
}

export default App;
