 import * as Yup from "yup";



export const updateProductSchema = Yup.object({
    profileName: Yup.string(),
    profileCategory: Yup.string(),
    // googleLocation: Yup.string(),
    // bio: Yup.string().required("Please provide the product bio"),
    image: Yup.mixed()
      // .test("FILE_SIZE", "Too big!", (value) => value && value > 1024 * 1024)
      .test(
        "FILE_TYPE",
        "only jpg and png is allowed",
        (value) => !value || (value && ["image/png", "image/jpeg", "image/jpg", "image/svg"].includes(value.type))
      ),
  });