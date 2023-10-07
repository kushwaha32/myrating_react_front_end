import { useEffect } from "react";
import { useGetAvgRatingMutation } from "../../slices/avgRatingApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setAvgRating } from "../../slices/avgRatingSlice";

const useAvgRating = (productSlug) => {
  const [getAvgRating] = useGetAvgRatingMutation();
  const dispatch = useDispatch();
  const handleAvgRating = async () => {
    try {
      const res = await getAvgRating({ productSlug: productSlug }).unwrap();
      if (res?.status === "success") {
        dispatch(
          setAvgRating([{ avgRating: res?.data?.avgRating[0], loading: false }])
        );
      }
    } catch (error) {}
  };
  useEffect(() => {
    handleAvgRating();
  }, []);
};

export default useAvgRating;
