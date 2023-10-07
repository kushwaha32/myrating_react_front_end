import { useDispatch } from "react-redux";
import { useDeleteRatingMutation } from "../../slices/ratingApiSlice";
import { setRatings } from "../../slices/ratingSlice";
import { toast } from "react-toastify";
import useAvgRatingWithSocket from "./useAvgRatingWithSocket";
import useRatingDistributionWithSocket from "./useDistributedRatingWithSocket";
import { useRemoveBrandRatingMutation } from "../../slices/brandRatingApiSlice";
import { setBrandRatings } from "../../slices/brandRatingSlice";
import useBrandAvgRatingWithSocket from "./useBrandAvgRatingWithSocket";
import useBrandRatingDistributionWithSocket from "./useBrandDistributedRatingWithSocket";

const useRemoveBrandReview = (brandNameSlug, setLoading) => {
  const dispatch = useDispatch();

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////// --- destructuring the removeRating method from there mutation ---- //////////
  ////////////////////////////////////////////////////////////////////////////////////////

  const [removeRating, { isLoading: deleteLoading }] =
    useRemoveBrandRatingMutation();

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// --- update the average Rating  ----- ////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  const handleAvgRating = useBrandAvgRatingWithSocket(brandNameSlug);

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// --- update the Rating distribution  ----- ////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  const handleRatingDistribution =
    useBrandRatingDistributionWithSocket(brandNameSlug);

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
          dispatch(setBrandRatings(res?.data?.review));
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

export default useRemoveBrandReview;
