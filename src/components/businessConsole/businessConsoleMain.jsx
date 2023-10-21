import { Link, Outlet, useLocation } from "react-router-dom";
import HeaderCommon from "../header/HeaderCommon";
import "./businessConsoleMain.css";
import dashImg from "../../img/akbar-tomb.jpg";
import user from "../../img/user-copy.png";
import listedProfileImg from "../../img/rating.png";
import heart from "../../img/heartUncolored.jpeg";
import qrCode from "../../img/qr-code-scan.png";
import feedbackImg from "../../img/feedback-bd.jpeg";
import sub from "../../img/subscribe.png";
import SideBarNav from "./sidebarNav";
import { useGetBrandProfileMutation } from "../../slices/brandProfileApiSlice";
import { useEffect, useState } from "react";

const BusinessConsoleMain = () => {
  const location = useLocation()?.pathname?.split("/");
  const [brandPro, setBrandPro] = useState();

  ////////////////////////////////////////////////////////
  ///////////--- get Current brand mutation ---//////////
  //////////////////////////////////////////////////////
  const [getBrand] = useGetBrandProfileMutation();
  const getCurrentBrand = async () => {
    try {
      const res = await getBrand({ userId: location[2] }).unwrap();

      if (res.status === "succcess") {
        setBrandPro(res?.data?.brandProfile);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCurrentBrand();
  }, []);
  return (
    <>
      <HeaderCommon />
      <main className="busines-console-main">
        {/* ////////////////////////////////////////////////// */}
        {/* //////////////------ Side Bar -----/////////////// */}
        {/* ////////////////////////////////////////////////// */}
        <aside className="business-console-sidebar position-relative">
          {/* ////////////////////////////////////////////////// */}
          {/* //////////////------ Brand Profile -----////////// */}
          {/* ////////////////////////////////////////////////// */}
          <Link
            to={`/business/${location?.[2]}`}
            className={`business-console-sidebar-a ${
              !location[3] ? "business-console-sidebar-active" : ""
            }`}
          >
            <span>
              <img src={dashImg} className="console-profile-img" alt="img1" />
            </span>
            <p>{brandPro?.brandName}</p>
          </Link>

          {/* /////////////////////////////////////////////////////// */}
          {/* ////////////////----- Update Profile -----///////////// */}
          {/* /////////////////////////////////////////////////////// */}
          <SideBarNav
            cusSty={marSty}
            title="Update Profile"
            image={user}
            urlNav=""
          />

          {/* /////////////////////////////////////////////////////// */}
          {/* ////////////////----- Listed Profiles -----///////////// */}
          {/* /////////////////////////////////////////////////////// */}
          <SideBarNav
            title="Listed Profiles"
            image={listedProfileImg}
            spImgSty={spImgSty}
            urlNav="listed-profile"
          />

          {/* /////////////////////////////////////////////////////// */}
          {/* //////////////////----- Favourites -----/////////////// */}
          {/* /////////////////////////////////////////////////////// */}
          <SideBarNav
            title="Favourites"
            image={heart}
            spImgSty={favSty}
            urlNav=""
          />

          {/* /////////////////////////////////////////////////////// */}
          {/* //////////////////----- QR Code -----/////////////// */}
          {/* /////////////////////////////////////////////////////// */}
          <SideBarNav
            title="QR Code"
            image={qrCode}
            spImgSty={qrImgSty}
            urlNav=""
          />

          {/* /////////////////////////////////////////////////////// */}
          {/* //////////////////----- Feedbacks -----/////////////// */}
          {/* /////////////////////////////////////////////////////// */}
          <SideBarNav
            title="Feedbacks"
            image={feedbackImg}
            spImgSty={qrImgSty}
            urlNav=""
          />

          {/* /////////////////////////////////////////////////////// */}
          {/* //////////////////----- Notifications -----/////////////// */}
          {/* /////////////////////////////////////////////////////// */}
          <SideBarNav title="Notifications" image={user} urlNav="" />

          {/* /////////////////////////////////////////////////////// */}
          {/* /////////----- Achievements & Rewards -----//////////// */}
          {/* /////////////////////////////////////////////////////// */}
          <SideBarNav title="Achievements & Rewards" image={user} urlNav="" />

          {/* /////////////////////////////////////////////////////// */}
          {/* ///////////////----- Subscriptions -----/////////////// */}
          {/* /////////////////////////////////////////////////////// */}
          <SideBarNav
            title="Subscriptions"
            image={sub}
            spImgSty={subImgSty}
            urlNav=""
          />

          {/* /////////////////////////////////////////////////////// */}
          {/* /////////////////------- Settings -----//////////////// */}
          {/* /////////////////////////////////////////////////////// */}
          <SideBarNav title="Settings" image={user} urlNav="" />

          {/* /////////////////////////////////////////////////////// */}
          {/* //////////////----- Profile Progress -----///////////// */}
          {/* /////////////////////////////////////////////////////// */}
          <div className="profile-progress-completion">
            <ul className="d-flex align-items-center">
              <li>Profile Completion</li>
              <li className="ms-4" style={{ color: "#FF2741" }}>
                50%
              </li>
            </ul>
            {/* /////////////////////////////////////////////////////////// */}
            {/* //////////////----- Profile Progress bar -----///////////// */}
            {/* /////////////////////////////////////////////////////////// */}
            <div className="progress mt-2">
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuenow={40}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ width: "50%" }}
              ></div>
            </div>
          </div>
        </aside>

        <Outlet />
      </main>
    </>
  );
};
const marSty = {
  marginTop: "18px",
};
const spImgSty = {
  padding: "5px 6px 3px 6px",
};
const favSty = {
  background: "rgb(224, 78, 95)",
  padding: "7px 7px 3px",
};
const qrImgSty = {
  padding: "5px 5px 3px",
};
const subImgSty = {
  padding: "5px 7px 6px",
};
export default BusinessConsoleMain;
