import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import LoginForm from "./stepForm/LoginForm";
import LoginViaOtp from "./stepForm/LoginViaOtp";
import LoginViaOtpVerify from "./stepForm/LoginViaOtpVerify";
import ForgetPassword from "./stepForm/ForgetPassword";
import ForgetPasswordOtpVerify from "./stepForm/ForgetPasswordOtpVerify";
import ResetPassword from "./stepForm/ResetPassword";

const LoginModal = ({ loginModelClose, loginModel }) => {
  // step field which set form level
  let [formStep, setFormStep] = useState("loginForm");

  // stepIncrement which increase the step field value
  const stepForword = (stepField) => {
    setFormStep(stepField);
  };

  // stepDecrement which decrease the step field value
  const stepBack = (stepField) => {
    setFormStep(stepField);
  };

  // contact
  const [contact, setContact] = useState();

  // handle contact
  const handleContact = (val) => {
    setContact(val);
  };

  const renderSwidth = () => {
    switch (formStep) {
      case "loginForm":
        return (
          <LoginForm handleClose={loginModelClose} stepForword={stepForword} />
        );
      case "loginViaOtp":
        return (
          <LoginViaOtp
            handleClose={loginModelClose}
            stepForword={stepForword}
            stepBack={stepBack}
            title="Login via OTP"
            handleContact={handleContact}
          />
        );
      case "otpVerify":
        return (
          <LoginViaOtpVerify
            handleClose={loginModelClose}
            stepBack={stepBack}
            contact={contact}
          />
        );
      case "forgetPass":
        return (
          <ForgetPassword
            handleClose={loginModelClose}
            stepForword={stepForword}
            stepBack={stepBack}
            handleContact={handleContact}
          />
        );
      case "forgetPassOtpVerify":
        return (
          <ForgetPasswordOtpVerify
            handleClose={loginModelClose}
            stepBack={stepBack}
            contact={contact}
          />
        );
      case "resetPassword":
        return (
          <ResetPassword
            handleClose={loginModelClose}
            stepBack={stepBack}
            contact={contact}
          />
        );
    }
  };
  return (
    <>
      <Modal
        show={loginModel}
        onHide={loginModelClose}
        className="login-modal-container"
      >
        <section className="modal-body login-profile-form text-center">
          {renderSwidth()}
        </section>
      </Modal>
    </>
  );
};

export default LoginModal;
