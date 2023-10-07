import OtpInput from "react-otp-input";
import PulseLoader from "react-spinners/PulseLoader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import navigatePre from "../../img/navigate-pre.png";
import {
  useBrandSignupOtpVerifyMutation,
  useResendOtpToContactMutation,
} from "../../slices/usersApiSlice";
import { IsTabletOrLess } from "../../utils/mediaScreens";
import useCurrentLocationSlug from "../../utils/ownHooks/useCurrentLocationSlug";
import useBusinessPreviousSteps from "../../utils/ownHooks/useBusinessPreviousSteps";
import useBrandOtpHandler from "../../utils/ownHooks/useBrandOtpHandler";

const MobileNumberEmailVerification = () => {
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
  const [brandSignupOtpVerify, { isLoading }] =
    useBrandSignupOtpVerifyMutation();

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- Get the sign otp mutation --------------///////////
  ////////////////////////////////////////////////////////////////////////////

  const [resendNewOtpContact, { isResendOtpConLoading }] =
    useResendOtpToContactMutation();

  /////////////////////////////////////////////////////////////////////////////
  ///////------------- contact number from localstorage --------------/////////
  ////////////////////////////////////////////////////////////////////////////

  const [contactNumber, setContactNumber] = useState("");

  useEffect(() => {
    setContactNumber(
      localStorage.getItem("businessInfo")
        ? JSON.parse(localStorage.getItem("businessInfo")).contact
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

  const [handleResendOtp, handleVerifyOtp] = useBrandOtpHandler(
    setMinuts,
    minuts,
    seconds,
    setSeconds,
    contactNumber,
    resendNewOtpContact,
    brandSignupOtpVerify,
    otp,
    setResendLoading
  );

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- previous step handling --------------///////////////
  ////////////////////////////////////////////////////////////////////////////
  const [handlePreviousStep, getPreviousSteps, removeItemsFromSteps] =
    useBusinessPreviousSteps();

  //////////////////////////////////////////////////////////////////
  //////--------- Get back to previous form -------/////////////////
  /////////////////////////////////////////////////////////////////
  const getBack = () => {
    removeItemsFromSteps("list-your-business");
    navigate("/list-your-business");
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

      <section className="register-b-main register-b-mn-verify business-b-main mb-5 position-relative">
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
              to="/register/upload-profile-photo"
              className={`btn btn-white ${isLoading && "disabled"}`}
            >
              {isLoading ? "Loading" : "Save & Continue"}
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

export default MobileNumberEmailVerification;
