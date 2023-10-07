

import * as Yup from "yup"


export const LoginViaOtpSchema = Yup.object({
    emailOrPhone: Yup.string().required("Please provide Email Id Or Mobile No.")
})