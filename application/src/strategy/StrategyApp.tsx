import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import TeamTab from "./TeamTab";
import GeneralTab from "./GeneralTab";

interface StrategyAppProps {}
export async function getMatchesByCriteria(field?: string, value?: string) {
  const searchedField = field && value ? `/${field}/${value}` : ``;
  const data: Record<string, string>[] = await fetch(
    `http://192.168.1.126:4590/Matches${searchedField}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      alert(error.message);
      return [];
    });
  return data;
}
const StrategyApp: React.FC<StrategyAppProps> = () => {
  function renderNavBar() {
    return (
      <nav className="scouter-nav-bar">
        <ul>
          <li>
            <Link to="/">Team View</Link>
          </li>
          <li>
            <Link to="/General">General View</Link>
          </li>
        </ul>
      </nav>
    );
  }
  return (
    <BrowserRouter>
      {renderNavBar()}
      <Routes>
        <Route path="/" Component={TeamTab} />
        <Route path="/General" Component={GeneralTab} />
      </Routes>
    </BrowserRouter>
  );
};

export default StrategyApp;
