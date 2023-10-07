import { useFormik } from "formik";
import ButtonForm from "../buttonForm";
import mobleVarify from "../../img/mobile-phone.png";
import { useSignupOtpMutation } from "../../slices/usersApiSlice";
import { contactNumerValidation } from "../../schemaValidation/contactNumberValidation";
import { toast } from "react-toastify";

const initialValues = {
  contactNo: "",
};

const Contact = ({ handleClose, handleCase, handleContact }) => {
  const [signUpOtp, { isLoading }] = useSignupOtpMutation();

  // form handling using formik
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues,
      validationSchema: contactNumerValidation,
      onSubmit: async (value) => {
        handleContact(value.contactNo);
        try {
          const res = await signUpOtp({
            contactNumber: value.contactNo,
          }).unwrap();
          console.log(res);
          // handling the error is if any error hapening
          if (
            `${res?.error?.status}`.startsWith("4") ||
            `${res?.error?.status}`.startsWith("5")
          ) {
            toast.error(res.error.message);
          }
          // if otp successfully send
          if (res?.status === "success") {
            toast.success(res.message);
            handleCase("otpVerify");
          }
        } catch (err) {
          toast.error(err.message);
        }
      },
    });

  return (
    <>
      <span className="modal-close" onClick={handleClose}>
        Close
      </span>
      <h4 className="modal-title">
        Please Continue with your Mobile No.
        <span className="d-block modal-text-secondary">
          We'll never share it to anyone
        </span>
      </h4>
      <div className="modal-icon">
        <img src={mobleVarify} alt="" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group con-mobile d-flex">
          <span>+91</span>
          <input
            type="text"
            value={values.contactNo}
            className={`form-control ${
              errors.contactNo && touched.contactNo ? "is-invalid" : ""
            }`}
            name="contactNo"
            placeholder="please enter mobile no"
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>

        {errors.contactNo && touched.contactNo ? (
          <div className="field-eror">{errors.contactNo}</div>
        ) : null}

        <button
          className={`btn btn-form mb-2 ${isLoading && "disabled"}`}
          type="submit"
        >
          {isLoading ? "...loading" : "Continue"}
        </button>
      </form>
      {/* <span className="d-block skip-btn">skip now</span> */}
    </>
  );
};

export default Contact;
