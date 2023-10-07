import { useDispatch } from "react-redux";
import { useGetFilteredRatingMutation } from "../../slices/ratingApiSlice";
import { setRatings } from "../../slices/ratingSlice";
import { useEffect } from "react";

const useGetRatingAndReview = (page, limit, productSlug) => {
  let query = `page=${page}&&limit=${limit}&&productSlug=${productSlug}`;
  const [getFilteredRating] = useGetFilteredRatingMutation();
  const dispatch = useDispatch();

  const handleGetRatingAReview = async () => {
    try {
      const res = await getFilteredRating({ query }).unwrap();
      if (res.status === "success") {
        dispatch(setRatings(res?.data?.reviews));
      }
    } catch (error) {}
  };
  useEffect(() => {
    handleGetRatingAReview();
  }, []);
};

export default useGetRatingAndReview;
