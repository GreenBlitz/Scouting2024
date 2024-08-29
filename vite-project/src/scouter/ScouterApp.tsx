import ScouterQuery from "./ScouterQuery";
import ScouterTab from "./ScouterTab";

interface Props {
    children?: string
}

function ScouterApp({children} : Props) {
    
    return (
    <>
    <form>
        <ScouterTab name="Tests">
            <ScouterQuery queryType="text">Test 1: </ScouterQuery>
            <ScouterQuery queryType="checkbox">Test 2: </ScouterQuery>
            <ScouterQuery queryType="counter">Test 3: </ScouterQuery>
        </ScouterTab>
    </form>
    </>
    );
}

export default ScouterApp;