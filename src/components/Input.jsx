const Input = ({ value, type, onChange, placeholder, label }) => {
  return (
    <div className="form-outline form-floating my-3">
      <input
        className="form-control"
        id={`floating${label}`}
        label={label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange} // This will trigger the `onChange` passed from the parent
      />
      {label && <label for={`floating${label}`}>{label}</label>}
    </div>
  );
};
export default Input;
