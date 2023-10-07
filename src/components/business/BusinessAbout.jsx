import geolocation from "../../img/ih-geoLocation.png";
import UserResourceCommonContainer from "../UserResourceCommonContainer";
import { useSelector } from "react-redux";
import { useState } from "react";
import UpdatePersonalInfo from "./UpdatePersonalInfo";

const BusinessAbout = () => {
  const { userInfo } = useSelector((state) => state?.auth);
  const [modalShow, setModalShow] = useState(false);

  const handalModalShow = () => setModalShow(true);
  const handalModalClose = () => setModalShow(false);

  return (
    <>
      <UpdatePersonalInfo
        handalModalClose={handalModalClose}
        modalShow={modalShow}
      />

      <UserResourceCommonContainer
        edit={true}
        handalModalShow={handalModalShow}
        title="Personal Information"
      >
        <div className="user-about-ab">
          <div className="user-about-aba">
            {/* name */}
            <div className="user-about-aba-left">
              <h3 className="field">Brand Name</h3>
              <p className="field-val">
                {userInfo?.user?.brandProfile?.brandName}
              </p>
            </div>
            {/* profession */}
            <div className="user-about-aba-right">
              <h3 className="field">Registered As</h3>
              <p className="field-val">
                {userInfo?.user?.brandProfile?.registeredAs?.name}
              </p>
            </div>
          </div>

          <div className="user-about-aba mt-4">
            {/* city */}
            <div className="user-about-aba-left">
              <h3 className="field">City/Location</h3>
              <p
                className="field-val"
                title={userInfo?.user?.brandProfile?.location?.address}
              >
                {`${userInfo?.user?.brandProfile?.location?.address?.slice(
                  0,
                  35
                )} ...`}
                <img src={geolocation} alt="" />
              </p>
            </div>
            {/* industry */}
            <div className="user-about-aba-left">
              <h3 className="field">Industry</h3>
              <p className="field-val">
                {userInfo?.user?.brandProfile?.industry?.name}
              </p>
            </div>
          </div>
        </div>
      </UserResourceCommonContainer>
    </>
  );
};

export default BusinessAbout;
