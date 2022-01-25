import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

// component (global)
import GlobalNavigationBar from "./components/GlobalNavigationBar";

// component (routed)
import Main from "./pages/Main";

function App() {
  return <div className="application">
    <RecoilRoot>
      <GlobalNavigationBar/>
      <Router>
        <Routes> { /* name changed: Switch -> Routes */ }
          <Route path="/" element={ <Main/> }/>
        </Routes>
      </Router>
    </RecoilRoot>
  </div>;
}

export default App;