import React from "react";
import { localStorageTabName } from "../ScouterQuery";

interface RadioQueryProps {
  name: string;
  required: boolean | undefined;
  list: string[];
}

const RadioQuery: React.FC<RadioQueryProps> = ({ name, required, list }) => {
  const localStorageKey = localStorageTabName + name;
  return list?.map((item, index) => (
    <React.Fragment key={index}>
      {item === localStorage.getItem(localStorageKey) ? (
        <input
          type="radio"
          id={item}
          name={name}
          value={item}
          required={required}
          onChange={() => localStorage.setItem(localStorageKey, item)}
          defaultChecked
        />
      ) : (
        <input
          type="radio"
          id={item}
          name={name}
          value={item}
          required={required}
          onChange={() => localStorage.setItem(localStorageKey, item)}
        />
      )}
      <label htmlFor={item}>{item}</label>
    </React.Fragment>
  ));
};

export default RadioQuery;
