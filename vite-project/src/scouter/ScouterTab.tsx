import { ReactNode } from "react";

interface Props {
    name: string;
    children?: ReactNode[];
}

function ScouterTab({name, children} : Props) {
    return (
    <>
    <div className="scouter-tab">
        <h1>{name}</h1>
    </div>
    {children}
    </>
    )
}

export default ScouterTab;