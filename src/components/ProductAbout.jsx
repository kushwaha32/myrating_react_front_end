import { useSelector } from "react-redux";
import "../assets/css/productAbout.css";
import taj from "../img/taj.jpg";

const ProductAbout = () => {
  const { products } = useSelector((state) => state.products);
  return (
    <>
      <div>
        <div className="product-about-a">
          <h3 className="rating-main-aa color-yellow-dark">About</h3>
          <p
            className="product-about-ab product-about"
            dangerouslySetInnerHTML={{ __html: products?.currentProduct?.bio }}
          ></p>
        </div>
      </div>
    </>
  );
};

export default ProductAbout;
