import * as Yup from "yup";

const productProfileKeywordValidationSchema = Yup.object().shape({
  keywords: Yup.string()
    .max(200, "Keyword must not exceed 200 characters")
    .required("Please provide the keywords"),
});

export default productProfileKeywordValidationSchema;
