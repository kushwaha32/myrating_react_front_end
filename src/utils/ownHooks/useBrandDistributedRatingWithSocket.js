import { useDispatch, useSelector } from "react-redux";
import { useGetRatingDistributionMutation } from "../../slices/ratingDistributionApiSlice";
import { setRatingDistribution } from "../../slices/ratingDistributionSlice";
import { emitRatingDistribution } from "./useEmitRatingSocketEvent";
import useSocketConnection from "./useSocketConnection";
import { useGetBrandRatingDistributionMutation } from "../../slices/brandRatingDistributionApiSlice";
import { setBrandRatingDistribution } from "../../slices/brandRatingDistributionSlice";

const useBrandRatingDistributionWithSocket = (brandSlug) => {
  const socket = useSocketConnection();
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
        emitRatingDistribution(socket, brandSlug, res?.data?.rDistribution);
      }
    } catch (error) {}
  };
  return handleRatingDistribution;
};

export default useBrandRatingDistributionWithSocket;
