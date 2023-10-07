import { useFormik } from "formik";
import location from "../../img/location.png";
import FormTitle from "./formTitle";
import { businessRegistrationSchema } from "../../schemaValidation/businessRegitrationValidation";
import asyncLocalStorage from "../../utils/asyncLocalStorage";
import { useState } from "react";
import { useBrandSignupMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import { useGetRegisteredAsQuery } from "../../slices/brandRegisteredAsApiSlice";
import { useGetBrandIndustryQuery } from "../../slices/brandIndustryApiSlice";
import GoogleAutoComplete from "../googleLocationAutoComplete";

const initialValues = {
  fullName: "",
  registeredAs: "",
  industry: "",
  googleLocation: "",
  mobileNo: "",
  emailAddress: "",
  terms_and_cond: false,
  privacy_and_policy: false,
};

const BusinessProfileForm = ({ handleClose, handleCase, handleFildVal }) => {
  const [brandSignup, { isLoading }] = useBrandSignupMutation();

  // get the brand registered
  const {
    data: registeredAsData,
    isLoading: registeredAsLoading,
    isError,
  } = useGetRegisteredAsQuery();
  

  // get the industry
  const {
    data: industry,
    isLoading: industryLoading,
    isError: industryError,
  } = useGetBrandIndustryQuery();

  // form handling using formik
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: businessRegistrationSchema,
    onSubmit: async (value) => {
      console.log(value)
      try {
        const res = await brandSignup({
          email: value.emailAddress,
          contactNumber: value.mobileNo,
        }).unwrap();
       
        // if some error is happening
        if (res.status !== "success") {
          toast.error(res.data.message);
        }
        //  if req is successfull
        if (res.status === "success") {
          await asyncLocalStorage.setItem(
            "businessProfileField",
            JSON.stringify(value)
          );
          handleFildVal(value);
          toast.success(res.message);
          handleCase("businessOtpVerify");
        }
      } catch (err) {
        toast.error(err.data.message);
      }
    },
  });
  const handleLocationSelect = (location) => {
    // Use the selected location in your parent component logic
    setFieldValue("googleLocation", JSON.stringify(location));
   
  };
  return (
    <>
      <span className="modal-close" onClick={handleClose}>
        Close
      </span>
      <FormTitle style={style} text="Create Business Profile" />
      <form onSubmit={handleSubmit}>
        <div className="profile-field business-profile-width">
          {/* Business/ Organization/ Company/ Brand Name */}
          <div className="form-group">
            <label htmlFor="fullName" className="profile-field-label">
              Business/ Organization/ Company/ Brand Name <span>*</span>
            </label>
            <input
              type="text"
              value={values.fullName}
              name="fullName"
              className={`form-control ${
                errors.fullName && touched.fullName ? "is-invalid" : ""
              }`}
              id="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.fullName && touched.fullName ? (
              <div className="field-eror">{errors.fullName}</div>
            ) : null}
          </div>

          {/* registered as */}
          <div className="form-group mt-2">
            <label htmlFor="registeredAs" className="profile-field-label">
              Registered as <span>*</span>
            </label>
            <select
              aria-label="Default select example"
              name="registeredAs"
              className={`form-select select-profession ${
                errors.registeredAs && touched.registeredAs ? "is-invalid" : ""
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select Registered as</option>
              {registeredAsLoading ? (
                <option>loading...</option>
              ) : (
                <>
                  {registeredAsData?.data?.registeredAs?.map((currEl) => (
                    <option value={currEl._id} key={currEl._id}>
                      {currEl.name}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
          {errors.registeredAs && touched.registeredAs ? (
            <div className="field-eror">{errors.registeredAs}</div>
          ) : null}

          {/* Industry */}
          <div className="form-group mt-2">
            <label htmlFor="industry" className="profile-field-label">
              Industry <span>*</span>
            </label>
            <select
              aria-label="Default select example"
              name="industry"
              className={`form-select select-profession ${
                errors.industry && touched.industry ? "is-invalid" : ""
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {" "}
              <option value="">Select Your Industry</option>
              {industryLoading ? (
                <option>loading...</option>
              ) : (
                industry?.data?.industry?.map((currEl) => (
                  <option
                    value={currEl?._id}
                    key={currEl?._id}
                    className="text-capitalize"
                  >
                    {currEl?.name}
                  </option>
                ))
              )}
            </select>
          </div>
          {errors.industry && touched.industry ? (
            <div className="field-eror">{errors.industry}</div>
          ) : null}

          {/* Business current location */}
          <GoogleAutoComplete
            handleLocationSelect={handleLocationSelect}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
          />
          {/* Mobile no */}
          <div className="form-group loc-profile mt-2">
            <label htmlFor="mobileNo" className="profile-field-label">
              Mobile No. <span>*</span>
            </label>
            <input
              type="text"
              className={`form-control location ${
                errors.mobileNo && touched.mobileNo ? "is-invalid" : ""
              }`}
              value={values.mobileNo}
              name="mobileNo"
              id="mobileNo"
              placeholder="Mobile Number"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.mobileNo && touched.mobileNo ? (
            <div className="field-eror">{errors.mobileNo}</div>
          ) : null}

          {/* Email Address */}
          <div className="form-group loc-profile mt-2">
            <label htmlFor="emailAddress" className="profile-field-label">
              Email Address <span>*</span>
            </label>
            <input
              type="email"
              className={`form-control location ${
                errors.emailAddress && touched.emailAddress ? "is-invalid" : ""
              }`}
              value={values.emailAddress}
              name="emailAddress"
              id="emailAddress"
              placeholder="Email Address"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.emailAddress && touched.emailAddress ? (
            <div className="field-eror">{errors.emailAddress}</div>
          ) : null}

          {/* terms and condition and privacy policy */}
          <div className="terms-and-condition mt-3">
            {/* terms and condition */}
            <div className="form-check form-check-main">
              <input
                className="form-check-input condition"
                type="checkbox"
                id="termsandcondition"
                name="terms_and_cond"
                onChange={handleChange}
                value={values.terms_and_cond}
              />
              <label className="form-check-label" htmlFor="termsandcondition">
                Accept Terms and Condition
              </label>
              {errors.terms_and_cond && touched.terms_and_cond ? (
                <div className="field-eror">{errors.terms_and_cond}</div>
              ) : null}
            </div>
            {/* privacy policy */}
            <div className="form-check form-check-main mt-2">
              <input
                className="form-check-input condition"
                type="checkbox"
                id="privacyPolicy"
                name="privacy_and_policy"
                onChange={handleChange}
                value={values.privacy_and_policy}
              />
              <label className="form-check-label" htmlFor="privacyPolicy">
                Accept Privacy Policy
              </label>
              {errors.privacy_and_policy && touched.privacy_and_policy ? (
                <div className="field-eror">{errors.privacy_and_policy}</div>
              ) : null}
            </div>
          </div>
        </div>

        <button
          className={`btn btn-form mb-2 ${isLoading && "disabled"}`}
          style={style}
          type="submit"
        >
          {isLoading ? "...loading" : "Continue"}
        </button>
      </form>
    </>
  );
};

const btnStyle = {
  width: "156px",
  fontWeight: "bold",
  padding: "8px 20px",
};

const style = {
  marginTop: "3px",
  marginBottom: "12px",
};

export default BusinessProfileForm;
