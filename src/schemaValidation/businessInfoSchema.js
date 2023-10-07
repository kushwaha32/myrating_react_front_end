import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const businessInfoSchema = Yup.object({
  companyName: Yup.string().required("Please Provide your Company Name"),
  title: Yup.string(),
  fullName: Yup.string().required("Please provide your Full Name"),

  contact: Yup.string()
    .matches(phoneRegExp, "Please provide a valid contact number")
    .required("Please provide your contact number"),
  email: Yup.string()
    .email("Please provide valid email address")
    .required("Please provide email address"),
  terms_and_cond: Yup.bool().oneOf(
    [true],
    "Before continue Accept Terms and Condition"
  ),
  privacy_and_policy: Yup.bool().oneOf(
    [true],
    "Before continue Accept Privacy Policy"
  ),
});
