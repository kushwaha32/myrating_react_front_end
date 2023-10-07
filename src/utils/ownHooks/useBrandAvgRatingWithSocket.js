import { useGetAvgRatingMutation } from "../../slices/avgRatingApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setAvgRating } from "../../slices/avgRatingSlice";
import { emitAvgRating, emitBrandAvgRating } from "./useEmitRatingSocketEvent";
import useSocketConnection from "./useSocketConnection";
import { useGetBrandAvgRatingMutation } from "../../slices/brandAvgRatingApiSlice";
import { setBrandAvgRating } from "../../slices/brandAvgRatingSlice";

const useBrandAvgRatingWithSocket = (brandSlug) => {
  const socket = useSocketConnection();
  const [getAvgRating] = useGetBrandAvgRatingMutation();
  const dispatch = useDispatch();
  const brandAvgRating = useSelector((state) => state.brandAvgRating);
  const handleAvgRating = async () => {
    try {
      dispatch(setBrandAvgRating({ loading: true, ...brandAvgRating }));
      const res = await getAvgRating({ brandSlug: brandSlug }).unwrap();
      if (res?.status === "success") {
        dispatch(
          setBrandAvgRating([
            { brandAvgRating: res?.data?.avgRating[0], loading: false },
          ])
        );

        emitBrandAvgRating(socket, brandSlug, res?.data?.avgRating[0]);
      }
    } catch (error) {}
  };
  return handleAvgRating;
};

export default useBrandAvgRatingWithSocket;
