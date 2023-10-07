import { useFormik } from "formik";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import navigatePre from "../../img/navigate-pre.png";
import useBusinessPreviousSteps from "../../utils/ownHooks/useBusinessPreviousSteps";
import { useNavigate } from "react-router-dom";
import locationInformationSchema from "../../schemaValidation/locationInformationSchema";
import ToggledSwitch from "../ToggledSwitch";
import plusImg from "../../img/plus-increment.png";
import negativeImg from "../../img/minus-decrement.png";
import { useToast } from "react-toastify";
import { contactInfoValidationSchema } from "../../schemaValidation/contactInfoValidationSchema";
import { useEffect } from "react";
import { useRef } from "react";
import useHoursOptions from "../../utils/ownHooks/useHoursOptions";
import { IsTabletOrLess } from "../../utils/mediaScreens";

const BusinessKeyword = () => {
  const [isLoading, setIsLoading] = useState("");
  const navigate = useNavigate();

  /////////////////////////////////////////////////////////////////////////////
  ///////////----------------- Initial state ------------------///////////////
  ////////////////////////////////////////////////////////////////////////////

  const [initialValues, setInitialValues] = useState({
    // description
    keywords: "",
  });

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
        console.log(values.keywords);
        setIsLoading(true);
        setTimeout(() => {
          handlePreviousStep("business-keywords");
          navigate("/list-your-business/upload-photo-video-logo");
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
    removeItemsFromSteps("other-information");
    navigate("/list-your-business/other-information");
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

      <section className="register-b-main register-b-mn-verify loca-b-main business-b-main mb-5 position-relative">
        <form className="was-validated " onSubmit={handleSubmit}>
          <div className="form-group">
            {/* ////////////////////////////////////////////////////////////// */}
            {/*/////////////////---------- Keywords -------//////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row">
              <div className="col-lg-12">
                <label>Type Keyboards for your business search.</label>
                <div>
                  <textarea
                    className="form-control mt-2"
                    name="keywords"
                    value={values.keywords}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ height: "156px", width: "100%" }}
                  ></textarea>
                  <p className="mt-2">Note : Limit 10 words 200 Character</p>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-s-main position-absolute btn-otp-s-main">
            <button
              type="submit"
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

export default BusinessKeyword;
