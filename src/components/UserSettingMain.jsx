import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import UserAndProductNavigationBtn from "./UserAndProductNavigationBtn";
import "../assets/css/user.css";
import { useSelector } from "react-redux";

const UserSettingMain = (props) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [userSlug, setUserSlug] = useState(userInfo?.user?._id);
  const slugUrl = `/user/${userSlug}/setting`;

  return (
    <>
      <section className="product-d-menu text-capitalize user-favorites">
        <h3 className="user-favorites-a">Settings</h3>

        {/* My Account */}
        <UserAndProductNavigationBtn
          slugUrlO={`${slugUrl}`}
          slugUrlT={`${slugUrl}/`}
          title="My Account"
        />
        {/* My privacy */}
        <UserAndProductNavigationBtn
          slugUrlO={`${slugUrl}/privacy`}
          slugUrlT={`${slugUrl}/privacy/`}
          title="My Privacy"
        />
        {/* My Security */}
        <UserAndProductNavigationBtn
          slugUrlO={`${slugUrl}/security`}
          slugUrlT={`${slugUrl}/security/`}
          title="My Security"
        />
      </section>
      <section className="product-d-detail position-relative">
        <Outlet />
      </section>
    </>
  );
};

export default UserSettingMain;
