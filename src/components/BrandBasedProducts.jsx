import { useSelector } from "react-redux";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OwnerProductBluePrint from "./business/OwnerProductBluePrint";
import {
  useBusinessProductBasedCategoryMutation,
  useGetProductsBasedOnBrandMutation,
} from "../slices/productsApiSlice";
import { useCategoryProductsForPblicMutation } from "../slices/categoryApiSlice";
import OwnerProductAsVisitor from "./OwnerProductsAsVisitor";

const BrandBasedProducts = () => {
  const [products, setProducts] = useState([]);
  // get the current brand slug name
  const location = useLocation();
  const locationArr = location?.pathname?.split("/");
  const prod_cat_slug = locationArr[4];
  const business_slug = locationArr[2];

  const [businessProduct, { isLoading }] =
    useCategoryProductsForPblicMutation();

  useEffect(() => {
    getProduct();
  }, [location]);

  const getProduct = async () => {
    const res = await businessProduct({
      slug: prod_cat_slug,
      brand_slug: business_slug
    }).unwrap();
    if (res?.status === "success") {
      setProducts(res?.data?.products);
    }
  };

  return (
    <div className="historical-monuments">
      <h1 className="historical-monuments-a text-capitalize">
        {prod_cat_slug.split("-").join(" ")}
      </h1>
      {isLoading ? (
        <p className="no-products">loading...</p>
      ) : (
        <>
          {products.length > 0 ? (
            <>
              {products?.map((pro) => (
                <OwnerProductAsVisitor key={pro._id} product={pro} />
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

export default BrandBasedProducts;
