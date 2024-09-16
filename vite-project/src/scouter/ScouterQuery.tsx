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
    const initialValue = sessionStorage.getItem(name) || "";

    switch (queryType) {
      case "counter":
        return <CounterQuery name={name} initialValue={initialValue} />;
      case "checkbox":
        return (
          <CheckboxQuery
            name={name}
            required={required || false}
            initialValue={initialValue}
          />
        );
      case "list":
        return (
          <ListQuery
            name={name}
            required={required}
            initialValue={initialValue}
            list={list ? list : []}
          />
        );
      case "radio":
        return (
          <RadioQuery
            name={name}
            required={required}
            initialValue={initialValue}
            list={list ? list : []}
          />
        );
      default:
        return (
          <input
            type={queryType}
            id={name}
            name={name}
            required={required}
            defaultValue={initialValue}
            onChange={(event) =>
              sessionStorage.setItem(name, event.target.value)
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
