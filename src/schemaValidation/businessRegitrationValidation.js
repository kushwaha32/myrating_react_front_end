import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const EMAIL_REGX = `^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/`;


  export const businessRegistrationSchema = Yup.object({
  fullName: Yup.string().required("Please Provide your Full Business Name"),
  registeredAs: Yup.string().required("Please select Registered As Option"),
  industry: Yup.string().required("Please select the Industry"),
  googleLocation: Yup.string().required("Please provide your Google location"),
  mobileNo: Yup.string()
    .matches(phoneRegExp, "Please provide a valid contact number")
    .required("Please provide your contact number"),
  emailAddress:Yup.string().email("Please provide valid email address")
  .required("Please provide email address"),
  terms_and_cond: Yup.bool().oneOf([true], "Before continue Accept Terms and Condition"),
  privacy_and_policy: Yup.bool().oneOf([true], "Before continue Accept Privacy Policy"),
});

//   password: Yup.string()
// .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, {
//   message: "Please create a stronger password",
// })
// .required("Please create a password"),
// confirm_password: Yup.string().oneOf(
// [Yup.ref("password"), null],
// "Passwords must match"
// ),