const ButtonFormSubmit = ({ text, style, cls }) => {
  return (
    <button className={`btn btn-form ${cls && cls}`} style={style && style}>
      {text}
    </button>
  );
};

export default ButtonFormSubmit;
