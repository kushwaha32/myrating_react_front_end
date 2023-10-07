import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import "../../assets/css/user.css";
import { useSelector } from "react-redux";
import UserAndProductNavigationBtn from "../UserAndProductNavigationBtn";

const BusinessFavoriteMail = (props) => {
  const {userInfo} = useSelector(state => state.auth);
  const [userSlug, setUserSlug] = useState(userInfo?.user?._id);
  const slugUrl = `/business/${userSlug}/favorites`;

  return (
    <>
      <section className="product-d-menu text-capitalize user-favorites">
        <h3 className="user-favorites-a">Favourites</h3>

        <UserAndProductNavigationBtn
          slugUrlO={slugUrl}
          slugUrlT={`${slugUrl}/`}
          title="historical monuments"
        />
        <UserAndProductNavigationBtn
          slugUrlO={`${slugUrl}/tourist-places`}
          slugUrlT={`${slugUrl}/tourist-places/`}
          title="tourist places"
        />
        <UserAndProductNavigationBtn
          slugUrlO={`${slugUrl}/attractions`}
          slugUrlT={`${slugUrl}/attractions/`}
          title="attractions"
        />
        <UserAndProductNavigationBtn
          slugUrlO={`${slugUrl}/beaches`}
          slugUrlT={`${slugUrl}/beaches/`}
          title="beaches"
        />
        <UserAndProductNavigationBtn
          slugUrlO={`${slugUrl}/religious-places`}
          slugUrlT={`${slugUrl}/religious-places/`}
          title="religious places"
        />
        <UserAndProductNavigationBtn
          slugUrlO={`${slugUrl}/other`}
          slugUrlT={`${slugUrl}/other/`}
          title="other"
        />
      </section>
      <section className="product-d-detail">
        <Outlet />
      </section>
    </>
  );
};

export default BusinessFavoriteMail;
