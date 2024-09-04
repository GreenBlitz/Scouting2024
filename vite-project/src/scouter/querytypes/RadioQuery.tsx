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
  return list?.map((item: string) => (
    <>
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
    </>
  ));
};

export default RadioQuery;
