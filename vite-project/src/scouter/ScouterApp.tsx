import { useState } from "react";
import ScouterQuery from "./ScouterQuery";
import ScouterTab from "./ScouterTab";

function ScouterApp() {

    const [isSubmitted, submit] = useState(false);
    const [formData, setFormData] = useState({});

    if (isSubmitted)
        return <p>{JSON.stringify(formData)}</p>


    return (
    <>
    <form onSubmit={(event) => handleSubmit(event, setFormData, submit)}>
        <ScouterTab name="Tests">
            <ScouterQuery queryType="text" name="Test 1 " />
            <ScouterQuery queryType="checkbox" name="Test 2 " />
            <ScouterQuery queryType="counter" name="Test 3 " />
            <ScouterQuery queryType="number" name="Test 4 " />
            <ScouterQuery queryType="list" name="Test 5 ">{["1","2","3"]}</ScouterQuery>
            <ScouterQuery queryType="radio" name="Test 6 ">{["a","b","c","d"]}</ScouterQuery>

        </ScouterTab>
        <button type="submit">Submit</button>
    </form>
    </>
    );
}

function handleSubmit(
    event: React.FormEvent<HTMLFormElement>, 
    setFormData: React.Dispatch<React.SetStateAction<{}>>, 
    submit: React.Dispatch<React.SetStateAction<boolean>>
){
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    let formValues: Partial<Record<string, string>> = {};
    for (let [key, value] of formData.entries()) {
        formValues[key] = value.toString();
    }
    setFormData(formValues);
    submit(true)
}
export default ScouterApp;