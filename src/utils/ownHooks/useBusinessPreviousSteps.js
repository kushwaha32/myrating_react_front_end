const useBusinessPreviousSteps = (passStep) => {
  let stepHolder = passStep || "businessPreviousStep";
  const handlePreviousStep = (previous) => {
    const steps = localStorage.getItem(stepHolder)
      ? JSON.parse(localStorage.getItem(stepHolder))
      : [];

    /////////////////////////////////////////////////////////////////
    ////--- check if previous already present in the steps ---//////
    ///////////////////////////////////////////////////////////////

    if (!steps.includes(previous)) {
      steps.push(previous);
      localStorage.setItem(stepHolder, JSON.stringify(steps));
    }
  };

  /////////////////////////////////////////////////////////////////
  ////------------ Remove items from the steps -------------//////
  ///////////////////////////////////////////////////////////////

  const removeItemsFromSteps = (previous) => {
    const steps = localStorage.getItem(stepHolder)
      ? JSON.parse(localStorage.getItem(stepHolder))
      : [];

    /////////////////////////////////////////////////////////////////
    ////--- check if previous already present in the steps ---//////
    ///////////////////////////////////////////////////////////////

    if (steps.includes(previous)) {
      const index = steps.indexOf(previous);
      steps.splice(index);
      localStorage.setItem(stepHolder, JSON.stringify(steps));
    }
  };

  /////////////////////////////////////////////////////////////////
  ////------------ Get items from the steps -------------//////
  ///////////////////////////////////////////////////////////////
  const getPreviousSteps = () => {
    const steps = localStorage.getItem(stepHolder)
      ? JSON.parse(localStorage.getItem(stepHolder))
      : [];
    return steps;
  };

  return [handlePreviousStep, getPreviousSteps, removeItemsFromSteps];
};

export default useBusinessPreviousSteps;
