import { useState } from "react";
import { IsTabletOrLess } from "../../utils/mediaScreens";
import Header from "../header";
import UserSideNavBelow767 from "./UserSideNavBelow767.98";
import LiveGeoLocation from "../LiveGeoLocation";

const HeaderCommon = () => {
  // user side nav disp condition
  const [userSideNav, setUserSideNav] = useState(false);

  const handleUserSideNav = () => {
    setUserSideNav(!userSideNav);
  };
  return (
    <>
      <LiveGeoLocation />
      <Header handleUserSideNav={handleUserSideNav} />
      {/* user side nav below 767.98px */}
      {IsTabletOrLess() && (
        <UserSideNavBelow767
          handleUserSideNav={handleUserSideNav}
          userSideNav={userSideNav}
        />
      )}
    </>
  );
};

export default HeaderCommon;
