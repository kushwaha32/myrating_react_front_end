import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import manImg from "../../img/business-profile.png";

const UserProfileOverview = ({
  ProfileHead,
  ProfileMiddle,
  ProfileFooter,
  userRegistrationModelShow,
  style,
}) => {
  const { userInfo } = useSelector((state) => state?.auth);
  let userImg;
  if (userInfo?.user?.role === "user") {
    userImg = userInfo?.user?.userProfile?.userImg || manImg;
  } else if (userInfo?.user?.role === "business") {
    userImg = userInfo?.user?.brandProfile?.brandImage || manImg;
  }

  const handleProductImg = (img) => {
    return {
      backgroundImage: `url(${img})`,
    };
  };
  return (
    <Dropdown className="rating-main-bab">
      <div className="rating-main-bar">
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          className="header-owner-img"
          style={handleProductImg(userImg)}
        ></Dropdown.Toggle>
      </div>

      <Dropdown.Menu>
        <section className="profile-overview text-center">
          <ProfileHead handleProductImg={handleProductImg} />
          {/* pieaches or coins */}
          <main className="profile-overview-b" style={style && style}>
            <ProfileMiddle />
          </main>
          <footer className="profile-overview-b-c">
            <ProfileFooter
              userRegistrationModelShow={userRegistrationModelShow}
            />
          </footer>
        </section>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserProfileOverview;
