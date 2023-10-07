import pointedStar from "../img/star.png";
import heartStar from "../img/heart-star.png";
import heartLikeColored from "../img/heart-like.png";
import heartLike from "../img/heart-uncolored.png";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import useHandleEmitedLikes from "../utils/ownHooks/useHandleEmitedLikes";
import {
  useHandleCreateLikes,
  useHandleDeleteLikes,
  useHandleGetLikes,
} from "../utils/helperFunction/LikesHelperFunctions";
import { PulseLoader } from "react-spinners";

const OwnerProductAsVisitor = ({ product }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetLikes = useHandleGetLikes(setLikes, product?.productNameSlug);
  useEffect(() => {
    handleGetLikes();
  }, []);
  const handleCreateLikes = useHandleCreateLikes(
    setLikes,
    product?._id,
    product?.productNameSlug,
    setLoading
  );

  const handleDeleteLikes = useHandleDeleteLikes(
    setLikes,
    product?._id,
    product?.productNameSlug,
    setLoading
  );

  // handle the like and dislike event
  useHandleEmitedLikes(setLikes, product?.productNameSlug);

  const setBgImg = (img) => {
    return {
      background: `url(${img})`,
    };
  };
  return (
    <figure className="historical-monuments-b d-flex">
      <span
        className="historical-monuments-ba"
        style={setBgImg(`${product?.proifleImg}`)}
      ></span>
      <figcaption className="historical-monuments-bb">
        <Link
          to={`/product/${product?.productNameSlug}`}
          className="text-capitalize historical-monuments-bb-a"
        >
          {product?.productName}
        </Link>
        <h3
          className="text-capitalize historical-monuments-bb-b"
          title={product?.location?.address}
        >
          {`${product?.location?.address.slice(0, 30)} ${
            product?.location?.address.length > 30 ? "..." : ""
          }`}
        </h3>
        <div className="historical-monuments-bb-c">
          {/* avg rating */}
          <figure className="historical-monuments-bb-ca">
            <span>
              <img src={pointedStar} alt="" />
            </span>
            <figcaption className="historical-monuments-rating">
              {product?.averageRating}
            </figcaption>
          </figure>
          {/* likes */}
          <figure className="historical-monuments-bb-ca historical-monuments-bb-cb">
            <span>
              <img src={heartStar} alt="" />
            </span>
            <figcaption className="historical-monuments-likes">
              {likes?.length > 1000
                ? `${likes?.length % 1000}K`
                : likes?.length > 10000
                ? `${likes?.length % 10000}M`
                : likes?.length}{" "}
              Likes
            </figcaption>
          </figure>
        </div>
      </figcaption>
      {loading ? (
        <button className="edit-product-monument btn btn-white">
          <PulseLoader
            color="rgb(0 40 86 / 80%)"
            loading={loading}
            size={6}
            cssOverride={{ width: "37px" }}
          />
        </button>
      ) : (
        <>
          {likes?.find((currLike) => currLike.user === userInfo?.user?._id) ? (
            <button
              className="edit-product-monument edit-product-like"
              onClick={handleDeleteLikes}
            >
              <span>Liked</span>
              <img src={heartLikeColored} alt="imgLike" />
            </button>
          ) : (
            <button
              className="edit-product-monument edit-product-like"
              onClick={handleCreateLikes}
            >
              <span>Like</span>
              <img src={heartLike} alt="imgLike" />
            </button>
          )}
        </>
      )}
    </figure>
  );
};

export default OwnerProductAsVisitor;
