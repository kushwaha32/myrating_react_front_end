


import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import UserAndProductNavigationBtn from "./UserAndProductNavigationBtn";
import "../assets/css/user.css";
import { useSelector } from "react-redux";

const UserWalletMain = (props) => {
  const {userInfo} = useSelector(state => state.auth);
  const [userSlug, setUserSlug] = useState(userInfo?.user?._id);
  const slugUrl = `/user/${userSlug}/rewards`;

  return (
    <>
      <section className="product-d-menu text-capitalize user-favorites">
        <h3 className="user-favorites-a">E-Wallet</h3>

        {/* Wallet */}
        <UserAndProductNavigationBtn
          slugUrlO={`${slugUrl}`}
          slugUrlT={`${slugUrl}/`}
          title="E-Wallet"
        />
       
      </section>
      <section className="product-d-detail">
        <Outlet />
      </section>
    </>
  );
};

export default UserWalletMain;
