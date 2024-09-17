import { useLocation, useNavigate } from "react-router-dom";
import Collapsible from "react-collapsible";
import React, { useState } from "react";
import QRCodeGenerator from "../components/QRCode-Generator";

const MatchList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [matches, setMatches] = useState<Record<string, string>[]>(
    Object.keys(localStorage)
      .filter((match) => match.startsWith("Matches/"))
      .map((matchName) => JSON.parse(localStorage.getItem(matchName) || "{}"))
  );

  const latestMatch = location.state;
  location.state = {};

  if (latestMatch?.["Qual"]) {
    matches.push(latestMatch);
    localStorage.setItem(
      `Matches/${latestMatch["Qual"]}`,
      JSON.stringify(latestMatch)
    );
  }

  function removeMatch(qualNumber: string, index: number) {
    localStorage.removeItem(`Matches/${qualNumber}`);
    const filtered = [...matches];
    filtered.splice(index, 1);
    setMatches(filtered);
  }

  return (
    <div className="match-list">
      {matches.map((match, index) => (
        <Collapsible
          trigger={`Qual ${match["Qual"]}`}
          triggerStyle={{ borderStyle: "solid" }}
        >
          <QRCodeGenerator text={JSON.stringify(match)} />
          <br />
          <button
            type="button"
            onClick={() => removeMatch(match?.["Qual"], index)}
          >
            Delete
          </button>
        </Collapsible>
      ))}
      <button type="button" onClick={() => navigate("/")}>
        Scout Game
      </button>
    </div>
  );
};
export default MatchList;
