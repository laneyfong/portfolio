import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./Portfolio";
import AboutPage from "./AboutPage";
import MyShakeCaseStudy from "./MyShakeCaseStudy";
import NvidiaCaseStudy from "./NvidiaCaseStudy";
import GlobalStyles from "./components/GlobalStyles";

function App() {
  return (
    <BrowserRouter>
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
