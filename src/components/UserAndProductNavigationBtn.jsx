import { Link, useLocation } from "react-router-dom";


const UserAndProductNavigationBtn = ({slugUrlO, slugUrlT, title}) => {
    let location = useLocation();
    
    return(
        <Link
        className={`product-d-menu-b ${
          (location.pathname === slugUrlO || location.pathname === slugUrlT) ? "product-d-menu-b-active" : ""
        }`}
        to={slugUrlO}
      >
        {title}
      </Link>
    )
}

export default UserAndProductNavigationBtn