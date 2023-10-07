import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import BusinessProfileForm from "./stepForm/BusinessProfileForm";
import BusinessOtpVerify from "./stepForm/BusinesOtpVerify";
import BrandCreatePassword from "./stepForm/BrandCreatePassword";



const BusinessRegistrationModel = ({
  businessRegistrationModelClose,
  showBusinessRegistrationModel,
}) => {
  // step field which set form level
  const [fildCase, setFildCase] = useState("businesProfile");
  const [fildVal, setFildVal] = useState();
  
  // Handle case 
  const handleCase = (val) => {
      setFildCase(val);
      
  } 

  // Handle field val
  const handleFildVal = (val) => {
    setFildVal(val);
  }

  const renderSwidth = () => {
    switch (fildCase) {
      case "businesProfile":
        return (
          <BusinessProfileForm
            handleClose={businessRegistrationModelClose}
            handleCase={handleCase}
            handleFildVal={handleFildVal}
          />
        );
      case "businessOtpVerify":
        return (
          <BusinessOtpVerify
            handleClose={businessRegistrationModelClose}
            handleCase={handleCase}
            fildVal={fildVal}
           
          />
        );
      case "businessCreatePass":
        return (
          <BrandCreatePassword
            handleClose={businessRegistrationModelClose}
            handleCase={handleCase}
          />
        );
    }
  };
  return (
    <>
    
      <Modal
        show={showBusinessRegistrationModel}
        onHide={businessRegistrationModelClose}
        // className={`${step > 1 ?  "" : "business-modal"} `}
      >
        <section className="modal-body business-profile-form text-center">
          {renderSwidth()}
        </section>
      </Modal>
    
    </>
  );
};

export default BusinessRegistrationModel;
