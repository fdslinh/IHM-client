import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from "./FrontPage";
import Question from "./Question";
import ManageQuestion from "./ManageQuestion";
// import SearchPage from "./SearchPage";
// import RegisterPage from "./RegisterPage";
// import LeaderboardPage from "./LeaderboardPage";
// import ContributePage from "./ContributePage";
// import AboutPage from "./AboutPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/question" element={<Question />} />
        <Route path="/manage" element={<ManageQuestion />} />
        {/* <Route path="/search" element={<SearchPage />} /> */}
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        {/* <Route path="/leaderboard" element={<LeaderboardPage />} /> */}
        {/* <Route path="/contribute" element={<ContributePage />} /> */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
