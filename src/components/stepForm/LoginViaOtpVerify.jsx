import ButtonForm from "../buttonForm";
import OtpInput from "react-otp-input";
import FormTitle from "./formTitle";
import { useCallback, useEffect, useState } from "react";
import asyncLocalStorage from "../../utils/asyncLocalStorage";
import { toast } from "react-toastify";
import {
  useLoginViaOtpMutation,
  useLoginViaOtpVerifyMutation,
} from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { useDispatch } from "react-redux";

const LoginViaOtpVerify = ({ handleClose, stepBack, contact }) => {
  // login via otp
  const [loginOtp, { isLoading }] = useLoginViaOtpMutation();

  // login via otp verify
  const [loginOtpVerify, { isLoading: loginOtpVerifyLoding }] =
    useLoginViaOtpVerifyMutation();

  const dispatch = useDispatch();

  const [otp, setOtp] = useState();

  // otp timer state
  const [minuts, setMinuts] = useState(9);
  const [seconds, setSeconds] = useState(59);

  // contact field
  const [otpContact, setOtpContact] = useState();
  const setField = useCallback(async () => {
    let fieldData = await asyncLocalStorage.getItem("loginViaOptContact");
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

      const res = await loginOtp({
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
  const handleLoginOtpVerify = async () => {
    try {
      if (otp.length < 6) {
        toast.error("OTP must be atleast 6 digit!");
      } else {
        await setField();

        const res = await loginOtpVerify({
          emailOrContact: otpContact?.contactOrEmail,
          otp,
        }).unwrap();
        if (res.status === "success") {
          dispatch(setCredentials({ ...res.data }));
          toast.success("You are logged in successfully!");
          handleClose();
          // remove item from the local storage
          await asyncLocalStorage.removeItem("loginViaOptContact");
          stepBack("loginForm");
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
        <button onClick={() => stepBack("loginViaOtp")}>Back</button>
        <button onClick={handleClose}>Close</button>
      </div>
      <FormTitle text="Login via OTP" />
      <div className="otp-num text-center">
        OTP has been sent to <span> {otpContact?.contactOrEmail}</span>
      </div>
      <div className="form-group con-mobile con-otp-new-v">
        <OtpInput
          value={otp}
          onChange={(otp) => setOtp(otp)}
          numInputs={6}
          renderSeparator={<span></span>}
          renderInput={(props) => (
            <input className="otp-inputs justify-content-center" {...props} />
          )}
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
        className={`btn btn-form mb-2 ${loginOtpVerifyLoding && "disabled"}`}
        style={style}
        onClick={handleLoginOtpVerify}
      >
        {loginOtpVerifyLoding ? "...loading" : "Verify"}
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

export default LoginViaOtpVerify;
