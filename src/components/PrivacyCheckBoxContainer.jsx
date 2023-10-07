



const PrivacyCheckBoxContainer = ({name, title}) => {
  return (
    <>
    
      <input
        className="form-check-input condition"
        type="checkbox"
        id={name}
        name={name}
        defaultValue="false"
      />
      <label className="form-check-label" htmlFor={name}>
        {title}
      </label>
    </>
  );
};

export default PrivacyCheckBoxContainer;
