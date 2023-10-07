import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetRatingDistributionMutation } from "../../slices/ratingDistributionApiSlice";
import { setRatingDistribution } from "../../slices/ratingDistributionSlice";

const useRatingDistribution = (productSlug) => {
  const [getRatingDistribution] = useGetRatingDistributionMutation();
  const dispatch = useDispatch();
  const ratingDistribution = useSelector((state) => state.ratingDistribution);
  const handleRatingDistribution = async () => {
    try {
      dispatch(setRatingDistribution({ loading: true, ...ratingDistribution }));
      const res = await getRatingDistribution({
        productSlug: productSlug,
      }).unwrap();
      if (res?.status === "success") {
        dispatch(
          setRatingDistribution({
            ratingDistribution: res?.data?.rDistribution,
            loading: false,
          })
        );
      }
    } catch (error) {}
  };
  useEffect(() => {
    handleRatingDistribution();
  }, []);
};

export default useRatingDistribution;
