import * as Yup from "yup";

const supportedFormats = ["image/jpeg", "image/png"]; // Allowed image formats
const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes

const profileImageValidationSchema = Yup.object().shape({
  image: Yup.mixed()
    .required("Please select an image to upload")
    .test("fileType", "Only jpg, jpeg, png format are allowed", (value) => {
      if (!value) return true; // If no file is selected, validation passes

      return supportedFormats.includes(value.type);
    })
    .test("fileSize", "File size must be less than 10MB", (value) => {
      if (!value) return true; // If no file is selected, validation passes

      return value.size <= maxFileSize;
    }),
});

export default profileImageValidationSchema;
