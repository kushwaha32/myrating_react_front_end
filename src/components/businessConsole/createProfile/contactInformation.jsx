import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { PulseLoader } from "react-spinners";
import { useGetBrandIndustryQuery } from "../../../slices/brandIndustryApiSlice";
import useBusinessPreviousSteps from "../../../utils/ownHooks/useBusinessPreviousSteps";
import { productInformationSchema } from "../../../schemaValidation/createProductValidation";
import { json, useLocation, useNavigate } from "react-router-dom";
import { useGetBrandProfileMutation } from "../../../slices/brandProfileApiSlice";
import productLocationValidationSchema from "../../../schemaValidation/productLocationValidationSchema";
import { useToast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import OtherProfileSkeleton from "../otherProfileSkeleton";
import CommonPageLoader from "../../commonPageLoader/commonPageLoader";
import IncrementAndDecrementBtn from "../../businessListing/incrementAndDecrement";
import ToggledSwitch from "../../ToggledSwitch";
import useContactInformationSameAsBrandProfile from "../../../utils/ownHooks/useContactInformationSameAsBrandProfile";

const ProductContactInformation = () => {
  const [isLoading, setIsLoading] = useState("");
  const [loading, setLoading] = useState(false);
  const [fillFieldLoading, setFillFieldLoading] = useState(false);
  const location = useLocation()?.pathname?.split("/");
  const [brandPro, setBrandPro] = useState();
  const navigate = useNavigate();

  /////////////////////////////////////////////////////////////////////////////
  //////----------- Number of input count of landline --------------///////////
  ////////////////////////////////////////////////////////////////////////////

  const [numInputs, setNumInputs] = useState(1);
  const prevNumInputsRef = useRef(numInputs);

  /////////////////////////////////////////////////////////////////////////////
  //////------- Number of input count of Mobile number -------------//////////
  ////////////////////////////////////////////////////////////////////////////

  const [mobNumInputs, setMobNumInputs] = useState(1);
  const prevMobNumInputsRef = useRef(mobNumInputs);

  /////////////////////////////////////////////////////////////////////////////
  //////------- Number of input count of Tollfree NO -------------//////////
  ////////////////////////////////////////////////////////////////////////////

  const [tollFreeNoInputs, setToolfreeNoInputs] = useState(1);
  const prevTollFreeNoInputsRef = useRef(tollFreeNoInputs);

  /////////////////////////////////////////////////////////////////////////////
  //////------- Number of input count of Email id -------------//////////
  ////////////////////////////////////////////////////////////////////////////

  const [emailIdInputs, setEmailIdInputs] = useState(1);
  const prevEmailIdInputsRef = useRef(emailIdInputs);

  /////////////////////////////////////////////////////////////////////////////
  //////------- Number of input count of Websites -------------//////////
  ////////////////////////////////////////////////////////////////////////////

  const [websitesInputs, setWesitesInputs] = useState(1);
  const prevWebsitesInputsRef = useRef(websitesInputs);

  /////////////////////////////////////////////////////////////////////////////
  ///////////----------------- Initial state ------------------///////////////
  ////////////////////////////////////////////////////////////////////////////

  const [initialValues, setInitialValues] = useState({
    isSameAsAdmin: "yes",
    // landline no
    landLineNo: Array.from({ length: numInputs }, () => ""),
    landLinePublic: Array.from({ length: numInputs }, () => false),
    landlineCode: Array.from({ length: numInputs }, () => ""),

    // mobile no
    mobileNo: Array.from({ length: mobNumInputs }, () => ""),
    isMobileNoPublic: Array.from({ length: mobNumInputs }, () => false),

    // TollFree no
    tollFreeNo: Array.from({ length: tollFreeNoInputs }, () => ""),
    isTollFreeNoPublic: Array.from({ length: tollFreeNoInputs }, () => false),

    // email id
    emailId: Array.from({ length: emailIdInputs }, () => ""),
    isEmailIdPublic: Array.from({ length: emailIdInputs }, () => false),

    // websites
    websites: Array.from({ length: websitesInputs }, () => ""),
    isWbsitesPublic: Array.from({ length: websitesInputs }, () => false),

    // YouTube
    youTube: "",
    isYouTubePublic: false,

    // facebook
    facebook: "",
    isFacebookPublic: false,

    // twitter
    twitter: "",
    isTwitterPublic: false,

    // instagram
    instagram: "",
    isInstagramPublic: false,
  });

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- previous step handling --------------//////////////
  ///////////////////////////////////////////////////////////////////////////
  const [handlePreviousStep, getPreviousSteps, removeItemsFromSteps] =
    useBusinessPreviousSteps("businessProductProfile");

  const {
    values,
    errors,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    resetForm,
  } = useFormik({
    initialValues,
    // validationSchema: contactInfoValidationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        // land line No
        const landLine = values?.landLineNo?.map((value, index) => ({
          code: values.landlineCode[index],
          landLineNo: value,
          landLinePublic: !values.landLinePublic[index],
        }));

        // mobile no
        const mobileNo = values?.mobileNo?.map((value, index) => ({
          mobileNo: value,
          isMobileNoPublic: !values.isMobileNoPublic[index],
        }));

        // toll free no
        const tollFreeNo = values?.tollFreeNo?.map((value, index) => ({
          tollFreeNo: value,
          isTollFreeNoPublic: !values.isTollFreeNoPublic[index],
        }));

        // email Id
        const emailId = values?.emailId?.map((value, index) => ({
          emailId: value,
          isEmailIdPublic: !values?.isEmailIdPublic[index],
        }));

        // websites
        const websites = values?.websites?.map((value, index) => ({
          websites: value,
          isWbsitesPublic: !values?.isWbsitesPublic[index],
        }));

        // YouTube
        const youtube = {
          youTube: values.youTube,
          isYouTubePublic: !values?.isWbsitesPublic,
        };

        // facebook
        const facebook = {
          facebook: values?.facebook,
          isFacebookPublic: !values?.isFacebookPublic,
        };

        // twitter
        const twitter = {
          twitter: values?.twitter,
          isTwitterPublic: !values?.isTwitterPublic,
        };

        // instagram
        const instagram = {
          instagram: values?.instagram,
          isInstagramPublic: !values?.isInstagramPublic,
        };

        const data = {
          isSameAsAdmin: values?.isSameAsAdmin,
          mobileNo,
          landLine,
          tollFreeNo,
          emailId,
          websites,
          youtube,
          facebook,
          twitter,
          instagram,
        };

        localStorage.setItem("proContactInfo", JSON.stringify(data));

        handlePreviousStep("contact-information");
        navigate(
          `/business/${location[2]}/listed-profile/create-profile/other-information`
        );
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    },
  });

  /////////////////////////////////////////////////////////////////////////////
  ////----- handling the landline when numInputs increase -----///////////////
  ////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (numInputs > values.landLineNo.length) {
      const additionalFields = Array.from(
        { length: numInputs - values.landLineNo.length },
        () => ""
      );
      setFieldValue("landLineNo", [...values.landLineNo, ...additionalFields]);
      setFieldValue("landLinePublic", [
        ...values.landLinePublic,
        ...additionalFields?.map(() => false),
      ]);
      setFieldValue("landlineCode", [
        ...values.landlineCode,
        ...additionalFields,
      ]);
    } else {
      if (numInputs !== prevNumInputsRef.current) {
        const landlineClone = [...values.landLineNo];
        landlineClone.splice(landlineClone.length - 1, 1);

        const landLinePublicClone = [...values.landLinePublic];
        landLinePublicClone.splice(landLinePublicClone.length - 1, 1);

        const landlineCodeClone = [...values.landlineCode];
        landlineCodeClone.splice(landlineCodeClone.length - 1, 1);

        setFieldValue("landLineNo", landlineClone);
        setFieldValue("landLinePublic", landLinePublicClone);
        setFieldValue("landlineCode", landlineCodeClone);
      }
    }
    prevNumInputsRef.current = numInputs;
  }, [numInputs, setFieldValue]);

  /////////////////////////////////////////////////////////////////////////////
  ////----- handling the Mobile Number when mobNumInputs increase -----///////
  ////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (mobNumInputs > values.mobileNo.length) {
      const additionalFields = Array.from(
        { length: mobNumInputs - values.mobileNo.length },
        () => ""
      );
      setFieldValue("mobileNo", [...values.mobileNo, ...additionalFields]);
      setFieldValue("isMobileNoPublic", [
        ...values.isMobileNoPublic,
        ...additionalFields?.map(() => false),
      ]);
    } else {
      if (mobNumInputs !== prevMobNumInputsRef.current) {
        const mobileNoClone = [...values.mobileNo];
        mobileNoClone.splice(mobileNoClone.length - 1, 1);

        const isMobileNoPublicClone = [...values.isMobileNoPublic];
        isMobileNoPublicClone.splice(isMobileNoPublicClone.length - 1, 1);

        setFieldValue("mobileNo", mobileNoClone);
        setFieldValue("isMobileNoPublic", isMobileNoPublicClone);
      }
    }
    prevMobNumInputsRef.current = mobNumInputs;
  }, [mobNumInputs, setFieldValue]);

  /////////////////////////////////////////////////////////////////////////////
  ////----- handling the Tollfree No when tollFreeNoInput increase -----///////
  ////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (tollFreeNoInputs > values.tollFreeNo.length) {
      const additionalFields = Array.from(
        { length: tollFreeNoInputs - values.tollFreeNo.length },
        () => ""
      );
      setFieldValue("tollFreeNo", [...values.tollFreeNo, ...additionalFields]);
      setFieldValue("isTollFreeNoPublic", [
        ...values.isTollFreeNoPublic,
        ...additionalFields?.map(() => false),
      ]);
    } else {
      if (tollFreeNoInputs !== prevTollFreeNoInputsRef.current) {
        const tollFreeNoClone = [...values.tollFreeNo];
        tollFreeNoClone.splice(tollFreeNoClone.length - 1, 1);

        const isTollFreeNoPublicClone = [...values.isTollFreeNoPublic];
        isTollFreeNoPublicClone.splice(isTollFreeNoPublicClone.length - 1, 1);

        setFieldValue("tollFreeNo", tollFreeNoClone);
        setFieldValue("isTollFreeNoPublic", isTollFreeNoPublicClone);
      }
    }
    prevTollFreeNoInputsRef.current = tollFreeNoInputs;
  }, [tollFreeNoInputs, setFieldValue]);

  /////////////////////////////////////////////////////////////////////////////
  ////--------- handling the email when emailIdInputs increase ---------///////
  ////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (emailIdInputs > values.emailId.length) {
      const additionalFields = Array.from(
        { length: emailIdInputs - values.emailId.length },
        () => ""
      );
      setFieldValue("emailId", [...values.emailId, ...additionalFields]);
      setFieldValue("isEmailIdPublic", [
        ...values.isEmailIdPublic,
        ...additionalFields?.map(() => false),
      ]);
    } else {
      if (emailIdInputs !== prevEmailIdInputsRef.current) {
        const emailIdClone = [...values.emailId];
        emailIdClone.splice(emailIdClone.length - 1, 1);

        const isEmailIdPublicClone = [...values.isEmailIdPublic];
        isEmailIdPublicClone.splice(isEmailIdPublicClone.length - 1, 1);

        setFieldValue("emailId", emailIdClone);
        setFieldValue("isEmailIdPublic", isEmailIdPublicClone);
      }
    }
    prevEmailIdInputsRef.current = emailIdInputs;
  }, [emailIdInputs, setFieldValue]);

  /////////////////////////////////////////////////////////////////////////////
  /////----- handling the websites when websitesInputs increase --------///////
  ////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (websitesInputs > values.websites.length) {
      const additionalFields = Array.from(
        { length: websitesInputs - values.websites.length },
        () => ""
      );
      setFieldValue("websites", [...values.websites, ...additionalFields]);
      setFieldValue("isWbsitesPublic", [
        ...values.isWbsitesPublic,
        ...additionalFields?.map(() => false),
      ]);
    } else {
      if (websitesInputs !== prevWebsitesInputsRef.current) {
        const websitesClone = [...values.websites];
        websitesClone.splice(websitesClone.length - 1, 1);

        const isWebsitesPublicClone = [...values.isWbsitesPublic];
        isWebsitesPublicClone.splice(isWebsitesPublicClone.length - 1, 1);

        setFieldValue("websites", websitesClone);
        setFieldValue("isWbsitesPublic", isWebsitesPublicClone);
      }
    }
    prevWebsitesInputsRef.current = websitesInputs;
  }, [websitesInputs, setFieldValue]);

  ////////////////////////////////////////////////////////
  ///////////--- get Current brand mutation ---//////////
  //////////////////////////////////////////////////////
  const [getBrand] = useGetBrandProfileMutation();
  const getCurrentBrand = async () => {
    try {
      setFillFieldLoading(true);
      const res = await getBrand({ userId: location[2] }).unwrap();
      console.log(res);
      if (res.status === "succcess") {
        setBrandPro(res?.data?.brandProfile);
        setContactField(res?.data?.brandProfile);
        setFillFieldLoading(false);
      }
    } catch (error) {
      setFillFieldLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getCurrentBrand();
  }, []);

  const [sameAsBrandProfile, diffFromBrandProfile] =
    useContactInformationSameAsBrandProfile(setFieldValue);

  const setContactField = (conBrandPro) => {
    let proContactInfo = localStorage.getItem("proContactInfo")
      ? JSON.parse(localStorage.getItem("proContactInfo"))
      : "";

    if (proContactInfo?.isSameAsAdmin === "no") {
      setFieldValue("isSameAsAdmin", proContactInfo?.isSameAsAdmin);

      diffFromBrandProfile(proContactInfo);
    } else if (proContactInfo?.isSameAsAdmin === "noNeed") {
      resetForm();
      setFieldValue("isSameAsAdmin", "noNeed");
    } else {
      sameAsBrandProfile(conBrandPro);
    }
  };

  //////////////////////////////////////////////////////////////////////
  //////////----- if location is same as brand profile -----///////////
  ////////////////////////////////////////////////////////////////////
  const handleSameLocation = (e) => {
    handleChange(e);

    if (e.target.value === "yes") {
      sameAsBrandProfile(brandPro);
    }
    if (e.target.value === "noNeed") {
      resetForm();
      handleChange(e);
    }
  };

  //////////////////////////////////////////////////////////////////////
  /////////////////////----- Handle do it latter -----/////////////////
  ////////////////////////////////////////////////////////////////////
  const handleDoItLatter = () => {
    handlePreviousStep("contact-information");
    navigate(
      `/business/${location[2]}/listed-profile/create-profile/other-information`
    );
  };

  if (fillFieldLoading) {
    return (
      <section className="register-b-main mb-5 para-mai-w position-relative register-b-mn-verify loca-b-main">
        <CommonPageLoader />{" "}
      </section>
    );
  } else {
    return (
      <section className="register-b-main mb-5 para-mai-w position-relative register-b-mn-verify loca-b-main">
        <h3 className="contact-det-titlle">
          Contact Details for Viewers / Customers
        </h3>
        <form className="was-validated " onSubmit={handleSubmit}>
          <div className="form-group">
            {/* //////////////////////////////////////////////////////////////////////*/}
            {/*////////////-------- contact based on select Box --------///////////// */}
            {/* ///////////////////////////////////////////////////////////////////// */}
            <div className="row mt-3 align-items-center mail-bus-sm-l">
              <div className="col-lg-4 col-md-4 col-sm-4 col-12 d-flex align-items-center">
                <input
                  id="contactSameAdmin"
                  type="radio"
                  name="isSameAsAdmin"
                  value="yes"
                  className="location-con-sel"
                  onChange={handleSameLocation}
                  checked={values?.isSameAsAdmin === "yes" ? true : false}
                />
                <label htmlFor="contactSameAdmin" className="label-cbosb">
                  Same as main / company profile's
                </label>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-12 d-flex align-items-center">
                <input
                  id="contactDiffAdmin"
                  type="radio"
                  name="isSameAsAdmin"
                  value="no"
                  className="location-con-sel"
                  onChange={handleSameLocation}
                  checked={values?.isSameAsAdmin === "no" ? true : false}
                />
                <label htmlFor="contactDiffAdmin" className="label-cbosb">
                  Different for this profile
                </label>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-12 d-flex align-items-center">
                <input
                  id="contactNoNeed"
                  type="radio"
                  name="isSameAsAdmin"
                  value="noNeed"
                  className="location-con-sel"
                  onChange={handleSameLocation}
                  checked={values?.isSameAsAdmin === "noNeed" ? true : false}
                />
                <label htmlFor="contactNoNeed" className="label-cbosb">
                  Do not need contact details
                </label>
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*/////////----------- Landline Number  -----------////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}

            {values?.landLineNo?.map((value, index) => (
              <div className="row mt-4 align-items-center" key={index}>
                <div className="col-lg-3 col-12 d-flex align-items-center la-mr-bt">
                  <label>Landline Number</label>

                  {/* ////////////////////////////////////////////////////////////// */}
                  {/*///////--------- Increment and Decrement Button --------/////// */}
                  {/* ////////////////////////////////////////////////////////////// */}
                  <div className="sm-inc-input">
                    {values?.isSameAsAdmin === "yes" ||
                    values?.isSameAsAdmin === "noNeed" ? (
                      ""
                    ) : (
                      <IncrementAndDecrementBtn
                        index={index}
                        mainInput={numInputs}
                        setMainInput={setNumInputs}
                      />
                    )}
                  </div>
                </div>
                <div className="col-lg-9 col-12 con-info-cls">
                  <div className="con-info-input-main">
                    {/* ////////////////////////////////////////////////////////////// */}
                    {/*/////////------- Landline Number +91 code -------////////////// */}
                    {/* ////////////////////////////////////////////////////////////// */}
                    <div className="sm-c-code">
                      <input
                        type="text"
                        className={`form-control text-center `}
                        placeholder="+91"
                        name="code[]"
                        value="+91"
                        onChange={(e) => (e.target.value = "+91")}
                        style={{
                          padding: "0 ",
                          fontSize: "16px",
                        }}
                        readOnly={true}
                      />
                    </div>{" "}
                    {/* ////////////////////////////////////////////////////////////// */}
                    {/*/////////------- Landline Number code -------////////////// */}
                    {/* ////////////////////////////////////////////////////////////// */}
                    <div style={{ width: "20%" }}>
                      <input
                        type="text"
                        className={`form-control`}
                        placeholder="Code"
                        name={`landlineCode[${index}]`}
                        value={values.landlineCode[index]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        readOnly={
                          values?.isSameAsAdmin === "yes" ||
                          values?.isSameAsAdmin === "noNeed"
                            ? true
                            : false
                        }
                        required={
                          values?.isSameAsAdmin === "yes" ||
                          values?.isSameAsAdmin === "noNeed"
                            ? false
                            : true
                        }
                      />

                      {/* ${
                          errors.landlineCode[index] &&
                          touched.landlineCode[index] &&
                          "error-active"
                        }
                      {errors.landlineCode[index] &&
                        touched.landlineCode[index] && (
                          <div className="invalid-feedback">
                            Please provide code.
                          </div>
                        )} */}
                    </div>
                    {/* ////////////////////////////////////////////////////////////// */}
                    {/*////////////--------- Landline Number --------///////////////// */}
                    {/* ////////////////////////////////////////////////////////////// */}
                    <div style={{ width: "63%" }}>
                      <input
                        type="text"
                        className={`form-control `}
                        placeholder="Land Line"
                        name={`landLineNo[${index}]`}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        readOnly={
                          values?.isSameAsAdmin === "yes" ||
                          values?.isSameAsAdmin === "noNeed"
                            ? true
                            : false
                        }
                        required={
                          values?.isSameAsAdmin === "yes" ||
                          values?.isSameAsAdmin === "noNeed"
                            ? false
                            : true
                        }
                      />
                      {/* ${
                          errors.landLineNo[index] &&
                          touched.landLineNo[index] &&
                          "error-active"
                        } */}
                      {/* {errors.landLineNo[index] &&
                        touched.landLineNo[index] && (
                          <div className="invalid-feedback">
                            Please provide your Company Name.
                          </div>
                        )} */}
                    </div>
                  </div>
                  {/* ////////////////////////////////////////////////////////////// */}
                  {/*///////--------- Increment and Decrement Button --------/////// */}
                  {/* ////////////////////////////////////////////////////////////// */}
                  <div className="inc-input-sm">
                    {values?.isSameAsAdmin === "yes" ||
                    values?.isSameAsAdmin === "noNeed" ? (
                      " "
                    ) : (
                      <IncrementAndDecrementBtn
                        index={index}
                        mainInput={numInputs}
                        setMainInput={setNumInputs}
                      />
                    )}
                  </div>

                  {/* ////////////////////////////////////////////////////////////// */}
                  {/*///////--------- Public and Private permission --------/////// */}
                  {/* ////////////////////////////////////////////////////////////// */}
                  <div className="position-relative con-info-switch">
                    <input
                      type="checkbox"
                      name={`landLinePublic[${index}]`}
                      value={values?.landLinePublic[index]}
                      className="public-private-switch"
                      checked={values?.landLinePublic[index]}
                      onChange={handleChange}
                      disabled={
                        values?.isSameAsAdmin === "yes" ||
                        values?.isSameAsAdmin === "noNeed"
                          ? true
                          : false
                      }
                    />
                    <ToggledSwitch
                      publicStatus={values?.landLinePublic[index]}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* ////////////////////////////////////////////////////////////// */}
            {/*////////////----------- Mobile no  -----------////////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}

            {values?.mobileNo?.map((value, index) => (
              <div className="row mt-4 align-items-center" key={index}>
                <div className="col-lg-3 col-12 d-flex align-items-center la-mr-bt">
                  <label>Mobile Number</label>
                  <div className="sm-inc-input">
                    {values?.isSameAsAdmin === "yes" ||
                    values?.isSameAsAdmin === "noNeed" ? (
                      ""
                    ) : (
                      <IncrementAndDecrementBtn
                        index={index}
                        mainInput={mobNumInputs}
                        setMainInput={setMobNumInputs}
                      />
                    )}
                  </div>
                </div>
                <div className="col-lg-9 con-info-cls">
                  <div className="con-info-input-main">
                    {/* ////////////////////////////////////////////////////////////// */}
                    {/*/////////------- Mobile No +91 code -------////////////// */}
                    {/* ////////////////////////////////////////////////////////////// */}
                    <div className="sm-c-code">
                      <input
                        type="text"
                        className={`form-control text-center`}
                        placeholder="+91"
                        name="NoCode[]"
                        value="+91"
                        onChange={(e) => (e.target.value = "+91")}
                        style={{
                          padding: "0 ",
                          fontSize: "16px",
                        }}
                        readOnly
                      />
                    </div>{" "}
                    {/* ////////////////////////////////////////////////////////////// */}
                    {/*////////////--------- Mobile Number --------///////////////// */}
                    {/* ////////////////////////////////////////////////////////////// */}
                    <div style={{ width: "86%" }}>
                      <input
                        type="text"
                        className={`form-control `}
                        placeholder="Mobile Number"
                        name={`mobileNo[${index}]`}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        readOnly={
                          values?.isSameAsAdmin === "yes" ||
                          values?.isSameAsAdmin === "noNeed"
                            ? true
                            : false
                        }
                        required={
                          values?.isSameAsAdmin === "yes" ||
                          values?.isSameAsAdmin === "noNeed"
                            ? false
                            : true
                        }
                      />
                      {/* ${
                          errors.landLineNo[index] &&
                          touched.landLineNo[index] &&
                          "error-active"
                        } */}
                      {/* {errors.landLineNo[index] &&
                        touched.landLineNo[index] && (
                          <div className="invalid-feedback">
                            Please provide your Company Name.
                          </div>
                        )} */}
                    </div>
                  </div>
                  {/* ////////////////////////////////////////////////////////////// */}
                  {/*///////--------- Increment and Decrement Button --------/////// */}
                  {/* ////////////////////////////////////////////////////////////// */}
                  <div className="inc-input-sm">
                    {values?.isSameAsAdmin === "yes" ||
                    values?.isSameAsAdmin === "noNeed" ? (
                      " "
                    ) : (
                      <IncrementAndDecrementBtn
                        index={index}
                        mainInput={mobNumInputs}
                        setMainInput={setMobNumInputs}
                      />
                    )}
                  </div>

                  {/* ////////////////////////////////////////////////////////////// */}
                  {/*///////--------- Public and Private permission --------/////// */}
                  {/* ////////////////////////////////////////////////////////////// */}
                  <div className="position-relative con-info-switch">
                    <input
                      type="checkbox"
                      name={`isMobileNoPublic[${index}]`}
                      value={values?.isMobileNoPublic[index]}
                      className="public-private-switch"
                      checked={values?.isMobileNoPublic[index]}
                      onChange={handleChange}
                      disabled={
                        values?.isSameAsAdmin === "yes" ||
                        values?.isSameAsAdmin === "noNeed"
                          ? true
                          : false
                      }
                    />
                    <ToggledSwitch
                      publicStatus={values?.isMobileNoPublic[index]}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* ////////////////////////////////////////////////////////////// */}
            {/*////////////----------- TollFree No  -----------////////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}

            {values?.tollFreeNo?.map((value, index) => (
              <div className="row mt-4 align-items-center" key={index}>
                <div className="col-lg-3 col-12 d-flex align-items-center la-mr-bt">
                  <label>Toll Free Number</label>
                  <div className="sm-inc-input">
                    {values?.isSameAsAdmin === "yes" ||
                    values?.isSameAsAdmin === "noNeed" ? (
                      " "
                    ) : (
                      <IncrementAndDecrementBtn
                        index={index}
                        mainInput={tollFreeNoInputs}
                        setMainInput={setToolfreeNoInputs}
                      />
                    )}
                  </div>
                </div>
                <div className="col-lg-9 con-info-cls">
                  <div className="con-info-input-main">
                    {/* ////////////////////////////////////////////////////////////// */}
                    {/*////////////--------- toll free no --------///////////////// */}
                    {/* ////////////////////////////////////////////////////////////// */}
                    <div style={{ width: "100%" }}>
                      <input
                        type="text"
                        className={`form-control `}
                        placeholder="Toll Free No"
                        name={`tollFreeNo[${index}]`}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        readOnly={
                          values?.isSameAsAdmin === "yes" ||
                          values?.isSameAsAdmin === "noNeed"
                            ? true
                            : false
                        }
                        required={
                          values?.isSameAsAdmin === "yes" ||
                          values?.isSameAsAdmin === "noNeed"
                            ? false
                            : true
                        }
                      />
                      {/* ${
                          errors.landLineNo[index] &&
                          touched.landLineNo[index] &&
                          "error-active"
                        } */}
                      {/* {errors.landLineNo[index] &&
                        touched.landLineNo[index] && (
                          <div className="invalid-feedback">
                            Please provide your Company Name.
                          </div>
                        )} */}
                    </div>
                  </div>
                  {/* ////////////////////////////////////////////////////////////// */}
                  {/*///////--------- Increment and Decrement Button --------/////// */}
                  {/* ////////////////////////////////////////////////////////////// */}
                  <div className="inc-input-sm">
                    {values?.isSameAsAdmin === "yes" ||
                    values?.isSameAsAdmin === "noNeed" ? (
                      " "
                    ) : (
                      <IncrementAndDecrementBtn
                        index={index}
                        mainInput={tollFreeNoInputs}
                        setMainInput={setToolfreeNoInputs}
                      />
                    )}
                  </div>

                  {/* ////////////////////////////////////////////////////////////// */}
                  {/*///////--------- Public and Private permission --------/////// */}
                  {/* ////////////////////////////////////////////////////////////// */}
                  <div className="position-relative con-info-switch">
                    <input
                      type="checkbox"
                      name={`isTollFreeNoPublic[${index}]`}
                      className="public-private-switch"
                      checked={values?.isTollFreeNoPublic[index]}
                      onChange={handleChange}
                      disabled={
                        values?.isSameAsAdmin === "yes" ||
                        values?.isSameAsAdmin === "noNeed"
                          ? true
                          : false
                      }
                    />
                    <ToggledSwitch
                      publicStatus={values?.isTollFreeNoPublic[index]}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* ////////////////////////////////////////////////////////////// */}
            {/*/////////////----------- Email id -----------////////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}

            {values?.emailId?.map((value, index) => (
              <div className="row mt-4 align-items-center" key={index}>
                <div className="col-lg-3 col-12 d-flex align-items-center la-mr-bt">
                  <label>Email</label>
                  {/* ////////////////////////////////////////////////////////////// */}
                  {/*///////--------- Increment and Decrement Button --------/////// */}
                  {/* ////////////////////////////////////////////////////////////// */}
                  <div className="sm-inc-input">
                    {values?.isSameAsAdmin === "yes" ||
                    values?.isSameAsAdmin === "noNeed" ? (
                      " "
                    ) : (
                      <IncrementAndDecrementBtn
                        index={index}
                        mainInput={emailIdInputs}
                        setMainInput={setEmailIdInputs}
                      />
                    )}
                  </div>
                </div>
                <div className="col-lg-9 con-info-cls">
                  <div className="con-info-input-main">
                    {/* ////////////////////////////////////////////////////////////// */}
                    {/*////////////////--------- Email id --------//////////////////// */}
                    {/* ////////////////////////////////////////////////////////////// */}
                    <div style={{ width: "100%" }}>
                      <input
                        type="email"
                        className={`form-control `}
                        placeholder="Email Id"
                        name={`emailId[${index}]`}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        readOnly={
                          values?.isSameAsAdmin === "yes" ||
                          values?.isSameAsAdmin === "noNeed"
                            ? true
                            : false
                        }
                        required={
                          values?.isSameAsAdmin === "yes" ||
                          values?.isSameAsAdmin === "noNeed"
                            ? false
                            : true
                        }
                      />
                      {/* ${
                          errors.landLineNo[index] &&
                          touched.landLineNo[index] &&
                          "error-active"
                        } */}
                      {/* {errors.landLineNo[index] &&
                        touched.landLineNo[index] && (
                          <div className="invalid-feedback">
                            Please provide your Company Name.
                          </div>
                        )} */}
                    </div>
                  </div>
                  {/* ////////////////////////////////////////////////////////////// */}
                  {/*///////--------- Increment and Decrement Button --------/////// */}
                  {/* ////////////////////////////////////////////////////////////// */}
                  <div className="inc-input-sm">
                    {values?.isSameAsAdmin === "yes" ||
                    values?.isSameAsAdmin === "noNeed" ? (
                      " "
                    ) : (
                      <IncrementAndDecrementBtn
                        index={index}
                        mainInput={emailIdInputs}
                        setMainInput={setEmailIdInputs}
                      />
                    )}
                  </div>

                  {/* ////////////////////////////////////////////////////////////// */}
                  {/*///////--------- Public and Private permission --------/////// */}
                  {/* ////////////////////////////////////////////////////////////// */}
                  <div className="position-relative con-info-switch">
                    <input
                      type="checkbox"
                      name={`isEmailIdPublic[${index}]`}
                      className="public-private-switch"
                      checked={values?.isEmailIdPublic[index]}
                      onChange={handleChange}
                      disabled={
                        values?.isSameAsAdmin === "yes" ||
                        values?.isSameAsAdmin === "noNeed"
                          ? true
                          : false
                      }
                    />
                    <ToggledSwitch
                      publicStatus={values?.isEmailIdPublic[index]}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* ////////////////////////////////////////////////////////////// */}
            {/*/////////////----------- websites -----------////////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}

            {values?.websites?.map((value, index) => (
              <div className="row mt-4 align-items-center" key={index}>
                <div className="col-lg-3 col-12 d-flex align-items-center la-mr-bt">
                  <label>Website</label>
                  {/* ////////////////////////////////////////////////////////////// */}
                  {/*///////--------- Increment and Decrement Button --------/////// */}
                  {/* ////////////////////////////////////////////////////////////// */}
                  <div className="sm-inc-input">
                    {values?.isSameAsAdmin === "yes" ||
                    values?.isSameAsAdmin === "noNeed" ? (
                      " "
                    ) : (
                      <IncrementAndDecrementBtn
                        index={index}
                        mainInput={websitesInputs}
                        setMainInput={setWesitesInputs}
                      />
                    )}
                  </div>
                </div>
                <div className="col-lg-9 con-info-cls">
                  <div className="con-info-input-main">
                    {/* ////////////////////////////////////////////////////////////// */}
                    {/*////////////////--------- websites --------//////////////////// */}
                    {/* ////////////////////////////////////////////////////////////// */}
                    <div style={{ width: "100%" }}>
                      <input
                        type="text"
                        className={`form-control `}
                        placeholder="Website"
                        name={`websites[${index}]`}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        readOnly={
                          values?.isSameAsAdmin === "yes" ||
                          values?.isSameAsAdmin === "noNeed"
                            ? true
                            : false
                        }
                        required={
                          values?.isSameAsAdmin === "yes" ||
                          values?.isSameAsAdmin === "noNeed"
                            ? false
                            : true
                        }
                      />
                      {/* ${
                          errors.landLineNo[index] &&
                          touched.landLineNo[index] &&
                          "error-active"
                        } */}
                      {/* {errors.landLineNo[index] &&
                        touched.landLineNo[index] && (
                          <div className="invalid-feedback">
                            Please provide your Company Name.
                          </div>
                        )} */}
                    </div>
                  </div>
                  {/* ////////////////////////////////////////////////////////////// */}
                  {/*///////--------- Increment and Decrement Button --------/////// */}
                  {/* ////////////////////////////////////////////////////////////// */}
                  <div className="inc-input-sm">
                    {values?.isSameAsAdmin === "yes" ||
                    values?.isSameAsAdmin === "noNeed" ? (
                      " "
                    ) : (
                      <IncrementAndDecrementBtn
                        index={index}
                        mainInput={websitesInputs}
                        setMainInput={setWesitesInputs}
                      />
                    )}
                  </div>

                  {/* ////////////////////////////////////////////////////////////// */}
                  {/*///////--------- Public and Private permission --------/////// */}
                  {/* ////////////////////////////////////////////////////////////// */}
                  <div className="position-relative con-info-switch">
                    <input
                      type="checkbox"
                      name={`isWbsitesPublic[${index}]`}
                      className="public-private-switch"
                      checked={values?.isWbsitesPublic[index]}
                      onChange={handleChange}
                      disabled={
                        values?.isSameAsAdmin === "yes" ||
                        values?.isSameAsAdmin === "noNeed"
                          ? true
                          : false
                      }
                    />
                    <ToggledSwitch
                      publicStatus={values?.isWbsitesPublic[index]}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* ////////////////////////////////////////////////////////////// */}
            {/*/////////////----------- YouTube -----------////////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}

            <div className="row mt-4 align-items-center">
              <div className="col-lg-3 la-mr-bt">
                <label>YouTube</label>
              </div>
              <div className="col-lg-9 con-info-cls">
                <div className="con-info-input-main">
                  {/* ////////////////////////////////////////////////////////////// */}
                  {/*////////////////--------- youtube --------//////////////////// */}
                  {/* ////////////////////////////////////////////////////////////// */}
                  <div style={{ width: "100%" }}>
                    <input
                      type="text"
                      className={`form-control `}
                      placeholder="Link"
                      name={`youTube`}
                      value={values?.youTube}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      readOnly={
                        values?.isSameAsAdmin === "yes" ||
                        values?.isSameAsAdmin === "noNeed"
                          ? true
                          : false
                      }
                      required={
                        values?.isSameAsAdmin === "yes" ||
                        values?.isSameAsAdmin === "noNeed"
                          ? false
                          : true
                      }
                    />
                    {/* ${
                          errors.landLineNo[index] &&
                          touched.landLineNo[index] &&
                          "error-active"
                        } */}
                    {/* {errors.landLineNo[index] &&
                        touched.landLineNo[index] && (
                          <div className="invalid-feedback">
                            Please provide your Company Name.
                          </div>
                        )} */}
                  </div>
                </div>
                {/* ////////////////////////////////////////////////////////////// */}
                {/*///////--------- Increment and Decrement Button --------/////// */}
                {/* ////////////////////////////////////////////////////////////// */}
                <div className="inc-input-sm">
                  <div className="add-increment text-center"></div>
                </div>

                {/* ////////////////////////////////////////////////////////////// */}
                {/*///////--------- Public and Private permission --------/////// */}
                {/* ////////////////////////////////////////////////////////////// */}
                <div className="position-relative con-info-switch">
                  <input
                    type="checkbox"
                    name={`isYouTubePublic`}
                    className="public-private-switch"
                    checked={values?.isYouTubePublic}
                    onChange={handleChange}
                    disabled={
                      values?.isSameAsAdmin === "yes" ||
                      values?.isSameAsAdmin === "noNeed"
                        ? true
                        : false
                    }
                  />
                  <ToggledSwitch publicStatus={values?.isYouTubePublic} />
                </div>
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*/////////////----------- facebook -----------////////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}

            <div className="row mt-4 align-items-center">
              <div className="col-lg-3 la-mr-bt">
                <label>Facebook</label>
              </div>
              <div className="col-lg-9 con-info-cls">
                <div className="con-info-input-main">
                  {/* ////////////////////////////////////////////////////////////// */}
                  {/*////////////////--------- facebook --------//////////////////// */}
                  {/* ////////////////////////////////////////////////////////////// */}
                  <div style={{ width: "100%" }}>
                    <input
                      type="text"
                      className={`form-control `}
                      placeholder="Link"
                      name={`facebook`}
                      value={values?.facebook}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      readOnly={
                        values?.isSameAsAdmin === "yes" ||
                        values?.isSameAsAdmin === "noNeed"
                          ? true
                          : false
                      }
                      required={
                        values?.isSameAsAdmin === "yes" ||
                        values?.isSameAsAdmin === "noNeed"
                          ? false
                          : true
                      }
                    />
                    {/* ${
                          errors.landLineNo[index] &&
                          touched.landLineNo[index] &&
                          "error-active"
                        } */}
                    {/* {errors.landLineNo[index] &&
                        touched.landLineNo[index] && (
                          <div className="invalid-feedback">
                            Please provide your Company Name.
                          </div>
                        )} */}
                  </div>
                </div>
                {/* ////////////////////////////////////////////////////////////// */}
                {/*///////--------- Increment and Decrement Button --------/////// */}
                {/* ////////////////////////////////////////////////////////////// */}
                <div className="inc-input-sm">
                  <div className="add-increment text-center"></div>
                </div>

                {/* ////////////////////////////////////////////////////////////// */}
                {/*///////--------- Public and Private permission --------/////// */}
                {/* ////////////////////////////////////////////////////////////// */}
                <div className="position-relative con-info-switch">
                  <input
                    type="checkbox"
                    name={`isFacebookPublic`}
                    className="public-private-switch"
                    checked={values?.isFacebookPublic}
                    onChange={handleChange}
                    disabled={
                      values?.isSameAsAdmin === "yes" ||
                      values?.isSameAsAdmin === "noNeed"
                        ? true
                        : false
                    }
                  />
                  <ToggledSwitch publicStatus={values?.isFacebookPublic} />
                </div>
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*/////////////----------- Twitter -----------////////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}

            <div className="row mt-4 align-items-center">
              <div className="col-lg-3 la-mr-bt">
                <label>Twitter</label>
              </div>
              <div className="col-lg-9 con-info-cls">
                <div className="con-info-input-main">
                  {/* ////////////////////////////////////////////////////////////// */}
                  {/*////////////////--------- Twitter --------//////////////////// */}
                  {/* ////////////////////////////////////////////////////////////// */}
                  <div style={{ width: "100%" }}>
                    <input
                      type="text"
                      className={`form-control `}
                      placeholder="Link"
                      name={`twitter`}
                      value={values?.twitter}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      readOnly={
                        values?.isSameAsAdmin === "yes" ||
                        values?.isSameAsAdmin === "noNeed"
                          ? true
                          : false
                      }
                      required={
                        values?.isSameAsAdmin === "yes" ||
                        values?.isSameAsAdmin === "noNeed"
                          ? false
                          : true
                      }
                    />
                    {/* ${
                          errors.landLineNo[index] &&
                          touched.landLineNo[index] &&
                          "error-active"
                        } */}
                    {/* {errors.landLineNo[index] &&
                        touched.landLineNo[index] && (
                          <div className="invalid-feedback">
                            Please provide your Company Name.
                          </div>
                        )} */}
                  </div>
                </div>
                {/* ////////////////////////////////////////////////////////////// */}
                {/*///////--------- Increment and Decrement Button --------/////// */}
                {/* ////////////////////////////////////////////////////////////// */}
                <div className="inc-input-sm">
                  <div className="add-increment text-center"></div>
                </div>

                {/* ////////////////////////////////////////////////////////////// */}
                {/*///////--------- Public and Private permission --------/////// */}
                {/* ////////////////////////////////////////////////////////////// */}
                <div className="position-relative con-info-switch">
                  <input
                    type="checkbox"
                    name={`isTwitterPublic`}
                    className="public-private-switch"
                    checked={values?.isTwitterPublic}
                    onChange={handleChange}
                    disabled={
                      values?.isSameAsAdmin === "yes" ||
                      values?.isSameAsAdmin === "noNeed"
                        ? true
                        : false
                    }
                  />
                  <ToggledSwitch publicStatus={values?.isTwitterPublic} />
                </div>
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*/////////////----------- Instagram -----------////////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}

            <div className="row mt-4 align-items-center">
              <div className="col-lg-3 la-mr-bt">
                <label>Instagram</label>
              </div>
              <div className="col-lg-9 con-info-cls">
                <div className="con-info-input-main">
                  {/* ////////////////////////////////////////////////////////////// */}
                  {/*////////////////--------- Instagram --------//////////////////// */}
                  {/* ////////////////////////////////////////////////////////////// */}
                  <div style={{ width: "100%" }}>
                    <input
                      type="text"
                      className={`form-control `}
                      placeholder="Link"
                      name={`instagram`}
                      value={values?.instagram}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      readOnly={
                        values?.isSameAsAdmin === "yes" ||
                        values?.isSameAsAdmin === "noNeed"
                          ? true
                          : false
                      }
                      required={
                        values?.isSameAsAdmin === "yes" ||
                        values?.isSameAsAdmin === "noNeed"
                          ? false
                          : true
                      }
                    />
                    {/* ${
                          errors.landLineNo[index] &&
                          touched.landLineNo[index] &&
                          "error-active"
                        } */}
                    {/* {errors.landLineNo[index] &&
                        touched.landLineNo[index] && (
                          <div className="invalid-feedback">
                            Please provide your Company Name.
                          </div>
                        )} */}
                  </div>
                </div>
                {/* ////////////////////////////////////////////////////////////// */}
                {/*///////--------- Increment and Decrement Button --------/////// */}
                {/* ////////////////////////////////////////////////////////////// */}
                <div className="inc-input-sm">
                  <div className="add-increment text-center"></div>
                </div>

                {/* ////////////////////////////////////////////////////////////// */}
                {/*///////--------- Public and Private permission --------/////// */}
                {/* ////////////////////////////////////////////////////////////// */}
                <div className="position-relative con-info-switch">
                  <input
                    type="checkbox"
                    name={`isInstagramPublic`}
                    className="public-private-switch"
                    checked={values?.isInstagramPublic}
                    onChange={handleChange}
                    disabled={
                      values?.isSameAsAdmin === "yes" ||
                      values?.isSameAsAdmin === "noNeed"
                        ? true
                        : false
                    }
                  />
                  <ToggledSwitch publicStatus={values?.isInstagramPublic} />
                </div>
              </div>
            </div>
          </div>
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
            <button type="button" style={doitBtn} onClick={handleDoItLatter}>
              Do it latter
            </button>
          </div>
        </form>
      </section>
    );
  }
};

const doitBtn = {
  border: "transparent",
  background: "transparent",
  fontSize: "15px",
  fontFamily: "inherit",
  position: "relative",
  left: "43%",
};
export default ProductContactInformation;
