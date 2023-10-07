import { useGetAvgRatingMutation } from "../../slices/avgRatingApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setAvgRating } from "../../slices/avgRatingSlice";
import { emitAvgRating } from "./useEmitRatingSocketEvent";
import useSocketConnection from "./useSocketConnection";

const useAvgRatingWithSocket = (productSlug) => {
  const socket = useSocketConnection();
  const [getAvgRating] = useGetAvgRatingMutation();
  const dispatch = useDispatch();
  const avgRating = useSelector((state) => state.avgRating);
  const handleAvgRating = async () => {
    try {
      dispatch(setAvgRating({ loading: true, ...avgRating }));
      const res = await getAvgRating({ productSlug: productSlug }).unwrap();
      if (res?.status === "success") {
        dispatch(
          setAvgRating([{ avgRating: res?.data?.avgRating[0], loading: false }])
        );

        emitAvgRating(socket, productSlug, res?.data?.avgRating[0]);
      }
    } catch (error) {}
  };
  return handleAvgRating;
};

export default useAvgRatingWithSocket;
