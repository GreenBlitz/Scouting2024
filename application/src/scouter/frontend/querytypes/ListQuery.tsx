import React from "react";
import { localStorageTabName } from "../ScouterQuery";

interface ListQueryProps {
  name: string;
  required: boolean | undefined;
  list: string[];
}

const ListQuery: React.FC<ListQueryProps> = ({ name, required, list }) => {
  const localStorageKey = localStorageTabName + name;
  return (
    <select
      name={name}
      id={name}
      required={required}
      defaultValue={localStorage.getItem(localStorageKey) || ""}
      onChange={(event) =>
        localStorage.setItem(localStorageKey, event.target.value)
      }
    >
      {list?.map((item, index) => (
        <option value={item} key={index}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default ListQuery;
