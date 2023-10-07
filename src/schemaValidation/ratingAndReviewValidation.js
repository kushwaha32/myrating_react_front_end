import * as Yup from "yup";

export const ratingAndReviewSchema = Yup.object({
  rating: Yup.number().required("Rating is required"),
  review: Yup.string().optional(),
  reviewImg: Yup.array()
    .max(5, "You can select maximum 5 attachment")
    .test("FILE_TYPES", "Only jpg, jpeg, png, files are allowed", (value) =>
      value.every(
        (file) =>
          typeof file === "string" ||
          ["image/png", "image/jpeg", "image/jpg", "image/svg"].includes(
            file.type
          )
      )
    ),
});
