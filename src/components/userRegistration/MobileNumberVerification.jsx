import OtpInput from "react-otp-input";
import PulseLoader from "react-spinners/PulseLoader";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import navigatePre from "../../img/navigate-pre.png";
import {
  useSignupOtpMutation,
  useSignupOtpVerifyMutation,
} from "../../slices/usersApiSlice";
import useOtpHandler from "../../utils/ownHooks/useOtphandle";
import usePreviousSteps from "../../utils/ownHooks/usePreviousSteps";
import { IsTabletOrLess } from "../../utils/mediaScreens";
import useCurrentLocationSlug from "../../utils/ownHooks/useCurrentLocationSlug";

const MobileNumberVerification = () => {
  // otp state
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  /////////////////////////////////////////////////////////////////////////////
  /////////--------------- Otp resend loading state  -------------------///////
  ////////////////////////////////////////////////////////////////////////////

  const [reSendLoading, setResendLoading] = useState(false);

  /////////////////////////////////////////////////////////////////////////////
  /////////------------- Get the sign otp verify mutation --------------///////
  ////////////////////////////////////////////////////////////////////////////
  const [signupOtpVerify, { isLoading }] = useSignupOtpVerifyMutation();

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- Get the sign otp mutation --------------///////////
  ////////////////////////////////////////////////////////////////////////////

  const [signUpOtp, { isSignLoading }] = useSignupOtpMutation();

  /////////////////////////////////////////////////////////////////////////////
  ///////------------- contact number from localstorage --------------/////////
  ////////////////////////////////////////////////////////////////////////////

  const [contactNumber, setContactNumber] = useState("");

  useEffect(() => {
    setContactNumber(
      localStorage.getItem("personalInfo")
        ? JSON.parse(localStorage.getItem("personalInfo")).contact
        : ""
    );
  }, []);

  //////////////////////////////////////////////////////////////
  ////////------- Get the current slug ----------///////////////
  //////////////////////////////////////////////////////////////
  const getCurrentSlug = useCurrentLocationSlug();

  /////////////////////////////////////////////////////////////////////////////
  /////////////------------- Otp Timer State --------------///////////////////
  ////////////////////////////////////////////////////////////////////////////

  const [minuts, setMinuts] = useState(9);
  const [seconds, setSeconds] = useState(59);

  /////////////////////////////////////////////////////////////////////////////
  ////////////------------- Otp Handler custom huck --------------/////////////
  ////////////////////////////////////////////////////////////////////////////

  const [handleResendOtp, handleVerifyOtp] = useOtpHandler(
    setMinuts,
    minuts,
    seconds,
    setSeconds,
    contactNumber,
    signUpOtp,
    signupOtpVerify,
    otp,
    setResendLoading
  );

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- previous step handling --------------///////////////
  ////////////////////////////////////////////////////////////////////////////
  const [handlePreviousStep, getPreviousSteps, removeItemsFromSteps] =
    usePreviousSteps();

  //////////////////////////////////////////////////////////////////
  //////--------- Get back to previous form -------/////////////////
  /////////////////////////////////////////////////////////////////
  const getBack = () => {
    removeItemsFromSteps("register");
    navigate("/register");
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

      {/*/////////////------from field  .error-active -> for active error class ---////// 
       //////////////----------- .valid-active-g -> for valid input -----/////////////////
        */}

      <section className="register-b-main register-b-mn-verify mb-5 position-relative">
        {IsTabletOrLess() && (
          <h2 className="register-b-cur">
            {getCurrentSlug === "register"
              ? "Personal Information"
              : getCurrentSlug.split("-").join(" ")}
          </h2>
        )}
        <form className="was-validated " onSubmit={handleVerifyOtp}>
          <div className="form-group position-absolute mobile-verify-a">
            <div className="">
              <p className="mobile-verify-aa text-center">
                OTP send to this Mobile Number <span>+91 {contactNumber}.</span>
              </p>
              <div className="m-otp-timeR d-flex align-items-center">
                <div className="con-mobile-n ">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span></span>}
                    renderInput={(props) => (
                      <input className="otp-inputs" {...props} />
                    )}
                  />
                </div>
                <div className="otp-timer">
                  {minuts < 10 ? `0${minuts}` : minuts} :{" "}
                  {seconds < 10 ? `0${seconds}` : seconds}
                </div>
                <div className="resendOtp-btn">
                  <span
                    className={`${
                      minuts === 0 && seconds === 0 ? "otp-active" : ""
                    }`}
                    onClick={handleResendOtp}
                    style={{ cursor: "pointer" }}
                  >
                    {reSendLoading ? "" : "Resend"}
                  </span>
                  <PulseLoader
                    color="rgb(0 40 86 / 80%)"
                    loading={reSendLoading}
                    size={6}
                    cssOverride={{ width: "37px" }}
                    className="otw"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="btn-s-main position-absolute btn-otp-s-main">
            <button
              type="submit"
              className={`btn btn-white ${isLoading && "disabled"}`}
            >
              {isLoading ? "Loading" : "Verify & Continue"}
              <PulseLoader
                color="rgb(0 40 86 / 80%)"
                loading={isLoading}
                size={6}
                cssOverride={{ width: "37px" }}
              />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default MobileNumberVerification;
