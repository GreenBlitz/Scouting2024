import TableChart from "./TableChart";

interface StrategyAppProps {}
const StrategyApp: React.FC<StrategyAppProps> = () => {
  return (
    <TableChart
      matches={[
        { Test1: "Jimmy", Test3: "Mr P", Jimmy: "Shimmy" },
        { Test1: "sigma", Test2: "sigmaless", Jimmy: "Johannesburg" },
      ]}
      calculations={{
        skibidi: (match) => match["Test1"] + " " + match["Jimmy"],
      }}
      idName="Test1"
      widthOfItem={130}
      height={400}
    ></TableChart>
  );
};

export default StrategyApp;
