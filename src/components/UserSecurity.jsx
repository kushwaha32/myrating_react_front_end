import { useState } from "react";
import UserSettingAccountContainer from "./UserSettingAccoutContainer";
import UserResourceCommonContainer from "./UserResourceCommonContainer";
import { Link } from "react-router-dom";
import "../assets/css/userSecurity.css";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { FadeLoader, PulseLoader } from "react-spinners";
import {
  useCheckUserCreatedPassQuery,
  useCreateUserPasswordMutation,
} from "../slices/usersApiSlice";
import { passwordSchema } from "../schemaValidation/passwordValidation";
import { toast } from "react-toastify";
import CreateUserNewPassword from "./CreateUserNewPassword";
import UpdateUserOldPassword from "./UpdateUserOldPassword";

const UserSecurity = () => {
  //////////////////////////////////////////////////////////////////
  //////--- Get User Info from the state ---////////////////////////
  /////////////////////////////////////////////////////////////////
  const { userInfo } = useSelector((state) => state.auth);

  const [userSlug, setUserSlug] = useState(userInfo?.user?._id);
  const slugUrl = `/business/${userSlug}/setting`;

  //////////////////////////////////////////////////////////////////
  //////////--- Get Info User has password or not ---//////////////
  ////////////////////////////////////////////////////////////////
  const { data: checkUser, isLoading: ckeckPassLoading } =
    useCheckUserCreatedPassQuery();

  return (
    <div className="user-security">
      {ckeckPassLoading ? (
        <div className="fade-loader-position">
          <FadeLoader color="rgb(0 40 86 / 80%)" />
        </div>
      ) : (
        <>
          <UserSettingAccountContainer slugUrl={slugUrl} title="Login Details">
            {/* ///////////////////////////////////////////////////////////// */}
            {/*-----///////////////// email and mobile-----///////////////////*/}
            {/*///////////////////////////////////////////////////////////////*/}
            <div className="container">
              <div className="row justify-content-center">
                {/* ////////////////////////////////////////////////// */}
                {/*-----///////////////// email -----///////////////////*/}
                {/*////////////////////////////////////////////////////*/}
                <div className="col-lg-5 col-sm-12 mct">
                  <label className="register-label">E-mail</label>
                  <div
                    className={`form-control input-contact`}
                    placeholder="Enter Mobile Number"
                    name="contactNumber"
                  >
                    {` ${userInfo?.user?.email?.slice(0, 3)}${Array.from(
                      {
                        length:
                          userInfo?.user?.email.length -
                          3 -
                          userInfo?.user?.email.slice(
                            userInfo?.user?.email?.indexOf("@")
                          ).length,
                      },
                      () => "x"
                    ).join("")}${userInfo?.user?.email.slice(
                      userInfo?.user?.email?.indexOf("@")
                    )}`}
                  </div>
                </div>

                {/* ////////////////////////////////////////////////////////// */}
                {/*/////////////-------- 2-col gap ------------////////////////*/}
                {/* ////////////////////////////////////////////////////////// */}
                <div className="col-lg-1 col-sm-12"></div>

                {/* ////////////////////////////////////////////////////////// */}
                {/*///////////-------- Mobile number ------------//////////////*/}
                {/* ////////////////////////////////////////////////////////// */}
                <div className="col-lg-5 col-sm-12 mct">
                  <label className="register-label">Mobile No.</label>
                  <div
                    className={`form-control input-contact`}
                    placeholder="Enter Mobile Number"
                    name="contactNumber"
                  >
                    {`+91 ${userInfo?.user?.contactNumber?.slice(
                      0,
                      2
                    )}${Array.from({ length: 5 }, () => "x").join(
                      ""
                    )}${userInfo?.user?.contactNumber?.slice(
                      userInfo?.user?.contactNumber.length - 3
                    )}`}
                  </div>
                </div>
              </div>
            </div>

            <br />
            <br />
          </UserSettingAccountContainer>

          {checkUser?.hasPass ? (
            <UpdateUserOldPassword slugUrl={slugUrl} />
          ) : (
            <CreateUserNewPassword slugUrl={slugUrl} />
          )}
        </>
      )}
    </div>
  );
};

export default UserSecurity;

//  <UserResourceCommonContainer edit={false} title="My Password">
//           <div className="user-about-aba user-security-d user-about-ab ">
//             <div className="form-group user-about-aba-left">
//               <label for="name" className="field">
//                 Change your password
//               </label>

//               {/* current password field */}
//               <div className="input-holder">
//                 <input
//                   type={inputCurrPassType ? "password" : "text"}
//                   //   className={`form-control ${
//                   //     errors.password && touched.password ? "is-invalid" : ""
//                   //   }`}
//                   className="form-control mt-1"
//                   id="password"
//                   placeholder="Current Password"
//                   name="password"
//                   //   value={values.password}
//                   //   onChange={handleChange}
//                   //   onBlur={handleBlur}
//                 />
//                 <i
//                   className={`fa eye-icon ${
//                     inputCurrPassType ? "fa-eye-slash" : "fa-eye"
//                   }`}
//                   onClick={() => setInputCurrPassType(!inputCurrPassType)}
//                 ></i>
//               </div>
//               <Link to="" className="user-security-f">
//                 Forget Password
//               </Link>

//               {/* new password field */}
//               <div className="input-holder mt-2">
//                 <input
//                   type={inputNewPassType ? "password" : "text"}
//                   //   className={`form-control ${
//                   //     errors.password && touched.password ? "is-invalid" : ""
//                   //   }`}
//                   className="form-control mt-1"
//                   id="password"
//                   placeholder="New Password"
//                   name="password"
//                   //   value={values.password}
//                   //   onChange={handleChange}
//                   //   onBlur={handleBlur}
//                 />
//                 <i
//                   className={`fa eye-icon ${
//                     inputNewPassType ? "fa-eye-slash" : "fa-eye"
//                   }`}
//                   onClick={() => setInputNewPassType(!inputNewPassType)}
//                 ></i>
//               </div>

//               {/* confirm password field */}
//               <div className="input-holder mt-3">
//                 <input
//                   type={inputConfirmPassType ? "password" : "text"}
//                   //   className={`form-control ${
//                   //     errors.password && touched.password ? "is-invalid" : ""
//                   //   }`}
//                   className="form-control mt-1"
//                   id="password"
//                   placeholder="Confirm Password"
//                   name="password"
//                   //   value={values.password}
//                   //   onChange={handleChange}
//                   //   onBlur={handleBlur}
//                 />
//                 <i
//                   className={`fa eye-icon ${
//                     inputConfirmPassType ? "fa-eye-slash" : "fa-eye"
//                   }`}
//                   onClick={() => setInputConfirmPassType(!inputConfirmPassType)}
//                 ></i>
//               </div>
//             </div>
//           </div>
//         </UserResourceCommonContainer>
