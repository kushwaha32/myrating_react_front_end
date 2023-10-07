import { ToastContainer, toast } from "react-toastify";
import HeaderCommon from "../components/header/HeaderCommon";
import "./registerUser.css";
import { Outlet } from "react-router-dom";
import useCurrentLocationSlug from "../utils/ownHooks/useCurrentLocationSlug";
import usePreviousSteps from "../utils/ownHooks/usePreviousSteps";
import { IsTabletOrLess } from "../utils/mediaScreens";
import { useState } from "react";

const RegisterUser = () => {
  //////////////////////////////////////////////////////////////
  ////////--------------- All Steps --------------//////////////
  //////////////////////////////////////////////////////////////
  const [allSteps, setAllSteps] = useState([
    "register",
    "mobile-no-verification",
    "upload-profile-photo",
    "submit-for-varification",
  ]);

  //////////////////////////////////////////////////////////////
  ////////---- Get all the profession from db -----///////////////
  //////////////////////////////////////////////////////////////
  const getCurrentSlug = useCurrentLocationSlug();

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- get previous steps --------------///////////////
  ////////////////////////////////////////////////////////////////////////////
  const [handlePreviousStep, getPreviousSteps] = usePreviousSteps();

  return (
    <>
      <ToastContainer />
      <HeaderCommon />
      <section className="register-user container">
        <div className="row">
          <div className="register-a col-lg-3 col-sm-12">
            {IsTabletOrLess() ? (
              <>
                {/*////////////////----------- form step indicator for mobile ----------////
              ////////////////////////////////////////////////////////////////////////////*/}
                <h1 className="title">Create your profile</h1>
                <span className="mb-2 d-block" style={{ fontSize: "13px" }}>
                  * Mandatory Filed
                </span>
                {getPreviousSteps().map((currSt) => {
                  return (
                    <h2 className="step-notation text-capitalize step-notation-p-active">
                      {/* step-notation-p-active */}
                      {currSt === "register"
                        ? "Personal Information"
                        : currSt.split("-").join(" ")}
                    </h2>
                  );
                })}
              </>
            ) : (
              <>
                {/*////////////////----------- form step indicator for desktop ----------////
              ////////////////////////////////////////////////////////////////////////////*/}
                <h1 className="title" style={{ color: "transparent" }}>
                  fd
                </h1>
                <h2
                  className={`step-notation text-capitalize ${
                    getCurrentSlug === "register" && "step-notation-c-active"
                  } ${
                    getPreviousSteps()?.includes("register") &&
                    "step-notation-p-active"
                  }`}
                >
                  {/* step-notation-p-active */}
                  Personal Information
                </h2>

                <h2
                  className={`step-notation ${
                    getCurrentSlug === "mobile-no-verification" &&
                    "step-notation-c-active"
                  } ${
                    getPreviousSteps()?.includes("mobile-no-verification") &&
                    "step-notation-p-active"
                  }`}
                >
                  Mobile No. Verification
                </h2>
                <h2
                  className={`step-notation ${
                    getCurrentSlug === "upload-profile-photo" &&
                    "step-notation-c-active"
                  } ${
                    getPreviousSteps()?.includes("upload-profile-photo") &&
                    "step-notation-p-active"
                  }`}
                >
                  Upload Profile Photo
                </h2>
                <h2
                  className={`step-notation ${
                    (getCurrentSlug === "submit-for-varification" ||
                      getCurrentSlug === "varification-message") &&
                    "step-notation-c-active"
                  } ${
                    getPreviousSteps()?.includes("submit-for-varification") &&
                    "step-notation-p-active"
                  }`}
                >
                  Submit for Verification
                </h2>
              </>
            )}
          </div>
          <Outlet />
          <div className="register-a col-lg-3 col-sm-12">
            {IsTabletOrLess() && (
              <>
                {allSteps.map((currEl) => {
                  if (
                    [...getPreviousSteps(), getCurrentSlug].includes(currEl)
                  ) {
                    return "";
                  } else {
                    return (
                      <h2 className="step-notation text-capitalize">
                        {currEl.split("-").join(" ")}
                      </h2>
                    );
                  }
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterUser;
