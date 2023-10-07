import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ProductBluePrint from "./ProductBluePrint";
import "../assets/css/categoryProduct.css";
import { useGetProductBasedCategoryMutation } from "../slices/productsApiSlice";

const AllProductsBasedOnCategory = () => {
  const location = useLocation().pathname.split("/")[1];
  const [products, setProducts] = useState([]);

  const [getProductsBasedOnCategory, {isLoading}] = useGetProductBasedCategoryMutation();

  useEffect(() => {
    fetchProductsWithCatSlug();
  }, [location]);

  const fetchProductsWithCatSlug = async() => {
     try {
        const res = await getProductsBasedOnCategory({catSlug: location}).unwrap();
        if(res.status === "success"){
          setProducts(res.products);
        }
     } catch (error) {
      
     }
  }


  if (isLoading) {
    return <div>loading ...</div>;
  } else {
    return (
      <section className="cat-product-in">
        {products?.length > 0 ? (
            <> {products?.map((product) => (
          <div key={product._id}>
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
        ) : (<h4 className="text-center">There no Products</h4>)}
       
      </section>
    );
  }
};

export default AllProductsBasedOnCategory;
