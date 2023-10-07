import arrowDown from "../../img/arror-down.png";
import { useState } from "react";
import taj from "../../img/taj.jpg";
import UserSettingAccountContainer from "../UserSettingAccoutContainer";
import ImgWithSideCaption from "../ImgWithSideCaption";
import ButtonFormSubmit from "../buttonFormSubmit";
import BreadCrum767 from "./BreadCrum767";

const UserAccoutDeactivationBelow767 = () => {
  const [userSlug, setUserSlug] = useState(34);
  const slugUrl = `/user/${userSlug}/setting`;
  return (
    <>
      <BreadCrum767 slugUrl={`${slugUrl}/account`} url="De-Activation" />
      <div className="accout-deactivation ac-deactivation-sm">
        <UserSettingAccountContainer
          slugUrl={slugUrl}
          title=""
        >
          <h3 className="accout-deactivation-a">De-Activate my account</h3>
          <div className="accout-deactivation-b">
            <input type="checkbox" name="" id="" />
          </div>

          <ImgWithSideCaption img={taj} title="Bandhul Bharti" />
          <div className="text-center">
            <ButtonFormSubmit style={style} text="De-Activate Account" />
          </div>
          <p className="mt-3">* Account will be activated after login.</p>
        </UserSettingAccountContainer>
      </div>
    </>
  );
};

const style = {
  width: "160px",
  padding: "9px 0"
};
export default UserAccoutDeactivationBelow767;
