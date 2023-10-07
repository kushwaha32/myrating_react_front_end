import { useSelector } from "react-redux";
import wallet from "../../img/wallet-128.png";
import peaches from "../../img/peachs.png";

const UserMainWithProfile = () => {
  const { userInfo } = useSelector((state) => state?.auth);
  return (
    <>
      {userInfo?.user?.role === "user" ? (
        <>
          {" "}
          <figure className="profile-overview-b-a">
            <figcaption className="profile-overview-b-ab user-main-wprofile-pea">
              {userInfo?.user?.peaches}
            </figcaption>
          </figure>
          <figure className="profile-overview-b-b">
            <img
              src={peaches}
              className="profile-overview-b-ba user-main-wprofile-img"
              alt="wallet"
            />
            <figcaption className="profile-overview-b-bb user-main-wprofile-text">
              Peachs
            </figcaption>
          </figure>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default UserMainWithProfile;
