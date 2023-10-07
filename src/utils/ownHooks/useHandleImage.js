const useHandleImage = (
  setFieldValue,
  setProfileImg,
  setImageName,
  values,
  setShow,
  fieldName
) => {
  const handleImage = (e) => {
    setShow && setShow(true);
    setFieldValue(
      fieldName || "image",
      e.target.files[0] || values?.[fieldName] || values.image
    );
    if (e.target.files && e.target.files[0]) {
      setProfileImg(URL.createObjectURL(e.target.files[0]));
      setImageName(e.target.files[0].name);
    }
  };
  return handleImage;
};

export default useHandleImage;
