const ButtonForm = ({ text, stepIncrement, style, cls }) => {
  return (
    <button
      className={`btn btn-form ${cls && cls}`}
      style={style && style}
      type="submit"
    >
      {text}
    </button>
  );
};

export default ButtonForm;
