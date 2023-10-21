import * as Yup from "yup";

const productLocationValidationSchema = Yup.object().shape({
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  pinCode: Yup.string()
    .matches(/^\d{6}$/, "Pincode must be a 6-digit number")
    .required("Pincode is required"),
});

export default productLocationValidationSchema;
