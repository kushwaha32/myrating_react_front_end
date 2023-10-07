import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Contact from "./stepForm/contact";
import Otpvarify from "./stepForm/otpVarify";
import ProfileInfo from "./stepForm/profileInfo";
import CreatePassword from "./stepForm/createPassword";

import { signUpSchema } from "../schemaValidation/signupValidation";
import { useSelector } from "react-redux";



const ModalAuth = ({
  userRegistrationModelClose,
  userRegistrationModelShow,
  showUserRegistrationModel,
}) => {
  // step field which set form level
  let [caseVal, setCaseVal] = useState("contact");
  const [contactNumber, setContactNumber] = useState("");

  const { userInfo } = useSelector(state => state.auth)

  useEffect(() => {
     if(userInfo){
       
       if(userInfo?.user?.userProfile){
        setCaseVal("createPassword");
       }else{
        setCaseVal("profileInfo");
       }
     }else{
      setCaseVal("contact")
     }
  }, [userInfo])
  
  const handleContact = (conN) => {
        setContactNumber(conN);
  }

 
  // handle the case value
  const handleCase = (val) => {
     setCaseVal(val);
  };

  
  const renderSwidth = () => {
    switch (caseVal) {
      case "contact":
        return (
          <Contact
            handleClose={userRegistrationModelClose}
            handleCase={handleCase}
            handleContact={handleContact}
           
          />
        );
      case "otpVerify":
        return (
          <Otpvarify
            handleClose={userRegistrationModelClose}
            handleCase={handleCase}
            contactNumber={contactNumber}
          />
        );
      case "profileInfo":
        return (
          <ProfileInfo
            handleClose={userRegistrationModelClose}
            handleCase={handleCase}
          />
        );
      case "createPassword":
        return (
          <CreatePassword
            handleClose={userRegistrationModelClose}
            handleCase={handleCase}
          />
        );
    }
  };
  return (
    <>
      <Modal
        show={showUserRegistrationModel}
        onHide={userRegistrationModelClose}
      >
        <section className="modal-body text-center">
          <div>{renderSwidth()}</div>
        </section>
      </Modal>
    </>
  );
};

export default ModalAuth;
