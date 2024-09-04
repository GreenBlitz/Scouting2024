import { useState } from "react";
import ScouterQuery from "./ScouterQuery";
import ScouterTab from "./ScouterTab";
import QRCodeGenerator from "../functions/QRCode-Generator";

function ScouterApp() {

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>, 
        setFormData: React.Dispatch<React.SetStateAction<Record<string, string> | undefined>>, 
    ){
        const formData = new FormData(event.currentTarget);
        event.preventDefault();
        let formValues: Record<string, string> = {};
        for (let [key, value] of formData.entries()) {
            formValues[key] = value.toString();
        }
        setFormData(formValues);
        localStorage.clear();
    }

    function handleReset() {
        localStorage.clear();
        window.location.reload();
    }

    const [formData, setFormData] = useState<Record<string,string> | undefined>(undefined);

    if (formData)
        return <QRCodeGenerator text={JSON.stringify(formData)} />


    return (
    <>
    <form onSubmit={(event) => handleSubmit(event, setFormData)} onReset={handleReset}>
        <ScouterTab name="Tests">
            <ScouterQuery queryType="text" name="Test 1 " />
            <ScouterQuery queryType="checkbox" name="Test 2 " />
            <ScouterQuery queryType="counter" name="Test 3 " />
            <ScouterQuery queryType="number" name="Test 4 " />
            <ScouterQuery queryType="list" name="Test 5 ">{["1","2","3"]}</ScouterQuery>
            <ScouterQuery queryType="radio" name="Test 6 ">{["a","b","c","d"]}</ScouterQuery>
        </ScouterTab>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
    </form>
    </>
    );
}



export default ScouterApp;