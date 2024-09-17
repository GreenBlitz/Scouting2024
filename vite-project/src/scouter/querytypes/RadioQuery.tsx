import React from "react";

interface RadioQueryProps {
  name: string;
  required: boolean | undefined;
  initialValue: string;
  list: string[];
}

const RadioQuery: React.FC<RadioQueryProps> = ({
  name,
  required,
  initialValue,
  list,
}) => {
  return list?.map((item, index) => (
    <React.Fragment key={index}>
      {item === initialValue ? (
        <input
          type="radio"
          id={item}
          name={name}
          value={item}
          required={required}
          onChange={() => localStorage.setItem(name, item)}
          defaultChecked
        />
      ) : (
        <input
          type="radio"
          id={item}
          name={name}
          value={item}
          required={required}
          onChange={() => localStorage.setItem(name, item)}
        />
      )}
      <label htmlFor={item}>{item}</label>
    </React.Fragment>
  ));
};

export default RadioQuery;
