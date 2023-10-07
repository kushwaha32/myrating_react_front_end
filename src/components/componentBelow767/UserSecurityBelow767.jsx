import Accordion from "react-bootstrap/Accordion";
import { useState } from "react";
import UserSettingAccountContainer from "../UserSettingAccoutContainer";
import BreadCrum767 from "./BreadCrum767";
import UserResourceCommonContainer from "../UserResourceCommonContainer";
import { Link } from "react-router-dom";
import UserSecurity from "../UserSecurity";

const UserSecurityBelow767 = () => {
  const [userSlug, setUserSlug] = useState(34);
  const slugUrl = `/user/${userSlug}/setting`;
  const [inputCurrPassType, setInputCurrPassType] = useState(true);
  const [inputNewPassType, setInputNewPassType] = useState(true);
  const [inputConfirmPassType, setInputConfirmPassType] = useState(true);

  return (
    <div className="user-security ac-deactivation-sm user-se-sm767">
      <BreadCrum767 slugUrl={`${slugUrl}`} url="My Security" />
      <UserSecurity />
    </div>
  );
};

const style = {
  width: "160px",
  padding: "9px 0",
};

export default UserSecurityBelow767;
//  <section className="user-main-sm767 user-main-sm767-b user-favourite-sm">
//           <Accordion defaultActiveKey="loginDetails">
//             <Accordion.Item eventKey="loginDetails">
//               <Accordion.Header>My Login Details</Accordion.Header>
//               <Accordion.Body>
//                 <div className="user-about-aba-left">
//                   <label className="field">
//                   Mobile No.
//                   </label>
//                   <p className="field-val">+91 6xxxxxxxxxx9</p>
//                 </div>
//                 <div className="user-about-aba-left mb-3">
//                   <label className="field">
//                   E-Mail Address
//                   </label>
//                   <p className="field-val">anxxxxxxxx@gmail.com</p>
//                 </div>
//               </Accordion.Body>
//             </Accordion.Item>

//             <Accordion.Item eventKey="password">
//               <Accordion.Header>My Password</Accordion.Header>
//               <Accordion.Body>

//               <div className="form-group user-about-aba-left">
//               <label for="name" className="field">
//                 Change your password
//               </label>

//               {/* current password field */}
//               <div className="input-holder sm-midifypass">
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
//               <div className="input-holder sm-midifypass mt-2">
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
//               <div className="input-holder sm-midifypass my-3">
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

//               </Accordion.Body>
//             </Accordion.Item>
//           </Accordion>
//         </section>
