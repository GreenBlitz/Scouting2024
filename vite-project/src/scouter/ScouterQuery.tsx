import CheckboxQuery from "./querytypes/CheckboxQuery";
import CounterQuery from "./querytypes/CounterQuery";
import ListQuery from "./querytypes/ListQuery";
import RadioQuery from "./querytypes/RadioQuery";
interface ScouterQueryProps {
  name: string;
  queryType: "text" | "counter" | "checkbox" | "number" | "list" | "radio";
  required?: boolean | undefined;
  list?: string[];
}

const ScouterQuery: React.FC<ScouterQueryProps> = ({
  name,
  queryType,
  required,
  list,
}) => {
  function renderInput() {
    const queryName = "Queries/" + name;
    const initialValue = localStorage.getItem(queryName) || "";
    switch (queryType) {
      case "counter":
        return <CounterQuery name={queryName} initialValue={initialValue} />;
      case "checkbox":
        return (
          <CheckboxQuery
            name={queryName}
            required={required || false}
            initialValue={initialValue}
          />
        );
      case "list":
        return (
          <ListQuery
            name={queryName}
            required={required}
            initialValue={initialValue}
            list={list ? list : []}
          />
        );
      case "radio":
        return (
          <RadioQuery
            name={queryName}
            required={required}
            initialValue={initialValue}
            list={list ? list : []}
          />
        );
      default:
        return (
          <input
            type={queryType}
            id={queryName}
            name={queryName}
            required={required}
            defaultValue={initialValue}
            onChange={(event) =>
              localStorage.setItem(queryName, event.target.value)
            }
          />
        );
    }
  }

  return (
    <div className="scouter-query">
      <h2>{name}</h2>
      {renderInput()}
    </div>
  );
};

export default ScouterQuery;
