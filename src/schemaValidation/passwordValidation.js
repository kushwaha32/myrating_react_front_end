import * as Yup from "yup";

export const passwordSchema = Yup.object({
  password: Yup.string()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, {
      message: "Please create a stronger password",
    })
    .required("Please type password"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
