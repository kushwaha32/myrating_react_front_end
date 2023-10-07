import * as Yup from "yup";

const supportedFormats = ["image/jpeg", "image/png", "application/pdf"]; // Allowed image formats
const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes

const businessCompanyCategorySchema = Yup.object().shape({
  businessCategory: Yup.string().required(
    "Please select Which Industry does your business/company belong."
  ),
});

export default businessCompanyCategorySchema;
