import * as Yup from "yup";

export const updatePasswordSchema = Yup.object({
  passwordCurrent: Yup.string().required("Please type your old password"),
  password: Yup.string()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
      message: "Please create a stronger password",
    })
    .required("Please type password"),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
