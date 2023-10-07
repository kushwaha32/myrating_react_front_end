import { Link, useNavigate } from "react-router-dom";
import navigatePre from "../../img/navigate-pre.png";
import { useState } from "react";
import uploadProImg from "../../img/upload-pro-img.png";
import transparend from "../../img/transparent.png";
import usePreviousSteps from "../../utils/ownHooks/usePreviousSteps";
import { IsTabletOrLess } from "../../utils/mediaScreens";

const VerificationMessage = () => {
  const navigate = useNavigate();

  /////////////////////////////////////////////////////////////////
  ////------------ handle the steps to navigate -----------///////
  ///////////////////////////////////////////////////////////////
  const [handlePreviousStep, getPreviousSteps, removeItemsFromSteps] =
    usePreviousSteps();

  const getBack = () => {
    removeItemsFromSteps("submit-for-varification");
    navigate("/register/submit-for-varification");
  };

  const finishRegistration = () => {
    localStorage.removeItem("previousStep");
    navigate("/");
  };
  return (
    <div className="register-b col-lg-9 col-sm-12 mobile-verify">
      {!IsTabletOrLess() && (
        <h1 className="title position-relative">
          <span> Create your profile</span>
          <button onClick={getBack} className="transparent-btn">
            <img
              src={navigatePre}
              alt="navigate"
              loading="lazy"
              className="navigate-img"
            />
          </button>
        </h1>
      )}

      <section className="register-b-main mb-5 position-relative">
        {/* verification message */}
        <div className="text-center mt-4">
          <h2>Thank you </h2>
          <p className="mt-5">
            Your profile has been submitted to our team. It take maximum 24
            hours to verify.
          </p>
        </div>
        <div className="btn-s-main position-absolute btn-otp-s-main">
          <button onClick={finishRegistration} className={`btn btn-white `}>
            Ok
          </button>
        </div>
      </section>
    </div>
  );
};

export default VerificationMessage;
