import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Portfolio from "./Portfolio";
import AboutPage from "./AboutPage";
import MyShakeCaseStudy from "./MyShakeCaseStudy";
import NvidiaCaseStudy from "./NvidiaCaseStudy";
import GlobalStyles from "./components/GlobalStyles";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalStyles />
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
