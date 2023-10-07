import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetBrandRatingDistributionMutation } from "../../slices/brandRatingDistributionApiSlice";
import { setBrandRatingDistribution } from "../../slices/brandRatingDistributionSlice";

const useBrandRatingDistribution = (brandSlug) => {
  const [getRatingDistribution] = useGetBrandRatingDistributionMutation();
  const dispatch = useDispatch();
  const brandRatingDistribution = useSelector(
    (state) => state.brandRatingDistribution
  );

  const handleRatingDistribution = async () => {
    try {
      dispatch(
        setBrandRatingDistribution({
          loading: true,
          ...brandRatingDistribution,
        })
      );

      const res = await getRatingDistribution({
        brandSlug: brandSlug,
      }).unwrap();

      if (res?.status === "success") {
        dispatch(
          setBrandRatingDistribution({
            brandRatingDistribution: res?.data?.rDistribution,
            loading: false,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleRatingDistribution();
  }, []);
};

export default useBrandRatingDistribution;
