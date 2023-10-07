import { useDispatch } from "react-redux";
import ButtonForm from "../buttonForm";
import OtpInput from "react-otp-input";
import FormTitle from "./formTitle";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useSignupOtpMutation,
  useSignupOtpVerifyMutation,
} from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";

const Otpvarify = ({ handleClose, handleCase, contactNumber }) => {
  // otp state
  const [otp, setOtp] = useState("");

  // mutation
  const [signupOtpVerify, { isLoading }] = useSignupOtpVerifyMutation();
  const [signUpOtp, { isSignLoading }] = useSignupOtpMutation();

  const dispatch = useDispatch();

  // otp timer state
  const [minuts, setMinuts] = useState(9);
  const [seconds, setSeconds] = useState(59);
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

  // resend the otp

  const reSentOtp = async () => {
    try {
      const res = await signUpOtp({ contactNumber: contactNumber });

      // handling the error is if any error hapening
      if (
        `${res?.error?.status}`.startsWith("4") ||
        `${res?.error?.status}`.startsWith("5")
      ) {
        toast.error(res.error.data.message);
      }
      // if otp successfully send
      if (res?.data?.status === "success") {
        toast.success(res.data.message);
        setMinuts(9);
        setSeconds(59);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const verifyOtp = async (e) => {
    try {
      e.preventDefault();
      if (minuts === 0 && seconds === 0) {
        reSentOtp();
      } else {
        if (otp.length !== 6) {
          toast.error("otp must be atleast 6 Numbers");
        } else {
          const res = await signupOtpVerify({
            contactNumber: contactNumber,
            otp: otp,
          }).unwrap();

          if (
            `${res?.error?.status}`.startsWith("4") ||
            `${res?.error?.status}`.startsWith("5")
          ) {
            toast.error(res.error.message);
          }

          if (res.status === "success") {
            toast.success("Contact no verified successfully");
            dispatch(setCredentials({ ...res.data }));
            handleCase("profileInfo");
          }
        }
      }
    } catch (error) {
      toast.success("Something went rong!");
    }
  };

  return (
    <>
      <div className="modal-head d-flex justify-content-between">
        <button onClick={() => handleCase("contact")}>Back</button>
        <button onClick={handleClose}>Close</button>
      </div>
      <FormTitle text="Mobile Number Verification" />
      <div className="otp-num">
        OTP has been sent to this Mobile No.+91 {contactNumber}.
      </div>
      <form onSubmit={verifyOtp}>
        <div className="form-group con-mobile">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span></span>}
            renderInput={(props) => <input className="otp-inputs" {...props} />}
          />
        </div>
        <div className="otp-time">
          {minuts < 10 ? `0${minuts}` : minuts} :{" "}
          {seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <div className="otp-resend">
          <button
            className={`${minuts === 0 && seconds === 0 ? "otp-active" : ""}`}
            type="submit"
          >
            {isSignLoading ? "...loading" : "Resend"}
          </button>
        </div>

        <button
          className={`btn btn-form mb-2 ${isLoading && "disabled"}`}
          type="submit"
        >
          {isLoading ? "...loading" : "Verify"}
        </button>
      </form>
    </>
  );
};

export default Otpvarify;
