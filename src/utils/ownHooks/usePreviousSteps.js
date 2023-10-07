const usePreviousSteps = () => {
  const handlePreviousStep = (previous) => {
    const steps = localStorage.getItem("previousStep")
      ? JSON.parse(localStorage.getItem("previousStep"))
      : [];

    /////////////////////////////////////////////////////////////////
    ////--- check if previous already present in the steps ---//////
    ///////////////////////////////////////////////////////////////

    if (!steps.includes(previous)) {
      steps.push(previous);
      localStorage.setItem("previousStep", JSON.stringify(steps));
    }
  };

  /////////////////////////////////////////////////////////////////
  ////------------ Remove items from the steps -------------//////
  ///////////////////////////////////////////////////////////////

  const removeItemsFromSteps = (previous) => {
    const steps = localStorage.getItem("previousStep")
      ? JSON.parse(localStorage.getItem("previousStep"))
      : [];

    /////////////////////////////////////////////////////////////////
    ////--- check if previous already present in the steps ---//////
    ///////////////////////////////////////////////////////////////

    if (steps.includes(previous)) {
      const index = steps.indexOf(previous);
      steps.splice(index);
      localStorage.setItem("previousStep", JSON.stringify(steps));
    }
  };

  /////////////////////////////////////////////////////////////////
  ////------------ Get items from the steps -------------//////
  ///////////////////////////////////////////////////////////////
  const getPreviousSteps = () => {
    const steps = localStorage.getItem("previousStep")
      ? JSON.parse(localStorage.getItem("previousStep"))
      : [];
    return steps;
  };

  return [handlePreviousStep, getPreviousSteps, removeItemsFromSteps];
};

export default usePreviousSteps;
