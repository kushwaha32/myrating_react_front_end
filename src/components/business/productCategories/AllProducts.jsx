import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OwnerProductBluePrint from "../OwnerProductBluePrint";
import { useLocation } from "react-router-dom";
import { useGetProductsBasedOnBrandMutation } from "../../../slices/productsApiSlice";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation().pathname;
  const locationArr = location.split("/");
  const brandId = locationArr[2];

  const [businessProduct, { isLoading }] = useGetProductsBasedOnBrandMutation();

  useEffect(() => {
    getProduct();
  }, [location]);

  const getProduct = async () => {
    const res = await businessProduct({
      brand_id: brandId,
    }).unwrap();


    console.log({brand: res})
    if (res.status === "success") {
      setProducts(res.products);
      
    }
  };

  return (
    <div className="historical-monuments">
      <h1 className="historical-monuments-a text-capitalize">
         All Products
      </h1>
      {isLoading ? (
        <p className="no-products">loading...</p>
      ) : (
        <>
          {" "}
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

export default AllProducts;
