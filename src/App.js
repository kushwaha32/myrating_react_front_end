import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// product screens
import Home from "./screens/Home";
import NotFound from "./components/404";
import ExploreProduct from "./components/ExploreProduct";
import UserRoutes from "./routes/UserRoutes";
import { IsTabletOrLess } from "./utils/mediaScreens";
import UserRoutesBelow767 from "./routes/UserRoutesBelow767";
import ProductRoutes from "./routes/ProductRoutes";
import ProductRoutesBelow767 from "./routes/ProductRoutesBelow767";
import BusinessRoutes from "./routes/BusinessRoutes";
import BusinessRoutesBelow767 from "./routes/BusinessRoutesBelow767";
import { useSelector } from "react-redux";
import Product from "./components/product";
import AllProductsBasedOnCategory from "./components/AllProductsBasedOnCategory";
import TopBrandsRoute from "./routes/TopBrandRoute";
import AllProducts from "./screens/AllProducts";
import AllTopBrands from "./screens/AllTopBrands";
import RegisterUser from "./screens/RegisterUser";
import PersonalInformation from "./components/userRegistration/PersonalInformation";
import MobileNumberVerification from "./components/userRegistration/MobileNumberVerification";
import UploadProfilePhoto from "./components/userRegistration/UploadProfilePhoto";
import SubmitForVerification from "./components/userRegistration/SubmitForVerification";
import VerificationMessage from "./components/userRegistration/VerificationMessage";
import ListYourBusiness from "./screens/ListYourBusiness";
import BusinessOrCompanyInfo from "./components/businessListing/BusinessOrCompanyInfo";
import MobileNumberEmailVerification from "./components/businessListing/MobileNoEmailVerification";
import BusinessCompanyCategory from "./components/businessListing/businessCompanyCategory";
import LocationInformation from "./components/businessListing/locationInformation";
import ContactInformation from "./components/businessListing/contactInformation";
import OtherInformation from "./components/businessListing/otherInformation";
import BusinessKeyword from "./components/businessListing/businessKeywords";
import UploadPhotoVideoLogo from "./components/businessListing/uploadPhotoVideoLogo";
import SubmitForBusinessVerification from "./components/businessListing/submitForVerification";
import BusinessConfirmation from "./components/businessListing/BusinessConfirmation";

// get the user routes
const getUserRoutes = UserRoutes();
const getUserRbelow767 = UserRoutesBelow767();

// get the business routes
const getBusinessRoutes = BusinessRoutes();
const getBusinessRoutesBelow76 = BusinessRoutesBelow767();

// get the product routes
const getProductRoutes = ProductRoutes();
const getProductRoutesBelow767 = ProductRoutesBelow767();

// get the top brands
const getTopBrand = TopBrandsRoute();

function App() {
  const { userInfo } = useSelector((state) => state?.auth);
  const isTabletOrLess = IsTabletOrLess();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Product />} />

            {/* <Route path="/city" element={<AllProductsBasedOnCategory />} /> */}
            {/* <Route
              path="/historical-monuments"
              element={<AllProductsBasedOnCategory />}
            /> */}
            <Route
              path="/tourist-places"
              element={<AllProductsBasedOnCategory />}
            />
            <Route
              path="/attractions"
              element={<AllProductsBasedOnCategory />}
            />
            <Route path="/beaches" element={<AllProductsBasedOnCategory />} />
            <Route
              path="/religious-places"
              element={<AllProductsBasedOnCategory />}
            />
            {/* <Route path="/other" element={<AllProductsBasedOnCategory />} /> */}
          </Route>
          {/*//////////////////////////////////////////////////////////////////*/}
          {/*/////////// --------- Normal user registration ---------- ////////*/}
          {/*//////////////////////////////////////////////////////////////////*/}
          <Route path="/register" element={<RegisterUser />}>
            <Route index element={<PersonalInformation />} />
            <Route
              path="mobile-no-verification"
              element={<MobileNumberVerification />}
            />
            <Route
              path="upload-profile-photo"
              element={<UploadProfilePhoto />}
            />
            <Route
              path="submit-for-varification"
              element={<SubmitForVerification />}
            />
            <Route
              path="varification-message"
              element={<VerificationMessage />}
            />
          </Route>

          {/*//////////////////////////////////////////////////////////////////*/}
          {/*//////////// --------- Business Listing  -------------////////////*/}
          {/*//////////////////////////////////////////////////////////////////*/}
          <Route path="/list-your-business" element={<ListYourBusiness />}>
            <Route index element={<BusinessOrCompanyInfo />} />
            <Route
              path="mobile-no-e-mail-id-verification"
              element={<MobileNumberEmailVerification />}
            />
            <Route
              path="business-company-category"
              element={<BusinessCompanyCategory />}
            />
            <Route
              path="location-information"
              element={<LocationInformation />}
            />
            <Route
              path="contact-information"
              element={<ContactInformation />}
            />
            <Route path="other-information" element={<OtherInformation />} />
            <Route path="business-keywords" element={<BusinessKeyword />} />
            <Route
              path="upload-photo-video-logo"
              element={<UploadPhotoVideoLogo />}
            />
            <Route
              path="submit-for-verification"
              element={<SubmitForBusinessVerification />}
            />
            <Route
              path="submit-for-verification-confirm"
              element={<BusinessConfirmation />}
            />
          </Route>

          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/all-brands" element={<AllTopBrands />} />
          {/* //////////////////////////////////////////////////////////////// */}
          {/* ///////////////////------ product Route ------////////////////// */}
          {/* //////////////////////////////////////////////////////////////// */}
          {/* {isTabletOrLess ? getProductRoutesBelow767 : getProductRoutes} */}
          {getProductRoutes}

          {/* top brand route */}
          {getTopBrand}

          {userInfo?.user?.role === "user" ? (
            <>
              {/* user Route */}
              {isTabletOrLess ? getUserRbelow767 : getUserRoutes}
            </>
          ) : userInfo?.user?.role === "business" ? (
            <>
              {/* brand route */}
              {isTabletOrLess ? getBusinessRoutesBelow76 : getBusinessRoutes}
            </>
          ) : (
            <>
              <Route path="/navigate" element={<Navigate to="/" />} />
            </>
          )}
          {/* Use a Route component to wrap the Navigate */}

          {/* user route ends here */}
          <Route path="/explore-product" element={<ExploreProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
