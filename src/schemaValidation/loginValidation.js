

import * as Yup from "yup";


export const LoginSchema = Yup.object({
    emailOrMobileNo: Yup.string().required("Please provide your Email Or Mobile No."),
    password: Yup.string().required("Please provide your password")
})