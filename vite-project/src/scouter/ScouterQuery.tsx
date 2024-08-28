import { useState } from "react";

interface Props {
    children: string;
    queryType: "text" | "counter" | "checkbox";
}

function ScouterQuery({children, queryType} : Props) {
    const name = children;

    return (
    <div className="scouter-query">
        <h2>{name + "\n"}</h2>
        {queryType != "counter" && <input type={queryType} id={name} name={name} />}
        {queryType == "counter" && <CounterQuery />}
    </div>
    );
}

function CounterQuery() {
    const [selectedNumber, setSelectedNumber] = useState(-1)

    return (
        <>
        <input type="button" onClick={() => setSelectedNumber(selectedNumber - 1)}>-</input>
        <h3>{selectedNumber}</h3>
        <input type="button" onClick={() => setSelectedNumber(selectedNumber + 1)}>+</input>
        </>
    )
}

export default ScouterQuery;