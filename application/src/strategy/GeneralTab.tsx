import { useEffect, useState } from "react";
import TableChart from "./charts/TableChart";
import { getMatchesByCriteria } from "./StrategyApp";

interface GeneralTabProps {}

const GeneralTab: React.FC<GeneralTabProps> = () => {
  const [teamList, setTeamList] = useState<Record<string, string>[]>([]);

  useEffect(() => {
    async function updateMatchList() {
      setTeamList(await getMatchesByCriteria());
    }
    updateMatchList();
  }, []);
  return (
    <>
      <div className="section">
        <h2>Table</h2>
        <TableChart
          matches={teamList}
          idName={"Team Number"}
          height={540}
          widthOfItem={130}
        />
      </div>
    </>
  );
};
export default GeneralTab;
