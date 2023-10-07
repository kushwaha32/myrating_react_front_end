import { useDispatch, useSelector } from "react-redux";
import { useGetRatingDistributionMutation } from "../../slices/ratingDistributionApiSlice";
import { setRatingDistribution } from "../../slices/ratingDistributionSlice";
import { emitRatingDistribution } from "./useEmitRatingSocketEvent";
import useSocketConnection from "./useSocketConnection";

const useRatingDistributionWithSocket = (productSlug) => {
  const socket = useSocketConnection();
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
        emitRatingDistribution(socket, productSlug, res?.data?.rDistribution);
      }
    } catch (error) {}
  };
  return handleRatingDistribution;
};

export default useRatingDistributionWithSocket;
