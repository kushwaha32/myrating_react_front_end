import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetProductsBasedOnBrandMutation } from "../slices/productsApiSlice";
import OwnerProductAsVisitor from "./OwnerProductsAsVisitor";

const BrandBasedAllProducts = () => {
  const [products, setProducts] = useState([]);
  const { topBrands } = useSelector((state) => state.topBrands);
  // get the current brand slug name
  const location = useLocation();
  const brans_slug = location?.pathname?.split("/")[2];

  const [getProductBrandBased, { isLoading }] =
    useGetProductsBasedOnBrandMutation();

  useEffect(() => {
    getAllProductBasedBrand(
      topBrands?.filter(
        (curr) => curr?.brandProfile?.brandNameSlug === brans_slug
      )[0]._id
    );
  }, [location]);

  const getAllProductBasedBrand = async (brand_id) => {
    try {
      const res = await getProductBrandBased({ brand_id }).unwrap();

      if (res?.status === "success") {
        setProducts(res.products);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="historical-monuments">
      <h1 className="historical-monuments-a text-capitalize">All Products</h1>
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

export default BrandBasedAllProducts;
