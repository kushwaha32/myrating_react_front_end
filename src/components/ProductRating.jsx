import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductRatingProgress from "./ProductRatingProgress";
import ProductTitle from "./ProductTitle";
import StarRatingProductMain from "./StarRatingProductMain";
import useRatingDistribution from "../utils/ownHooks/useDistributedRating";
import RatingAndReviewVisual from "./RatingAndReviewVisual";
import RatingAndReview from "./RatingAndReviewModel";
import StarRating from "./StarRating";

const ProductRating = () => {
  const location = useLocation().pathname.split("/");

  useRatingDistribution(location[2]);

  //////////////////////////////////////////////////
  ////////----- average rating stuff ---///////////
  ////////////////////////////////////////////////

  const avgRating = useSelector((state) => state?.avgRating);
  const sAvgRating = avgRating?.avgRating[0]?.avgRating;

  const { ratings } = useSelector((state) => state.ratings);
  const { userInfo } = useSelector((state) => state.auth);

  //////////////////////////////////////////////////
  ////////----- distributed ratings ---///////////
  ////////////////////////////////////////////////

  const dRatings = useSelector((state) => state?.ratingDistribution);
  const { ratingDistribution } = dRatings;

  // formated reviews
  const formatReviews = (numLike) => {
    let likeInMK;
    if (numLike >= 1000000) {
      likeInMK = (numLike / 1000000).toFixed(1) + "M";
    } else if (numLike >= 1000) {
      likeInMK = (numLike / 1000).toFixed(1) + "k";
    } else {
      likeInMK = numLike;
    }
    return likeInMK;
  };
  return (
    <>
      <section className="rating-main-a">
        <ProductTitle cls="color-yellow-dark" title="Ratings" />
        <div className="rating-main-ab">
          <div className="rating-main-ab-a">
            {/* product avg rating */}
            {sAvgRating?.loading ? (
              "loading.."
            ) : (
              <div className="rating-main-ab-aa">
                <h4 className="rating-main-ab-aa-a">
                  {sAvgRating?.avgRating.toFixed(1)}
                </h4>
                <div className="rating-main-ab-aa-b">
                  <StarRatingProductMain star={sAvgRating?.avgRating} />
                </div>
                <p>
                  {formatReviews(sAvgRating?.nRating)}
                  {sAvgRating?.nRating < 2 ? " Review" : " Reviews"}
                </p>
              </div>
            )}
            <span className="rating-main-border"></span>
            {/* rating with progress bar */}
            <div className="rating-main-ab-ab">
              <ProductRatingProgress
                ratingStandard={5}
                ratingUserCount={
                  ratingDistribution?.loading ||
                  ratingDistribution?.ratingDistribution?.filter(
                    (r) => r.rating === 5
                  )[0]?.count ||
                  0
                }
              />

              <ProductRatingProgress
                ratingStandard={4}
                ratingUserCount={
                  ratingDistribution?.loading ||
                  ratingDistribution?.ratingDistribution?.filter(
                    (r) => r.rating === 4
                  )[0]?.count ||
                  0
                }
              />
              <ProductRatingProgress
                ratingStandard={3}
                ratingUserCount={
                  ratingDistribution?.loading ||
                  ratingDistribution?.ratingDistribution?.filter(
                    (r) => r.rating === 3
                  )[0]?.count ||
                  0
                }
              />
              <ProductRatingProgress
                ratingStandard={2}
                ratingUserCount={
                  ratingDistribution?.loading ||
                  ratingDistribution?.ratingDistribution?.filter(
                    (r) => r.rating === 2
                  )[0]?.count ||
                  0
                }
              />
              <ProductRatingProgress
                ratingStandard={1}
                ratingUserCount={
                  ratingDistribution?.loading ||
                  ratingDistribution?.ratingDistribution?.filter(
                    (r) => r.rating === 1
                  )[0]?.count ||
                  0
                }
              />
            </div>
          </div>
        </div>{" "}
        <div className="container">
          {ratings?.filter(
            (rating) => rating?.user?._id === userInfo?.user?._id
          ).length > 0 ? (
            <div className="rr-model">
              <div className="rr-model-c submited-rating text-center pt-5 pb-4">
                <StarRating
                  star={
                    ratings?.filter(
                      (rating) => rating?.user?._id === userInfo?.user?._id
                    )[0].rating
                  }
                />
                <p className="mt-3">You have submited your ratings</p>
              </div>
            </div>
          ) : (
            <RatingAndReview location={location} />
          )}
        </div>
      </section>
      <RatingAndReviewVisual
        location={location[2]}
        avgRating={sAvgRating?.avgRating}
      />
    </>
  );
};

export default ProductRating;
