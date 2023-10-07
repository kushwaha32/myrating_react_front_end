import { useState } from "react";
import "./toggledSwitch.css";

const UserPrivacyToggledSwitch = ({ privacyStatus }) => {
  return (
    <div
      className={`toggle-public toggle-privacy ${
        privacyStatus && "toggle-private"
      } `}
    >
      <span className="notch notch-privacy">
        {privacyStatus ? "off" : "on"}
      </span>
    </div>
  );
};

export default UserPrivacyToggledSwitch;
