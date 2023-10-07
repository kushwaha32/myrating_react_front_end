import ButtonForm from "../buttonForm";
import FormTitle from "./formTitle";
import ButtonFormSubmit from "../buttonFormSubmit";
import { LoginViaOtpSchema } from "../../schemaValidation/loginViaOtpValidation";
import { useFormik } from "formik";
import { useForgetPasswordMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import asyncLocalStorage from "../../utils/asyncLocalStorage";

const initialValues = {
  emailOrPhone: "",
};

const ForgetPassword = ({ handleClose, stepBack, handleContact }) => {
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  // form handling using formik
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues,
      validationSchema: LoginViaOtpSchema,
      onSubmit: async (value) => {
        try {
          const res = await forgetPassword({
            contactOrEmail: value.emailOrPhone,
          }).unwrap();

          if (res.status !== "success") {
            toast.error("Something went rong. try latter!");
          }
          if (res.status === "success") {
            handleContact({
              contactOrEmail: value.emailOrPhone,
            });
            //  set the contact into local storage
            await asyncLocalStorage.setItem(
              "forgetPasswordContact",
              JSON.stringify({
                contactOrEmail: value.emailOrPhone,
              })
            );
            toast.success(res.message);
            stepBack("forgetPassOtpVerify");
          }
        } catch (err) {
          toast.error(err.message);
        }
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <header className="modal-head d-flex justify-content-between">
        <span className="modal-close" onClick={() => stepBack("loginForm")}>
          Back
        </span>
        <span className="modal-close" onClick={handleClose}>
          Close
        </span>
      </header>

      <FormTitle style={style} text={"Forget Password"} />
      <main className="profile-field">
        {/* Login email or phone no. */}
        <div className="form-group mt-4">
          <i className="fa fa-user login-user-icon"></i>
          <input
            type="text"
            value={values.emailOrPhone}
            name="emailOrPhone"
            className={`form-control ${
              errors.emailOrPhone && touched.emailOrPhone ? "is-invalid" : ""
            }`}
            id="emailOrPhone"
            placeholder="Mobile Number"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.emailOrPhone && touched.emailOrPhone ? (
          <div class="field-eror login-field-error">{errors.emailOrPhone}</div>
        ) : null}
      </main>
      <footer className=" profile-field">
        <button
          style={btnStyle}
          className={`btn btn-form mb-2 ${isLoading && "disabled"}`}
          type="submit"
        >
          {isLoading ? "...loading" : "Send OTP"}
        </button>
      </footer>
    </form>
  );
};

const btnStyle = {
  width: "100%",
  color: "#ffc300",
  padding: "11px 20px",
  margin: "16px auto auto",
  display: "block",
  fontSize: "15px",
  borderRadius: "14px",
  fontFamily: "'Belanosima', sans-serif",
};

const style = {
  marginTop: "117px",
  marginBottom: "12px",
};

export default ForgetPassword;
