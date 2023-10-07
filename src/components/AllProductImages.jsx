import ProductImageGallery from "./ProductImageGallery";
import ProductTitle from "./ProductTitle";
import "../assets/css/productImageGallery.css";

const AllProductsImages = () => {
  return (
    <section className="rating-main-full-allimg">
      <ProductTitle cls="color-yellow-dark" title="Images" />

      {/* //////////////////////////////////////////////////////////////////////// */}
      {/* //////////////////----------- Image Gallery -----------///////////////// */}
      {/* //////////////////////////////////////////////////////////////////////// */}
      <div className="container">
        <ProductImageGallery />
      </div>
    </section>
  );
};

export default AllProductsImages;
