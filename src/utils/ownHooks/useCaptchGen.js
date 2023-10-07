const useCapGen = (
  setCaptch,
  setCaptchInput,
  setCaptchError,
  setCaptchValid
) => {
  const createCaptch = () => {
    setCaptch(Math.random().toString(36).substring(2, 7));
    setCaptchInput("");
    setCaptchError(false);
    setCaptchValid(false);
  };

  return createCaptch;
};

export default useCapGen;
