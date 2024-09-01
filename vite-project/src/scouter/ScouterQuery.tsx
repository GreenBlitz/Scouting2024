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
        if (queryType === "counter") {
            return <CounterQuery name={name}/>
        }
    
        if (queryType === "list") {
            return (
            <select name={name} id={name} required={required}>
                {children?.map((item) => <option value={item}>{item}</option>)}
            </select>
            )
        }
    
        if (queryType === "radio") {
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

    return (
    <div className="scouter-query">
        <h2>{name}</h2>
        {renderInput()}
    </div>
    );
}

function CounterQuery({name} : {name:string}) {
    function getInitialState() : number {
        const selectedCount = localStorage.getItem( "Selected Counter Number: " + name ) || 0;
    
        return parseInt(selectedCount + "");
    }

    const [count, setCountState] = useState(getInitialState());

    function setCount(newCount: number) {
        localStorage.setItem("Selected Counter Number: " + name,newCount + "");
        setCountState(newCount)
    }

    return (
        <>
        <button type="button" onClick={() => setCount(Math.max(count - 1,0))}>-</button>
            <h3>{count}</h3>
            <input type="hidden" id={name} name={name} value={count} onReset={() => setCount(0)} />
        <button type="button" onClick={() => setCount(count + 1)}>+</button>
        </>
    )
}



export default ScouterQuery;