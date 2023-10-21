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
import BusinessMain from "../components/business/BusinessMain";
import BusinessAbout from "../components/business/BusinessAbout";
import BusinessContactInfo from "../components/business/BusinessContactInfo";
import UpdateProductProfile from "../components/business/UpdateProductProfile";
import ProductQrCode from "../components/ProductQrCode";
import BusinessQrcodeMain from "../components/business/BusinessQrCodeMain";
import { Suspense, lazy } from "react";
import CommonPageLoader from "../components/commonPageLoader/commonPageLoader";
import ProductPhotosAndVideos from "../components/businessConsole/createProfile/productPhotosAndVideos";
import ThankYou from "../components/businessConsole/createProfile/thankuPage";

const UpdateProfile = lazy(() =>
  import("../components/businessConsole/updateProfile/UpdateProfile")
);

const ProfileKeywords = lazy(() =>
  import("../components/businessConsole/createProfile/ProfileKeywords")
);

const ProductOtherInformation = lazy(() =>
  import("../components/businessConsole/createProfile/otherInformation")
);

const ProductContactInformation = lazy(() =>
  import("../components/businessConsole/createProfile/contactInformation")
);

const LocationInformation = lazy(() =>
  import("../components/businessConsole/createProfile/LocationInformation")
);

const ProductInformation = lazy(() =>
  import("../components/businessConsole/createProfile/productInformation")
);

const CreateProfile = lazy(() =>
  import("../components/businessConsole/createProfile/CreateProfile")
);
const CategoryBasedProduct = lazy(() =>
  import("../components/business/productCategories/CategoryBasedProduct")
);

const AllProducts = lazy(() =>
  import("../components/business/productCategories/AllProducts")
);

const BusinessConsoleMain = lazy(() =>
  import("../components/businessConsole/businessConsoleMain")
);
const BusinessDashboard = lazy(() =>
  import("../components/businessConsole/dashboard")
);
const ListedProfile = lazy(() =>
  import("../components/businessConsole/listedProfile")
);

const BusinessRoutes = () => {
  return (
    /////////////////////////////////////////////////////////////////////////////////
    ////////////////////---- Main route contain side bar & body ----////////////////
    ///////////////////////////////////////////////////////////////////////////////
    <Route
      path="/business/:id"
      element={
        <Suspense fallback={<CommonPageLoader />}>
          <BusinessConsoleMain />
        </Suspense>
      }
    >
      {/* /////////////////////////////////////////////////////////////////////////////// */}
      {/* ///////////---- Dashbord Outlet that appear inside the body ----/////////////// */}
      {/*//////////////////////////////////////////////////////////////////////////////// */}
      <Route
        path=""
        element={
          <Suspense fallback={<CommonPageLoader />}>
            <BusinessDashboard />
          </Suspense>
        }
      />

      {/* ///////////////////////////////////////////////////////////////////////// */}
      {/* ///////---- Create profile Outlet that appear inside the body ----/////// */}
      {/*////////////////////////////////////////////////////////////////////////// */}
      <Route
        path="listed-profile/create-profile"
        element={
          <Suspense fallback={<CommonPageLoader />}>
            <CreateProfile />
          </Suspense>
        }
      >
        {/* ///////////////////////////////////////////////////////////////////////// */}
        {/* ////////////////----- the Product Information route -----//////////////// */}
        {/*////////////////////////////////////////////////////////////////////////// */}
        <Route
          index
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <ProductInformation />
            </Suspense>
          }
        />

        {/* ///////////////////////////////////////////////////////////////////////// */}
        {/* //////////////-----  Product Location Information route -----//////////// */}
        {/*////////////////////////////////////////////////////////////////////////// */}
        <Route
          path="location-information"
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <LocationInformation />
            </Suspense>
          }
        />

        {/* ///////////////////////////////////////////////////////////////////////// */}
        {/* //////////////-----  Product contact Information route -----///////////// */}
        {/*////////////////////////////////////////////////////////////////////////// */}
        <Route
          path="contact-information"
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <ProductContactInformation />
            </Suspense>
          }
        />

        {/* ///////////////////////////////////////////////////////////////////////// */}
        {/* //////////////-----  Product other Information route -----///////////// */}
        {/*////////////////////////////////////////////////////////////////////////// */}
        <Route
          path="other-information"
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <ProductOtherInformation />
            </Suspense>
          }
        />
        {/* ///////////////////////////////////////////////////////////////////////// */}
        {/* ////////////////////-----  Product keyword route -----/////////////////// */}
        {/*////////////////////////////////////////////////////////////////////////// */}
        <Route
          path="profile-keyboards"
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <ProfileKeywords />
            </Suspense>
          }
        />

        {/* ///////////////////////////////////////////////////////////////////////// */}
        {/* //////////////////----- Upload product photos route -----//////////////// */}
        {/*////////////////////////////////////////////////////////////////////////// */}
        <Route
          path="upload-photos"
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <ProductPhotosAndVideos />
            </Suspense>
          }
        />

        {/* ////////////////////////////////////////////////////////////////////// */}
        {/* /////////////////////////------- Thank you --------/////////////////// */}
        {/*/////////////////////////////////////////////////////////////////////// */}
        <Route
          path="thank-you"
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <ThankYou />
            </Suspense>
          }
        />
      </Route>

      {/* ///////////////////////////////////////////////////////////////////////// */}
      {/* ///////---- Create profile Outlet that appear inside the body ----/////// */}
      {/*////////////////////////////////////////////////////////////////////////// */}
      <Route
        path="update-product-profile/:id"
        element={
          <Suspense fallback={<CommonPageLoader />}>
            <UpdateProfile />
          </Suspense>
        }
      ></Route>

      {/* /////////////////////////////////////////////////////////////////////////////// */}
      {/* /////////---- listed Profiles Outlet that appear inside the body ----////////// */}
      {/*//////////////////////////////////////////////////////////////////////////////// */}
      <Route
        path="listed-profile"
        element={
          <Suspense fallback={<CommonPageLoader />}>
            <ListedProfile />
          </Suspense>
        }
      >
        {/* /////////////////////////////////////////////////////////////////////////////// */}
        {/* //////---- All Product Outlet that appear inside the listed Profiles ----////// */}
        {/*//////////////////////////////////////////////////////////////////////////////// */}
        <Route
          index
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <AllProducts />
            </Suspense>
          }
        />

        <Route
          path={`north-indian-dish`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`south-indian-dish`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`sweet-dish`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`vegeterian-food`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`non-vegeterian-food`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`beverage`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`chineese-foods`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`north-indian-foods`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`sea-foods`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`room`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`tea`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`mineral-water`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`coffee`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`fast-foods`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`healthy-food`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`other`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`tour-packages`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`bus-service`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`car-service`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`taxi-service`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`tour-guide-service`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`city`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`historical-monuments`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`tourist-places`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`attractions`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`beaches`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
        <Route
          path={`religious-places`}
          element={
            <Suspense fallback={<CommonPageLoader />}>
              <CategoryBasedProduct />
            </Suspense>
          }
        />
      </Route>
    </Route>
  );
};

