const useBusinessPreviousSteps = () => {
  const handlePreviousStep = (previous) => {
    const steps = localStorage.getItem("businessPreviousStep")
      ? JSON.parse(localStorage.getItem("businessPreviousStep"))
      : [];

    /////////////////////////////////////////////////////////////////
    ////--- check if previous already present in the steps ---//////
    ///////////////////////////////////////////////////////////////

    if (!steps.includes(previous)) {
      steps.push(previous);
      localStorage.setItem("businessPreviousStep", JSON.stringify(steps));
    }
  };

  /////////////////////////////////////////////////////////////////
  ////------------ Remove items from the steps -------------//////
  ///////////////////////////////////////////////////////////////

  const removeItemsFromSteps = (previous) => {
    const steps = localStorage.getItem("businessPreviousStep")
      ? JSON.parse(localStorage.getItem("businessPreviousStep"))
      : [];

    /////////////////////////////////////////////////////////////////
    ////--- check if previous already present in the steps ---//////
    ///////////////////////////////////////////////////////////////

    if (steps.includes(previous)) {
      const index = steps.indexOf(previous);
      steps.splice(index);
      localStorage.setItem("businessPreviousStep", JSON.stringify(steps));
    }
  };

  /////////////////////////////////////////////////////////////////
  ////------------ Get items from the steps -------------//////
  ///////////////////////////////////////////////////////////////
  const getPreviousSteps = () => {
    const steps = localStorage.getItem("businessPreviousStep")
      ? JSON.parse(localStorage.getItem("businessPreviousStep"))
      : [];
    return steps;
  };

  return [handlePreviousStep, getPreviousSteps, removeItemsFromSteps];
};

export default useBusinessPreviousSteps;
