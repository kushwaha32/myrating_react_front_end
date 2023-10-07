import { useState } from "react";
import { useCreateUserPasswordMutation } from "../slices/usersApiSlice";
import { useFormik } from "formik";
import { passwordSchema } from "../schemaValidation/passwordValidation";
import { toast } from "react-toastify";
import UserSettingAccountContainer from "./UserSettingAccoutContainer";
import { PulseLoader } from "react-spinners";
const initialValues = {
  password: "",
  confirm_password: "",
};

const CreateUserNewPassword = ({ slugUrl }) => {
  const [inputCurrPassType, setInputCurrPassType] = useState(true);
  const [inputNewPassType, setInputNewPassType] = useState(true);
  const [inputConfirmPassType, setInputConfirmPassType] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  //////////////////////////////////////////////////////////////////
  /////////--- Get User Info from the state ---////////////////////
  ////////////////////////////////////////////////////////////////
  const [createUserPassword] = useCreateUserPasswordMutation();

  const { handleBlur, handleSubmit, handleChange, touched, errors, values } =
    useFormik({
      initialValues,
      validationSchema: passwordSchema,
      onSubmit: async (value) => {
        try {
          setIsLoading(true);
          const res = await createUserPassword({
            password: value.password,
            passwordConfirm: value.confirm_password,
          }).unwrap();
          if (res.status === "success") {
            setIsLoading(false);
            toast.success("Password created successfully!");
          }
        } catch (error) {
          setIsLoading(false);
          toast.error("Something went rong please try latter!");
          console.log(error.message);
        }
      },
    });
  return (
    <UserSettingAccountContainer slugUrl={slugUrl} title="Create Password">
      {/* ///////////////////////////////////////////////////////////// */}
      {/*/////////////////------------ password -----///////////////////*/}
      {/*///////////////////////////////////////////////////////////////*/}
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-sm-12"></div>
            <div className="col-lg-6 col-sm-12 mct ">
              <label htmlFor="password" className="register-label">
                Password
              </label>
              <div className="input-holder mt-2">
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
              <label htmlFor="confirm_password" className="register-label">
                Confirm Password
              </label>

              <div className="input-holder ">
                <input
                  type={inputConfirmPassType ? "password" : "text"}
                  className={`form-control ${
                    errors?.confirm_password && touched?.confirm_password
                      ? "is-invalid"
                      : ""
                  }`}
                  id="confirm_password"
                  placeholder="Confirm Password"
                  name="confirm_password"
                  value={values.confirm_password}
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
              {errors?.confirm_password && touched?.confirm_password && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {errors?.confirm_password}
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
                  {isLoading ? "Loading" : "Create Password"}
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

export default CreateUserNewPassword;
