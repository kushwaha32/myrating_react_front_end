import { Link } from "react-router-dom";
import { baseImageUrl } from "../utils/baseUrl";
import StarRating from "./StarRating";

const ProductBluePrint = ({
  productImg,
  productOwnerImg,
  title,
  rating,
  product,
}) => {
  const handleProductImg = (img) => {
    return { backgroundImage: `url(${img})` };
  };
  return (
    <article className="px-1 item">
      <Link
        to={`/product/${product?.productNameSlug}`}
        className="category-product category-product-new"
        style={handleProductImg(productImg)}
      >
        {/* brand */}
        <figure>
          {/* Product owner img */}
          <img
            src={productOwnerImg}
            className=" category-product-new-a"
            alt=""
          />
          {/* product name */}
          <figcaption className="category-product-title category-product-new-b text-capitalize">
            {title}
          </figcaption>
        </figure>
        {/* rating */}

        <figure className="category-product-new-rating">
          {/* rating image */}
          <StarRating star={rating} />
          {/* rating number */}
          <figcaption className="category-product-new-rating-b">
            ({rating.toFixed(1)})
          </figcaption>
        </figure>
      </Link>
    </article>
  );
};

export default ProductBluePrint;
