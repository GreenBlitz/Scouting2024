import React, { useState } from "react";

type QueryType = "text" | "counter" | "checkbox";

interface Props {
    children: string;
    queryType: QueryType;
}

function ScouterQuery({children, queryType} : Props) {
    const name = children;

    return (
    <div className="scouter-query">
        <h2>{name}</h2>
        {getInput(queryType, children)}
    </div>
    );
}

function CounterQuery({name} : {name?:string}) {
    const [count, setCount] = useState(0)
    return (
        <>
        <button type="button" onClick={() => setCount(Math.max(count - 1,0))}>-</button>
            <h3>{count}</h3>
        <button type="button" onClick={() => setCount(count + 1)}>+</button>
        </>
    )
}

function getInput(queryType : QueryType, name? : string) {
    if (queryType == "counter") {
        return <CounterQuery name={name}/>
    }
    return <input type={queryType} id={name} name={name} />
}

export default ScouterQuery;