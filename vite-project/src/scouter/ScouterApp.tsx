import { useState } from "react";
import ScouterQuery from "./ScouterQuery";
import ScouterTab from "./ScouterTab";

function ScouterApp() {

    const [isSubmitted, submit] = useState(false);
    const [formData, setFormData] = useState({});

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        const formData = new FormData(event.currentTarget);
        event.preventDefault();
        let formValues: Partial<Record<string, string>> = {};
        for (let [key, value] of formData.entries()) {
            formValues[key] = value.toString();
        }
        setFormData(formValues);
        submit(true);
      };

    if (isSubmitted)
        return <p>{JSON.stringify(formData)}</p>


    return (
    <>
    <form onSubmit={handleSubmit}>
        <ScouterTab name="Tests">
            <ScouterQuery queryType="text">Test 1: </ScouterQuery>
            <ScouterQuery queryType="checkbox">Test 2: </ScouterQuery>
            <ScouterQuery queryType="counter">Test 3: </ScouterQuery>
        </ScouterTab>
        <button type="submit">Submit</button>
    </form>
    </>
    );
}
export default ScouterApp;