import { useFormik } from "formik";
import { useState } from "react";

import PulseLoader from "react-spinners/PulseLoader";
import navigatePre from "../../img/navigate-pre.png";
import useBusinessPreviousSteps from "../../utils/ownHooks/useBusinessPreviousSteps";
import { useNavigate } from "react-router-dom";
import useHandleImage from "../../utils/ownHooks/useHandleImage";
import useGetImageSecureUrl from "../../utils/ownHooks/useGetImageScureUrl";
import DocumentVerification from "./DocumentVerification";
import { IsTabletOrLess } from "../../utils/mediaScreens";

const SubmitForBusinessVerification = () => {
  const [isLoading, setIsLoading] = useState("");
  // business document array
  const [businessDoc, setBusinessDoc] = useState([
    "Registeration Certificate",
    "GST Certificate",
    "MSME - Udhyam Certificate",
    "Other Certificate",
  ]);
  // Id of representative array
  const [idRepresentative, setIdRepresentative] = useState([
    "Aadhar Card",
    "Driver License",
    "Voter ID",
    "Employee ID (Issued by Office)",
    "Authorization Letter",
  ]);

  const navigate = useNavigate();

  /////////////////////////////////////////////////////////////////////////////
  ///////////----------------- Initial state ------------------///////////////
  ////////////////////////////////////////////////////////////////////////////

  const [initialValues, setInitialValues] = useState({
    image: "",
    documentType: "",
    idRepresentative: "",
  });

  /////////////////////////////////////////////////////////////////////////////////////
  /////--- Handle and upload image to s3 bucket in update to user profile ---/////////
  ///////////////////////////////////////////////////////////////////////////////////
  const handleSecureUrl = useGetImageSecureUrl();

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- previous step handling --------------///////////////
  ////////////////////////////////////////////////////////////////////////////
  const [handlePreviousStep, getPreviousSteps, removeItemsFromSteps] =
    useBusinessPreviousSteps();

  const {
    values,
    errors,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
  } = useFormik({
    initialValues,
    // validationSchema: contactInfoValidationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setTimeout(() => {
          handlePreviousStep("submit-for-verification");
          navigate("/list-your-business/submit-for-verification-confirm");
          setIsLoading(false);
        }, 300);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    },
  });

  //////////////////////////////////////////////////////////////////
  //////--------- Get back to previous form -------/////////////////
  /////////////////////////////////////////////////////////////////
  const getBack = () => {
    removeItemsFromSteps("upload-photo-video-logo");
    navigate("/list-your-business/upload-photo-video-logo");
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

      <section className="register-b-main  register-b-mn-verify loca-b-main business-b-main mb-5 position-relative">
        <form className="was-validated sum-v-f" onSubmit={handleSubmit}>
          <div className="upload-photo-text">
            Upload Documents for verification
            <span className="d-block">
              File Size Max. 10 MB <span>(JPEG, PNG, PDF)</span>
            </span>
          </div>
          <label className="ms-2 mt-5 sum-v-lb">Business documents</label>
          <DocumentVerification
            values={values}
            setFieldValue={setFieldValue}
            errors={errors}
            verify={businessDoc}
            fieldSet="documentType"
          />
          <label className="ms-2 mt-5 sum-v-lb">
            ID of Admin/Representative/Owner
          </label>
          <DocumentVerification
            values={values}
            setFieldValue={setFieldValue}
            errors={errors}
            verify={idRepresentative}
            fieldSet="idRepresentative"
          />
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

export default SubmitForBusinessVerification;
