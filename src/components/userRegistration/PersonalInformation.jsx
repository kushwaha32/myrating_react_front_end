import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
import glypsIcon from "../../img/reload.png";
import captchbg from "../../img/captch-bg.png";
import useProfessionValidation from "../../utils/ownHooks/useProfessionValidation";
import useCapGen from "../../utils/ownHooks/useCaptchGen";
import useCaptchaValidation from "../../utils/ownHooks/useCaptchaValidation";
import { useFormik } from "formik";
import { profileInfoSchema } from "../../schemaValidation/profileInfoValidation";
import { useNavigate } from "react-router-dom";
import UseFetchProfessionOption from "../../utils/ownHooks/useFetchProfessionOption";
import { useSignupOtpMutation } from "../../slices/usersApiSlice";
import usePreviousSteps from "../../utils/ownHooks/usePreviousSteps";
import { IsTabletOrLess } from "../../utils/mediaScreens";
import useCurrentLocationSlug from "../../utils/ownHooks/useCurrentLocationSlug";

const initialValues = {
  name: "",
  dob: "",
  profession: "",
  city: "",
  state: "",
  country: "",
  contact: "",
  email: "",
  gender: "",
  terms_and_cond: false,
  privacy_and_policy: false,
};

const PersonalInformation = () => {
  const [captch, setCaptch] = useState("");
  const [capchaInput, setCaptchInput] = useState("");
  const [capchaError, setCaptchError] = useState(false);
  const [capchaValid, setCaptchValid] = useState(false);
  const navigate = useNavigate();

  //////////////////////////////////////////////////////////////
  ////////---- Get the current slug -----///////////////
  //////////////////////////////////////////////////////////////
  const getCurrentSlug = useCurrentLocationSlug();

  //////////////////////////////////////////////////////////////
  ////////---- Get all the profession from db -----///////////////
  //////////////////////////////////////////////////////////////
  const [professionOptions, setProfessionOptions] = useState([]);
  UseFetchProfessionOption(setProfessionOptions);

  //////////////////////////////////////////////////////////////
  ////////---- Profession custom handler fn -----///////////////
  //////////////////////////////////////////////////////////////
  const [profession, setProfession] = useState([]);
  const handleProfessionChange = useProfessionValidation(setProfession);

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
  const [handlePreviousStep] = usePreviousSteps();

  /////////////////////////////////////////////////////////////////////////////
  ///////////----- handling the user registration -------------///////////////
  ////////////////////////////////////////////////////////////////////////////
  const [signUpOtp] = useSignupOtpMutation();
  const [loading, setLoading] = useState(false);

  /////////////////////////////////////////////////////////////////////////////
  ////////------------- geo location coordinates hook --------------///////////
  ////////////////////////////////////////////////////////////////////////////
  // const handleGetCoordinates = useCoordinates();

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
    validationSchema: profileInfoSchema,
    onSubmit: async (value) => {
      try {
        setLoading(true);
        if (captch === capchaInput) {
          value.profession = profession;

          // set the coordinates into the val object
          // const [lat, lng] = await handleGetCoordinates(
          //   value.city,
          //   value.state,
          //   value.country
          // );

          value.coordinates = [0, 0];

          // set the values into the local storage
          localStorage.setItem("personalInfo", JSON.stringify(value));

          const res = await signUpOtp({
            contactNumber: value.contact,
          }).unwrap();

          // if otp successfully send

          if (res?.status === "success") {
            toast.success(res?.message);
            navigate("/register/mobile-no-verification");
            setLoading(false);
            handlePreviousStep("register");
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
    if (localStorage.getItem("personalInfo")) {
      const fieldVal = JSON.parse(localStorage.getItem("personalInfo"));
      setFieldValue("name", fieldVal.name);
      setFieldValue("dob", fieldVal.dob);
      setFieldValue("profession", fieldVal.profession);
      setFieldValue("city", fieldVal.city);
      setFieldValue("state", fieldVal.state);
      setFieldValue("country", fieldVal.country);
      setFieldValue("contact", fieldVal.contact);
      setFieldValue("email", fieldVal.email);
      setFieldValue("gender", fieldVal.gender);
      setFieldValue("terms_and_cond", fieldVal.terms_and_cond);
      setFieldValue("privacy_and_policy", fieldVal.privacy_and_policy);
    }
  }, []);

  return (
    <>
      <div className="register-b col-lg-9 col-sm-12 ">
        {!IsTabletOrLess() && <h1 className="title">Create your profile</h1>}

        {/*/////////////------from field  .error-active -> for active error class ---////// 
           //////////////----------- .valid-active-g -> for valid input -----/////////////////
            */}

        <section className="register-b-main mb-5 ">
          {IsTabletOrLess() && (
            <h2 className="register-b-cur">
              {getCurrentSlug === "register"
                ? "Personal Information"
                : getCurrentSlug}
            </h2>
          )}

          <form onSubmit={handleSubmit} className="was-validated">
            <div className="form-group">
              <div className="row">
                {/* ////////////////////////////////////////////////// */}
                {/*-----///////////////// name -----///////////////////*/}
                {/*////////////////////////////////////////////////////*/}
                <div className="col-lg-6 col-sm-12 mct">
                  <label htmlFor="uname" className="register-label">
                    Name *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name && touched.name && "error-active"
                    }`}
                    id="uname"
                    placeholder="Enter username"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.name && touched.name && (
                    <div className="invalid-feedback">
                      Please provide your Name.
                    </div>
                  )}
                </div>

                {/* ////////////////////////////////////////////////////////// */}
                {/*///////////-------- date of birth ------------//////////////*/}
                {/* ////////////////////////////////////////////////////////// */}

                <div className="col-lg-6 col-sm-12 mct">
                  <label htmlFor="dob" className="register-label">
                    Date Of Birth *
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
                      errors.dob && touched.dob && "error-active"
                    }`}
                    id="dob"
                    placeholder="Enter username"
                    name="dob"
                    value={values.dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.dob && touched.dob && (
                    <div className="invalid-feedback">
                      Please provide you Date Of Birth.
                    </div>
                  )}
                </div>
              </div>

              {/* ////////////////////////////////////////////////////////// */}
              {/*///////////-------- profession ------------//////////////*/}
              {/* ////////////////////////////////////////////////////////// */}
              <div className="row  mct">
                <div className="col">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="san" className="register-label">
                      Profession (Optional)
                    </label>
                    <span className="max-lm">Add maximum 3 Professions</span>
                  </div>
                  <MultiSelect
                    options={professionOptions}
                    value={profession}
                    onChange={handleProfessionChange}
                    labelledBy="Search and Select"
                    hasSelectAll={false}
                    id="san"
                  />
                  {/* <div className="invalid-feedback">
                        Please fill out this field.
                      </div> */}
                </div>
              </div>
              {/* ////////////////////////////////////////////////////////// */}
              {/*///////////--------  city, state and country ------------//////*/}
              {/* ////////////////////////////////////////////////////////// */}

              <div className="row">
                {/* ////////////////////////////////////////////////////////// */}
                {/*///////////--------  city ------------/////////////////////*/}
                {/* ////////////////////////////////////////////////////////// */}

                <div className="col-lg-4 col-sm-12 mct">
                  <label htmlFor="city" className="register-label">
                    City *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.city && touched.city && "error-active"
                    }`}
                    id="city"
                    placeholder="City"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.city && touched.city && (
                    <div className="invalid-feedback">
                      Please provide your City.
                    </div>
                  )}
                </div>
                {/* ////////////////////////////////////////////////////////// */}
                {/*///////////--------  state ------------/////////////////////*/}
                {/* ////////////////////////////////////////////////////////// */}

                <div className="col-lg-4 col-sm-12 mct">
                  <label htmlFor="state" className="register-label">
                    State *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.state && touched.state && "error-active"
                    }`}
                    id="state"
                    placeholder="State"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.state && touched.state && (
                    <div className="invalid-feedback">
                      Please provide your State.
                    </div>
                  )}
                </div>
                {/* ////////////////////////////////////////////////////////// */}
                {/*///////////--------  country ------------/////////////////////*/}
                {/* ////////////////////////////////////////////////////////// */}

                <div className="col-lg-4 col-sm-12 mct">
                  <label htmlFor="country" className="register-label">
                    Country *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.country && touched.country && "error-active"
                    }`}
                    id="country"
                    placeholder="Country"
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.country && touched.country && (
                    <div className="invalid-feedback">
                      Please provide your Country.
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
                {/*//////////////--------  gender  ------------//////////////////*/}
                {/* /////////////////////////////////////////////////////////// */}

                <div className="col-lg-6 col-md-12 col-sm-12 mct">
                  <label className="register-label">Gender *</label>
                  <div className="row gender-chek">
                    {/* ////////////////////////////////////////////////////////// */}
                    {/*//////////////--------  male  ------------//////////////////*/}
                    {/* /////////////////////////////////////////////////////////// */}

                    <div className="col col-sm-4 col-xs-4">
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="gender"
                          name="gender"
                          value="male"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values?.gender === "male"}
                        />

                        <label className="register-label" htmlFor="gender">
                          Male
                        </label>
                      </div>
                    </div>
                    <div className="col col-sm-4 col-xs-4">
                      {/* ////////////////////////////////////////////////////////// */}
                      {/*//////////////--------  female  ------------//////////////////*/}
                      {/* /////////////////////////////////////////////////////////// */}

                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="gender"
                          name="gender"
                          value="female"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values?.gender === "female"}
                        />

                        <label className="register-label" htmlFor="gender">
                          Female
                        </label>
                      </div>
                    </div>
                    <div className="col col-sm-4 col-xs-4">
                      {/* ////////////////////////////////////////////////////////// */}
                      {/*//////////////--------  other  ------------//////////////////*/}
                      {/* /////////////////////////////////////////////////////////// */}
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="others"
                          name="gender"
                          value="others"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values?.gender === "others"}
                        />

                        <label className="register-label" htmlFor="others">
                          Others
                        </label>
                      </div>
                    </div>
                  </div>
                  {errors.gender && touched.gender && (
                    <div className="invalid-feedback">
                      Please select your gender.
                    </div>
                  )}
                </div>

                {/* ////////////////////////////////////////////////////////// */}
                {/*//////////////--------  captcha  ------------//////////////////*/}
                {/* /////////////////////////////////////////////////////////// */}

                <div className="col-lg-6 col-md-12 col-sm-12 mct">
                  <label htmlFor="email" className="register-label">
                    Type Captch *
                  </label>
                  <div style={{ width: "203px" }}>
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
                    <input
                      type="text"
                      className={`form-control ${
                        capchaError && "error-active"
                      } ${capchaValid && "valid-active-g"}`}
                      id="captch_code"
                      placeholder="Type Captcha"
                      name="captcha_code"
                      onChange={handleCaptchaInput}
                      value={capchaInput}
                      required
                    />
                  </div>
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

export default PersonalInformation;
