import React from 'react';
import Chart from './test';
import "./App.css";

function App() {
  const names = ["Italy", "France", "Spain", "USA", "Argentina"];
  const numbers = [20, 20, 20, 20, 20];
  const backgroundColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];
  
  return(<Chart labels={names} data={numbers} backgroundColors={backgroundColors} />)
}

export default App;