import RadarComponent, { RadarInput } from "./RadarChart";

interface StrategyAppProps {}
const StrategyApp: React.FC<StrategyAppProps> = () => {
  const inputsArr: RadarInput[] = [
    { name: "amountOfApples", max: 100, value: 15.5 },
    { name: "pain", max: 100, value: 99 },
    { name: "RP ", max: 100, value: 55 },
    { name: "defend time", max: 100, value: 50 },
    { name: "climb spots", max: 100, value: 70 },
    { name: "violatin", max: 100, value: 40 },
    { name: "bullshit 1", max: 100, value: 65 },
    { name: "bullshit 2", max: 100, value: 10 },
  ];

  return (
    <>
      <RadarComponent inputs={inputsArr} size={800} substeps={10} />
    </>
  );
};

export default StrategyApp;
