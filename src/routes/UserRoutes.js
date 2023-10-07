// import 3rd party module
import { Route, Router } from "react-router-dom";

// import user defined module
import ProductDetails from "../screens/ProductDetails";
import UserMain from "../components/UserMain";
import UserAbout from "../components/UserAbout";
import UserFavoritesMain from "../components/UserFavoritesMain";
import UserWalletMain from "../components/UserWalletMain";
import UserWallet from "../components/UserWallet";
import UserQrcodeMain from "../components/UserQrcodeMain";
import UserQrcode from "../components/UserQrcode";
import UserSettingMain from "../components/UserSettingMain";
import UserAccount from "../components/UserAccount";
import UserAccoutVarification from "../components/UserAccoutVarification";
import UserAccoutDeactivation from "../components/UserAccoutDeactivation";
import UserPrivacy from "../components/UserPrivacy";
import UserSecurity from "../components/UserSecurity";
import UserContactInfo from "../components/user/UserContactInfo";
import UserFavouritesBasedOnCategory from "../components/favourites/UserFavouritesBasedOnCategory";

const UserRoutes = () => (
  <Route path="/user/:id" element={<ProductDetails />}>
    {/* /////////////////////////////////////////////////////////////// */}
    {/* ////////////////---- User About ----------///////////////////// */}
    {/* ////////////////////////////////////////////////////////////// */}
    <Route path="about" element={<UserMain />}>
      <Route index element={<UserAbout />} />
      <Route path="contact-information" element={<UserContactInfo />} />
    </Route>
    {/*  /////////////////////////////////////////////////////////////// */}
    {/*  ///////////////---- User Favourite ----------///////////////// */}
    {/* ////////////////////////////////////////////////////////////// */}
    <Route path="favorites" element={<UserFavoritesMain />}>
      <Route index element={<UserFavouritesBasedOnCategory />} />
      <Route
        path="historical-monuments"
        element={<UserFavouritesBasedOnCategory />}
      />
      <Route
        path="tourist-places"
        element={<UserFavouritesBasedOnCategory />}
      />
      <Route path="attractions" element={<UserFavouritesBasedOnCategory />} />
      <Route path="beaches" element={<UserFavouritesBasedOnCategory />} />
      <Route
        path="religious-places"
        element={<UserFavouritesBasedOnCategory />}
      />
      <Route path="other" element={<UserFavouritesBasedOnCategory />} />
      {/* <Route
          path="touristAttractions"
          element={<UserFavoritesTouristAttraction />}
        /> */}
    </Route>
    {/* //////////////////////////////////////////////////////////////// */}
    {/* ///////////////---- User Reward ----------////////////////////// */}
    {/* //////////////////////////////////////////////////////////////// */}
    <Route path="rewards" element={<UserWalletMain />}>
      <Route index element={<UserWallet />} />
    </Route>
    {/* //////////////////////////////////////////////////////////////// */}
    {/* ///////////////////---- Qr Code ----------////////////////////// */}
    {/* //////////////////////////////////////////////////////////////// */}
    <Route path="qrcode" element={<UserQrcodeMain />}>
      <Route index element={<UserQrcode />} />
    </Route>
    {/* //////////////////////////////////////////////////////////////// */}
    {/* ///////////////////---- User Setting ----------///////////////// */}
    {/* //////////////////////////////////////////////////////////////// */}
    <Route path="setting" element={<UserSettingMain />}>
      <Route index element={<UserAccount />} />
      <Route path="accout-varification" element={<UserAccoutVarification />} />
      <Route path="de-activation" element={<UserAccoutDeactivation />} />
      <Route path="privacy" element={<UserPrivacy />} />
      <Route path="security" element={<UserSecurity />} />
    </Route>
  </Route>
);

export default UserRoutes;
