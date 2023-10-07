import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import { useEffect, useState } from "react";
import glypsIcon from "../../img/reload.png";
import captchbg from "../../img/captch-bg.png";
import useProfessionValidation from "../../utils/ownHooks/useProfessionValidation";
import useCapGen from "../../utils/ownHooks/useCaptchGen";
import useCaptchaValidation from "../../utils/ownHooks/useCaptchaValidation";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import UseFetchProfessionOption from "../../utils/ownHooks/useFetchProfessionOption";
import {
  useBrandSignupMutation,
  useSignupOtpMutation,
} from "../../slices/usersApiSlice";
import { IsTabletOrLess } from "../../utils/mediaScreens";
import useCurrentLocationSlug from "../../utils/ownHooks/useCurrentLocationSlug";
import useBusinessPreviousSteps from "../../utils/ownHooks/useBusinessPreviousSteps";
import { businessInfoSchema } from "../../schemaValidation/businessInfoSchema";

const initialValues = {
  companyName: "",
  title: "",
  fullName: "",
  contact: "",
  email: "",
  terms_and_cond: false,
  privacy_and_policy: false,
};

const BusinessOrCompanyInfo = () => {
  const [captch, setCaptch] = useState("");
  const [capchaInput, setCaptchInput] = useState("");
  const [capchaError, setCaptchError] = useState(false);
  const [capchaValid, setCaptchValid] = useState(false);
  const navigate = useNavigate();

  //////////////////////////////////////////////////////////////
  ////////---- Get all the profession from db -----///////////////
  //////////////////////////////////////////////////////////////
  const [professionOptions, setProfessionOptions] = useState([]);
  UseFetchProfessionOption(setProfessionOptions);

  //////////////////////////////////////////////////////////////
  ////////---- Profession custom handler fn -----///////////////
  //////////////////////////////////////////////////////////////
  const [profession, setProfession] = useState([]);

  ////////////////////////////////////////////////////////
  ////////---- Captcha generator fn -----///////////////
  ///////////////////////////////////////////////////////
  const createCaptch = useCapGen(
    setCaptch,
    setCaptchInput,
    setCaptchError,
    setCaptchValid
  );

  useEffect(() => {
    createCaptch();
  }, []);

  /////////////////////////////////////////////////////////////////////////////
  ///////----- handle the captcha input validation -------------///////////////
  ////////////////////////////////////////////////////////////////////////////
  const handleCaptchaInput = useCaptchaValidation(
    captch,
    setCaptchInput,
    setCaptchError,
    setCaptchValid
  );

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- previous step handling --------------///////////////
  ////////////////////////////////////////////////////////////////////////////
  const [handlePreviousStep] = useBusinessPreviousSteps();

  /////////////////////////////////////////////////////////////////////////////
  ///////////----- handling the user registration -------------///////////////
  ////////////////////////////////////////////////////////////////////////////
  const [loading, setLoading] = useState(false);

  /////////////////////////////////////////////////////////////////////////////
  ////////------------- geo location coordinates hook --------------///////////
  ////////////////////////////////////////////////////////////////////////////
  // const handleGetCoordinates = useCoordinates();

  /////////////////////////////////////////////////////////////////////////////
  ////////------------- Brand signup mutation --------------///////////
  ////////////////////////////////////////////////////////////////////////////
  const [brandSignup, { isLoading }] = useBrandSignupMutation();

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
    validationSchema: businessInfoSchema,
    onSubmit: async (value) => {
      try {
        setLoading(true);
        if (captch === capchaInput) {
          // set the values into the local storage
          localStorage.setItem("businessInfo", JSON.stringify(value));
          const repreName = { title: value.title, fullName: value.fullName };
          value.repreName = repreName;

          const res = await brandSignup({
            email: value.email,
            contactNumber: value.contact,
          }).unwrap();

          // if otp successfully send

          if (res?.status === "success") {
            toast.success(res?.message);
            navigate("/list-your-business/mobile-no-e-mail-id-verification");
            setLoading(false);
            handlePreviousStep("list-your-business");
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        } else {
          setCaptchError(true);
          setLoading(false);
        }
      } catch (err) {
        toast.error(err?.data?.message);
        setLoading(false);
      }
    },
  });

  ////////////////////////////////////////////////////////////////////////////////////////////
  ///----- Filling the field values if already presend in local storage -------///////////////
  ///----- when user comes from forward to backward -------//////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (localStorage.getItem("businessInfo")) {
      const fieldVal = JSON.parse(localStorage.getItem("businessInfo"));
      setFieldValue("companyName", fieldVal.companyName);
      setFieldValue("title", fieldVal.title);
      setFieldValue("fullName", fieldVal.fullName);
      setFieldValue("contact", fieldVal.contact);
      setFieldValue("email", fieldVal.email);
      setFieldValue("terms_and_cond", fieldVal.terms_and_cond);
      setFieldValue("privacy_and_policy", fieldVal.privacy_and_policy);
    }
  }, []);

  return (
    <>
      <div className="register-b col-lg-9 col-sm-12 ">
        {/*/////////////------from field  .error-active -> for active error class ---////// 
           //////////////----------- .valid-active-g -> for valid input -----/////////////////
            */}

        <section className="register-b-main business-b-main mb-5 ">
          <form onSubmit={handleSubmit} className="was-validated">
            <div className="form-group">
              <div className="row">
                {/* ///////////////////////////////////////////////////////////// */}
                {/*/////////----- Business Details Or company name -----//////////*/}
                {/*///////////////////////////////////////////////////////////////*/}
                <div className="col-lg-12 col-sm-12 mct">
                  <label htmlFor="cName" className="register-label">
                    Enter your Business Details Below *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.companyName &&
                      touched.companyName &&
                      "error-active"
                    }`}
                    placeholder="Company Name *"
                    name="companyName"
                    value={values.companyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.companyName && touched.companyName && (
                    <div className="invalid-feedback">
                      Please provide your Company Name.
                    </div>
                  )}
                </div>
              </div>

              {/* //////////////////////////////////////////////////////////////////////////// */}
              {/*///////////--------  Name of Representative / Owner / Admin ------------//////*/}
              {/* //////////////////////////////////////////////////////////////////////////// */}

              <div className="row">
                <label className="register-label mct">
                  Name of Representative / Owner / Admin
                </label>
                {/* //////////////////////////////////////////////////////////////////////////// */}
                {/*////////////////////////--------  title --------//////////////////////////////*/}
                {/* //////////////////////////////////////////////////////////////////////////// */}
                <div className="col-lg-3 col-sm-3 col-3">
                  <input
                    type="text"
                    className={`form-control b-inp-title ${
                      errors.title && touched.title && "error-active"
                    }`}
                    id="title"
                    placeholder="Title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.title && touched.title && (
                    <div className="invalid-feedback">
                      Please provide your Title.
                    </div>
                  )}
                </div>
                {/* ////////////////////////////////////////////////////////// */}
                {/*///////////--------  Full Name ------------/////////////////////*/}
                {/* ////////////////////////////////////////////////////////// */}

                <div className="col-lg-9 col-sm-9 col-9">
                  <input
                    type="text"
                    className={`form-control ${
                      errors.fullName && touched.fullName && "error-active"
                    }`}
                    id="fullName"
                    placeholder="Full Name"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.fullName && touched.fullName && (
                    <div className="invalid-feedback">
                      Please provide your Full Name.
                    </div>
                  )}
                </div>
              </div>
              {/* ////////////////////////////////////////////////////////// */}
              {/*//////--------  contact number and email ------------///////*/}
              {/* ////////////////////////////////////////////////////////// */}

              <div className="row ">
                {/* ////////////////////////////////////////////////////////// */}
                {/*////////////--------  contact number ------------///////////*/}
                {/* ////////////////////////////////////////////////////////// */}

                <div className="col-lg-6 col-sm-12 mct">
                  <label htmlFor="contactNumber" className="register-label">
                    Contact Number *
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">+91</span>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.contact && touched.contact && "error-valid"
                      }`}
                      id="contactNumber"
                      placeholder="Contact Number"
                      name="contact"
                      value={values.contact}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </div>
                  {errors.contact && touched.contact && (
                    <div className="invalid-feedback">
                      Please provide your Contact Number.
                    </div>
                  )}
                </div>
                {/* ////////////////////////////////////////////////////////// */}
                {/*////////////--------  email ------------///////////*/}
                {/* ////////////////////////////////////////////////////////// */}

                <div className="col-lg-6 col-sm-12 mct">
                  <label htmlFor="email" className="register-label">
                    Email *
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email && touched.email && "error-valid"
                    }`}
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.email && touched.email && (
                    <div className="invalid-feedback">
                      Please provide your Email
                    </div>
                  )}
                </div>
              </div>
              {/* ////////////////////////////////////////////////////////// */}
              {/*////--------  gender and the capcha code  ------------/////*/}
              {/* ////////////////////////////////////////////////////////// */}

              <div className="row">
                {/* ////////////////////////////////////////////////////////// */}
                {/*//////////////--------  captcha  ------------//////////////////*/}
                {/* /////////////////////////////////////////////////////////// */}

                <div className="col-lg-4 col-md-12 col-sm-12 mct">
                  {/* <label htmlFor="email" className="register-label">
                    Type Captch *
                  </label> */}
                  <div className="bus-captcha">
                    <p className="captcha-gen">
                      <span className="form-control text-center capt">
                        <img src={captchbg} alt="image" />
                        {captch}
                      </span>
                      <span className="glyphicon-reload">
                        <img
                          src={glypsIcon}
                          alt="image"
                          loading="lazy"
                          onClick={createCaptch}
                        />
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 mct type-cm">
                  {/* <label htmlFor="email" className="register-label"></label> */}
                  <input
                    type="text"
                    className={`form-control business-captcha-t ${
                      capchaError && "error-active"
                    } ${capchaValid && "valid-active-g"}`}
                    id="captch_code"
                    placeholder="Type Captcha"
                    name="captcha_code"
                    onChange={handleCaptchaInput}
                    value={capchaInput}
                    required
                  />
                  {capchaError && (
                    <div className="invalid-feedback">Invalid Captcha</div>
                  )}
                </div>
              </div>
              {/* ////////////////////////////////////////////////////////// */}
              {/*////////--------  terms and condition  ------------/////////*/}
              {/* /////////////////////////////////////////////////////////// */}
              <div className="form-check tcp mct">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="tandc"
                  name="terms_and_cond"
                  value={values.terms_and_cond}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.terms_and_cond ? true : false}
                />

                <label className="register-label" htmlFor="tandc">
                  Accept Terms and Condition
                </label>
                {errors.terms_and_cond && touched.terms_and_cond && (
                  <div className="invalid-feedback">
                    Please Accept Terms and Condition
                  </div>
                )}
              </div>
              {/* ////////////////////////////////////////////////////////// */}
              {/*////////--------  privacy policy  ------------/////////*/}
              {/* /////////////////////////////////////////////////////////// */}
              <div className="form-check tcp">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="privacy"
                  name="privacy_and_policy"
                  value={values.privacy_and_policy}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.privacy_and_policy ? true : false}
                />

                <label className="register-label" htmlFor="privacy">
                  Accept Privacy Policy
                </label>
                {errors.privacy_and_policy && touched.privacy_and_policy && (
                  <div className="invalid-feedback">
                    Please Accept Privacy Policy
                  </div>
                )}
              </div>
            </div>
            {/* ////////////////////////////////////////////////////////// */}
            {/*////////--------  form submit button  ------------/////////*/}
            {/* /////////////////////////////////////////////////////////// */}
            <div className={`row mt-4`}>
              {!IsTabletOrLess() && (
                <div className="col position-relative">
                  <span className="position-absolute" style={{ bottom: "0" }}>
                    * Mandatory Filed
                  </span>
                </div>
              )}

              <div className="col btn-s-main tacsm">
                <button
                  type="submit"
                  className={`btn btn-white ${loading && "disabled"}`}
                >
                  {loading ? "Loading" : "Save & Continue"}
                  <PulseLoader
                    color="rgb(0 40 86 / 80%)"
                    loading={loading}
                    size={6}
                  />
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default BusinessOrCompanyInfo;
