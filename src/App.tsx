import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Portfolio from "./Portfolio";
import AboutPage from "./AboutPage";
import LabPage from "./LabPage";
import ProjectArchivePage from "./ProjectArchivePage";
import MyShakeCaseStudy from "./MyShakeCaseStudy";
import IDBridgeCaseStudy from "./IDBridgeCaseStudy";
import NvidiaCaseStudy from "./NvidiaCaseStudy";
import GlobalStyles from "./components/GlobalStyles";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top immediately and after a small delay to ensure layout is ready
    window.scrollTo(0, 0);
    const timer = setTimeout(() => window.scrollTo(0, 0), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

function PageFadeInWrapper() {
  const { pathname } = useLocation();

  return (
    <div
      key={pathname}
      style={{
        animation: "pageFadeIn 1.2s ease-out forwards",
      }}
    >
      <style>{`
        @keyframes pageFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalStyles />
      <PageFadeInWrapper />
    </BrowserRouter>
  );
}

export default App;
