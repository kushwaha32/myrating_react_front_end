import geolocation from "../../img/ih-geoLocation.png";
import calender from "../../img/calender.png";
import UserResourceCommonContainer from "../UserResourceCommonContainer";
import { useSelector } from "react-redux";
import UpdateContactInfo from "./UpdateContactInfo";
import { useState } from "react";

const BusinessContactInfo = () => {
  const { userInfo } = useSelector((state) => state?.auth);
  const [modalShow, setModalShow] = useState(false);

  const handalModalShow = () => setModalShow(true);
  const handalModalClose = () => setModalShow(false);

  return (
    <>
      <UpdateContactInfo
        handalModalClose={handalModalClose}
        modalShow={modalShow}
      />
      <UserResourceCommonContainer edit={true} handalModalShow={handalModalShow} title="Contact Information">
        <div className="user-about-ab">
          <div className="user-about-aba">
            {/* name */}
            <div className="user-about-aba-left">
              <h3 className="field">Contact Number</h3>
              <p className="field-val">+91 {userInfo?.user?.contactNumber}</p>
            </div>
            {/* profession */}
            <div className="user-about-aba-right">
              <h3 className="field">Email Id</h3>
              <p className="field-val">{userInfo?.user?.email}</p>
            </div>
          </div>
        </div>
      </UserResourceCommonContainer>
    </>
  );
};

export default BusinessContactInfo;