export default BusinessRoutes;

// <Route path="about" element={<BusinessMain />}>
// <Route index element={<BusinessAbout />} />
// <Route path="contact-information" element={<BusinessContactInfo />} />
// </Route>
// {/* create product profile */}
// <Route path="create-profile" element={<CreateProductProfile />} />
// {/* update product profile  */}
// <Route
// path="update-product-profile/:productNameSlug"
// element={<UpdateProductProfile />}
// />

// {/* </Route> */}
{
  //  <Route path="ratings" element={<BusinessRatingMain />}> */
}
{
  /* <Route index element={<AllProducts />} /> */
}
// {/* {userInfo?.user?.brandProfile?.industry?.subCategory?.map((currCat) => (
//   <Route key={currCat?._id} path={currCat?.slug} element={<CategoryBasedProduct />} />
// ))} */}

// <Route path={`north-indian-dish`} element={<CategoryBasedProduct />} />
// <Route path={`south-indian-dish`} element={<CategoryBasedProduct />} />
// <Route path={`sweet-dish`} element={<CategoryBasedProduct />} />
// <Route path={`vegeterian-food`} element={<CategoryBasedProduct />} />
// <Route
//   path={`non-vegeterian-food`}
//   element={<CategoryBasedProduct />}
// />
// <Route path={`beverage`} element={<CategoryBasedProduct />} />
// <Route path={`chineese-foods`} element={<CategoryBasedProduct />} />
// <Route path={`north-indian-foods`} element={<CategoryBasedProduct />} />
// <Route path={`sea-foods`} element={<CategoryBasedProduct />} />
// <Route path={`room`} element={<CategoryBasedProduct />} />
// <Route path={`tea`} element={<CategoryBasedProduct />} />
// <Route path={`mineral-water`} element={<CategoryBasedProduct />} />
// <Route path={`coffee`} element={<CategoryBasedProduct />} />
// <Route path={`fast-foods`} element={<CategoryBasedProduct />} />
// <Route path={`healthy-food`} element={<CategoryBasedProduct />} />
// <Route path={`other`} element={<CategoryBasedProduct />} />
// <Route path={`tour-packages`} element={<CategoryBasedProduct />} />
// <Route path={`bus-service`} element={<CategoryBasedProduct />} />
// <Route path={`car-service`} element={<CategoryBasedProduct />} />
// <Route path={`taxi-service`} element={<CategoryBasedProduct />} />
// <Route path={`tour-guide-service`} element={<CategoryBasedProduct />} />
// <Route path={`city`} element={<CategoryBasedProduct />} />
// <Route
//   path={`historical-monuments`}
//   element={<CategoryBasedProduct />}
// />
// <Route path={`tourist-places`} element={<CategoryBasedProduct />} />
// <Route path={`attractions`} element={<CategoryBasedProduct />} />
// <Route path={`beaches`} element={<CategoryBasedProduct />} />
// <Route path={`religious-places`} element={<CategoryBasedProduct />} />
// </Route>
// <Route path="qrcode" element={<BusinessQrcodeMain />}>
// <Route index element={<UserQrcode />} />
// <Route path="product/:productNameSlug" element={<ProductQrCode />} />
// </Route>
// <Route path="setting" element={<UserSettingMain />}>
// <Route index element={<UserAccount />} />
// <Route
//   path="accout-varification"
//   element={<UserAccoutVarification />}
// />
// <Route path="de-activation" element={<UserAccoutDeactivation />} />
// <Route path="privacy" element={<UserPrivacy />} />
// <Route path="security" element={<UserSecurity />} />
// </Route> */}
