import * as Yup from "yup";



const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const contactNumerValidation = Yup.object({
  contactNo: Yup.string()
    .matches(phoneRegExp, "Please provide a valid contact number")
    .required("Please provide your contact number"),

});