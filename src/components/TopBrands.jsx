import { Suspense, lazy, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import manImg from "../img/business-profile.png";
import map from "../img/map-product.png";
import webLink from "../img/web-link.png";
import feedback from "../img/feedback.png";
import "../assets/css/user.css";
import ShadowLayout from "./ShadowLayout";
import ImgWithSideCaption from "./ImgWithSideCaption";
import UserAndProductNavigationBtn from "./UserAndProductNavigationBtn";
import { useGetSingleBrandMutation } from "../slices/topBrandApiSlice";
import { useCategoryIfHasProductsBySlugMutation } from "../slices/categoryApiSlice";
import PageHelmetOg from "./pageHelmetForOg";
import StarRatingProductMain from "./StarRatingProductMain";
import useFormatNumbersInMAndK from "../utils/ownHooks/useFormatNumbersInMandK";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import useBrandAvgRating from "../utils/ownHooks/useBrandAvgRating";
import {
  useHandleCreateBrandLikes,
  useHandleDeleteBrandLikes,
  useHandleGetBrandLikes,
} from "../utils/helperFunction/brandLikesHelperFunction";
import RangeOfOpenDays from "./rangeOfOpenDays";

const ThreeDotsShareAndInterest = lazy(() =>
  import("./threeDotsShareAndInterest")
);
const ProductImageGallery = lazy(() => import("./ProductImageGallery"));

const TopBrands = () => {
  const { brandAvgRating } = useSelector((state) => state?.brandAvgRating);
  const sAvgRating = brandAvgRating?.[0];

  const [showLess, setShowLess] = useState(true);

  // set the current top brand
  const [currentBrand, setCurrentBrand] = useState({});
  const [subCategory, setSubCategory] = useState([]);

  const [categoryIfHasProducts, { isLoading }] =
    useCategoryIfHasProductsBySlugMutation();
  // get the current brand
  const [getCurrentBrand, { isLoading: currentbLoading }] =
    useGetSingleBrandMutation();

  // get the current brand slug name
  const location = useLocation();
  const brans_slug = location?.pathname?.split("/")[2];

  const slugUrl = `/top-brand/${brans_slug}`;

  ////////////////////////////////////////////////////////////////////////
  ///////////------- Get Average rating from backend -------/////////////
  //////////////////////////////////////////////////////////////////////
  useBrandAvgRating(brans_slug);

  ///////////////////////////////////////////////////////////////////
  ////////----- Get the userInfo from redux toolkit ---/////////////
  /////////////////////////////////////////////////////////////////
  const { userInfo } = useSelector((state) => state.auth);

  //////////////////////////////////////////////////
  ////////-----likes related stuff ---/////////////
  ////////////////////////////////////////////////
  const [likes, setLikes] = useState([]);
  const handleGetLikes = useHandleGetBrandLikes(
    setLikes,
    currentBrand?.brandNameSlug
  );

  useEffect(() => {
    if (Object.keys(currentBrand).length > 0) {
      handleGetLikes();
    }
  }, [currentBrand]);

  //////////////////////////////////////////////////////////////////
  ////////----- handle the like and dislike event ----/////////////
  ////////////////////////////////////////////////////////////////
  const formatLikes = useFormatNumbersInMAndK();

  useEffect(() => {
    handleCurrentBrand();
    fetchCategory();
  }, []);

  //////////////////////////////////////////////////////////////////
  ////////////////-------- Remove Likes  --------//////////////////
  ////////////////////////////////////////////////////////////////
  const [removeLikesLoading, setRemoveLikesLoading] = useState(false);
  const handleDeleteLikes = useHandleDeleteBrandLikes(
    setLikes,
    currentBrand?._id,
    currentBrand?.brandNameSlug,
    setRemoveLikesLoading
  );

  //////////////////////////////////////////////////////////////////
  ////////////-------- Creates new like  --------//////////////////
  ////////////////////////////////////////////////////////////////
  const [createLikesLoading, setCreateLikesLoading] = useState(false);
  const handleCreateLikes = useHandleCreateBrandLikes(
    setLikes,
    currentBrand?._id,
    currentBrand?.brandNameSlug,
    setCreateLikesLoading
  );

  // handle the current brand
  const handleCurrentBrand = async () => {
    try {
      const res = await getCurrentBrand({ brandSlug: brans_slug }).unwrap();

      if (res?.status === "succcess") {
        setCurrentBrand(res?.data?.brandProfile);
      }
    } catch (error) {}
  };
  // fetch the category
  const fetchCategory = async () => {
    try {
      const res = await categoryIfHasProducts({ slug: brans_slug }).unwrap();
      if (res.status === "success") {
        setSubCategory(res?.data?.category);
      }
    } catch (error) {}
  };

  return (
    <>
      {console.log(currentBrand)}

      <PageHelmetOg currentBrand={currentBrand} />
      <section className="product-d-menu text-capitalize user-menu business position-relative">
        <ShadowLayout>
          <ImgWithSideCaption
            img={currentBrand?.brandImage || manImg}
            title={currentBrand?.brandName}
          >
            <span className="user-menu-a text-capitalize">
              {currentBrand?.industry?.name}
            </span>
          </ImgWithSideCaption>
        </ShadowLayout>

        {/* //////////////////////////////////////////////////////////////////////// */}
        {/* //////////---- 3 dots => Share profile and interest ----//////////////// */}
        {/* //////////////////////////////////////////////////////////////////////// */}
        <Suspense fallback={<div>Loading...</div>}>
          <ThreeDotsShareAndInterest />
        </Suspense>
        {/* //////////////////////////////////////////////////////////////////////// */}
        {/* //////////////////----------- Image Gallery -----------///////////////// */}
        {/* //////////////////////////////////////////////////////////////////////// */}
        <ProductImageGallery images={currentBrand?.multiImg} />

        <div className="container">
          {/* ///////////////////////////////////////////////////////////////////////////// */}
          {/* //////////////////----------- Rating of products -----------///////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////// */}
          {sAvgRating?.loading ? (
            "loading.."
          ) : (
            <div className="product-d-menu-aa-bc mt-3">
              <StarRatingProductMain
                star={sAvgRating?.brandAvgRating?.avgRating}
              />
              <span>
                ({sAvgRating?.brandAvgRating?.avgRating.toFixed(1)}){" "}
                {sAvgRating?.brandAvgRating?.avgRating > 4.5
                  ? "Very Good"
                  : sAvgRating?.brandAvgRating?.avgRating > 3 &&
                    sAvgRating?.brandAvgRating?.avgRating <= 4
                  ? "Good"
                  : ""}
              </span>
            </div>
          )}
          {/* ///////////////////////////////////////////////////////////////////////////// */}
          {/* //////////////////////----------- Likes -----------////////////////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////// */}
          <figure className="pro-img-lrt">
            <div className="pro-img-svg-w">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="25.1"
                viewBox="0 0 30.1 30.1"
              >
                <path
                  id="Path_152"
                  data-name="Path 152"
                  d="M20.43,6a6.1,6.1,0,0,0-5.1,2.9,6.1,6.1,0,0,0-5.1-2.9A6.527,6.527,0,0,0,4,12.792c0,7.064,7.365,12.893,11.331,15.87,3.966-2.976,11.331-8.805,11.331-15.87A6.527,6.527,0,0,0,20.43,6Z"
                  fill="#ff3535"
                />
              </svg>
            </div>

            <figcaption className="pro-img-lrt-b">
              <span>{formatLikes(likes?.length)}</span>
              <span>Likes</span>
            </figcaption>
          </figure>

          {/* ///////////////////////////////////////////////////////////////////////////// */}
          {/* //////////////////////----------- recomend -----------/////////////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////// */}
          <figure className="pro-img-lrt">
            <div className="pro-img-svg-w">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="20"
                viewBox="0 0 25.1 25.1"
              >
                <path
                  id="Icon_awesome-thumbs-up"
                  data-name="Icon awesome-thumbs-up"
                  d="M5.1,10.981H1.177A1.177,1.177,0,0,0,0,12.158V23.923A1.177,1.177,0,0,0,1.177,25.1H5.1a1.177,1.177,0,0,0,1.177-1.177V12.158A1.177,1.177,0,0,0,5.1,10.981ZM3.137,23.139a1.177,1.177,0,1,1,1.177-1.177A1.177,1.177,0,0,1,3.137,23.139ZM18.825,3.993c0,2.079-1.273,3.246-1.631,4.635H22.18A2.929,2.929,0,0,1,25.1,11.476a3.549,3.549,0,0,1-.953,2.412l-.005.005a4.1,4.1,0,0,1-.456,3.9,3.877,3.877,0,0,1-.8,3.665,2.6,2.6,0,0,1-.3,2.188C21.58,25.079,19.1,25.1,17,25.1h-.139A14.073,14.073,0,0,1,11,23.544a7.715,7.715,0,0,0-2.581-.793.588.588,0,0,1-.578-.588V11.683a.588.588,0,0,1,.174-.418C9.96,9.347,10.8,7.315,12.387,5.721a5.937,5.937,0,0,0,1.245-2.888C13.85,1.926,14.306,0,15.3,0,16.472,0,18.825.392,18.825,3.993Z"
                  fill="#1592e6"
                />
              </svg>
            </div>
            <figcaption className="pro-img-lrt-b">
              <span>150K</span>
              <span>Recommends</span>
            </figcaption>
          </figure>

          {/* ///////////////////////////////////////////////////////////////////////////// */}
          {/* //////////////////////----------- location -----------/////////////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////// */}
          <figure className="pro-img-lrt">
            <div className="pro-img-svg-w">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 26.1 25.1"
              >
                <image
                  href={map}
                  width="100%"
                  height="100%"
                  transform="translate(-7)"
                />
              </svg>
            </div>
            <figcaption className="pro-img-lrt-b text-n-ab">
              {currentBrand?.location?.city}
            </figcaption>
          </figure>

          {/* ///////////////////////////////////////////////////////////////////////////// */}
          {/* //////////////----------- days of open and close -----------///////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////// */}
          {currentBrand?.hoursOfOperation &&
          JSON.parse(currentBrand?.hoursOfOperation)?.isHoursOpenPublic ? (
            <RangeOfOpenDays
              operationDay={
                JSON?.parse(currentBrand?.hoursOfOperation)?.operationDay
              }
            />
          ) : (
            ""
          )}

          {/* ///////////////////////////////////////////////////////////////////////////// */}
          {/* ///////////////////----------- Website linkes -----------//////////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////// */}
          {currentBrand?.websites &&
            JSON.parse(currentBrand?.websites)?.map((currWeb) => (
              <>
                {currWeb?.isWbsitesPublic ? (
                  <figure className="pro-img-lrt">
                    <div className="pro-img-svg-w">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 35.1 35.1"
                        style={{ transform: "translateX(-6px)" }}
                      >
                        <image href={webLink} width="100%" height="100%" />
                      </svg>
                    </div>
                    <figcaption className="pro-img-lrt-b text-n-ab">
                      {currWeb?.websites}
                    </figcaption>
                  </figure>
                ) : (
                  ""
                )}
              </>
            ))}

          {/* ///////////////////////////////////////////////////////////////////////////// */}
          {/* ///////////////////----------- Contact details -----------//////////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////// */}
          <div className="row">
            {/* ///////////////////////////////////////////////////////////////////////////// */}
            {/* ///////////////////----------- Contact Number -----------//////////////////// */}
            {/* ///////////////////////////////////////////////////////////////////////////// */}
            <div className="col-lg-6">
              <figure className="pro-img-lrt">
                <div className="pro-img-svg-w">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15.625"
                    height="23"
                    viewBox="0 0 15.625 25"
                  >
                    <path
                      id="Icon_awesome-thumbs-up"
                      data-name="Icon awesome-thumbs-up"
                      d="M13.281,0H2.344A2.344,2.344,0,0,0,0,2.344V22.656A2.344,2.344,0,0,0,2.344,25H13.281a2.344,2.344,0,0,0,2.344-2.344V2.344A2.344,2.344,0,0,0,13.281,0ZM7.812,23.438a1.563,1.563,0,1,1,1.563-1.562A1.561,1.561,0,0,1,7.812,23.438Zm5.469-5.273a.588.588,0,0,1-.586.586H2.93a.588.588,0,0,1-.586-.586V2.93a.588.588,0,0,1,.586-.586H12.7a.588.588,0,0,1,.586.586Z"
                      fill="#037ca9"
                    />
                  </svg>
                </div>
                <figcaption className="pro-img-lrt-b text-n-ab">
                  0120-651250
                </figcaption>
              </figure>
            </div>

            {/* ///////////////////////////////////////////////////////////////////////////// */}
            {/* ///////////////////----------- Contact watsup -----------//////////////////// */}
            {/* ///////////////////////////////////////////////////////////////////////////// */}
            <div className="col-lg-6">
              {" "}
              <figure className="pro-img-lrt">
                <div className="pro-img-svg-w">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Icon_awesome-whatsapp"
                      data-name="Icon awesome-whatsapp"
                      d="M20.405,5.738A11.9,11.9,0,0,0,1.687,20.089L0,26.25l6.305-1.655a11.857,11.857,0,0,0,5.684,1.446h.005A12.007,12.007,0,0,0,24,14.148a11.94,11.94,0,0,0-3.595-8.411Zm-8.411,18.3a9.867,9.867,0,0,1-5.036-1.377L6.6,22.446l-3.739.98,1-3.648L3.621,19.4a9.9,9.9,0,1,1,18.37-5.255A10,10,0,0,1,11.995,24.038Zm5.421-7.4c-.295-.15-1.757-.868-2.03-.964s-.471-.15-.67.15-.766.964-.943,1.168-.348.225-.643.075a8.089,8.089,0,0,1-4.045-3.536c-.305-.525.305-.487.873-1.623a.551.551,0,0,0-.027-.52c-.075-.15-.67-1.613-.916-2.207-.241-.579-.488-.5-.67-.509s-.37-.011-.568-.011a1.1,1.1,0,0,0-.793.37,3.339,3.339,0,0,0-1.039,2.48,5.822,5.822,0,0,0,1.211,3.075,13.279,13.279,0,0,0,5.079,4.489c1.886.814,2.625.884,3.568.745a3.044,3.044,0,0,0,2-1.414,2.485,2.485,0,0,0,.171-1.414C17.909,16.854,17.711,16.779,17.416,16.634Z"
                      transform="translate(0 -2.25)"
                      fill="#037ca9"
                    />
                  </svg>
                </div>
                <figcaption className="pro-img-lrt-b text-n-ab">
                  +91 6397591095
                </figcaption>
              </figure>
            </div>
          </div>
          {/* ///////////////////////////////////////////////////////////////////////////// */}
          {/* /////////////////----------- Profile Description -----------///////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////// */}
          <div className="profile-dacription mt-3">
            <h3>Description</h3>
            {currentBrand?.description &&
            currentBrand?.description.length >= 150 ? (
              <>
                {showLess ? (
                  <p className="">
                    {currentBrand?.description.slice(0, 150)} ...{" "}
                    <button
                      className="btn btn-white py-0"
                      onClick={() => setShowLess(false)}
                    >
                      Show more
                    </button>
                  </p>
                ) : (
                  <p className="">
                    {currentBrand?.description}
                    <button
                      className="btn btn-white py-0"
                      onClick={() => setShowLess(true)}
                    >
                      Show less
                    </button>
                  </p>
                )}
              </>
            ) : (
              <p className="">{currentBrand?.description}</p>
            )}
          </div>

          {/* ///////////////////////////////////////////////////////////////////////////// */}
          {/* ////////----------- like, recommend and feedback -------------////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////// */}
          <div className="follow-recom mt-4 mb-5">
            <div className="">
              {likes?.find(
                (currLike) => currLike?.user === userInfo?.user?._id
              ) ? (
                <button
                  className="btn btn-white py-0"
                  onClick={handleDeleteLikes}
                  style={{ background: "#D3FFC1" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="25.1"
                    viewBox="0 0 30.1 30.1"
                  >
                    <path
                      id="Path_152"
                      data-name="Path 152"
                      d="M20.43,6a6.1,6.1,0,0,0-5.1,2.9,6.1,6.1,0,0,0-5.1-2.9A6.527,6.527,0,0,0,4,12.792c0,7.064,7.365,12.893,11.331,15.87,3.966-2.976,11.331-8.805,11.331-15.87A6.527,6.527,0,0,0,20.43,6Z"
                      fill="#ff3535"
                    />
                  </svg>
                  <span>
                    {removeLikesLoading ? (
                      <PulseLoader
                        color="rgb(0 40 86 / 80%)"
                        loading={removeLikesLoading}
                        size={6}
                        cssOverride={{ width: "37px" }}
                      />
                    ) : (
                      "Unlike"
                    )}
                  </span>
                </button>
              ) : (
                <button
                  className="btn btn-white py-0"
                  onClick={handleCreateLikes}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="25.1"
                    viewBox="0 0 30.1 30.1"
                  >
                    <path
                      id="Path_152"
                      data-name="Path 152"
                      d="M20.43,6a6.1,6.1,0,0,0-5.1,2.9,6.1,6.1,0,0,0-5.1-2.9A6.527,6.527,0,0,0,4,12.792c0,7.064,7.365,12.893,11.331,15.87,3.966-2.976,11.331-8.805,11.331-15.87A6.527,6.527,0,0,0,20.43,6Z"
                      fill="#ff3535"
                    />
                  </svg>
                  <span>
                    {createLikesLoading ? (
                      <PulseLoader
                        color="rgb(0 40 86 / 80%)"
                        loading={createLikesLoading}
                        size={6}
                        cssOverride={{ width: "37px" }}
                      />
                    ) : (
                      "Like"
                    )}{" "}
                  </span>
                </button>
              )}
            </div>
            <div className="">
              <button className="btn btn-white py-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="20"
                  viewBox="0 0 25.1 25.1"
                >
                  <path
                    id="Icon_awesome-thumbs-up"
                    data-name="Icon awesome-thumbs-up"
                    d="M5.1,10.981H1.177A1.177,1.177,0,0,0,0,12.158V23.923A1.177,1.177,0,0,0,1.177,25.1H5.1a1.177,1.177,0,0,0,1.177-1.177V12.158A1.177,1.177,0,0,0,5.1,10.981ZM3.137,23.139a1.177,1.177,0,1,1,1.177-1.177A1.177,1.177,0,0,1,3.137,23.139ZM18.825,3.993c0,2.079-1.273,3.246-1.631,4.635H22.18A2.929,2.929,0,0,1,25.1,11.476a3.549,3.549,0,0,1-.953,2.412l-.005.005a4.1,4.1,0,0,1-.456,3.9,3.877,3.877,0,0,1-.8,3.665,2.6,2.6,0,0,1-.3,2.188C21.58,25.079,19.1,25.1,17,25.1h-.139A14.073,14.073,0,0,1,11,23.544a7.715,7.715,0,0,0-2.581-.793.588.588,0,0,1-.578-.588V11.683a.588.588,0,0,1,.174-.418C9.96,9.347,10.8,7.315,12.387,5.721a5.937,5.937,0,0,0,1.245-2.888C13.85,1.926,14.306,0,15.3,0,16.472,0,18.825.392,18.825,3.993Z"
                    fill="#1592e6"
                  />
                </svg>
                <span>Recommend</span>
              </button>
            </div>
            <div className="">
              <button className="btn btn-white py-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="27"
                  viewBox="0 0 25.1 25.1"
                >
                  <image href={feedback} width="100%" height="100%" />
                </svg>
                <span>Feedback</span>
              </button>
            </div>
          </div>
        </div>

        <div className="container top-b-pro-ab">
          <UserAndProductNavigationBtn
            slugUrlO={`${slugUrl}/products`}
            slugUrlT={`${slugUrl}/products/`}
            title="All Products"
          />

          {isLoading ? (
            <>Loading...</>
          ) : (
            <>
              {subCategory?.map((currCat, index) => {
                return (
                  <>
                    {currCat?.products?.length > 0 && (
                      <>
                        <UserAndProductNavigationBtn
                          slugUrlO={`${slugUrl}/products/${currCat?.slug}`}
                          slugUrlT={`${slugUrl}/products/${currCat?.slug}/`}
                          title={currCat?.name}
                          key={index}
                        />
                      </>
                    )}
                  </>
                );
              })}
            </>
          )}
        </div>
      </section>
      <section className="product-d-detail">
        <Outlet />
      </section>
    </>
  );
};

export default TopBrands;
