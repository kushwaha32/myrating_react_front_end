import { useEffect, useState } from "react";
import OwnerProductBluePrint from "../OwnerProductBluePrint";
import { useLocation } from "react-router-dom";
import { useCategoryProductsMutation } from "../../../slices/categoryApiSlice";

const CategoryBasedProduct = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const locationArr = location?.pathname?.split("/");
  const catSlug = locationArr[4];
  const [businessProduct, { isLoading }] = useCategoryProductsMutation();

  useEffect(() => {
    getProduct();
  }, [location]);

  const getProduct = async () => {
    const res = await businessProduct({
      slug: catSlug,
    }).unwrap();
    if (res?.status === "success") {
      setProducts(res?.data?.products);
    }
  };

  return (
    <div className="historical-monuments">
      <h1 className="historical-monuments-a text-capitalize">
        {catSlug.split("-").join(" ")}
      </h1>
      {isLoading ? (
        <p className="no-products">loading...</p>
      ) : (
        <>
          {products.length > 0 ? (
            <>
              {products?.map((pro) => (
                <OwnerProductBluePrint key={pro?._id} product={pro} />
              ))}
            </>
          ) : (
            <p className="no-products">Sorry There is no Product</p>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryBasedProduct;
