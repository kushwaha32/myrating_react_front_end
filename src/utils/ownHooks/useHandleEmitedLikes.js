import { useEffect } from "react";
import useSocketConnection from "./useSocketConnection";

const useHandleEmitedLikes = (setLikes, productNameSlug) => {
  const socket = useSocketConnection(); // Get the socket instance using the hook

  useEffect(() => {
    const handleLikes = (data) => {
      const jData = JSON.parse(data);
      if (jData?.productSlug === productNameSlug) {
        console.log(jData?.likes);
        setLikes(jData?.likes);
      }
    };

    if (socket) {
      socket.on("likes-b", handleLikes);
      socket.on("likes-d-b", handleLikes);
    }

    return () => {
      if (socket) {
        socket.off("likes-b", handleLikes);
        socket.off("likes-d-b", handleLikes);
      }
    };
  }, [socket, productNameSlug, setLikes]);
};

export default useHandleEmitedLikes;
