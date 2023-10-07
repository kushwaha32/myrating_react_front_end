import * as Yup from "yup";

export const contactInfoValidationSchema = Yup.object().shape({
  landLineNo: Yup.array().of(
    Yup.string().required("Landline number is required")
  ),
  landLinePublic: Yup.array().of(
    Yup.boolean().required("Public/Private is required")
  ),
  landlineCode: Yup.array().of(
    Yup.string().required("Landline code is required")
  ),
});
