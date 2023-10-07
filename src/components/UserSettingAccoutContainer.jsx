import { Link } from "react-router-dom";
import arrowDown from "../img/arror-down.png";

const UserSettingAccountContainer = ({ children, title, slugUrl }) => {
  return (
    <div className="user-account account-varification">
      {/* page title */}
      {title && (
        <h3 className="user-account-a">
          {/* <Link to={slugUrl}>
            <img src={arrowDown} alt="" />
          </Link> */}
          {title}
        </h3>
      )}

      {children}
    </div>
  );
};

export default UserSettingAccountContainer;
