import React, { ReactNode, useState } from "react";

type QueryType = "text" | "counter" | "checkbox" | "number" | "list" | "radio";
type Required = boolean | undefined;
interface Props {
    name: string;
    queryType: QueryType;
    required?: Required;
    children?: string[];
}

function ScouterQuery({name, queryType, required, children} : Props) {

    return (
    <div className="scouter-query">
        <h2>{name}</h2>
        {getInput(name, queryType, required, children)}
    </div>
    );
}

function CounterQuery({name} : {name:string}) {
    const [count, setCount] = useState(0)
    return (
        <>
        <button type="button" onClick={() => setCount(Math.max(count - 1,0))}>-</button>
            <h3>{count}</h3>
            <input type="hidden" id={name} name={name} value={count}/>
        <button type="button" onClick={() => setCount(count + 1)}>+</button>
        </>
    )
}

function getInput(name : string, queryType : QueryType, required: Required, children?: string[]) {
    if (queryType == "counter") {
        return <CounterQuery name={name}/>
    }

    if (queryType == "list") {
        return (
        <select name={name} id={name} required={required}>
            {children?.map((item) => <option value={item}>{item}</option>)}
        </select>
        )
    }

    if (queryType == "radio") {
        return (
            children?.map((item) => 
            <>
            <input type="radio" id={item} name={name} value={item} required={required}/>
            <label htmlFor={item}>{item}</label>
            </>
        )
        )
    }

    return <input type={queryType} id={name} name={name} required={required}/>
}

export default ScouterQuery;