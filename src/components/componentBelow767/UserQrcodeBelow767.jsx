// third party module import
import Accordion from "react-bootstrap/Accordion";

// user define module import
import ProfileIdentity from "../ProfileIdentity";
import taj from "../../img/taj.jpg";
import scoreImg from "../../img/scoreStar.png";
import iImg from "../../img/iImg.png";
import UserResourceCommonContainer from "../UserResourceCommonContainer";
import qrcode from "../../img/qrcode.png";
import share from "../../img/share-qr.png";
import download from "../../img/download-qr.png";
import ImgWithSideCaption from "../ImgWithSideCaption";
import scanQr from "../../img/scanner.png";

const UserQrCodeBelow767 = () => {
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
      <section className="user-main-sm767 user-main-sm767-b user-favourite-sm user-qrcode-sm">
        <div className="wallet user-menu qrcode">
          <UserResourceCommonContainer edit={false} title="QR Code">
            <ImgWithSideCaption img={taj} title="Bandhul Bharti">
              <span className="user-menu-a">Musician</span>
              <span className="user-menu-a">New Delhi, Delhi</span>
              <img className="qrcode-a" src={qrcode} alt="" />
              <div className="qrcode-b">
                <button className="qrcode-ba qrcode-bb">
                  <img src={share} alt="" />
                  Share My QR Code
                </button>
              
                <button className="qrcode-ba qrcode-bb qr-scaner-cam">
                  <img src={scanQr} alt="" />
                  <span>Scan</span>
                </button>
             
                <button className="qrcode-bb dqr-sm">
                  <img src={download} alt="" />
                  Download QR Code
                </button>
              </div>
            </ImgWithSideCaption>
          </UserResourceCommonContainer>
        </div>
      </section>
    </>
  );
};

export default UserQrCodeBelow767;
