// third party module imports
import { Outlet, useLocation } from "react-router-dom";
// user module imports
import "../assets/css/productMain.css";
import userImg from "../img/business-profile.png";
import userp from "../img/user-p.png";
import fav from "../img/favourite.png";
import wallet from "../img/wallet.png";
import qrcode from "../img/qr-code-scan.png";
import gear from "../img/gear.png";
import gearWhite from "../img/gear-white.png";
import SidenavLink from "../components/SidenavLink";
import { ToastContainer } from "react-toastify";
import HeaderCommon from "../components/header/HeaderCommon";
import { useSelector } from "react-redux";
import ratingIcon from "../img/rating.png";

const ProductDetails = () => {
  const locationArr = useLocation().pathname.split("/");
  const { userInfo } = useSelector((state) => state.auth);
  const checkUrl = (urlPart) => {
    return locationArr.some((el) => el === urlPart);
  };
  return (
    <>
      <ToastContainer />
      <HeaderCommon />
      <main className="product-d-user-main product-d-user-bg-color">
        <div className="container product-d product-d-width">
          <section className="product-d-umenu">
            {userInfo?.user?.role === "user" ? (
              <>
                <img
                  className="product-d-uimg"
                  src={userInfo?.user?.userProfile?.userImg}
                  alt=""
                />
                <SidenavLink
                  icon={userp}
                  text="about"
                  url={`/user/${userInfo?.user?._id}/about`}
                  active={checkUrl("about")}
                />

                <SidenavLink
                  icon={fav}
                  text="favourites"
                  url={`/user/${userInfo?.user?._id}/favorites`}
                  active={checkUrl("favorites")}
                />
                <SidenavLink
                  icon={wallet}
                  text="rewards"
                  url={`/user/${userInfo?.user?._id}/rewards`}
                  active={checkUrl("rewards")}
                />
                <SidenavLink
                  icon={qrcode}
                  text="QR Code"
                  url={`/user/${userInfo?.user?._id}/qrcode`}
                  active={checkUrl("qrcode")}
                />
                <SidenavLink
                  icon={checkUrl("setting") ? gearWhite : gear}
                  text="Settings"
                  url={`/user/${userInfo?.user?._id}/setting`}
                  active={checkUrl("setting")}
                />
              </>
            ) : userInfo?.user?.role === "business" ? (
              <>
                <img
                  className="product-d-uimg"
                  src={userInfo?.user?.brandProfile?.brandImage || userImg}
                  alt=""
                />
                <SidenavLink
                  icon={ratingIcon}
                  text="ratings"
                  url={`/business/${userInfo?.user?._id}/ratings`}
                  active={checkUrl("ratings")}
                />
                <SidenavLink
                  icon={userp}
                  text="about"
                  url={`/business/${userInfo?.user?._id}/about`}
                  active={checkUrl("about")}
                />
                <SidenavLink
                  icon={qrcode}
                  text="QR Code"
                  url={`/business/${userInfo?.user?._id}/qrcode`}
                  active={checkUrl("qrcode")}
                />
                <SidenavLink
                  icon={checkUrl("setting") ? gearWhite : gear}
                  text="Settings"
                  url={`/business/${userInfo?.user?._id}/setting`}
                  active={checkUrl("setting")}
                />
              </>
            ) : (
              ""
            )}
          </section>

          <Outlet />
        </div>
      </main>
    </>
  );
};

export default ProductDetails;
