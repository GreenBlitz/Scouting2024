import Chart from './PieChart';
import "./App.css";

function App() {
  const pieData: Record<string, [number, string]> = { "Italy": [20, "#fc0d0d"], "France": [20, "#eded13"], "Spain": [20, "#4ded13"], "USA": [20, "#13edd4"], "Argentina": [20, "#2513ed"] };

  return (<Chart pieData={pieData} />)
}

export default App;