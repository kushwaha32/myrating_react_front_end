import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OwnerProductBluePrint from "../OwnerProductBluePrint";
import { useLocation } from "react-router-dom";
import { useBusinessProductBasedCategoryMutation } from "../../../slices/productsApiSlice";

const HistoricalMonuments = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation().pathname;
  const locationArr = location.split("/");
  const brandId = locationArr[2];

  const [businessProduct, { isLoading }] =
    useBusinessProductBasedCategoryMutation();

  useEffect(() => {
    getProduct();
  }, [location]);

  const getProduct = async () => {
    const res = await businessProduct({
      user: brandId,
      categorySlug: "historical-monuments",
    }).unwrap();
    if (res.status === "success") {
      setProducts(res.products);
    }
  };
 
    return (
      <div className="historical-monuments">
        <h1 className="historical-monuments-a text-capitalize">
          historical monuments
        </h1>
        {isLoading ? (
          <p className="no-products">loading...</p>
        ) : (
          <>
            {" "}
            {products.length > 0 ? (
              <>
                {products?.map((pro) => (
                  <OwnerProductBluePrint key={pro._id} product={pro} />
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

export default HistoricalMonuments;
