


// import 3rd party module
import { Route } from "react-router-dom";

// import user defined module
import ProductOrUserDetailsBelow767 from "../components/componentBelow767/ProductOrUserDetailsBelow767";
import UserAboutBelow767 from "../components/componentBelow767/UserAboutBelow767";
import UserFavoritesBelow767 from "../components/componentBelow767/UserFavoritesBelow767";
import UserWalletBelow767 from "../components/componentBelow767/UserWalletBelow767";
import UserQrCodeBelow767 from "../components/componentBelow767/UserQrcodeBelow767";
import UserSettingMain767 from "../components/componentBelow767/UserSettingMain767";
import UserAccountSetting767 from "../components/componentBelow767/UserAccoutSetting767";
import UserAccoutBelow767 from "../components/componentBelow767/UserAccoutBelow767";
import UserAccountVarificationBelow767 from "../components/componentBelow767/UserAccoutVarificationBelow767";
import UserAccoutDeactivationBelow767 from "../components/componentBelow767/UserAccoutDeactivationBelow767";
import UserPrivacyBelow767 from "../components/componentBelow767/UserPrivacyBelow767";
import UserSecurityBelow767 from "../components/componentBelow767/UserSecurityBelow767";

const BusinessRoutesBelow767 = () => (

    <Route path="/business/:id" element={<ProductOrUserDetailsBelow767 />}>
      <Route path="about" element={<UserAboutBelow767 />} />
    
      {/* user favorites */}
      <Route path="favorites" element={<UserFavoritesBelow767 />} />

      {/* user wallet */}
      <Route path="ratings" element={<UserWalletBelow767 />} />

      {/* user qr code */}
      <Route path="qrcode" element={<UserQrCodeBelow767 />} />
      
      {/* user setting */}
      <Route path="setting" element={<UserSettingMain767 />}>
        <Route index element={<UserAccountSetting767 />} />
        <Route
          path="account"
          element={<UserAccoutBelow767 />}
        />
        <Route
          path="accout-varification"
          element={<UserAccountVarificationBelow767 />}
        />
        <Route path="de-activation" element={<UserAccoutDeactivationBelow767 />} />
        <Route path="privacy" element={<UserPrivacyBelow767 />} />
        <Route path="security" element={<UserSecurityBelow767 />} />
      </Route>
    </Route>
 
);

export default BusinessRoutesBelow767;
