import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LikesAndReviewInMandK = ({ num, type }) => {
  const [updatedLike, setLikes] = useState();
  const { products } = useSelector((state) => state.products);
  const { likes } = useSelector((state) => state.likes);
  useEffect(() => {
    if (type === "like") {
      formatLikes(products?.currentProduct?.totalLikes);
    } else {
      formatLikes(products?.currentProduct?.nRating);
    }
  }, [products]);
  const formatLikes = (numLike) => {
    let likeInMK;
    if (numLike >= 1000000) {
      likeInMK = (numLike / 1000000).toFixed(1) + "M";
    } else if (numLike >= 1000) {
      likeInMK = (numLike / 1000).toFixed(1) + "k";
    } else {
      likeInMK = numLike;
    }
    setLikes(likeInMK);
  };

  return <>{updatedLike}</>;
};

export default LikesAndReviewInMandK;
