import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { PulseLoader } from "react-spinners";
import { useGetBrandIndustryQuery } from "../../../slices/brandIndustryApiSlice";
import useBusinessPreviousSteps from "../../../utils/ownHooks/useBusinessPreviousSteps";
import { productInformationSchema } from "../../../schemaValidation/createProductValidation";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetBrandProfileMutation } from "../../../slices/brandProfileApiSlice";
import productLocationValidationSchema from "../../../schemaValidation/productLocationValidationSchema";
import { useToast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import OtherProfileSkeleton from "../otherProfileSkeleton";
import CommonPageLoader from "../../commonPageLoader/commonPageLoader";
import useCoordinates from "../../../utils/ownHooks/useCoordinates";

const initialValues = {
  productName: "",
  isSameLocation: "yes",
  building: "",
  street: "",
  landmark: "",
  area: "",
  country: "",
  state: "",
  city: "",
  pinCode: "",
};

const LocationInformation = () => {
  const [isLoading, setIsLoading] = useState("");
  const [loading, setLoading] = useState(false);
  const [fillFieldLoading, setFillFieldLoading] = useState(false);
  const brandIndustry = useGetBrandIndustryQuery();
  const location = useLocation()?.pathname?.split("/");
  const [brandPro, setBrandPro] = useState();
  const navigate = useNavigate();

  /////////////////////////////////////////////////////////////////////////////
  ///////////------------- previous step handling --------------//////////////
  ///////////////////////////////////////////////////////////////////////////
  const [handlePreviousStep, getPreviousSteps, removeItemsFromSteps] =
    useBusinessPreviousSteps("businessProductProfile");

  /////////////////////////////////////////////////////////////////////////////
  ////////------------- geo location coordinates hook --------------///////////
  ////////////////////////////////////////////////////////////////////////////
  const handleGetCoordinates = useCoordinates();

  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    errors,
    touched,
    handleSubmit,
    setErrors,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: productLocationValidationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const [lat, lng] = await handleGetCoordinates(
          values.city,
          values.state,
          values.country,
          values?.pinCode
        );
        const data = { ...values, lat, lng };

        localStorage.setItem("proLocationInfo", JSON.stringify(data));
        setLoading(true);
        handlePreviousStep("location-information");
        navigate(
          `/business/${location[2]}/listed-profile/create-profile/contact-information`
        );
        setLoading(false);
      } catch (error) {}
    },
  });

  ////////////////////////////////////////////////////////
  ///////////--- get Current brand mutation ---//////////
  //////////////////////////////////////////////////////
  const [getBrand] = useGetBrandProfileMutation();
  const getCurrentBrand = async () => {
    try {
      setFillFieldLoading(true);
      const res = await getBrand({ userId: location[2] }).unwrap();

      if (res.status === "succcess") {
        setBrandPro(res?.data?.brandProfile);
        if (values?.isSameLocation === "yes") {
          setLocationField(res?.data?.brandProfile?.location);
        }
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

  const setLocationField = (location) => {
    let proLocationInfo = localStorage.getItem("proLocationInfo")
      ? JSON.parse(localStorage.getItem("proLocationInfo"))
      : "";

    if (proLocationInfo?.isSameLocation === "no") {
      setFieldValue("building", proLocationInfo?.building);
      setFieldValue("isSameLocation", proLocationInfo?.isSameLocation);
      setFieldValue("street", proLocationInfo?.street);
      setFieldValue("landmark", proLocationInfo?.landmark);
      setFieldValue("area", proLocationInfo?.area);
      setFieldValue("country", proLocationInfo?.country);
      setFieldValue("state", proLocationInfo?.state);
      setFieldValue("city", proLocationInfo?.city);
      setFieldValue("pinCode", proLocationInfo?.pinCode);
      setFieldValue("productName", proLocationInfo?.productName);
    } else {
      setFieldValue("building", location?.building);
      setFieldValue("street", location?.street);
      setFieldValue("landmark", location?.landmark);
      setFieldValue("area", location?.area);
      setFieldValue("country", location?.country);
      setFieldValue("state", location?.state);
      setFieldValue("city", location?.city);
      setFieldValue("pinCode", location?.pinCode);
      let field = localStorage.getItem("newProductInfo")
        ? JSON.parse(localStorage.getItem("newProductInfo"))
        : "";
      setFieldValue("productName", field["productName"]);
    }
  };

  //////////////////////////////////////////////////////////////////////
  //////////----- if location is same as brand profile -----///////////
  ////////////////////////////////////////////////////////////////////
  const handleSameLocation = (e) => {
    handleChange(e);

    if (e.target.value === "yes") {
      setFieldValue("building", brandPro?.location?.building);
      setFieldValue("street", brandPro?.location?.street);
      setFieldValue("landmark", brandPro?.location?.landmark);
      setFieldValue("area", brandPro?.location?.area);
      setFieldValue("country", brandPro?.location?.country);
      setFieldValue("state", brandPro?.location?.state);
      setFieldValue("city", brandPro?.location?.city);
      setFieldValue("pinCode", brandPro?.location?.pinCode);
    }
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
        <form className="was-validated " onSubmit={handleSubmit}>
          <div className="form-group">
            {/* ////////////////////////////////////////////////////////////// */}
            {/*////////-------- Business / Company Name --------////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-4 align-items-center">
              <div className="col-lg-3">
                <label className="bus-label-sm" htmlFor="cName">
                  Business / Company Name
                </label>
              </div>
              <div className="col-lg-9">
                <input
                  type="text"
                  readOnly={true}
                  className="form-control pre-field-field"
                  value={brandPro?.brandName}
                />
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*////////////-------- Listing Profile Name --------///////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-3 align-items-center mail-bus-sm-l">
              <div className="col-lg-3">
                <label className="bus-label-sm" htmlFor="adminName">
                  Listing Profile Name
                </label>
              </div>
              <div className="col-lg-9">
                <input
                  type="text"
                  readOnly={true}
                  className="form-control pre-field-field"
                  value={values?.productName}
                />
              </div>
            </div>

            {/* //////////////////////////////////////////////////////////////////////*/}
            {/*////////////-------- Location based on select Box --------///////////// */}
            {/* ///////////////////////////////////////////////////////////////////// */}
            <div className="row mt-3 align-items-center mail-bus-sm-l">
              <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-center">
                <input
                  id="locationse"
                  type="radio"
                  name="isSameLocation"
                  value="yes"
                  className="location-con-sel"
                  onChange={handleSameLocation}
                  checked={values?.isSameLocation === "yes" ? true : false}
                />
                <label htmlFor="locationse">
                  Same location as Admin / Business / Company profile
                </label>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-center">
                <input
                  id="locationDiff"
                  type="radio"
                  name="isSameLocation"
                  value="no"
                  className="location-con-sel"
                  onChange={handleSameLocation}
                  checked={values?.isSameLocation === "no" ? true : false}
                />
                <label htmlFor="locationDiff">
                  Different location for this profile
                </label>
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*////////////-------------- Building ------------/////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-3 align-items-center mail-bus-sm-l">
              <div className="col-lg-3">
                <label className="bus-label-sm" htmlFor="building">
                  Building
                </label>
              </div>
              <div className="col-lg-9">
                <input
                  type="text"
                  className={`form-control ${
                    values?.isSameLocation !== "yes" &&
                    errors?.building &&
                    touched?.building &&
                    "error-active"
                  } ${
                    values?.isSameLocation === "yes" ? "pre-field-field" : ""
                  }`}
                  id="building"
                  placeholder="Building"
                  name="building"
                  value={values?.building}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  readOnly={values?.isSameLocation === "yes" ? true : false}
                />
                {values?.isSameLocation !== "yes" &&
                  errors?.building &&
                  touched?.building && (
                    <div className="invalid-feedback">{errors?.building}</div>
                  )}
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*////////////-------------- Street ------------/////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-3 align-items-center mail-bus-sm-l">
              <div className="col-lg-3">
                <label className="bus-label-sm" htmlFor="street">
                  Street
                </label>
              </div>
              <div className="col-lg-9">
                <input
                  type="text"
                  className={`form-control ${
                    errors?.street && touched?.street && "error-active"
                  } ${
                    values?.isSameLocation === "yes" ? "pre-field-field" : ""
                  }`}
                  id="street"
                  placeholder="Street"
                  name="street"
                  value={values?.street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  readOnly={values?.isSameLocation === "yes" ? true : false}
                />
                {errors?.street && touched?.street && (
                  <div className="invalid-feedback">{errors?.street}</div>
                )}
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*////////////-------------- Landmark ------------/////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-3 align-items-center mail-bus-sm-l">
              <div className="col-lg-3">
                <label className="bus-label-sm" htmlFor="landmark">
                  Landmark
                </label>
              </div>
              <div className="col-lg-9">
                <input
                  type="text"
                  className={`form-control ${
                    errors?.landmark && touched?.landmark && "error-active"
                  } ${
                    values?.isSameLocation === "yes" ? "pre-field-field" : ""
                  }`}
                  id="landmark"
                  placeholder="Landmark"
                  name="landmark"
                  value={values?.landmark}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  readOnly={values?.isSameLocation === "yes" ? true : false}
                />
                {errors?.landmark && touched?.landmark && (
                  <div className="invalid-feedback">{errors?.landmark}</div>
                )}
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*////////////-------------- Area ------------/////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-3 align-items-center mail-bus-sm-l">
              <div className="col-lg-3">
                <label className="bus-label-sm" htmlFor="area">
                  Area
                </label>
              </div>
              <div className="col-lg-9">
                <input
                  type="text"
                  className={`form-control ${
                    errors?.area && touched?.area && "error-active"
                  } ${
                    values?.isSameLocation === "yes" ? "pre-field-field" : ""
                  }`}
                  id="area"
                  placeholder="Area"
                  name="area"
                  value={values.area}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  readOnly={values?.isSameLocation === "yes" ? true : false}
                />
                {errors?.area && touched?.area && (
                  <div className="invalid-feedback">{errors?.area}</div>
                )}
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*////////////-------------- Country ------------/////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-3 align-items-center mail-bus-sm-l">
              <div className="col-lg-3">
                <label className="bus-label-sm" htmlFor="country">
                  Country
                </label>
              </div>
              <div className="col-lg-9">
                <input
                  type="text"
                  className={`form-control ${
                    values?.isSameLocation !== "yes" &&
                    errors?.country &&
                    touched?.country &&
                    "error-active"
                  } ${
                    values?.isSameLocation === "yes" ? "pre-field-field" : ""
                  }`}
                  id="country"
                  placeholder="Country"
                  name="country"
                  value={values?.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  readOnly={values?.isSameLocation === "yes" ? true : false}
                />
                {values?.isSameLocation !== "yes" &&
                  errors?.country &&
                  touched?.country && (
                    <div className="invalid-feedback">{errors?.country}</div>
                  )}
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*////////////-------------- State ------------/////////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-3 align-items-center mail-bus-sm-l">
              <div className="col-lg-3">
                <label className="bus-label-sm" htmlFor="state">
                  State
                </label>
              </div>
              <div className="col-lg-9">
                <input
                  type="text"
                  className={`form-control ${
                    values?.isSameLocation !== "yes" &&
                    errors?.state &&
                    touched?.state &&
                    "error-active"
                  } ${
                    values?.isSameLocation === "yes" ? "pre-field-field" : ""
                  }`}
                  id="state"
                  placeholder="State"
                  name="state"
                  value={values?.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  readOnly={values?.isSameLocation === "yes" ? true : false}
                />
                {values?.isSameLocation !== "yes" &&
                  errors?.state &&
                  touched?.state && (
                    <div className="invalid-feedback">{errors?.state}</div>
                  )}
              </div>
            </div>

            {/* ////////////////////////////////////////////////////////////// */}
            {/*//////////---------- City and pincode ------------///////////// */}
            {/* ////////////////////////////////////////////////////////////// */}
            <div className="row mt-3  align-items-center mail-bus-sm-l">
              <div className="col-lg-3">
                <label className="bus-label-sm" htmlFor="city">
                  City
                </label>
              </div>
              <div className="col-lg-9">
                <div className="row mail-bus-sm-l">
                  {/* city */}
                  <div className="col-lg-4">
                    <input
                      type="text"
                      className={`form-control ${
                        values?.isSameLocation !== "yes" &&
                        errors?.city &&
                        touched?.city &&
                        "error-active"
                      } ${
                        values?.isSameLocation === "yes"
                          ? "pre-field-field"
                          : ""
                      }`}
                      id="city"
                      placeholder="City"
                      name="city"
                      value={values?.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      readOnly={values?.isSameLocation === "yes" ? true : false}
                    />
                    {values?.isSameLocation !== "yes" &&
                      errors?.city &&
                      touched?.city && (
                        <div className="invalid-feedback">{errors?.city}</div>
                      )}
                  </div>

                  {/* pin code */}
                  <div className="col-lg-8">
                    <div className="row align-items-center mail-bus-sm-l">
                      <div className="col-lg-3 text-center t-l-sm">
                        {" "}
                        <label className="bus-label-sm" htmlFor="pinCode">
                          Pin Code
                        </label>
                      </div>
                      <div className="col-lg-9">
                        <input
                          type="text"
                          className={`form-control ${
                            values?.isSameLocation !== "yes" &&
                            errors?.pinCode &&
                            touched?.pinCode &&
                            "error-active"
                          } ${
                            values?.isSameLocation === "yes"
                              ? "pre-field-field"
                              : ""
                          }`}
                          id="pinCode"
                          placeholder="City"
                          name="pinCode"
                          value={values?.pinCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          readOnly={
                            values?.isSameLocation === "yes" ? true : false
                          }
                        />
                        {values?.isSameLocation !== "yes" &&
                          errors?.pinCode &&
                          touched?.pinCode && (
                            <div className="invalid-feedback">
                              {errors?.pinCode}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
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
          </div>
        </form>
      </section>
    );
  }
};

export default LocationInformation;
