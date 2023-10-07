import { useState } from "react";
import UserAndProductNavigationBtn from "../UserAndProductNavigationBtn";
import BreadCrum767 from "./BreadCrum767";

const UserAccoutBelow767 = () => {
  const [userSlug, setUserSlug] = useState(34);
  const slugUrl = `/user/${userSlug}/setting`;
  return (
    <>
      <BreadCrum767 slugUrl={slugUrl} url="My Account" />
      <div className="user-account-setting-sm py-0">
        {/* My Account varification */}
        <UserAndProductNavigationBtn
          slugUrlO={`${slugUrl}/accout-varification`}
          slugUrlT={`${slugUrl}/accout-varification/`}
          title="Account Verification"
        />
        {/* My accout de-activation */}
        {/* <UserAndProductNavigationBtn
          slugUrlO={`${slugUrl}/de-activation`}
          slugUrlT={`${slugUrl}/de-activation/`}
          title="De-Activation"
        /> */}
      </div>
    </>
  );
};

export default UserAccoutBelow767;
