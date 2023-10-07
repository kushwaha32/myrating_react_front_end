import ButtonFormSubmit from "../buttonFormSubmit";

import geolocation from "../../img/ih-geoLocation.png";
import camera from "../../img/camera.png";
import BreadCrum767 from "./BreadCrum767";
import { useState } from "react";
import UserAccoutVarification from "../UserAccoutVarification";

const UserAccountVarificationBelow767 = () => {
  const [userSlug, setUserSlug] = useState(34);
  const slugUrl = `/user/${userSlug}/setting/account`;
  return (
    <>
      <BreadCrum767 slugUrl={slugUrl} url="Account Verification" />
      <UserAccoutVarification />
    </>
  );
};
const style = {
  width: "138px",
  height: "41px",
  marginTop: "30px",
};
export default UserAccountVarificationBelow767;
