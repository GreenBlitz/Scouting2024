import "./App.css";
import StrategyApp from "./strategypage/StrategyApp";
import { RadarComponent } from "./strategypage/RadarChart";
import { RadarInput } from "./strategypage/RadarChart";

function App() {
  const input2: RadarInput = { name: "0", max: 100, value: 50 };
  const input3: RadarInput = { name: "1", max: 100, value: 60 };
  const input4: RadarInput = { name: "2 ", max: 100, value: 55 };
  const input5: RadarInput = { name: "3", max: 100, value: 20 };
  const input6: RadarInput = { name: "4", max: 100, value: 70 };
  const input7: RadarInput = { name: "5", max: 100, value: 40 };
  const input8: RadarInput = { name: "6", max: 100, value: 65 };
  const input9: RadarInput = { name: "7", max: 100, value: 80 };

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
      <RadarComponent inputs={inputsArr}></RadarComponent>
    </>
  );
}

export default App;
