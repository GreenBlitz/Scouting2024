import TableChart from "./TableChart";

interface StrategyAppProps {}
const StrategyApp: React.FC<StrategyAppProps> = () => {
  return (
    <TableChart
      matches={[
        { Test1: "Jimmy", Test3: "Mr P" },
        { Test1: "sigma", Test2: "sigmaless" },
      ]}
      idName="Test1"
    ></TableChart>
  );
};

export default StrategyApp;
