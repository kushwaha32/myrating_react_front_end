import * as Yup from "yup";

export const userProfileValidationSchema = Yup.object({
  name: Yup.string().required("Please Provide your Profile Name"),
  proffession: Yup.string().required("Please select your Profile Category"),
  googleLocation: Yup.string().required("Please provide your location"),
  dob: Yup.string().required("Please provide you date of birth"),
  image: Yup.mixed()
    .required("Please select the profile image")
    // .test("FILE_SIZE", "Too big!", (value) => value && value > 1024 * 1024)
    .test(
      "FILE_TYPE",
      "only jpg and png is allowed",
      (value) =>
        value &&
        ["image/png", "image/jpeg", "image/jpg", "image/svg"].includes(
          value.type
        )
    ),
});


