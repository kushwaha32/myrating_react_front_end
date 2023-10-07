import * as Yup from "yup";

const locationInformationSchema = Yup.object().shape({
  companyName: Yup.string(),
  adminName: Yup.string(),
  building: Yup.string(),
  street: Yup.string(),
  landmark: Yup.string(),
  area: Yup.string(),
  country: Yup.string(),
  state: Yup.string(),
  city: Yup.string(),
  pinCode: Yup.string(),
});

export default locationInformationSchema;
