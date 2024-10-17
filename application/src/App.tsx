import React from "react";
import "./App.css";

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ScouterTab from "./scouter/ScoutingTab";
import MatchList from "./scouter/MatchList";
import ScanningTab from "./scouter/scanner/ScanningTab";
import GeneralTab from "./strategy/GeneralTab";
import TeamTab from "./strategy/TeamTab";
import AutoTab from "./strategy/AutoTab";

export function renderScouterNavBar() {
  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <Link to="/">Match List</Link>
        </li>
        <li>
          <Link to="/ScouterTab">Scout Game</Link>
        </li>
        <li>
          <Link to="/ScannerTab">Scan Match</Link>
        </li>
      </ul>
    </nav>
  );
}

export function renderStrategyNavBar() {
  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <Link to="/">Scouter Side</Link>
        </li>
        <li>
          <Link to="/AutoTab">Auto Data</Link>
        </li>
        <li>
          <Link to="/TeamTab">Team Data</Link>
        </li>
        <li>
          <Link to="/GeneralTab">General</Link>
        </li>
      </ul>
    </nav>
  );
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ScannerTab" Component={ScanningTab} />
        <Route path="/" Component={MatchList} />
        <Route path="/ScouterTab" Component={ScouterTab} />
        <Route path="/TeamTab" Component={TeamTab} />
        <Route path="/GeneralTab" Component={GeneralTab} />
        <Route path="/AutoTab" Component={AutoTab} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
