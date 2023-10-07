import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetBrandAvgRatingMutation } from "../../slices/brandAvgRatingApiSlice";
import { setBrandAvgRating } from "../../slices/brandAvgRatingSlice";

const useBrandAvgRating = (brandSlug) => {
  const [getAvgRating] = useGetBrandAvgRatingMutation();

  const dispatch = useDispatch();
  const handleAvgRating = async () => {
    try {
      const res = await getAvgRating({ brandSlug: brandSlug }).unwrap();
      if (res?.status === "success") {
        dispatch(
          setBrandAvgRating([
            { brandAvgRating: res?.data?.avgRating[0], loading: false },
          ])
        );
      }
    } catch (error) {}
  };
  useEffect(() => {
    handleAvgRating();
  }, []);
};

export default useBrandAvgRating;
