

const ArrowNext = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`arrow-next-cus ${className}`}
     
      onClick={onClick}
    />
  );
};

export default ArrowNext;
