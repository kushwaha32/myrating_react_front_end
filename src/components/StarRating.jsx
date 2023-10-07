const StarRating = ({ star }) => {
 const computedRating = Array.from({ length: 5 }, (_, index) => {
    let number = index + 0.5;
    return (
      <span className="category-product-new-rating-a">
        {star >= index + 1 ? (
          <i className="pointed-star"></i>
        ) : star >= number ? (
          <i className="pointed-star pointed-star-half"></i>
        ) : (
          <i className="pointed-star pointed-star-white"></i>
        )}
      </span>
    );
  });

  return <>{computedRating}</>;
};

export default StarRating;

