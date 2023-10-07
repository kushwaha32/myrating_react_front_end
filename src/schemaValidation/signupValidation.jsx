
import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const signUpSchema = Yup.object({
  name: Yup.string().required("Please Provide your name"),
  contactNo: Yup.string()
    .matches(phoneRegExp, "Please provide a valid contact number")
    .required("Please provide your contact number"),
  proffession: Yup.string().required("Please select your proffession"),
  dob: Yup.string().required("Please provide your date of birth"),
  location: Yup.string().required("Please provide your location"),
  gender: Yup.string().required("Please select your gender"),
  password: Yup.string()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, {
      message: "Please create a stronger password",
    })
    .required("Please create a password"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  terms_and_cond: Yup.bool().oneOf([true], "Before continue Accept Terms and Condition"),
  privacy_and_policy: Yup.bool().oneOf([true], "Before continue Accept Privacy Policy"),
});
