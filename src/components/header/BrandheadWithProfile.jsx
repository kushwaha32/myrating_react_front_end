import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import manImg from "../../img/business-profile.png";

const BrandHeadWithProfile = ({ handleProductImg }) => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <figure>
      <span
        className="profile-overview-a poa-with"
        style={handleProductImg(
          userInfo?.user?.brandProfile?.brandImage || manImg
        )}
      ></span>
      <figcaption className="profile-overview-ab head-with-profile">
        {/* <h1 className="head-with-profile-a text-capitalize">{userInfo?.user?.brandProfile?.brandName}</h1> */}
        <Link
          to={`/business/${userInfo?.user?._id}`}
          className="head-with-profile-a head-with-profile-a-link text-capitalize"
        >
          {userInfo?.user?.brandProfile?.brandName}
        </Link>
        <span className="head-with-profile-b text-capitalize">
          {userInfo?.user?.brandProfile?.registeredAs?.name}
        </span>
      </figcaption>
    </figure>
  );
};

export default BrandHeadWithProfile;
