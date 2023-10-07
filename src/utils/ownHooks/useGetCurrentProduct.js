import { useEffect, useState } from "react";
import { useGetProductBasedSlugMutation } from "../../slices/productsApiSlice";

const useGetCurrentProduct = (productSug) => {
  const [currentProduct, setCurrentProduct] = useState();
  const [getCurrentProductFromSlug] = useGetProductBasedSlugMutation();
  const handleGetProduct = async () => {
    try {
      const res = await getCurrentProductFromSlug({
        productSlug: productSug,
      }).unwrap();

      if (res?.status === "success") {
        setCurrentProduct(res?.data?.product);
      } else {
        console.log("something went rong");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, []);

  return currentProduct;
};

export default useGetCurrentProduct;
