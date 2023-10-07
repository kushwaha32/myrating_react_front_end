const useProfessionValidation = (setProfession) => {
  const handleProfessionChange = (el) => {
    if (el.length >= 4) {
      alert("More Than 3 Profession are not allowed");
    } else {
      setProfession(el);
    }
  };

  return handleProfessionChange;
};

export default useProfessionValidation;
