import * as Yup from "yup";

export const createProductSchema = Yup.object({
  profileName: Yup.string().required("Please Provide your Profile Name"),
  profileCategory: Yup.string().required("Please select your Profile Category"),
  googleLocation: Yup.string().required("Please provide your location"),
  // bio: Yup.string().required("Please provide the product bio"),
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

export const productInformationSchema = Yup.object({
  productName: Yup.string().required("Product Name is required"),
  productCategory: Yup.string().required("Product Category is required"),
});
