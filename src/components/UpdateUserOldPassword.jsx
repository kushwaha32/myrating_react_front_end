import { useFormik } from "formik";
import UserSettingAccountContainer from "./UserSettingAccoutContainer";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { updatePasswordSchema } from "../schemaValidation/updatePasswordValidationSchema";
import { toast } from "react-toastify";
import { useUpdateUserPasswordMutation } from "../slices/usersApiSlice";
import { setLocale } from "yup";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";

const initialValues = {
  passwordCurrent: "",
  password: "",
  passwordConfirm: "",
};
const UpdateUserOldPassword = ({ slugUrl }) => {
  const [inputCurrPassType, setInputCurrPassType] = useState(true);
  const [inputNewPassType, setInputNewPassType] = useState(true);
  const [inputConfirmPassType, setInputConfirmPassType] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  /////////////////////////////////////////////////////////////////////////
  ////////////////////---- Update user password mutatioin ----//////////////////
  ///////////////////////////////////////////////////////////////////////
  const [updateUserPassword] = useUpdateUserPasswordMutation();
  const {
    values,
    handleBlur,
    handleChange,
    errors,
    touched,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: updatePasswordSchema,
    onSubmit: async (value) => {
      try {
        setIsLoading(true);
        const res = await updateUserPassword(value).unwrap();
        if (res?.status === "success") {
          toast.success("Password updated successfully!");
          dispatch(setCredentials({ ...res.data }));
          setIsLoading(false);
          resetForm();
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error?.data?.message);
        console.log(error);
      }
    },
  });
  return (
    <UserSettingAccountContainer slugUrl={slugUrl} title="Change Password">
      <form onSubmit={handleSubmit}>
        <div className="container">
          {/* ///////////////////////////////////////////////////////////// */}
          {/*/////////////------------ Current Password -----///////////////*/}
          {/*///////////////////////////////////////////////////////////////*/}
          <div className="row justify-content-center">
            <div className="col-lg-3 col-sm-12"></div>
            <div className="col-lg-6 col-sm-12 mct ">
              <label htmlFor="passwordCurrent" className="register-label">
                Current Password
              </label>
              <div className="input-holder ">
                <input
                  type={inputCurrPassType ? "password" : "text"}
                  className={`form-control ${
                    errors?.passwordCurrent && touched?.passwordCurrent
                      ? "is-invalid"
                      : ""
                  }`}
                  id="passwordCurrent"
                  placeholder="Current Password"
                  name="passwordCurrent"
                  value={values.passwordCurrent}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <i
                  className={`fa eye-icon ${
                    inputCurrPassType ? "fa-eye-slash" : "fa-eye"
                  }`}
                  onClick={() => setInputCurrPassType(!inputCurrPassType)}
                ></i>
              </div>
              {errors?.passwordCurrent && touched?.passwordCurrent && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {errors?.passwordCurrent}
                </div>
              )}
            </div>
            <div className="col-lg-3 col-sm-12 "></div>
          </div>

          {/* ///////////////////////////////////////////////////////////// */}
          {/*/////////////////------------ password -----///////////////////*/}
          {/*///////////////////////////////////////////////////////////////*/}
          <div className="row justify-content-center">
            <div className="col-lg-3 col-sm-12"></div>
            <div className="col-lg-6 col-sm-12 mct mt-3">
              <label htmlFor="password" className="register-label">
                Password
              </label>
              <div className="input-holder">
                <input
                  type={inputNewPassType ? "password" : "text"}
                  className={`form-control ${
                    errors?.password && touched?.password ? "is-invalid" : ""
                  }`}
                  id="password"
                  placeholder="New Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <i
                  className={`fa eye-icon ${
                    inputNewPassType ? "fa-eye-slash" : "fa-eye"
                  }`}
                  onClick={() => setInputNewPassType(!inputNewPassType)}
                ></i>
              </div>
              {errors?.password && touched?.password && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {errors?.password}
                </div>
              )}
            </div>
            <div className="col-lg-3 col-sm-12 "></div>
          </div>

          {/* ///////////////////////////////////////////////////////////// */}
          {/*/////////////////----- confirm password-----///////////////////*/}
          {/*///////////////////////////////////////////////////////////////*/}
          <div className="row justify-content-center">
            <div className="col-lg-3 col-sm-12"></div>
            <div className="col-lg-6 col-sm-12 mct mt-3">
              <label htmlFor="passwordConfirm" className="register-label">
                Confirm Password
              </label>

              <div className="input-holder ">
                <input
                  type={inputConfirmPassType ? "password" : "text"}
                  className={`form-control ${
                    errors?.passwordConfirm && touched?.passwordConfirm
                      ? "is-invalid"
                      : ""
                  }`}
                  id="passwordConfirm"
                  placeholder="Confirm Password"
                  name="passwordConfirm"
                  value={values.passwordConfirm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <i
                  className={`fa eye-icon ${
                    inputConfirmPassType ? "fa-eye-slash" : "fa-eye"
                  }`}
                  onClick={() => setInputConfirmPassType(!inputConfirmPassType)}
                ></i>
              </div>
              {errors?.passwordConfirm && touched?.passwordConfirm && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {errors?.passwordConfirm}
                </div>
              )}
              {/* /////////////////////////////////////////////////////////////////////////// */}
              {/*/////////////----------- Submit for Change password ----------///////////// */}
              {/* /////////////////////////////////////////////////////////////////////////// */}
              <div className="btn-s-main mt-5 row justify-content-center">
                <button
                  type="submit"
                  className={`btn btn-white ${isLoading && "disabled"}`}
                  style={{ width: "215px" }}
                >
                  {isLoading ? "Loading" : "Update Password"}
                  <PulseLoader
                    color="rgb(0 40 86 / 80%)"
                    loading={isLoading}
                    size={6}
                    cssOverride={{ width: "37px", display: "inline" }}
                  />
                </button>
              </div>
            </div>
            <div className="col-lg-3 col-sm-12 mct"></div>
          </div>
        </div>
      </form>
      <br />
      <br />
    </UserSettingAccountContainer>
  );
};

export default UpdateUserOldPassword;
