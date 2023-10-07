const useCaptchaValidation = (
  captch,
  setCaptchInput,
  setCaptchError,
  setCaptchValid
) => {
  const handleCaptchaValidation = (e) => {
    const val = e.target.value;
    setCaptchInput(val);
    if (val.length === 5 && val !== captch) {
      setCaptchError(true);
      setCaptchValid(false);
    }
    if (val.length === 5 && val === captch) {
      setCaptchError(false);
      setCaptchValid(true);
    }
  };

  return handleCaptchaValidation;
};

export default useCaptchaValidation;
