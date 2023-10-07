import { ToastContainer } from "react-toastify";
import HeaderCommon from "../components/header/HeaderCommon";
import { useSelector } from "react-redux";
import ProductTopBrandBluePrint from "../components/ProductTopBrandBluprint";

const AllTopBrands = () => {
  const { topBrands } = useSelector((state) => state.topBrands);
  return (
    <>
      <ToastContainer />
      <HeaderCommon />
      <main className="container m-cont">
        <section className="cat-product-in body-main" style={style}>
        {topBrands?.length > 0 ? (
            <>
              {topBrands?.map((brand) => (
                <ProductTopBrandBluePrint
                  brandImg={brand?.brandProfile?.brandImage}
                  title={brand?.brandProfile?.brandName}
                  brandSlug={brand?.brandProfile?.brandNameSlug}
                />
              ))}
            </>
          ) : (
            <div>There are not brand</div>
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
export default AllTopBrands;
