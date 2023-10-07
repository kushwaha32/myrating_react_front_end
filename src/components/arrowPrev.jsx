import arrow from "../img/down-filled-triangular-arrow.png";

const ArrowPrew = (props) => {
const { className, style, onClick } = props;
  return (

    <div
      className={`arrow-prew-cus ${className}`}
      onClick={onClick}
    />
       
  );
  }

  export default ArrowPrew;
