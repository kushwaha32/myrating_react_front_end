import { useSelector } from "react-redux";
import coins from "../../img/coins.png";
import wallet from "../../img/wallet-128.png";

const UserMainWithoutProfile = () => {
    const { user } = useSelector(state => state.auth.userInfo)
    return(
        <>
           <figure className="profile-overview-b-a">
                <img
                  src={coins}
                  className="profile-overview-b-aa"
                  alt="coin"
                />
                <figcaption className="profile-overview-b-ab">
                  {user.peaches} pie
                </figcaption>
              </figure>
              <figure className="profile-overview-b-b">
                <img
                  src={wallet}
                  className="profile-overview-b-ba"
                  alt="wallet"
                />
                <figcaption className="profile-overview-b-bb">
                  In-active
                </figcaption>
              </figure>
        </>
    )
}

export default UserMainWithoutProfile;