import { useLocation, useNavigate } from "react-router-dom";
import Collapsible from "react-collapsible";
import React, { useState } from "react";
import QRCodeGenerator from "../../components/QRCode-Generator";
import {
  getServerHostname,
  matchToSheet,
  matchValuesToSheet,
} from "../../Utils";

export const matchName = "Qual";
const matchesTab = "Matches/";

const MatchList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [matches, setMatches] = useState<Record<string, string>[]>(
    Object.keys(localStorage)
      .filter((match) => match.startsWith(matchesTab))
      .map((matchName) => JSON.parse(localStorage.getItem(matchName) || "{}"))
  );

  const latestMatch = location.state;
  location.state = {};

  if (latestMatch?.[matchName]) {
    matches.push(latestMatch);
    localStorage.setItem(
      matchesTab + latestMatch[matchName],
      JSON.stringify(latestMatch)
    );
  }

  function removeMatch(qualNumber: string, index: number) {
    localStorage.removeItem(matchesTab + qualNumber);
    const filtered = [...matches];
    filtered.splice(index, 1);
    setMatches(filtered);
    navigate("/");
  }

  function sendMatch(match: Record<string, string>, index: number) {
    fetch(`http://${getServerHostname()}/Match`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(match),
    })
      .then(() => removeMatch(match?.[matchName], index))
      .catch(() => {
        alert("Unable To Send Match.");
      });
  }

  function printMatches() {
    fetch(`http://${getServerHostname()}/Matches`)
      .then((res) => res.json())
      .then((res) => {
        const listy: Record<string, string>[] = res;
        let stringy = "";
        stringy += matchToSheet(listy[0]);
        for (const item of listy) {
          stringy += "\n" + matchValuesToSheet(item);
        }
        console.log(stringy);
      });
  }

  return (
    <div className="match-list">
      {matches.map((match, index) => (
        <Collapsible
          trigger={`${matchName} ${match[matchName]}`}
          triggerClassName={"collapsible-trigger"}
          key={index}
        >
          <QRCodeGenerator text={JSON.stringify(match)} />
          <br />
          <button
            type="button"
            onClick={() => removeMatch(match?.[matchName], index)}
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => {
              printMatches();
              sendMatch(match, index);
            }}
          >
            Send
          </button>
        </Collapsible>
      ))}
    </div>
  );
};
export default MatchList;
