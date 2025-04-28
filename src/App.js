import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from "./portfolio";
import NotFound from "./NotFound";
import ProjectInfo from "./ProjectInfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/project-info" element={<ProjectInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;