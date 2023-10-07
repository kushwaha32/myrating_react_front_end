import star from "../../img/Startransparent.png";
import starUncolored from "../../img/star-uncolored.png";

const RatingFilterOptions = ({starCount}) => {
  const printStart = () => {
        const elArr = [];
        for(let i=1; i<=5; i++){
            if(i <= starCount){
                elArr.push(<img src={star} key={`${i}-rating`} alt="ratingImg" className="rating-input-filter" />)
            }else{
                elArr.push(<img src={starUncolored} key={`${i}-nonrating`} alt="nonRating" className="rating-input-filter" />)
            }
        }
        return elArr;
  }
  return (
    <>
    
        {
           printStart()
        }
    
    </>
  );
};

export default RatingFilterOptions;
