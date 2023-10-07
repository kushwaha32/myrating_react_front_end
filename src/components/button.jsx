const Button = ({ text, handleShow, cls }) => {
  return (
    <button
      className={`btn auth-btn lettersp-helf  ${cls && cls}`}
      onClick={handleShow}
    >
      {text}
    </button>
  );
};

export default Button;
