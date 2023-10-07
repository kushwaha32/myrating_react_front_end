// third party module imports
import { Outlet, useLocation } from "react-router-dom";
// user module imports
import "../../assets/css/productMain.css";
import InnerHeader from "../InnerHeader";
import { IsTabletOrLess } from "../../utils/mediaScreens";
import { useState } from "react";
import Header from "../header";
import UserSideNavBelow767 from "../header/UserSideNavBelow767.98";

const ProductOrUserDetailsBelow767 = () => {
  // user side nav disp condition
  const [userSideNav, setUserSideNav] = useState(false);

  const handleUserSideNav = () => {
    setUserSideNav(!userSideNav);
  };

  const locationArr = useLocation().pathname.split("/");

  const checkUrl = (urlPart) => {
    return locationArr.some((el) => el === urlPart);
  };
  return (
    <>
      {IsTabletOrLess() ? (
        <>
          <Header handleUserSideNav={handleUserSideNav} />
          <UserSideNavBelow767
            handleUserSideNav={handleUserSideNav}
            userSideNav={userSideNav}
          />
        </>
      ) : (
        <InnerHeader />
      )}

      <main
        style={{
          background:
            "transparent linear-gradient(180deg, #dbedff 0%, #ffffff 100%)",
          marginBottom: "13px",
        }}
      >
        <Outlet />
      </main>
    </>
  );
};

export default ProductOrUserDetailsBelow767;
