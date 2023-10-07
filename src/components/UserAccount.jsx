import { Link } from "react-router-dom";
import UserAndProductNavigationBtn from "./UserAndProductNavigationBtn";
import { useState } from "react";
import { useSelector } from "react-redux";

const UserAccount = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [userSlug, setUserSlug] = useState(userInfo?.user?._id);
  const slugUrl = `/user/${userSlug}/setting`;
  return (
    <div className="user-account">
      <h3 className="user-account-a">My Account</h3>
      <div className="container mt-4">
        <UserAndProductNavigationBtn
          slugUrlO={`${slugUrl}/accout-varification`}
          slugUrlT={`${slugUrl}/accout-varification/`}
          title="Account Verification"
        />
      </div>

      {/* <UserAndProductNavigationBtn
        slugUrlO={`${slugUrl}/de-activation`}
        slugUrlT={`${slugUrl}/de-activation/`}
        title="De-Activation"
      /> */}
    </div>
  );
};

export default UserAccount;
