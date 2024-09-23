import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import ScouterTab from "./scouter/ScoutingTab";
import MatchList from "./scouter/MatchList";
import ScanningTab from "./scouter/scanner/ScanningTab";

function App() {
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
          <li>
            <Link to="/ScannerTab">Scan Match</Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <BrowserRouter>
      {renderNavBar()}
      <Routes>
        <Route path="/ScannerTab" Component={ScanningTab} />
        <Route path="/ScouterTab" Component={ScouterTab} />
        <Route path="/" Component={MatchList} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
