import PieChart from "./PieChart";

interface StrategyAppProps {}
const StrategyApp: React.FC<StrategyAppProps> = () => {
  const pieData: Record<string, [number, string]> = {
    Italy: [20, "rgb(255, 99, 132)"],
    France: [20, "rgb(255, 99, 132)"],
    Spain: [20, "rgb(255, 99, 132)"],
    USA: [20, "rgb(255, 99, 132)"],
    Argentina: [20, "rgb(255, 99, 132)"],
  };

  return <PieChart pieData={pieData} />;
};

export default StrategyApp;
