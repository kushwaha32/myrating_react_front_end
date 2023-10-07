import geolocation from "../img/ih-geoLocation.png";

import calender from "../img/calender.png";

import { useSelector } from "react-redux";
import { useState } from "react";
import UserResourceCommonContainer from "./UserResourceCommonContainer";
import UpdateUserPersonalInfo from "./user/UpdateUserPersonalInfo";
import CreateUserPersonalInfo from "./user/CreateUserPersonalInfo";

const UserAbout = () => {
  const { userInfo } = useSelector((state) => state?.auth);
  const [modalShow, setModalShow] = useState(false);

  const handalModalShow = () => setModalShow(true);
  const handalModalClose = () => setModalShow(false);

  return (
    <>
      {userInfo?.user?.userProfile ? (
        <UpdateUserPersonalInfo
          handalModalClose={handalModalClose}
          modalShow={modalShow}
        />
      ) : (
        <CreateUserPersonalInfo
          handalModalClose={handalModalClose}
          modalShow={modalShow}
        />
      )}

      <UserResourceCommonContainer
        edit={true}
        handalModalShow={handalModalShow}
        title="Personal Information"
      >
        <div className="user-about-ab">
          <div className="user-about-aba">
            {/* name */}
            <div className="user-about-aba-left">
              <h3 className="field">Name</h3>
              <p className="field-val">{userInfo?.user?.userProfile?.name}</p>
            </div>
            {/* profession */}
            <div className="user-about-aba-right">
              <h3 className="field">Profession</h3>
              <p className="field-val">
                {userInfo?.user?.proffession?.proffession}
              </p>
            </div>
          </div>

          <div className="user-about-aba mt-4">
            {/* city */}
            <div className="user-about-aba-left">
              <h3 className="field">City/Location</h3>
              <p
                className="field-val"
                title={userInfo?.user?.userProfile?.location?.address}
              >
                {`${userInfo?.user?.userProfile?.location?.address?.slice(
                  0,
                  35
                )}...`}
                <img src={geolocation} alt="" />
              </p>
            </div>
            {/* industry */}
            <div className="user-about-aba-left">
              <h3 className="field">Date of Birth</h3>
              <p className="field-val">{userInfo?.user?.userProfile?.dob}</p>
            </div>
          </div>

          <div className="user-about-aba mt-4">
            {/* gender */}
            <div className="user-about-aba-left">
              <h3 className="field">Gender</h3>
              <p className="field-val">{userInfo?.user?.userProfile?.gender}</p>
            </div>
          </div>
        </div>
      </UserResourceCommonContainer>
    </>
  );
};

export default UserAbout;
