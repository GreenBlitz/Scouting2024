interface CheckboxQueryProps {
  name: string;
  required: boolean;
  initialValue: string;
}

const CheckboxQuery: React.FC<CheckboxQueryProps> = ({
  name,
  required,
  initialValue,
}) => {
  function updateCheckbox() {
    const newValue = sessionStorage.getItem(name) === "true" ? "false" : "true";
    sessionStorage.setItem(name, newValue);
  }
  return (
    <input
      type="checkbox"
      id={name}
      name={name}
      required={required}
      onChange={updateCheckbox}
      defaultChecked={initialValue === "true"}
    />
  );
};

export default CheckboxQuery;
