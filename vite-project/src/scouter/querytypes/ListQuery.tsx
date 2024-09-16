interface ListQueryProps {
  name: string;
  required: boolean | undefined;
  initialValue: string;
  list: string[];
}

const ListQuery: React.FC<ListQueryProps> = ({
  name,
  required,
  initialValue,
  list,
}) => {
  return (
    <select
      name={name}
      id={name}
      required={required}
      defaultValue={initialValue}
      onChange={(event) => sessionStorage.setItem(name, event.target.value)}
    >
      {list?.map((item: string) => (
        <option value={item} key={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default ListQuery;
