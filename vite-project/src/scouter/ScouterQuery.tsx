import { useState } from "react";

interface Props {
    name: string;
    queryType: "text" | "counter" | "checkbox" | "number" | "list" | "radio";
    required?: boolean | undefined;
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
                {
                    item === initialValue 
                    ? <input type="radio" id={item} name={name} value={item} required={required} onChange={() => localStorage.setItem(name, item)} defaultChecked/>
                    : <input type="radio" id={item} name={name} value={item} required={required} onChange={() => localStorage.setItem(name, item)}/>
                }
                <label htmlFor={item}>{item}</label>
                </>
                )
            )
        }
        if (queryType === "checkbox") {
            function updateCheckbox() {
                const newValue = localStorage.getItem(name) === "true" ? "false" : "true";
                localStorage.setItem(name, newValue);
            }
            return <input type={queryType} id={name} name={name} required={required} onChange={updateCheckbox} defaultChecked={initialValue === "true"}/>
        }
    
        return <input type={queryType} id={name} name={name} required={required} defaultValue={initialValue} onChange={(event) => localStorage.setItem(name, event.target.value)}/>
    }

    return (
    <div className="scouter-query">
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
        <button type="button" onClick={() => setCount(Math.max(count - 1,0))}>-</button>
            <h3>{count}</h3>
            <input type="hidden" id={name} name={name} value={count}/>
        <button type="button" onClick={() => setCount(count + 1)}>+</button>
        </>
    )
}

export default ScouterQuery;