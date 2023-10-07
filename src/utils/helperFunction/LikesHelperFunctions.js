import {
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useGetLikesMutation,
} from "../../slices/likeApiSlice";
import { emitDislike, emitLike } from "../ownHooks/useEmitLikeEvent";
import useSocketConnection from "../ownHooks/useSocketConnection";

// handle get product likes
const useHandleGetLikes = (setLikes, productNameSlug) => {
  const [getLikes] = useGetLikesMutation();

  const handleGetLikes = async () => {
    try {
      const res = await getLikes({
        product: productNameSlug,
      }).unwrap();
      if (res?.status === "success") {
        setLikes(res?.data?.likes);
      }
    } catch (error) {
      // Handle errors if needed
    }
  };

  return handleGetLikes;
};

// handle create likes
const useHandleCreateLikes = (
  setLikes,
  productId,
  productNameSlug,
  setLoading
) => {
  const socket = useSocketConnection();
  const [createLikes] = useCreateLikeMutation();
  const handleCreateLikes = async () => {
    try {
      console.log("clicked for like");
      setLoading(true);
      const res = await createLikes({
        product: productId,
      }).unwrap();
      if (res?.status === "success") {
        emitLike(socket, productNameSlug, res?.data?.likes);

        setLikes(res?.data?.likes);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return handleCreateLikes;
};
// handle delete likes
const useHandleDeleteLikes = (
  setLikes,
  productId,
  productNameSlug,
  setLoading
) => {
  const socket = useSocketConnection();
  const [deleteLike] = useDeleteLikeMutation();

  const handleDeleteLikes = async () => {
    try {
      setLoading(true);
      const res = await deleteLike({
        product: productId,
      }).unwrap();
      if (res?.status === "success") {
        emitDislike(socket, productNameSlug, res?.data?.likes);

        setLikes(res?.data?.likes);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return handleDeleteLikes;
};

export { useHandleDeleteLikes, useHandleCreateLikes, useHandleGetLikes };
