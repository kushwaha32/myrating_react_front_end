import { useSelector } from "react-redux";
import userColored from "../../img/user-profile-colored.png";
import { Link } from "react-router-dom";

const UserHeadWithoutProfile = ({ handleProductImg }) => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <figure>
      <span
        className="profile-overview-a"
        style={handleProductImg("man.png")}
      ></span>
      <figcaption className="profile-overview-ab">
        <Link
          to={`/user/${userInfo?.user?._id}/about`}
          className="head-with-profile-a head-with-profile-a-link"
        >
          +91 {userInfo?.user?.contactNumber}
        </Link>
      </figcaption>
    </figure>
  );
};

export default UserHeadWithoutProfile;
