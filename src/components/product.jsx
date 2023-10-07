import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductBluePrint from "./ProductBluePrint";
import ProductCategoryBluePrint from "./ProductCategoryBluePrint";
import ProductTopBrandBluePrint from "./ProductTopBrandBluprint";
import { useGetAllProductsMutation } from "../slices/productsApiSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../slices/productSlice";
import { useGetTopBrandMutation } from "../slices/topBrandApiSlice";
import { setTopBrands } from "../slices/topBrandSlice";

const Product = () => {
  const [getAllProducts, { isLoading }] = useGetAllProductsMutation();
  const [getAllTopBrands, { isLoading: topBrandLoading }] =
    useGetTopBrandMutation();

  const { products } = useSelector((state) => state.products);
  const { topBrands } = useSelector((state) => state.topBrands);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const [productRes, topBrandRes] = await Promise.all([
        getAllProducts().unwrap(),
        getAllTopBrands().unwrap(),
      ]);

      if (productRes.status === "success") {
        dispatch(setProducts(productRes.products));
        dispatch(setTopBrands(topBrandRes?.data?.topBrand));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <div>loading....</div>;
  } else {
    return (
      <>
        {products.length > 0 && (
          <ProductCategoryBluePrint
            title="Top Attractions"
            url="/all-products"
            cls="pro-pro"
          >
            {/* map through the products */}
            {products?.map((product) => (
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
          </ProductCategoryBluePrint>
        )}
        {topBrands.length > 0 && (
          <ProductCategoryBluePrint
            title="Top Brands"
            url="/all-brands"
            cls="pro_brand"
          >
            <>
              {topBrands?.map((brand) => (
                <ProductTopBrandBluePrint
                  brandImg={brand?.brandProfile?.brandImage}
                  title={brand?.brandProfile?.brandName}
                  brandSlug={brand?.brandProfile?.brandNameSlug}
                />
              ))}
            </>
          </ProductCategoryBluePrint>
        )}
      </>
    );
  }
};

export default Product;
