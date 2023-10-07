import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import usePreviousSteps from "./usePreviousSteps";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../slices/authSlice";

const useOtpHandler = (
  setMinuts,
  minuts,
  seconds,
  setSeconds,
  contactNumber,
  signUpOtp,
  signupOtpVerify,
  otp,
  setResendLoading
) => {
  let timer;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- handling the timer  --------------//////////////////
  ////////////////////////////////////////////////////////////////////////////

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

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- previous step handling --------------///////////////
  ////////////////////////////////////////////////////////////////////////////
  const [handlePreviousStep] = usePreviousSteps();

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- Resend otp function --------------/////////////////
  ////////////////////////////////////////////////////////////////////////////

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
      const res = await signUpOtp({ contactNumber: contactNumber });

      // if otp successfully send
      if (res?.data?.status === "success") {
        toast.success(res.data.message);
        setMinuts(9);
        setSeconds(59);
        setResendLoading(false);
      } else {
        toast.error(res.error.data.message);
        setResendLoading(false);
      }
    } catch (err) {
      toast.error(err.message);
      setResendLoading(false);
    }
  };

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- otp verification fun --------------/////////////////
  ////////////////////////////////////////////////////////////////////////////

  const handleVerifyOtp = async (e) => {
    try {
      e.preventDefault();
      if (minuts === 0 && seconds === 0) {
        handleResendOtp();
      } else {
        if (otp.length !== 6) {
          toast.error("otp must be atleast 6 Numbers");
        } else {
          const res = await signupOtpVerify({
            contactNumber: contactNumber,
            data: JSON.parse(localStorage.getItem("personalInfo")),
            otp: otp,
          }).unwrap();

          if (res?.status === "success") {
            toast.success("Contact no verified successfully");
            handlePreviousStep("mobile-no-verification");
            dispatch(setCredentials({ ...res.data }));
            navigate("/register/upload-profile-photo");
            localStorage.removeItem("personalInfo");
          } else {
            toast.error(res?.error?.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went rong!");
    }
  };

  return [handleResendOtp, handleVerifyOtp];
};

export default useOtpHandler;
