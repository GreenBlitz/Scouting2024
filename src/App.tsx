import "./App.css";
import StrategyApp from "./strategypage/StrategyApp";
import { RadarComponent } from "./strategypage/RadarChart";
import { RadarInput } from "./strategypage/RadarChart";

function App() {
  const input2: RadarInput = { name: "amountOfApples", max: 100, value: 15.5 };
  const input3: RadarInput = { name: "pain", max: 100, value: 99 };
  const input4: RadarInput = { name: "RP ", max: 100, value: 55 };
  const input5: RadarInput = { name: "defend time", max: 100, value: 50 };
  const input6: RadarInput = { name: "climb spots", max: 100, value: 70 };
  const input7: RadarInput = { name: "violatin", max: 100, value: 40 };
  const input8: RadarInput = { name: "bullshit 1", max: 100, value: 65 };
  const input9: RadarInput = { name: "bullshit 2", max: 100, value: 10 };

  const inputsArr: RadarInput[] = [
    input2,
    input3,
    input4,
    input5,
    input6,
    input7,
    input8,
    input9,
  ];

  return (
    <>
      <StrategyApp></StrategyApp>
      <RadarComponent inputs={inputsArr} width={800}></RadarComponent>
    </>
  );
}

export default App;
