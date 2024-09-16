import { useState } from "react";
import ScouterQuery from "./ScouterQuery";
import QRCodeGenerator from "../components/QRCode-Generator";
import MapQuery from "./querytypes/MapQuery";

function ScouterApp() {
  const [formData, setFormData] = useState<Record<string, string> | undefined>(
    undefined
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    let formValues: Record<string, string> = {};
    for (let [key, value] of formData.entries()) {
      formValues[key] = value.toString();
    }
    setFormData(formValues);
    clearQueryStorage();
  }

  function clearQueryStorage() {
    let itemNumber = 0;
    let item = localStorage.key(itemNumber);
    while (item != null) {
      if (item.startsWith("Queries/")) {
        localStorage.removeItem(item);
      } else {
        itemNumber++;
      }
      item = localStorage.key(itemNumber);
    }
  }

  function handleReset() {
    clearQueryStorage();
    window.location.reload();
  }

  if (formData) {
    return <QRCodeGenerator text={JSON.stringify(formData)} />;
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <h1 className="scouter-tab">Tests</h1>
      <ScouterQuery queryType="text" name="Test 1 " />
      <ScouterQuery queryType="checkbox" name="Test 2 " />
      <ScouterQuery queryType="counter" name="Test 3 " />
      <ScouterQuery queryType="number" name="Test 4 " />
      <ScouterQuery queryType="list" name="Test 5 " list={["1", "2", "3"]} />
      <ScouterQuery
        queryType="radio"
        name="Test 6 "
        list={["a", "b", "c", "d"]}
      />
      <MapQuery
        name="CRESCENDO"
        width={640}
        height={360}
        imagePath="./src/assets/Crescendo Map.png"
        primaryButtons={{ Amp: "yellow", Speaker: "blue", Pass: "purple" }}
        secondaryButtons={{ Successfulness: ["Successful", "Unsuccessful"] }}
      />
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  );
}

export default ScouterApp;
