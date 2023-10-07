import { useDispatch } from "react-redux";
import { useDeleteRatingMutation } from "../../slices/ratingApiSlice";
import { setRatings } from "../../slices/ratingSlice";
import { toast } from "react-toastify";
import useAvgRatingWithSocket from "./useAvgRatingWithSocket";
import useRatingDistributionWithSocket from "./useDistributedRatingWithSocket";

const useRemoveReview = (productSlug, setLoading) => {
  const dispatch = useDispatch();

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////// --- destructuring the removeRating method from there mutation ---- //////////
  ////////////////////////////////////////////////////////////////////////////////////////

  const [removeRating, { isLoading: deleteLoading }] =
    useDeleteRatingMutation();

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// --- update the average Rating  ----- ////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  const handleAvgRating = useAvgRatingWithSocket(productSlug);

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// --- update the Rating distribution  ----- ////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  const handleRatingDistribution = useRatingDistributionWithSocket(productSlug);

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////// --- Delete rating method which delete the rating and review  ----- //////////
  ////////////////////////////////////////////////////////////////////////////////////////

  const deleteRating = async (rating) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (confirmed) {
        // parallel api call
        setLoading(true);
        const res = await removeRating(rating).unwrap();

        if (res.status === "success") {
          dispatch(setRatings(res?.data?.review));
          handleAvgRating();
          handleRatingDistribution();
          toast.success("Review removed successfully.");
          setLoading(false);
        } else {
          toast.error(res.message);
          setLoading(false);
        }
      }
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////// --- return the delete method ---- //////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  return deleteRating;
};

export default useRemoveReview;
