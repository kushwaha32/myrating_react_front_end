import QRCode from "qrcode";
import UserResourceCommonContainer from "./UserResourceCommonContainer";
import ImgWithSideCaption from "./ImgWithSideCaption";
import QRCodeGenerator from "./business/QrcodeGenerator";
import QRCodeScanner from "./business/QrcodeScanner";
import { useSelector } from "react-redux";

const UserQrcode = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const qrCodeData = window.location.href;

  if (userInfo?.user?.role === "user") {
    return (
      <div className="wallet user-menu qrcode">
        <UserResourceCommonContainer edit={false} title="QR Code">
          <ImgWithSideCaption
            img={userInfo?.user?.userProfile?.userImg || "man.png"}
            title={userInfo?.user?.userProfile?.name}
          >
            <span className="user-menu-a">
              {userInfo?.user?.proffession?.proffession}
            </span>
            <span className="user-menu-a">
              {userInfo?.user?.userProfile?.location?.address}
            </span>
            <QRCodeGenerator data={qrCodeData} />
          </ImgWithSideCaption>
        </UserResourceCommonContainer>
        {/* <QRCodeScanner /> */}
      </div>
    );
  } else if (userInfo?.user?.role === "business") {
    return (
      <div className="wallet user-menu qrcode">
        <UserResourceCommonContainer edit={false} title="QR Code">
          <ImgWithSideCaption
            img={userInfo?.user?.brandProfile?.brandImage || "man.png"}
            title={userInfo?.user?.brandProfile?.brandName}
          >
            <span className="user-menu-a">
              {userInfo?.user?.brandProfile?.industry?.name}
            </span>
            <span className="user-menu-a">
              {userInfo?.user?.brandProfile?.location?.address}
            </span>
            <QRCodeGenerator data={qrCodeData} />
          </ImgWithSideCaption>
        </UserResourceCommonContainer>
        {/* <QRCodeScanner /> */}
      </div>
    );
  } else {
    return "";
  }
};

const style = {
  color: "#000",
  padding: "9px 14px",
};

export default UserQrcode;
