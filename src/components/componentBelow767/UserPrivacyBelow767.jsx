import { useState } from "react";
import UserSettingAccountContainer from "../UserSettingAccoutContainer";
import ButtonFormSubmit from "../buttonFormSubmit";
import PrivacyCheckBoxContainer from "../PrivacyCheckBoxContainer";
import BreadCrum767 from "./BreadCrum767";
import UserPrivacy from "../UserPrivacy";

const UserPrivacyBelow767 = () => {
  const [userSlug, setUserSlug] = useState(34);
  const slugUrl = `/user/${userSlug}/setting`;

  return (
    <div className="user-privacy ac-deactivation-sm">
      <BreadCrum767 slugUrl={`${slugUrl}`} url="My Privacy" />
      <UserSettingAccountContainer slugUrl={slugUrl} title="">
        <UserPrivacy />
      </UserSettingAccountContainer>
    </div>
  );
};

const style = {
  width: "160px",
  padding: "9px 0",
};

export default UserPrivacyBelow767;
