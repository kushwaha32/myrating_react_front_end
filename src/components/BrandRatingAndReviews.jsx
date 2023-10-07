import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductRatingProgress from "./ProductRatingProgress";
import ProductTitle from "./ProductTitle";
import StarRatingProductMain from "./StarRatingProductMain";
import StarRating from "./StarRating";
import BrandRatingAndReviewVisual from "./BrandRatingAndReviewVisual";
import BrandRatingAndReview from "./BrandRatingAndReviewModel";
import useBrandRatingDistribution from "../utils/ownHooks/useBrandDistributedRating";

const BrandRatingAndReviews = () => {
  const location = useLocation().pathname.split("/");

  useBrandRatingDistribution(location[2]);

  //////////////////////////////////////////////////
  ////////----- average rating stuff ---///////////
  ////////////////////////////////////////////////
  const { brandAvgRating } = useSelector((state) => state?.brandAvgRating);
  const sAvgRating = brandAvgRating?.[0];

  const { brandRatings } = useSelector((state) => state.brandRatings);
  const { userInfo } = useSelector((state) => state.auth);

  //////////////////////////////////////////////////
  ////////----- distributed ratings ---///////////
  ////////////////////////////////////////////////

  const { brandRatingDistribution } = useSelector(
    (state) => state?.brandRatingDistribution
  );

  const ratingDistribution = brandRatingDistribution;

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
                  {sAvgRating?.brandAvgRating?.avgRating.toFixed(1)}
                </h4>
                <div className="rating-main-ab-aa-b">
                  <StarRatingProductMain
                    star={sAvgRating?.brandAvgRating?.avgRating}
                  />
                </div>
                <p>
                  {formatReviews(sAvgRating?.brandAvgRating?.nRating)}
                  {sAvgRating?.brandAvgRating?.nRating < 2
                    ? " Review"
                    : " Reviews"}
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
                  ratingDistribution?.brandRatingDistribution?.filter(
                    (r) => r.rating === 5
                  )[0]?.count ||
                  0
                }
              />

              <ProductRatingProgress
                ratingStandard={4}
                ratingUserCount={
                  ratingDistribution?.loading ||
                  ratingDistribution?.brandRatingDistribution?.filter(
                    (r) => r.rating === 4
                  )[0]?.count ||
                  0
                }
              />
              <ProductRatingProgress
                ratingStandard={3}
                ratingUserCount={
                  ratingDistribution?.loading ||
                  ratingDistribution?.brandRatingDistribution?.filter(
                    (r) => r.rating === 3
                  )[0]?.count ||
                  0
                }
              />
              <ProductRatingProgress
                ratingStandard={2}
                ratingUserCount={
                  ratingDistribution?.loading ||
                  ratingDistribution?.brandRatingDistribution?.filter(
                    (r) => r.rating === 2
                  )[0]?.count ||
                  0
                }
              />
              <ProductRatingProgress
                ratingStandard={1}
                ratingUserCount={
                  ratingDistribution?.loading ||
                  ratingDistribution?.brandRatingDistribution?.filter(
                    (r) => r.rating === 1
                  )[0]?.count ||
                  0
                }
              />
            </div>
          </div>
        </div>{" "}
        <div className="container">
          {brandRatings?.filter(
            (rating) => rating?.user?._id === userInfo?.user?._id
          ).length > 0 ? (
            <div className="rr-model">
              <div className="rr-model-c submited-rating text-center pt-5 pb-4">
                <StarRating
                  star={
                    brandRatings?.filter(
                      (rating) => rating?.user?._id === userInfo?.user?._id
                    )[0].rating
                  }
                />
                <p className="mt-3">You have submited your ratings</p>
              </div>
            </div>
          ) : (
            <BrandRatingAndReview location={location} />
          )}
        </div>
      </section>
      <BrandRatingAndReviewVisual
        location={location[2]}
        avgRating={sAvgRating?.avgRating}
      />
    </>
  );
};

export default BrandRatingAndReviews;
