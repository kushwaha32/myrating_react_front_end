import { useState } from "react";

import PulseLoader from "react-spinners/PulseLoader";
import navigatePre from "../../img/navigate-pre.png";
import useBusinessPreviousSteps from "../../utils/ownHooks/useBusinessPreviousSteps";
import { useNavigate } from "react-router-dom";
import { IsTabletOrLess } from "../../utils/mediaScreens";

const SubmitForBusinessVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const finishRegistration = () => {
    localStorage.removeItem("businessPreviousStep");
    navigate("/");
  };

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- previous step handling --------------///////////////
  ////////////////////////////////////////////////////////////////////////////
  const [handlePreviousStep, getPreviousSteps, removeItemsFromSteps] =
    useBusinessPreviousSteps();

  //////////////////////////////////////////////////////////////////
  //////--------- Get back to previous form -------/////////////////
  /////////////////////////////////////////////////////////////////
  const getBack = () => {
    removeItemsFromSteps("submit-for-verification");
    navigate("/list-your-business/submit-for-verification");
  };

  return (
    <div className="register-b col-lg-9 col-sm-12 mobile-verify position-relative">
      {!IsTabletOrLess() ? (
        <h1 className="title position-absolute list-business-navigate">
          <button onClick={getBack} className="transparent-btn">
            <img
              src={navigatePre}
              alt="navigate"
              loading="lazy"
              className="navigate-img"
            />
          </button>
        </h1>
      ) : (
        ""
      )}
      {/*/////////////------from field  .error-active -> for active error class ---////// 
     //////////////----------- .valid-active-g -> for valid input -----/////////////////
      */}

      <section className="register-b-main mb-5 para-mai-w position-relative register-b-mn-verify loca-b-main">
        {/* verification message */}
        <div className="text-center mt-4">
          <h2>Thank you </h2>
          <p className="mt-5" style={{ width: "60%", margin: "auto" }}>
            Thank you Your Business / Company's profile has been submitted to
            our team. It take maximum 24 hours to publish on My Ratings
            Platform.
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

export default SubmitForBusinessVerification;
