import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Portfolio from "./Portfolio";
import AboutPage from "./AboutPage";
import MyShakeCaseStudy from "./MyShakeCaseStudy";
import NvidiaCaseStudy from "./NvidiaCaseStudy";
import GlobalStyles from "./components/GlobalStyles";
import LoadingScreen from "./components/LoadingScreen";

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

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalStyles />
      {!loadingComplete && <LoadingScreen onLoadingComplete={() => setLoadingComplete(true)} />}
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/myshake-design" element={<MyShakeCaseStudy />} />
        <Route path="/nvidia-ai-ux-agent" element={<NvidiaCaseStudy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
