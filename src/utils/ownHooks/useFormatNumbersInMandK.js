const useFormatNumbersInMAndK = () => {
  let likeInMK;
  const formatNum = (numLike) => {
    if (numLike >= 1000000) {
      likeInMK = (numLike / 1000000).toFixed(1) + "M";
    } else if (numLike >= 1000) {
      likeInMK = (numLike / 1000).toFixed(1) + "k";
    } else {
      likeInMK = numLike;
    }
    return likeInMK;
  };

  return formatNum;
};

export default useFormatNumbersInMAndK;
