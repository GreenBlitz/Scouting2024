import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ScouterApp from "./scouter/ScouterApp";
import MatchList from "./scouter/MatchList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={ScouterApp} />
        <Route path="/MatchList" Component={MatchList} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
