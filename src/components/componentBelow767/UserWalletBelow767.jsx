// third party module import
import Accordion from "react-bootstrap/Accordion";

// user define module import
import ProfileIdentity from "../ProfileIdentity";
import taj from "../../img/taj.jpg";
import scoreImg from "../../img/scoreStar.png";
import iImg from "../../img/iImg.png";
import UserResourceCommonContainer from "../UserResourceCommonContainer";
import walletImg from "../../img/wallet-128.png";

const UserWalletBelow767 = () => {
  return (
    <>
      <ProfileIdentity
        profileImg={taj}
        name="Bandhul Bharti"
        profession="Musician"
        location="New Delhi, Delhi"
        scoreWalletImg={scoreImg}
        iImg={iImg}
        score="100"
      />
      <section className="user-main-sm767 user-main-sm767-b user-favourite-sm user-wallet-sm">
        <UserResourceCommonContainer edit={false} title="E-Wallet">
          <figure className="wallet-a">
            <img src={walletImg} alt="" />
            <figcaption className="wallet-aa">
              <h3>Total Available Stars</h3>
              <span>500</span>
            </figcaption>
          </figure>

          <dir className="wallet-b">
            <span>
              Total Earned Stars <span>1000</span>
            </span>
            <span>
              Total Spend Stars <span>500</span>
            </span>
          </dir>
        </UserResourceCommonContainer>
      </section>
    </>
  );
};

export default UserWalletBelow767;
