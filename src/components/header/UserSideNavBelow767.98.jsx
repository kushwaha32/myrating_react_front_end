// third party module imports
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// user module imports
import "../../assets/css/productMain.css";
import userImg from "../../img/profile.png";
import userp from "../../img/user-p.png";
import fav from "../../img/favourite.png";
import wallet from "../../img/wallet.png";
import qrcode from "../../img/qr-code-scan.png";
import gear from "../../img/gear.png";
import gearWhite from "../../img/gear-white.png";
import SidenavLink from "../SidenavLink";
import ratingIcon from "../../img/rating.png"

const UserSideNavBelow767 = ({ userSideNav, handleUserSideNav }) => {
  const locationArr = useLocation().pathname.split("/");
  const { userInfo } = useSelector((state) => state.auth);
  const checkUrl = (urlPart) => {
    return locationArr.some((el) => el === urlPart);
  };
  return (
    <>
      <div
        className={`shadow-user-side-nav-sm ${
          userSideNav && "shadow-user-side-nav-sm-active"
        }`}
        onClick={handleUserSideNav}
      ></div>
      <section
        className={`product-d-umenu user-side-nav-sm ${
          userSideNav && "user-side-nav-sm-active"
        }`}
      >
        {userInfo?.user?.role === "user" ? (
          <>
            <img className="product-d-uimg" src={userImg} alt="" />
            <SidenavLink
              icon={userp}
              text="about"
              url="/user/34/about"
              active={checkUrl("about")}
              handleUserSideNav={handleUserSideNav}
            />
            <SidenavLink
              icon={fav}
              text="favourites"
              url="/user/34/favorites"
              active={checkUrl("favorites")}
              handleUserSideNav={handleUserSideNav}
            />
            <SidenavLink
              icon={wallet}
              text="wallet"
              url="/user/34/wallet"
              active={checkUrl("wallet")}
              handleUserSideNav={handleUserSideNav}
            />
            <SidenavLink
              icon={qrcode}
              text="QR Code"
              url="/user/34/qrcode"
              active={checkUrl("qrcode")}
              handleUserSideNav={handleUserSideNav}
            />
            <SidenavLink
              icon={checkUrl("setting") ? gearWhite : gear}
              text="Settings"
              url="/user/34/setting"
              active={checkUrl("setting")}
              handleUserSideNav={handleUserSideNav}
            />
          </>
        ) : userInfo?.user?.role === "business" ? (
          <>
            <img className="product-d-uimg" src={userImg} alt="" />
            <SidenavLink
              icon={ratingIcon}
              text="ratings"
              url="/business/34/ratings"
              active={checkUrl("ratings")}
              handleUserSideNav={handleUserSideNav}
            />
            <SidenavLink
              icon={userp}
              text="about"
              url="/business/34/about"
              active={checkUrl("about")}
              handleUserSideNav={handleUserSideNav}
            />
            <SidenavLink
              icon={fav}
              text="favourites"
              url="/business/34/favorites"
              active={checkUrl("favorites")}
              handleUserSideNav={handleUserSideNav}
            />
            
            <SidenavLink
              icon={qrcode}
              text="QR Code"
              url="/business/34/qrcode"
              active={checkUrl("qrcode")}
              handleUserSideNav={handleUserSideNav}
            />
            <SidenavLink
              icon={checkUrl("setting") ? gearWhite : gear}
              text="Settings"
              url="/business/34/setting"
              active={checkUrl("setting")}
              handleUserSideNav={handleUserSideNav}
            />
          </>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default UserSideNavBelow767;
