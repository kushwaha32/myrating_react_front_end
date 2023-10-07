import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const profileInfoSchema = Yup.object({
  name: Yup.string().required("Please Provide your Full Name"),
  dob: Yup.string().required("please provide your Date Of Birth"),
  city: Yup.string().required("Please provide your city"),
  state: Yup.string().required("Please provide your state"),
  country: Yup.string().required("Please provide your country"),
  contact: Yup.string()
    .matches(phoneRegExp, "Please provide a valid contact number")
    .required("Please provide your contact number"),
  email: Yup.string()
    .email("Please provide valid email address")
    .required("Please provide email address"),
  gender: Yup.string().required("Please provide your Google location"),
  terms_and_cond: Yup.bool().oneOf(
    [true],
    "Before continue Accept Terms and Condition"
  ),
  privacy_and_policy: Yup.bool().oneOf(
    [true],
    "Before continue Accept Privacy Policy"
  ),
});
