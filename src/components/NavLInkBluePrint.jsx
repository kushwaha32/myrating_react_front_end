import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NavLinkBluePrint = ({navImg, title, url }) => {
   // get current location
   const location = useLocation().pathname;
  
  return (
    <Link to={url}>
      <figure className={`drop`}>
        <div className={`nav-img-box ${location === url && "nav-img-box-active"}`} >
          <img src={navImg} alt="" />
        </div>
        <figcaption className="places-text text-capitalize color-yellow-dark">
          {title}
        </figcaption>
      </figure>
    </Link>
  );
};

export default NavLinkBluePrint;
