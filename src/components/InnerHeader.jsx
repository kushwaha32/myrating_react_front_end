import HeaderLeftSection from "./header/headerLeftSection";
import HeaderSuper from "./header/headerSuper";
import ihLocation from "../img/ih-location.png";
import getLocation from "../img/ih-geoLocation.png";
import ihSearch from "../img/ih-search.png";
import profileImg from "../img/profile.png";
import "../assets/css/headerInner.css";
import { useLocation } from "react-router-dom";
import HeaderRightSection from "./header/headerRightSection";

const InnerHeader = () => {
  const location = useLocation().pathname.split("/")[1];

  return (
    <HeaderSuper>
      <HeaderLeftSection />
      <div className="inner-header">
        <div className="ih-location">
          <img src={ihLocation} className="img-location" alt="" />
          <span className="ih-city">Ghagiabad</span>
          <img src={getLocation} alt="" />
        </div>
        {location !== "explore-product" ? (
          <div className="ih-search form-group">
            <img src={ihSearch} alt="" />
            <input type="text" className="form-control" placeholder="Search" />
          </div>
        ) : (
          ""
        )}

        {/* <div className="ih-profile">
          <img src={profileImg} alt="" />
        </div> */}
      </div>
     
    </HeaderSuper>
  );
};

export default InnerHeader;
