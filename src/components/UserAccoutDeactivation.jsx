


import ButtonFormSubmit from "./buttonFormSubmit";
import arrowDown from "../img/arror-down.png";
import { useState } from "react";
import UserSettingAccountContainer from "./UserSettingAccoutContainer";
import taj from "../img/taj.jpg";
import ImgWithSideCaption from "./ImgWithSideCaption";
import BreadCrum767 from "./componentBelow767/BreadCrum767";
import { useSelector } from "react-redux";

const UserAccoutDeactivation = () => {
  const {userInfo} = useSelector(state => state.auth);
  const [userSlug, setUserSlug] = useState(userInfo?.user?._id);
  const slugUrl = `/business/${userSlug}/setting`;
  return (
      <>
      <BreadCrum767 slugUrl={`${slugUrl}/account`} url="My Account"/>
      <div className="accout-deactivation">
         <UserSettingAccountContainer slugUrl={slugUrl} title="My Account De-Activation">
         <h3 className="accout-deactivation-a">De-Activate my account</h3>
         <div className="accout-deactivation-b"><input type="checkbox" name="" id="" /></div>
         
         <ImgWithSideCaption img={taj} title="Bandhul Bharti" />
        <div className="text-center">
            <ButtonFormSubmit cls="color-yellow-dark" style={style} text="De-Activate Account" />
        </div>
        <p className="mt-4">* Account will be activated after login.</p>
        </UserSettingAccountContainer>
      </div>
      </>
  );
};

const style = {
  width: "160px",
  padding: "9px 0",
  color:"#fff"
};
export default UserAccoutDeactivation;


