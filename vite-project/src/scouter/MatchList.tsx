import { useLocation, useNavigate } from "react-router-dom";
import Collapsible from "react-collapsible";
import React, { useState } from "react";
import QRCodeGenerator from "../components/QRCode-Generator";

interface MatchListProps {}

const MatchList: React.FC<MatchListProps> = ({}) => {
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
    const filtered = [...matches].splice(index, 1);
    console.log(index);
    console.log(filtered);
    setMatches(filtered);
  }

  return (
    <>
      {matches.map((match, index) => (
        <Collapsible trigger={match["Qual"]}>
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
    </>
  );
};
export default MatchList;
