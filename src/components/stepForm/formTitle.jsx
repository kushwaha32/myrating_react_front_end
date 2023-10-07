const FormTitle = ({ text, style, clss }) => {
  return (
    <div className={`form-title ${clss}`} style={style && style}>
      {text}
    </div>
  );
};

export default FormTitle;
