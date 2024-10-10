import { useEffect, useState } from "react";
import TableChart from "./charts/TableChart";
import { getMatchesByCriteria, teamList } from "./StrategyApp";
import { TeamData } from "../TeamData";

interface GeneralTabProps {}

function processTeamData(
  data: TeamData,
  teamNumber: string
): Record<string, string> {
  const table: Record<string, string> = {
    "Team Number": teamNumber,
    Amp: data.getAverage("Amp Score") + "",
    "Amp Miss": data.getAverage("Amp Miss") + "",
    Speaker: data.getAverage("Speaker Score") + "",
    "Speaker Miss": data.getAverage("Speaker Miss") + "",
  };
  return table;
}
const GeneralTab: React.FC<GeneralTabProps> = () => {
  const [teamTable, setTeamTable] = useState<Record<string, string>[]>([]);

  //bruh this is kinda deep
  useEffect(() => {
    async function updateTeamTable() {
      setTeamTable(
        await Promise.all(
          teamList.map(async (team) => {
            const teamNumber = team.slice(0, team.indexOf(`\t`));
            return processTeamData(
              new TeamData(
                await getMatchesByCriteria("Team Number", teamNumber)
              ),
              teamNumber
            );
          })
        )
      );
    }
    updateTeamTable();
  }, []);
  return (
    <>
      <div className="section">
        <h2>Table</h2>
        <TableChart
          matches={teamTable}
          idName={"Team Number"}
          height={540}
          widthOfItem={130}
        />
      </div>
    </>
  );
};
export default GeneralTab;
