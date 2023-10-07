import { useEffect, useState } from "react";
import { useGetBrandProfileFromSlugMutation } from "../../slices/brandProfileApiSlice";

const useGetCurrentBrand = (brandSlug) => {
  const [currentBrand, setCurrentBrand] = useState();
  const [getCurrentBrandFromSlug] = useGetBrandProfileFromSlugMutation();
  const handleGetBrand = async () => {
    try {
      const res = await getCurrentBrandFromSlug({
        brandSlug: brandSlug,
      }).unwrap();
      console.log(res);
      if (res?.status === "succcess") {
        setCurrentBrand(res?.data?.brandProfile);
      } else {
        console.log("something went rong");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleGetBrand();
  }, []);

  return currentBrand;
};

export default useGetCurrentBrand;
