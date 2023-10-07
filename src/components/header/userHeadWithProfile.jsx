import { useSelector } from "react-redux";
import profilePick from "../../img/profile-pick.jpg";
import halfColordStar from "../../img/half-colored-star.png";
import { Link } from "react-router-dom";

const UserHeadWithProfile = ({ handleProductImg }) => {
  const { userInfo } = useSelector((state) => state?.auth);
  return (
    <figure>
      <span
        className="profile-overview-a poa-with"
        style={handleProductImg(
          userInfo?.user?.userProfile?.userImg || "man.png"
        )}
      ></span>
      <figcaption className="profile-overview-ab head-with-profile">
      
        <Link
          to={`/user/${userInfo?.user?._id}/about`}
          className="head-with-profile-a head-with-profile-a-link"
        >
          {userInfo?.user?.userProfile?.name}
        </Link>
        <span className="head-with-profile-b">
          {userInfo?.user?.proffession?.proffession}
        </span>
        <h3 className="head-with-profile-c">
          <img src={halfColordStar} alt="score" />
          <span className="peaches-score">{userInfo?.user?.peaches}</span>{" "}
          <span>Score</span>
        </h3>
      </figcaption>
    </figure>
  );
};

export default UserHeadWithProfile;
