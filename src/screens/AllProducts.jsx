import { ToastContainer } from "react-toastify";
import HeaderCommon from "../components/header/HeaderCommon";
import { useSelector } from "react-redux";
import ProductBluePrint from "../components/ProductBluePrint";

const AllProducts = () => {
  const { products } = useSelector((state) => state.products);
  return (
    <>
      <ToastContainer />
      <HeaderCommon />
      <main className="container m-cont">
        <section className="cat-product-in body-main" style={style}>
          {products?.length > 0 ? (
            <>
              {" "}
              {products?.map((product) => (
                <div key={product?._id}>
                  <ProductBluePrint
                    productImg={product?.proifleImg}
                    productOwnerImg={
                      product?.user?.brandProfile?.brandImage || "man.png"
                    }
                    title={product?.productName}
                    rating={product?.averageRating}
                    product={product}
                  />
                </div>
              ))}
            </>
          ) : (
            <h4 className="text-center">There no Products</h4>
          )}
        </section>
      </main>
    </>
  );
};

const style = {
    marginTop : "0px",
    padding: "15px 20px"
}
export default AllProducts;
