const InputField = ({ name, value, onChange, error }) => (
    <label>
      {name}:
      <input
        required={true}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <span className="error-message">{error}</span>}
    </label>
  );

  export default InputField;