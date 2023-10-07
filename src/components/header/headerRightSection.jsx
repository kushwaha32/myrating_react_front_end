import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderAuthLinks from "./headerAuthLinks";
import userProfile from "../../img/user-profile.png";
import UserProfileOverview from "./userProfileOverview";
import UserHeadWithoutProfile from "./userHeadWithoutProfile";
import UserMainWithoutProfile from "./mainWithoutProfile";
import UserFooterWithoutProfile from "./userFooterWithoutProfile";
import UserHeadWithProfile from "./userHeadWithProfile";
import UserMainWithProfile from "./userMainWithProfile";
import UserFooterWithProfile from "./userFooterWithProfile";
import "./headerRightSection.css";
import BrandHeadWithProfile from "./BrandheadWithProfile";

const HeaderRightSection = ({
  userRegistrationModelShow,
  loginModelShow,
  toggle,
}) => {
  const [isAuth, setIsAuth] = useState(false);
  const { userInfo } = useSelector((state) => state?.auth);
  const location = useLocation().pathname.split("/")[1];

  useEffect(() => {
    if (userInfo) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [userInfo]);

  return (
    <div className="header-right-main">
      {/* user side nav on screen size < 767.98px  */}

      {/* user side nav on screen size > 767.98px  */}
      {!isAuth ? (
        <HeaderAuthLinks toggle={toggle} loginModelShow={loginModelShow} />
      ) : (
        <div className="user-profile-drop" style={userProfileStyle}>
          <section className="header-right">
            <ul
              className={`d-flex align-items-center justify-content-between sm-auth ${
                toggle ? "height-none" : ""
              }`}
            >
              <li className="m-common">
                <Link
                  to="/list-your-business"
                  className="transparent-btn btn-business lettersp-helf"
                >
                  List your business (free)
                </Link>
              </li>
              <li className="devider-flat">|</li>
              <li className="m-common">
                <svg
                  id="Group_921"
                  data-name="Group 921"
                  xmlns="http://www.w3.org/2000/svg"
                  width="19.855"
                  height="30.193"
                  viewBox="0 0 37.855 41.193"
                  className="bel-svg"
                >
                  <path
                    id="Icon_ionic-md-notifications"
                    data-name="Icon ionic-md-notifications"
                    d="M23.053,44.568a4.122,4.122,0,0,0,4.1-4.119h-8.2A4.122,4.122,0,0,0,23.053,44.568ZM36.38,32.21V20.882A13.35,13.35,0,0,0,26.128,7.906V6.464a3.076,3.076,0,1,0-6.151,0V7.906A13.35,13.35,0,0,0,9.726,20.882V32.21l-4.1,4.119v2.06H40.481v-2.06Z"
                    transform="translate(-5.625 -3.375)"
                    fill="#ffc300"
                  />
                  <g
                    id="Ellipse_327"
                    data-name="Ellipse 327"
                    transform="translate(17.855 5.098)"
                    fill="#00c30e"
                    stroke="#001840"
                    stroke-width="2"
                  ></g>
                </svg>
              </li>
            </ul>
          </section>

          {/* user location and search end */}
          {userInfo?.user?.role === "user" ? (
            <>
              {userInfo?.user?.userProfile ? (
                <UserProfileOverview
                  ProfileHead={UserHeadWithProfile}
                  ProfileMiddle={UserMainWithProfile}
                  ProfileFooter={UserFooterWithProfile}
                  userProfile={userProfile}
                  style={style}
                />
              ) : (
                <UserProfileOverview
                  ProfileHead={UserHeadWithoutProfile}
                  ProfileMiddle={UserMainWithoutProfile}
                  ProfileFooter={UserFooterWithoutProfile}
                  userProfile={userProfile}
                  userRegistrationModelShow={
                    userRegistrationModelShow ? userRegistrationModelShow : ""
                  }
                />
              )}
            </>
          ) : userInfo?.user?.role === "business" ? (
            <UserProfileOverview
              ProfileHead={BrandHeadWithProfile}
              ProfileMiddle={UserMainWithProfile}
              ProfileFooter={UserFooterWithProfile}
              userProfile={userProfile}
              style={style}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

const style = {
  marginTop: "6px",
  borderBottom: "none",
  padding: "0px",
  marginBottom: "41px",
  paddingTop: "30px",
  marginLeft: "12p",
};
const userProfileStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
export default HeaderRightSection;
