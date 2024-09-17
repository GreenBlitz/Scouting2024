import { useEffect, useState } from "react";
import ScouterQuery from "./ScouterQuery";
import { useNavigate } from "react-router-dom";
import MapQuery from "./querytypes/MapQuery";

function ScouterApp() {
  const [formData, setFormData] = useState<Record<string, string> | undefined>(
    undefined
  );

  const navigate = useNavigate();

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
    Object.keys(sessionStorage)
      .filter((item) => item.startsWith("Queries/"))
      .forEach((item) => sessionStorage.removeItem(item));
  }

  function handleReset() {
    clearQueryStorage();
    window.location.reload();
  }

  useEffect(() => {
    if (formData) {
      navigate("/MatchList", { state: formData });
    }
  }, [formData]);

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <h1 className="scouter-tab">Tests</h1>
      <ScouterQuery queryType="text" name="Name" />
      <ScouterQuery queryType="checkbox" name="Test 2 " />
      <ScouterQuery queryType="counter" name="Test 3 " />
      <ScouterQuery queryType="number" name="Qual" required />
      <ScouterQuery queryType="list" name="Test 5 " list={["1", "2", "3"]} />
      <ScouterQuery
        queryType="radio"
        name="Test 6 "
        list={["a", "b", "c", "d"]}
      />
      <MapQuery
        name="CRESCENDO"
        width={300}
        height={150}
        imagePath="./src/assets/Crescendo Map.png"
        primaryButtons={{ Amp: "yellow", Speaker: "blue", Pass: "purple" }}
        secondaryButtons={{ Successfulness: ["Successful", "Unsuccessful"] }}
      />
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
      <button type="button" onClick={() => navigate("/MatchList")}>
        MatchList
      </button>
    </form>
  );
}

export default ScouterApp;
