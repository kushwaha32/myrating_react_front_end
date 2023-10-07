import { Outlet } from "react-router-dom";
import scoreImg from "../img/scoreStar.png";
import iImg from "../img/iImg.png";
import ShadowLayout from "./ShadowLayout";
import ImgWithSideCaption from "./ImgWithSideCaption";
import { useState } from "react";
import UserAndProductNavigationBtn from "./UserAndProductNavigationBtn";
import "../assets/css/user.css";
import { useSelector } from "react-redux";

const UserMain = (props) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [userSlug, setUserSlug] = useState(userInfo?.user._id);
  const slugUrl = `/user/${userSlug}/about`;

  return (
    <>
      <section className="product-d-menu text-capitalize user-menu">
        <ShadowLayout>
          <ImgWithSideCaption
            img={userInfo?.user?.userProfile?.userImg || "man.png"}
            title={userInfo?.user?.userProfile?.name}
          >
            <span className="user-menu-a">
              {userInfo?.user?.proffession?.proffession}
            </span>
            <span className="user-menu-a">
              {userInfo?.user?.userProfile?.location?.address}
            </span>
            <p className="user-menu-b">
              <img className="user-menu-ba" src={scoreImg} alt="" />
              <span className="user-menu-bb">
                {userInfo?.user?.peaches} <span>score</span>
              </span>
              <img className="user-menu-bc" src={iImg} alt="" />
            </p>
          </ImgWithSideCaption>
        </ShadowLayout>

        {/* user  */}
        <UserAndProductNavigationBtn
          slugUrlO={slugUrl}
          slugUrlT={`${slugUrl}/`}
          title="Personal Information"
        />

        {/* about  */}
        <UserAndProductNavigationBtn
          slugUrlO={`${slugUrl}/contact-information`}
          slugUrlT={`${slugUrl}/contact-information/`}
          title="Contact Inform"
        />
      </section>
      <section className="product-d-detail">
        <Outlet />
      </section>
    </>
  );
};

export default UserMain;
