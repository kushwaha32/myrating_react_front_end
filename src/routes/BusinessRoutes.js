// import 3rd party module
import { Route, Router } from "react-router-dom";

// import user defined module
import ProductDetails from "../screens/ProductDetails";
import UserQrcode from "../components/UserQrcode";
import UserSettingMain from "../components/UserSettingMain";
import UserAccount from "../components/UserAccount";
import UserAccoutVarification from "../components/UserAccoutVarification";
import UserAccoutDeactivation from "../components/UserAccoutDeactivation";
import UserPrivacy from "../components/UserPrivacy";
import UserSecurity from "../components/UserSecurity";
import BusinessRatingMain from "../components/business/BusinessRatingsMain";
import CreateProductProfile from "../components/business/CreateProductProfiel";
import BusinessMain from "../components/business/BusinessMain";
import BusinessAbout from "../components/business/BusinessAbout";
import BusinessContactInfo from "../components/business/BusinessContactInfo";
import UpdateProductProfile from "../components/business/UpdateProductProfile";
import CategoryBasedProduct from "../components/business/productCategories/CategoryBasedProduct";
import ProductQrCode from "../components/ProductQrCode";
import AllProducts from "../components/business/productCategories/AllProducts";
import BusinessQrcodeMain from "../components/business/BusinessQrCodeMain";

const BusinessRoutes = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <Route path="/business/:id" element={<ProductDetails />}>
      <Route path="about" element={<BusinessMain />}>
        <Route index element={<BusinessAbout />} />
        <Route path="contact-information" element={<BusinessContactInfo />} />
      </Route>
      {/* create product profile */}
      <Route path="create-profile" element={<CreateProductProfile />} />
      {/* update product profile  */}
      <Route
        path="update-product-profile/:productNameSlug"
        element={<UpdateProductProfile />}
      />

      {/* </Route> */}
      <Route path="ratings" element={<BusinessRatingMain />}>
        <Route index element={<AllProducts />} />
        {/* {userInfo?.user?.brandProfile?.industry?.subCategory?.map((currCat) => (
          <Route key={currCat?._id} path={currCat?.slug} element={<CategoryBasedProduct />} />
        ))} */}

        <Route path={`north-indian-dish`} element={<CategoryBasedProduct />} />
        <Route path={`south-indian-dish`} element={<CategoryBasedProduct />} />
        <Route path={`sweet-dish`} element={<CategoryBasedProduct />} />
        <Route path={`vegeterian-food`} element={<CategoryBasedProduct />} />
        <Route
          path={`non-vegeterian-food`}
          element={<CategoryBasedProduct />}
        />
        <Route path={`beverage`} element={<CategoryBasedProduct />} />
        <Route path={`chineese-foods`} element={<CategoryBasedProduct />} />
        <Route path={`north-indian-foods`} element={<CategoryBasedProduct />} />
        <Route path={`sea-foods`} element={<CategoryBasedProduct />} />
        <Route path={`room`} element={<CategoryBasedProduct />} />
        <Route path={`tea`} element={<CategoryBasedProduct />} />
        <Route path={`mineral-water`} element={<CategoryBasedProduct />} />
        <Route path={`coffee`} element={<CategoryBasedProduct />} />
        <Route path={`fast-foods`} element={<CategoryBasedProduct />} />
        <Route path={`healthy-food`} element={<CategoryBasedProduct />} />
        <Route path={`other`} element={<CategoryBasedProduct />} />
        <Route path={`tour-packages`} element={<CategoryBasedProduct />} />
        <Route path={`bus-service`} element={<CategoryBasedProduct />} />
        <Route path={`car-service`} element={<CategoryBasedProduct />} />
        <Route path={`taxi-service`} element={<CategoryBasedProduct />} />
        <Route path={`tour-guide-service`} element={<CategoryBasedProduct />} />
        <Route path={`city`} element={<CategoryBasedProduct />} />
        <Route
          path={`historical-monuments`}
          element={<CategoryBasedProduct />}
        />
        <Route path={`tourist-places`} element={<CategoryBasedProduct />} />
        <Route path={`attractions`} element={<CategoryBasedProduct />} />
        <Route path={`beaches`} element={<CategoryBasedProduct />} />
        <Route path={`religious-places`} element={<CategoryBasedProduct />} />
      </Route>
      <Route path="qrcode" element={<BusinessQrcodeMain />}>
        <Route index element={<UserQrcode />} />
        <Route path="product/:productNameSlug" element={<ProductQrCode />} />
      </Route>
      <Route path="setting" element={<UserSettingMain />}>
        <Route index element={<UserAccount />} />
        <Route
          path="accout-varification"
          element={<UserAccoutVarification />}
        />
        <Route path="de-activation" element={<UserAccoutDeactivation />} />
        <Route path="privacy" element={<UserPrivacy />} />
        <Route path="security" element={<UserSecurity />} />
      </Route>
    </Route>
  );
};

export default BusinessRoutes;
