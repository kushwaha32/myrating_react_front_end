import starImg from "../img/star.png";
import starUncolored from "../img/star-uncolored.png";
import halfStar from "../img/HalfStarRatings.png";

const StarRatingProductMain = ({ star }) => {
  const computedRating = Array.from({ length: 5 }, (_, index) => {
    let number = index + 0.5;
    return (
      <>
        {star >= index + 1 ? (
          <img src={starImg} alt="startImg" key={index + 1} />
        ) : star >= number ? (
          <img src={halfStar} alt="startImg" key={index + 4} />
        ) : (
          <img src={starUncolored} alt="startImg" key={index + 8} />
        )}
      </>
    );
  });

  return <>{computedRating}</>;
};

export default StarRatingProductMain;
