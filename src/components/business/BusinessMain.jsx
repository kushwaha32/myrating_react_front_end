import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import taj from "../../img/taj.jpg";
import dots from "../../img/dots.png";
import manImg from "../../img/business-profile.png"
import ShadowLayout from "../ShadowLayout";
import ImgWithSideCaption from "../ImgWithSideCaption";
import UserAndProductNavigationBtn from "../UserAndProductNavigationBtn";
import "../../assets/css/user.css";



const BusinessMain = (props) => {
  // get userInfo
  const { userInfo } = useSelector(state => state.auth);
  // const [userSlug, setUserSlug] = useState(userInfo?.user._id);
  const [slugUrl, setSlugUrl] = useState("/");
  // const slugUrl = `/business/${userSlug}/about`;

  useEffect(() => {
      if(userInfo){
        setSlugUrl(`/business/${userInfo?.user._id}/about`)
      }else{
        setSlugUrl(`/`)
      }
  }, [userInfo]);


  return (
    <>
      <section className="product-d-menu text-capitalize user-menu business">
      <ShadowLayout>
          <img className="dots" src={dots} alt="dots" />
          <ImgWithSideCaption img={userInfo?.user?.brandProfile?.brandImage || manImg} title={userInfo?.user?.brandProfile?.brandName}>
            <span className="user-menu-a text-capitalize">{userInfo?.user?.brandProfile?.registeredAs?.name}</span>
          </ImgWithSideCaption>
        </ShadowLayout>


        {/* user  */}
        <UserAndProductNavigationBtn
          slugUrlO={slugUrl}
          slugUrlT={`${slugUrl}/`}
          title="Personal Information"
        />
        <UserAndProductNavigationBtn
          slugUrlO={`${slugUrl}/contact-information`}
          slugUrlT={`${slugUrl}/contact-information/`}
          title="Contact Information"
        />

       
      </section>
      <section className="product-d-detail">
        <Outlet />
      </section>
    </>
  );
};

export default BusinessMain;
