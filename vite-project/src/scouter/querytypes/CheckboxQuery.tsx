import { localStorageTabName } from "../ScouterQuery";

interface CheckboxQueryProps {
  name: string;
  required: boolean;
}

const CheckboxQuery: React.FC<CheckboxQueryProps> = ({ name, required }) => {
  const localStorageKey = localStorageTabName + name;
  function updateCheckbox() {
    const newValue =
      localStorage.getItem(localStorageKey) === "true" ? "false" : "true";
    localStorage.setItem(localStorageKey, newValue);
  }
  return (
    <input
      type="checkbox"
      id={name}
      name={name}
      required={required}
      onChange={updateCheckbox}
      defaultChecked={localStorage.getItem(localStorageKey) === "true"}
    />
  );
};

export default CheckboxQuery;
