import { useState } from "react";
import { localStorageTabName } from "../ScouterQuery";
import React from "react";

interface CounterQueryProps {
  name: string;
}

const CounterQuery: React.FC<CounterQueryProps> = ({ name }) => {
  const localStorageKey = localStorageTabName + name;
  const initialValue = localStorage.getItem(localStorageKey) || "";
  const startingNumber = initialValue === "" ? 0 : parseInt(initialValue);
  const [count, setCountState] = useState(startingNumber);

  function setCount(newCount: number) {
    localStorage.setItem(localStorageKey, newCount + "");
    setCountState(newCount);
  }

  return (
    <>
      <button type="button" onClick={() => setCount(Math.max(count - 1, 0))}>
        -
      </button>
      <h3>{count}</h3>
      <input type="hidden" id={name} name={name} value={count} />
      <button type="button" onClick={() => setCount(count + 1)}>
        +
      </button>
    </>
  );
};

export default CounterQuery;
