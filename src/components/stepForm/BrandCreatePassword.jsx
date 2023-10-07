

import { useState } from "react";
import { useFormik } from "formik";
import FormTitle from "./formTitle";
import { passwordSchema } from "../../schemaValidation/passwordValidation";
import { useBrandCreatePasswordMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";

const initialValues = {
  password: "",
  confirm_password: "",
};

const BrandCreatePassword = ({ handleCase, handleClose }) => {
  const [createBrandPassword, { isLoading }] =
  useBrandCreatePasswordMutation();

  // form handling using formik
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues,
      validationSchema: passwordSchema,
      onSubmit: async (value) => {
        try {
          const res = await createBrandPassword({
            password: value.password,
            passwordConfirm: value.confirm_password,
          }).unwrap();

          if (res.status === "success") {
            toast.success(res.message);
            handleClose()
            handleCase("businesProfile")
          } else {
            toast.error("Something went rong. Please try again latter!");
           
          }
        } catch (error) {
          toast.error("Something went rong. Please try again latter!");
        }
      },
    });

  const [inputPassType, setInputPassType] = useState(true);
  const [inputConType, setInputConType] = useState(true);

  return (
    <>
      <div className="modal-head d-flex justify-content-between">
       <button ></button>
        <button onClick={handleClose}>Close</button>
      </div>
      <FormTitle text="Create Password" />
      <form onSubmit={handleSubmit}>
        <div className="profile-field">
          <div className="form-group">
            <label htmlFor="password" className="profile-field-label">
              New Password <span>*</span>
            </label>
            <div className="input-holder">
              <input
                type={inputPassType ? "password" : "text"}
                className={`form-control ${
                  errors.password && touched.password ? "is-invalid" : ""
                }`}
                id="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <i
                className={`fa eye-icon ${
                  inputPassType ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={() => setInputPassType(!inputPassType)}
              ></i>
            </div>
            {errors.password && touched.password ? (
              <div className="field-eror">{errors.password}</div>
            ) : null}
          </div>
          <div className="form-group mt-2">
            <label htmlFor="confirm" className="profile-field-label">
              Confirm Password <span>*</span>
            </label>
            <div className="input-holder">
              <input
                type={inputConType ? "password" : "text"}
                className={`form-control ${
                  errors.confirm_password && touched.confirm_password
                    ? "is-invalid"
                    : ""
                }`}
                id="confirm"
                placeholder="Confirm Password"
                name="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <i
                className={`fa eye-icon ${
                  inputConType ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={() => setInputConType(!inputConType)}
              ></i>
            </div>
            {errors.confirm_password && touched.confirm_password ? (
              <div className="field-eror">{errors.confirm_password}</div>
            ) : null}
          </div>
         <div className="text-center mt-2">
          <button
            className={`btn btn-form mb-2 ${isLoading && "disabled"}`}
            type="submit"
          >
            {isLoading ? "...loading" : "Submit"}
          </button>
          </div>
        </div>
      </form>
    </>
  );
};

const style = {
  width: "225px",
  padding: "4px 0",
  fontSize: "16px",
};

export default BrandCreatePassword;
