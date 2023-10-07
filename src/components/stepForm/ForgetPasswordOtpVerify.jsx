import ButtonForm from "../buttonForm";
import OtpInput from "react-otp-input";
import FormTitle from "./formTitle";
import { useCallback, useEffect, useState } from "react";
import asyncLocalStorage from "../../utils/asyncLocalStorage";
import { toast } from "react-toastify";
import {
  useForgetPasswordMutation,
  useForgetPasswordOtpVerifyMutation,
} from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { useDispatch } from "react-redux";

const ForgetPasswordOtpVerify = ({ handleClose, stepBack, contact }) => {
  // login via otp
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  // login via otp verify
  const [forgetOtpVerify, { isLoading: forgetOtpVerifyLoding }] =
    useForgetPasswordOtpVerifyMutation();

  const dispatch = useDispatch();

  const [otp, setOtp] = useState();

  // otp timer state
  const [minuts, setMinuts] = useState(9);
  const [seconds, setSeconds] = useState(59);

  // contact field
  const [otpContact, setOtpContact] = useState();
  const setField = useCallback(async () => {
    let fieldData = await asyncLocalStorage.getItem("forgetPasswordContact");
    setOtpContact(JSON.parse(fieldData) || contact);
  }, []);

  useEffect(() => {
    setField();
  }, []);

  let timer;
  useEffect(() => {
    // otp timer function
    timer = setInterval(() => {
      if (seconds === 0 && minuts === 0) {
        return () => clearInterval(timer);
      }
      setSeconds(seconds - 1);
      if (seconds === 0) {
        if (seconds === 0 && minuts === 0) {
          return () => clearInterval(timer);
        }
        setMinuts(minuts - 1);

        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minuts, seconds]);

  const resendOtp = async () => {
    try {
      await setField();

      const res = await forgetPassword({
        contactOrEmail: otpContact?.contactOrEmail,
      }).unwrap();
      console.log(res.status);
      if (res.status !== "success") {
        toast.error("Something went rong. try latter!");
      }
      if (res.status === "success") {
        //  set the contact into local storage
        toast.success(res.message);
        console.log(res);
        setMinuts(9);
        setSeconds(59);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // handle login via otp verify
  const handleForgetPasswordOtpVerify = async () => {
    try {
      if (otp.length < 6) {
        toast.error("OTP must be atleast 6 digit!");
      } else {
        await setField();

        const res = await forgetOtpVerify({
          emailOrContact: otpContact?.contactOrEmail,
          otp,
        }).unwrap();
        if (res.status === "success") {
          toast.success(res.message);
          // remove item from the local storage
          //   await asyncLocalStorage.removeItem("forgetPasswordContact");
          stepBack("resetPassword");
        } else {
          toast.error(res.message);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="modal-head d-flex justify-content-between">
        <button onClick={() => stepBack("forgetPass")}>Back</button>
        <button onClick={handleClose}>Close</button>
      </div>
      <FormTitle text="Reset Password" />
      <div className="otp-num text-center">
        OTP has been sent to <span> {otpContact?.contactOrEmail}</span>
      </div>
      <div className="form-group con-mobile con-otp-new-v">
        <OtpInput
          value={otp}
          onChange={(otp) => setOtp(otp)}
          numInputs={6}
          renderSeparator={<span></span>}
          renderInput={(props) => <input className="otp-inputs" {...props} />}
        />
      </div>
      <div className="otp-time text-center">
        {" "}
        {minuts < 10 ? `0${minuts}` : minuts} :{" "}
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div className="otp-resend text-center">
        <button onClick={resendOtp}>
          {isLoading ? "...loading" : "Resend"}{" "}
        </button>
      </div>

      <button
        className={`btn btn-form mb-2 ${forgetOtpVerifyLoding && "disabled"}`}
        style={style}
        onClick={handleForgetPasswordOtpVerify}
      >
        {forgetOtpVerifyLoding ? "...loading" : "Verify"}
      </button>
    </>
  );
};

const style = {
  width: "80%",
  color: "#ffc300",
  padding: "11px 20px",
  margin: "16px auto auto",
  display: "block",
  fontSize: "15px",
  borderRadius: "14px",
  fontFamily: "'Belanosima', sans-serif",
};

export default ForgetPasswordOtpVerify;
