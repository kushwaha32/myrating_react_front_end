import { Link, useLocation } from "react-router-dom";
import heart from "../img/heart-star.png";
import ShadowLayout from "./ShadowLayout";
import ImgWithSideCaption from "./ImgWithSideCaption";
import Modal from "react-bootstrap/Modal";
import RatingAndReview from "./RatingAndReviewModel";
import StarRatingProductMain from "./StarRatingProductMain";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useHandleCreateLikes,
  useHandleDeleteLikes,
  useHandleGetLikes,
} from "../utils/helperFunction/LikesHelperFunctions";
import useHandleEmitedLikes from "../utils/ownHooks/useHandleEmitedLikes";

const ProductProfile = ({
  currentProduct,
  handleClose,
  show,
  handleShow,

  currentProductReviews,
}) => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation()?.pathname?.split("/");
  const productSlug = location[location?.length - 1];

  //////////////////////////////////////////////////
  ////////-----likes related stuff ---/////////////
  ////////////////////////////////////////////////

  const [likes, setLikes] = useState([]);

  const handleGetLikes = useHandleGetLikes(
    setLikes,
    currentProduct?.productNameSlug
  );
  useEffect(() => {
    if (Object.keys(currentProduct).length > 0) {
      handleGetLikes();
    }
  }, [currentProduct]);
  const handleCreateLikes = useHandleCreateLikes(
    setLikes,
    currentProduct?._id,
    currentProduct?.productNameSlug
  );

  const handleDeleteLikes = useHandleDeleteLikes(
    setLikes,
    currentProduct?._id,
    currentProduct?.productNameSlug
  );

  // handle the like and dislike event
  useHandleEmitedLikes(setLikes, productSlug);

  //  formated like
  const formatLikes = (numLike) => {
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
    <ShadowLayout>
      <ImgWithSideCaption
        img={currentProduct?.proifleImg}
        title={currentProduct?.productName}
      >
        <span>{currentProduct?.subCategory?.name}</span>
      </ImgWithSideCaption>
    </ShadowLayout>
  );
};

export default ProductProfile;

{
  /* <Link className="product-d-menu-aa-bb text-capitalize" to="">
          {currentProduct?.category}
        </Link>
        {sAvgRating?.loading ? (
          "loading.."
        ) : (
          <div className="product-d-menu-aa-bc">
            <StarRatingProductMain star={sAvgRating?.avgRating} />
            <span>({sAvgRating?.avgRating})</span>
          </div>
        )}
        <div className="product-d-menu-aa-bd">
          <img src={heart} alt="" />
          <span>{formatLikes(likes?.length)}</span>
          <span>Likes</span>
        </div>
      </ImgWithSideCaption>
      {userInfo?.user?.role === "user" && (
        <div className="product-d-menu-ab">
          {likes?.find((currLike) => currLike.user === userInfo?.user?._id) ? (
            <button
              className="btn auth-btn lettersp-helf fw-bold"
              onClick={handleDeleteLikes}
              style={{ background: "#092b66", color: "#fff" }}
            >
              Unlike
            </button>
          ) : (
            <button
              className="btn auth-btn lettersp-helf fw-bold"
              onClick={handleCreateLikes}
            >
              Like
            </button>
          )}

          {currentProductReviews?.find(
            (currReview) => currReview?.user?._id === userInfo?.user._id
          ) ? (
            <button
              className="btn auth-btn lettersp-helf fw-bold"
              style={{ background: "#092b66", color: "#fff" }}
            >
              Rated
            </button>
          ) : (
            <button
              className="btn auth-btn lettersp-helf fw-bold"
              onClick={handleShow}
            >
              Rate Now
            </button>
          )}
        </div>
      )}
      {/* rating and review model  */
}
{
  /* <Modal show={show} onHide={handleClose}>
        <RatingAndReview
          handleClose={handleClose}
          product={currentProduct}
          averageRating={sAvgRating?.avgRating}
          likes={likes}
        />
      </Modal> */
}
