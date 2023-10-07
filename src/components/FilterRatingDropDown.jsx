import star from "../img/star.png";
import starUncolored from "../img/star-uncolored.png";

const FilterRatingDropDown = ({starCount}) => {
  const printStart = () => {
        const elArr = [];
        for(let i=1; i<=5; i++){
            if(i <= starCount){
                elArr.push(<img src={star} alt="" className="rating-input-check-a" />)
            }else{
                elArr.push(<img src={starUncolored} alt="" className="rating-input-check-a" />)
            }
        }
        return elArr;
  }
  return (
    <div className="rating-input-check">
      <input type="radio" name="rating" id={`rating-${starCount}`} />
      <label htmlFor={`rating-${starCount}`}>
        {
           printStart()
        }
      </label>
    </div>
  );
};

export default FilterRatingDropDown;
