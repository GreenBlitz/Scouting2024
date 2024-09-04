import { useState } from "react";

type QueryType = "text" | "counter" | "checkbox" | "number" | "list" | "radio";
type Required = boolean | undefined;
interface Props {
    name: string;
    queryType: QueryType;
    required?: Required;
    children?: string[];
}

function ScouterQuery({name, queryType, required, children} : Props) {

    
    
    function renderInput() {
        const initialValue = localStorage.getItem(name) || "";
        if (queryType === "counter") {
            return <CounterQuery name={name} defaultValue={initialValue}/>
        }
    
        if (queryType === "list") {
            return (
            <select name={name} id={name} required={required} defaultValue={initialValue} onChange={(event) => localStorage.setItem(name, event.target.value)}>
                {children?.map((item) => <option value={item} key={item}>{item}</option>)}
            </select>
            )
        }
        
        if (queryType === "radio") {
            return (
                children?.map((item) => 
                <>
                {initialValue === item 
                ? <input type="radio" id={item} name={name} value={item} required={required} onChange={(event) => localStorage.setItem(name, item)} checked/>
                : <input type="radio" id={item} name={name} value={item} required={required} onChange={(event) => localStorage.setItem(name, item)}/>
                }
                <label htmlFor={item}>{item}</label>
                </>
            )
            )
        }
    
        return <input type={queryType} id={name} name={name} required={required} defaultValue={initialValue} onChange={(event) => localStorage.setItem(name, event.target.value)}/>
    }

    return (
    <div className="scouter-query" key={name}>
        <h2>{name}</h2>
        {renderInput()}
    </div>
    );
}

function CounterQuery({name, defaultValue} : {name:string, defaultValue: string}) {

    const startingNumber = defaultValue === "" ? 0 : parseInt(defaultValue);
    const [count, setCountState] = useState(startingNumber);

    function setCount(newCount: number) {
        localStorage.setItem(name,newCount + "");
        setCountState(newCount)
    }

    return (
        <>
        <button type="button" onClick={() => setCount(Math.max(count - 1,0))} key={name + "-"}>-</button>
            <h3>{count}</h3>
            <input type="hidden" id={name} name={name} value={count} onReset={(event) => setCount(0)} />
        <button type="button" onClick={() => setCount(count + 1)} key={name + "+"}>+</button>
        </>
    )
}



export default ScouterQuery;