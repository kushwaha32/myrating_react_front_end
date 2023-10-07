import { useDispatch } from "react-redux";
import OtpInput from "react-otp-input";
import FormTitle from "./formTitle";
import { useCallback, useEffect, useState } from "react";
import asyncLocalStorage from "../../utils/asyncLocalStorage";
import {
  useBrandSignupOtpVerifyMutation,
  useResendOtpToContactMutation,
  useResendOtpToEmailMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../../slices/authSlice";

const BusinessOtpVerify = ({ handleClose, handleCase, fildVal }) => {
  // mobile otp timer state
  const [mobileMinuts, setMobileMinuts] = useState(9);
  const [mobileSeconds, setMobileSeconds] = useState(59);

  // email otp timer state
  const [emailMinuts, setEmailMinuts] = useState(9);
  const [emailSeconds, setEmailSeconds] = useState(59);

  let timer;
  let emailTimer;
  // mobile otp timer related useEffect
  useEffect(() => {
    // otp timer function
    timer = setInterval(() => {
      if (mobileSeconds === 0 && mobileMinuts === 0) {
        return () => clearInterval(timer);
      }
      setMobileSeconds(mobileSeconds - 1);
      if (mobileSeconds === 0) {
        if (mobileSeconds === 0 && mobileMinuts === 0) {
          return () => clearInterval(timer);
        }
        setMobileMinuts(mobileMinuts - 1);

        setMobileSeconds(59);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [mobileMinuts, mobileSeconds]);

  // email otp related timer useEffect

  useEffect(() => {
    // otp timer function
    emailTimer = setInterval(() => {
      if (emailSeconds === 0 && emailMinuts === 0) {
        return () => clearInterval(emailTimer);
      }
      setEmailSeconds(emailSeconds - 1);
      if (emailSeconds === 0) {
        if (emailSeconds === 0 && emailMinuts === 0) {
          return () => clearInterval(emailTimer);
        }
        setEmailMinuts(emailMinuts - 1);

        setEmailSeconds(59);
      }
    }, 1000);

    return () => clearInterval(emailTimer);
  }, [emailMinuts, emailSeconds]);

  const [brandSignupOtpVerify, { isLoading }] =
    useBrandSignupOtpVerifyMutation();

  const [resendNewOtpContact, { isResendOtpConLoading }] =
    useResendOtpToContactMutation();
  const [resendNewOtpEmail, { isResendOtpEmailLoading }] =
    useResendOtpToEmailMutation();

  const dispatch = useDispatch();
  // mobile otp field
  const [mobileOtp, setMobileOtp] = useState("");

  // email otp field
  const [emailOtp, setEmailOtp] = useState("");

  // business field val
  const [businessField, setBusinessField] = useState();

  // set business field data by getting from the local storage
  const setField = useCallback(async () => {
    let fieldData = await asyncLocalStorage.getItem("businessProfileField");
    setBusinessField(JSON.parse(fieldData) || fildVal);
  }, []);

  useEffect(() => {
    setField();
  }, []);

  // resend the mobile otp
  const resendMobileOtp = async () => {
    try {
      await setField();
      //  if (mobileMinuts === 0 && mobileSeconds === 0) {
      const res = await resendNewOtpContact({
        contactNumber: businessField?.mobileNo,
      }).unwrap();
      console.log(res);
      if (res.status === "success") {
        toast.success(res.message);
        setMobileMinuts(9);
        setMobileSeconds(59);
      } else {
        toast.error("Something went rong try latter!");
      }

      // }
    } catch (error) {
      toast.error("Something went rong try latter!");
    }
  };
  // resend the email otp
  const resendEmailOtp = async () => {
    try {
      await setField();
      //  (emailMinuts === 0 && emailSeconds === 0) {
      const res = await resendNewOtpEmail({
        email: businessField?.emailAddress,
      }).unwrap();
      console.log(res);
      if (res.status === "success") {
        toast.success(res.message);
        setEmailMinuts(9);
        setEmailSeconds(59);
      } else {
        toast.error("Something went rong try latter!");
      }

      // }
    } catch (error) {
      toast.error("Something went rong try latter!");
    }
  };
  const handleOtpVerify = async () => {
    try {
      await setField();

      const res = await brandSignupOtpVerify({
        email: businessField?.emailAddress,
        contactNumber: businessField?.mobileNo,
        emailOtp: emailOtp,
        contactNumberOtp: mobileOtp,
        brandName: businessField?.fullName,
        registeredAs: businessField?.registeredAs,
        industry: businessField?.industry,
        location: businessField?.googleLocation,
      }).unwrap();

      if (res.status === "success") {
        toast.success("Credentials verified successfully!");
        dispatch(setCredentials({ ...res.data }));
        handleCase("businessCreatePass");
        localStorage.removeItem("businessProfileField");
      }
      if (res.data.status === "fail") {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.data.message);
      console.log(err);
    }
  };

  return (
    <>
      <div className="modal-head d-flex justify-content-between">
        <button onClick={() => handleCase("businesProfile")}>Back</button>
        <button onClick={handleClose}>Close</button>
      </div>
      <FormTitle text="Verification" />
      {/* mobile no otp */}
      <div className="otp-num">
        OTP has been sent to this Mobile No.{" "}
        <span>+91 {businessField?.mobileNo}</span>.
      </div>
      <div className="form-group con-mobile">
        <OtpInput
          value={mobileOtp}
          onChange={(otp) => setMobileOtp(otp)}
          numInputs={6}
          renderSeparator={<span></span>}
          renderInput={(props) => <input className="otp-inputs" {...props} />}
        />
        <div className="otp-time">
          {" "}
          {mobileMinuts < 10 ? `0${mobileMinuts}` : mobileMinuts} :{" "}
          {mobileSeconds < 10 ? `0${mobileSeconds}` : mobileSeconds}
        </div>
        <div className="otp-resend">
          <button onClick={resendMobileOtp}>Resend</button>
        </div>
      </div>
      {/* email otp */}
      {/* <div className="otp-num">
        OTP has been sent to this Email Address{" "}
        <span> {businessField?.emailAddress}</span>.
      </div>
      <div className="form-group con-mobile">
        <OtpInput
          value={emailOtp}
          onChange={(otp) => setEmailOtp(otp)}
          numInputs={6}
          renderSeparator={<span></span>}
          renderInput={(props) => <input className="otp-inputs" {...props} />}
        />
        <div className="otp-time">
          {emailMinuts < 10 ? `0${emailMinuts}` : emailMinuts} :{" "}
          {emailSeconds < 10 ? `0${emailSeconds}` : emailSeconds}
        </div>
        <div className="otp-resend">
          <button onClick={resendEmailOtp}>Resend</button>
        </div>
      </div> */}

      <button
        className={`btn btn-form mb-2 ${isLoading && "disabled"}`}
        style={style}
        onClick={handleOtpVerify}
      >
        {isLoading ? "...loading" : "Continue"}
      </button>
    </>
  );
};

const style = {
  marginTop: "38px",
  width: "150px",
  fontWeight: "bold",
  padding: "8px 0",
  marginBottom: "12px",
};

export default BusinessOtpVerify;
