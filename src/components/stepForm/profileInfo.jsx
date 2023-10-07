import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import user from "../../img/user.png";
import FormTitle from "./formTitle";
import location from "../../img/location.png";
import ButtonForm from "../buttonForm";
import { profileInfoSchema } from "../../schemaValidation/profileInfoValidation";
import { useGetUserProffessionQuery } from "../../slices/userProffessionApiSlice";
import { useCreateUserProfileMutation } from "../../slices/usersApiSlice";
import { updateCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import GoogleAutoComplete from "../googleLocationAutoComplete";

const initialValues = {
  name: "",
  proffession: "",
  dob: "",
  googleLocation: "",
  gender: "",
  terms_and_cond: false,
  privacy_and_policy: false,
};

const ProfileInfo = ({ handleClose, handleCase }) => {
  const dispatch = useDispatch();
 
  // geting the user proffession category
  const {
    data: proffessionCat,
    isLoading,
    isError,
  } = useGetUserProffessionQuery();
  const proffessionData = proffessionCat?.data?.data;
  const { userInfo } = useSelector((state) => state.auth);
  // getting the create user mutation
  const [createUserProfile, { isLoading: profileLoading }] =
    useCreateUserProfileMutation();

  // form handling using formik
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: profileInfoSchema,
    onSubmit: async (value) => {
      try {
        const res = await createUserProfile({
          name: value.name,
          proffession: value.proffession,
          dob: value.dob,
          location: value.googleLocation,
          gender: value.gender,
        }).unwrap();

        if (res.status === "successs") {
          dispatch(
            updateCredentials({
              token: userInfo.token,
              user: { ...res.data.user },
            })
          );
          handleCase("createPassword");
          toast.success("Profile created successfully!");
        } else {
          toast.error("Something went wrong. Please try latter!");
        }
      } catch (error) {
        toast.error(errors.message);
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
      <div className="varified-badge d-flex align-items-center justify-content-between">
        <div className="varified-badge-contact d-flex align-items-center">
          <img src={user} alt="" />
          <span>+91 {userInfo?.user?.contactNumber}</span>
        </div>
        <h6 className="varified-badge-text">Verified</h6>
      </div>
      <FormTitle text="Create Profile" />
      <form onSubmit={handleSubmit}>
        <div className="profile-field">
          {/* user name */}
          <div className="form-group">
            <label htmlFor="name" className="profile-field-label">
              Name <span>*</span>
            </label>
            <input
              type="text"
              value={values.name}
              name="name"
              className={`form-control ${
                errors.name && touched.name ? "is-invalid" : ""
              }`}
              id="name"
              placeholder="Full Name"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name ? (
              <div className="field-eror">{errors.name}</div>
            ) : null}
          </div>
          {/* profession dropdown */}
          <div className="form-group mt-2">
            <label htmlFor="name" className="profile-field-label">
              Choose your proffession <span>*</span>
            </label>
            <select
              aria-label="Default select example"
              name="proffession"
              className={`form-select select-profession ${
                errors.proffession && touched.proffession ? "is-invalid" : ""
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Open this select menu</option>
              {isLoading ? (
                <option>...Loading</option>
              ) : isError ? (
                "Error"
              ) : (
                <>
                  {proffessionData?.map((el) => (
                    <option value={el._id} key={`${el._id}-${el.proffession}`}>
                      {el.proffession}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
          {errors.proffession && touched.proffession ? (
            <div className="field-eror">{errors.proffession}</div>
          ) : null}
          {/* date of birth */}
          <div className="form-group mt-2">
            <label htmlFor="name" className="profile-field-label">
              Date of Birth <span>*</span>
            </label>
            <input
              type="date"
              className={`form-control ${
                errors.dob && touched.dob ? "is-invalid" : ""
              }`}
              value={values.dob}
              name="dob"
              id="name"
              placeholder="Full Name"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.dob && touched.dob ? (
              <div className="field-eror">{errors.dob}</div>
            ) : null}
          </div>
          {/* user location or city */}
          {/* Business current location */}
          <GoogleAutoComplete
            handleLocationSelect={handleLocationSelect}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
          />
          {/* check box for gender */}
          <div className="d-flex justify-content-between mt-3">
            {/* male radio button */}
            <div className="form-radio-user">
              <input
                className="form-radio-input"
                type="radio"
                name="gender"
                value="male"
                id="male"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label className="form-radio-label" htmlFor="male">
                Male
              </label>
            </div>
            {/* female radio button */}
            <div className="form-radio-user">
              <input
                className="form-radio-input"
                type="radio"
                name="gender"
                value="female"
                id="female"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label className="form-radio-label" htmlFor="female">
                Female
              </label>
            </div>
            {/* other radio button */}
            <div className="form-radio-user">
              <input
                className="form-radio-input"
                type="radio"
                name="gender"
                value="other"
                onChange={handleChange}
                id="other"
                onBlur={handleBlur}
              />
              <label className="form-radio-label" htmlFor="other">
                Other
              </label>
            </div>
          </div>
          {errors.gender && touched.gender ? (
            <div className="field-eror">{errors.gender}</div>
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
          <div className="button-con text-center">
            <button
              className={`btn btn-form mb-2 ${profileLoading && "disabled"}`}
              type="submit"
            >
              {profileLoading ? "...loading" : "Continue"}
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

export default ProfileInfo;
