import { useLocation, useNavigate } from "react-router-dom";
import Collapsible from "react-collapsible";
import { useState } from "react";
import QRCodeGenerator from "../components/QRCode-Generator";

interface MatchListProps {}

const MatchList: React.FC<MatchListProps> = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [matches] = useState<Record<string, string>[]>([]);
  const latestMatch = location.state;
  if (latestMatch?.["Qual"]) {
    matches.push(latestMatch);
    localStorage.setItem(
      `Matches/${latestMatch["Qual"]}`,
      JSON.stringify(latestMatch)
    );
  }

  return (
    <>
      {matches.map((match) => (
        <Collapsible trigger={match["Qual"]}>
          <QRCodeGenerator text={JSON.stringify(match)} />
        </Collapsible>
      ))}
      <button type="button" onClick={() => navigate("/")}>
        Scout Game
      </button>
    </>
  );
};
export default MatchList;
