import * as Yup from "yup";

const supportedFormats = ["image/jpeg", "image/png", "application/pdf"]; // Allowed image formats
const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes

const documentIdValidationSchema = Yup.object().shape({
  idDocument: Yup.mixed()
    .required("Please select an document id to upload")
    .test(
      "fileType",
      "Only jpg, jpeg, png, pdf format are allowed",
      (value) => {
        if (!value) return true; // If no file is selected, validation passes

        return supportedFormats.includes(value.type);
      }
    )
    .test("fileSize", "File size must be less than 10MB", (value) => {
      if (!value) return true; // If no file is selected, validation passes

      return value.size <= maxFileSize;
    }),
  documentType: Yup.string().required("Please select document type."),
});

export default documentIdValidationSchema;
