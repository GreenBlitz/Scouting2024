import ScouterQuery, { localStorageTabName } from "./ScouterQuery";
import { useNavigate } from "react-router-dom";
import MapQuery from "./querytypes/MapQuery";
import { matchName } from "./MatchList";
import React from "react";

function ScouterTab() {
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formValues: Record<string, string> = {};
    Object.keys(localStorage)
      .filter((item) => item.startsWith(localStorageTabName))
      .forEach((item) => {
        formValues[item.slice(localStorageTabName.length)] =
          localStorage.getItem(item) + "";
        localStorage.removeItem(item);
      });
    navigate("/", { state: formValues });
  }

  function clearQueryStorage() {
    Object.keys(localStorage)
      .filter((item) => item.startsWith(localStorageTabName))
      .forEach((item) => localStorage.removeItem(item));
  }

  function handleReset() {
    clearQueryStorage();
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <h1 className="scouter-tab">Tests</h1>
      <ScouterQuery queryType="text" name="Name" />
      <ScouterQuery queryType="checkbox" name="Test 2 " />
      <ScouterQuery queryType="counter" name="Test 3 " />
      <ScouterQuery queryType="number" name={matchName} required />
      <ScouterQuery queryType="list" name="Test 5 " list={["1", "2", "3"]} />
      <ScouterQuery
        queryType="radio"
        name="Test 6 "
        list={["a", "b", "c", "d"]}
      />
      <MapQuery
        name="CRESCENDO"
        side="blue"
        width={540}
        height={240}
        imagePath="./src/assets/Crescendo Map Blue.png"
      />
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  );
}

export default ScouterTab;
