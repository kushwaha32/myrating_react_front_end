import * as Yup from "yup";

export const userProfileUpdateValidationSchema = Yup.object({
  name: Yup.string().required("Please Provide your Profile Name"),
  proffession: Yup.string().required("Please select your Profile Category"),
  // location: Yup.string().required("Please provide your location"),
  dateOfBirth: Yup.string().required("Please provide you date of birth"),
  image: Yup.mixed()
    .nullable() // Allows the image to be optional
    // .test("FILE_SIZE", "Too big!", (value) => value && value > 1024 * 1024)
    .test(
      "FILE_TYPE",
      "only jpg and png is allowed",
      (value) =>
        !value || // Check if the value is falsy (null or undefined) or...
        ["image/png", "image/jpeg", "image/jpg", "image/svg"].includes(
          value.type
        )
    ),
});


