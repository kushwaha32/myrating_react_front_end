import pointedStar from "../../img/star.png";
import heartStar from "../../img/heart-star.png";
import taj from "../../img/taj.jpg";
import editImg from "../../img/edit.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const OwnerProductBluePrint = ({ product }) => {
  const { userInfo } = useSelector((state) => state.auth);
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
        <h3 className="text-capitalize historical-monuments-bb-b">
          {product?.location?.address}
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
              {product?.totalLikes > 1000
                ? `${product?.totalLikes % 1000}K`
                : product?.totalLikes > 10000
                ? `${product.totalLikes % 10000}M`
                : product?.totalLikes}{" "}
              Likes
            </figcaption>
          </figure>
        </div>
      </figcaption>
      {userInfo?.user?.role === "business" && (
        <Link
          to={`/business/${product?.user?._id}/update-product-profile/${product?.productNameSlug}`}
          target="_blank"
          className="edit-product-monument"
        >
          <img src={editImg} alt="" />
          Edit
        </Link>
      )}
    </figure>
  );
};

export default OwnerProductBluePrint;
