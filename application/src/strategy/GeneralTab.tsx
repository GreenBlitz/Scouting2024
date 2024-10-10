import TableChart from "./charts/TableChart";
import { getMatchesByCriteria } from "./StrategyApp";

interface GeneralTabProps {}

const GeneralTab: React.FC<GeneralTabProps> = () => {
  return (
    <>
      <div className="section">
        <h2>Table</h2>
        <TableChart
          matches={getMatchesByCriteria()}
          idName={"Qual"}
          height={540}
          widthOfItem={130}
        />
      </div>
    </>
  );
};
export default GeneralTab;
