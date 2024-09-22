import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ScouterTab from "./scouter/ScoutingTab";
import MatchList from "./scouter/MatchList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ScouterTab" Component={ScouterTab} />
        <Route path="/" Component={MatchList} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
