const RatingAs = ({ title, children, cls }) => {
  return (
    <div className={`rr-model-ca ${cls && cls}`}>
      <h4 className="rr-model-caa">{title}</h4>
      {children}
    </div>
  );
};

export default RatingAs;
