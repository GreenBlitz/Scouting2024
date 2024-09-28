import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import ScouterTab from "./ScoutingTab";
import MatchList from "./MatchList";
import React from "react";

function ScouterApp() {
  function renderNavBar() {
    return (
      <nav className="scouter-nav-bar">
        <ul>
          <li>
            <Link to="/">Match List</Link>
          </li>
          <li>
            <Link to="/ScouterTab">Scout Game</Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <BrowserRouter>
      {renderNavBar()}
      <Routes>
        <Route path="/ScouterTab" Component={ScouterTab} />
        <Route path="/" Component={MatchList} />
      </Routes>
    </BrowserRouter>
  );
}

export default ScouterApp;
