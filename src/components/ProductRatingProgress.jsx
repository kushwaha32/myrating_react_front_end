import pointedStar from "../img/pointed-star.png";




const ProductRatingProgress = ({ ratingStandard, ratingUserCount }) => {
    const ratingProgress = (rat) => {
      return { width: `${rat*20}%`}
    }
  return (
    <div className="rating-main-ab-ab-a">
      <span>{ratingStandard}</span>
      <div className="rating-main-ab-ab-ab">
        <img src={pointedStar} alt="" />
      </div>

      <div className="progress rating-main-ab-progress">
        <div
          className={`progress-bar ${ratingStandard === 1 && "progress-red"}`}
          role="progressbar"
          aria-valuenow={0}
          aria-valuemin={0}
          aria-valuemax={100}
          style={ratingProgress(ratingStandard)}
        />
      </div>

      <span>{ratingUserCount}</span>
    </div>
  );
};

export default ProductRatingProgress;
