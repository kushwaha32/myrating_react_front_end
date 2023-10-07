import {
  useCreateBrandLikeMutation,
  useDeleteBrandLikeMutation,
  useGetBrandLikesMutation,
} from "../../slices/brandLikeApiSlice";
import { emitDislike, emitLike } from "../ownHooks/useEmitLikeEvent";
import useSocketConnection from "../ownHooks/useSocketConnection";

// handle get product likes
const useHandleGetBrandLikes = (setLikes, brandNameSlug) => {
  const [getLikes] = useGetBrandLikesMutation();
  const handleGetBrandLikes = async () => {
    try {
      const res = await getLikes({
        brandProfile: brandNameSlug,
      }).unwrap();
      if (res?.status === "success") {
        setLikes(res?.data?.likes);
      }
    } catch (error) {
      // Handle errors if needed
    }
  };

  return handleGetBrandLikes;
};

// handle create likes
const useHandleCreateBrandLikes = (
  setLikes,
  brandProfileId,
  brandNameSlug,
  setLoading
) => {
  const socket = useSocketConnection();
  const [createLikes] = useCreateBrandLikeMutation();
  const handleCreateBrandLikes = async () => {
    try {
      console.log("clicked for like");
      setLoading(true);
      const res = await createLikes({
        brandProfile: brandProfileId,
      }).unwrap();
      if (res?.status === "success") {
        emitLike(socket, brandNameSlug, res?.data?.likes);

        setLikes(res?.data?.likes);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return handleCreateBrandLikes;
};
// handle delete likes
const useHandleDeleteBrandLikes = (
  setLikes,
  brandProfileId,
  brandNameSlug,
  setLoading
) => {
  const socket = useSocketConnection();
  const [deleteLike] = useDeleteBrandLikeMutation();

  const handleDeleteBrandLikes = async () => {
    try {
      setLoading(true);
      const res = await deleteLike({
        brandProfile: brandProfileId,
      }).unwrap();
      if (res?.status === "success") {
        emitDislike(socket, brandNameSlug, res?.data?.likes);

        setLikes(res?.data?.likes);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return handleDeleteBrandLikes;
};

export {
  useHandleDeleteBrandLikes,
  useHandleCreateBrandLikes,
  useHandleGetBrandLikes,
};
