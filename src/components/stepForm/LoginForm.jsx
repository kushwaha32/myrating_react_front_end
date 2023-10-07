import FormTitle from "./formTitle";
import { LoginSchema } from "../../schemaValidation/loginValidation";
import { useFormik } from "formik";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const initialValues = {
  emailOrMobileNo: "",
  password: "",
};

const LoginForm = ({ handleClose, stepForword }) => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  // form handling using formik
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues,
      validationSchema: LoginSchema,
      onSubmit: async (value) => {
        try {
          const res = await login({
            emailOrContact: value.emailOrMobileNo,
            password: value.password,
          }).unwrap();

          if (res.status === "success") {
            dispatch(setCredentials({ ...res.data }));

            toast.success("You are logged in successfully!");
            handleClose();
          } else {
            toast.error(res.message);
          }
        } catch (err) {
          toast.error(err.data.message);
        }
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <span className="modal-close" onClick={handleClose}>
        Close
      </span>
      <FormTitle clss="login-title-sty" style={style} text="Login Now" />
      <div className="profile-field">
        {/* Login email or phone no. */}
        <div className="form-group mt-4">
          <i className="fa fa-user login-user-icon"></i>
          <input
            type="text"
            value={values.emailOrMobileNo}
            name="emailOrMobileNo"
            className={`form-control ${
              errors.emailOrMobileNo && touched.emailOrMobileNo
                ? "is-invalid"
                : ""
            }`}
            id="emailOrMobileNo"
            placeholder="Email ID/Mobile Number"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.emailOrMobileNo && touched.emailOrMobileNo ? (
          <div className="field-eror login-field-error">
            {errors.emailOrMobileNo}
          </div>
        ) : null}

        {/* login password */}
        <div className="form-group">
          <i className="fa fa-lock login-lock-icon"></i>
          <input
            type="password"
            value={values.password}
            name="password"
            className={`form-control ${
              errors.password && touched.password ? "is-invalid" : ""
            }`}
            id="password"
            placeholder="password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.password && touched.password ? (
          <div class="field-eror login-field-error mb-4">{errors.password}</div>
        ) : null}

        <div className="log-forget-pass">
          <span onClick={() => stepForword("loginViaOtp")}>Login via OTP</span>{" "}
          <span onClick={() => stepForword("forgetPass")}>Forget Password</span>
        </div>
      </div>
      <div className="mt-5 mb-3 profile-field text-center">
        <button
          className={`btn btn-form mb-2 ${isLoading && "disabled"}`}
          style={btnStyle}
          type="submit"
        >
          {isLoading ? "...loading" : "Login"}
        </button>
        <Link
          to="/register"
          className={`btn btn-form mb-4 ${isLoading && "disabled"}`}
          style={btnStyle}
        >
          Create Account
        </Link>
      </div>
    </form>
  );
};

const btnStyle = {
  width: "100%",
  color: "#ffc300",
  padding: "11px 20px",
  margin: "16px auto auto",
  display: "block",
  borderRadius: "14px",
  fontFamily: "'Belanosima', sans-serif",
};

const style = {
  marginTop: "36px",
  marginBottom: "12px",
};

export default LoginForm;
