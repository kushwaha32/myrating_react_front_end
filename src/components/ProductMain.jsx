import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import map from "../img/map-product.png";
import webLink from "../img/web-link.png";
import akImg from "../img/akbar-tomb.jpg";
import feedback from "../img/feedback.png";
import { useGetProductBasedSlugMutation } from "../slices/productsApiSlice";
import ProductProfile from "./ProductProfile";
import useAvgRating from "../utils/ownHooks/useAvgRating";
import ProductImageGallery from "./ProductImageGallery";
import { useSelector } from "react-redux";
import StarRatingProductMain from "./StarRatingProductMain";
import useHandleEmitedLikes from "../utils/ownHooks/useHandleEmitedLikes";
import {
  useHandleCreateLikes,
  useHandleDeleteLikes,
  useHandleGetLikes,
} from "../utils/helperFunction/LikesHelperFunctions";
import useFormatNumbersInMAndK from "../utils/ownHooks/useFormatNumbersInMandK";
import { PulseLoader } from "react-spinners";
import { useGetBrandProfileMutation } from "../slices/brandProfileApiSlice";
import ThreeDotsShareAndInterest from "./threeDotsShareAndInterest";
import PageHelmetOg from "./pageHelmetForOg";

const ProductMain = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [currentProduct, setCurrentProduct] = useState({});
  const [averageRating, setAverageRating] = useState();
  const [currentProductReviews, setCurrentProductReviews] = useState([]);
  const location = useLocation().pathname.split("/");
  const [show, setShow] = useState(false);
  const [productSlug, setProductSlug] = useState(location[2]);
  const slugUrl = `/product/${productSlug}`;
  const [showLess, setShowLess] = useState(true);
  const [brandProfile, setBrandProfile] = useState({});
  const [brandLoading, setBrandLoading] = useState(false);
  const [text, setText] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga fugit aliquid perferendis excepturi necessitatibus similique id numquam omnis. Repudiandae pariatur ullam facilis illo quaerat repellendus quo? Est dolorum porro deserunt consequuntur tempora facilis repudiandae nam totam magnam at maxime esse placeat voluptatibus harum, delectus laborum, dolores ut? Laudantium, minima unde!"
  );

  ////////////////////////////////////////////////////////////////////////
  ///////////------- Get Average rating from backend -------/////////////
  //////////////////////////////////////////////////////////////////////
  useAvgRating(productSlug);

  //////////////////////////////////////////////////////////////////////////////
  ////////------- call on handleGetProduct() load component -------////////////
  ////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    handleGetProduct();
  }, []);

  //////////////////////////////////////////////////////////////////////////////
  ////////------- get current product mutation -------/////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  const [getBrandProfile] = useGetBrandProfileMutation();

  //////////////////////////////////////////////////////////////////////////////
  ////////------- get current product mutation -------/////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  const [getCurrentProductFromSlug] = useGetProductBasedSlugMutation();

  const handleGetProduct = async () => {
    try {
      setBrandLoading(true);
      const res = await getCurrentProductFromSlug({
        productSlug: productSlug,
      }).unwrap();

      if (res?.status === "success") {
        setCurrentProduct(res?.data?.product);
        const resBradProfile = await getBrandProfile({
          userId: res?.data?.product?.user,
        }).unwrap();
        setBrandProfile(resBradProfile?.data?.brandProfile);
        setBrandLoading(false);
      } else {
        console.log("something went rong");
        setBrandLoading(false);
      }
    } catch (err) {
      console.error(err);
      setBrandLoading(false);
    }
  };

  //////////////////////////////////////////////////
  ////////-----likes related stuff ---/////////////
  ////////////////////////////////////////////////
  const [likes, setLikes] = useState([]);

  const handleGetLikes = useHandleGetLikes(
    setLikes,
    currentProduct?.productNameSlug
  );
  useEffect(() => {
    if (Object.keys(currentProduct).length > 0) {
      handleGetLikes();
    }
  }, [currentProduct]);

  //////////////////////////////////////////////////////////////////
  ////////////-------- Creates new like  --------//////////////////
  ////////////////////////////////////////////////////////////////
  const [createLikesLoading, setCreateLikesLoading] = useState(false);
  const handleCreateLikes = useHandleCreateLikes(
    setLikes,
    currentProduct?._id,
    currentProduct?.productNameSlug,
    setCreateLikesLoading
  );

  //////////////////////////////////////////////////////////////////
  ////////////////-------- Remove Likes  --------//////////////////
  ////////////////////////////////////////////////////////////////
  const [removeLikesLoading, setRemoveLikesLoading] = useState(false);
  const handleDeleteLikes = useHandleDeleteLikes(
    setLikes,
    currentProduct?._id,
    currentProduct?.productNameSlug,
    setRemoveLikesLoading
  );
  //////////////////////////////////////////////////////////////////
  ////////----- handle the like and dislike event ----/////////////
  ////////////////////////////////////////////////////////////////
  useHandleEmitedLikes(setLikes, productSlug);

  //////////////////////////////////////////////////////////////////
  ////////----- handle the like and dislike event ----/////////////
  ////////////////////////////////////////////////////////////////
  const formatLikes = useFormatNumbersInMAndK();

  ///////////////////////////////////////////////////////////
  ////////----- Get average rating from state ---///////////
  /////////////////////////////////////////////////////////
  const avgRating = useSelector((state) => state.avgRating);
  const sAvgRating = avgRating.avgRating[0]?.avgRating;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <PageHelmetOg currentProduct={currentProduct} />
      <section className="product-d-menu position-relative">
        {/* ///////////////////////////////////////////////////////////////// */}
        {/* //////////---- Product profile image & name ----//////////////// */}
        {/* ///////////////////////////////////////////////////////////////  */}
        <ProductProfile
          currentProduct={currentProduct}
          currentProductReviews={currentProductReviews}
          averageRating={averageRating}
          handleClose={handleClose}
          handleShow={handleShow}
          show={show}
        />

        {/* //////////////////////////////////////////////////////////////////////// */}
        {/* //////////---- 3 dots => Share profile and interest ----//////////////// */}
        {/* //////////////////////////////////////////////////////////////////////// */}
        <ThreeDotsShareAndInterest currentProduct={currentProduct} />

        {/* //////////////////////////////////////////////////////////////////////// */}
        {/* //////////////////----------- Image Gallery -----------///////////////// */}
        {/* //////////////////////////////////////////////////////////////////////// */}
        <ProductImageGallery />

        <div className="container">
          {/* ///////////////////////////////////////////////////////////////////////////// */}
          {/* //////////////////----------- Rating of products -----------///////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////// */}
          {sAvgRating?.loading ? (
            "loading.."
          ) : (
            <div className="product-d-menu-aa-bc mt-3">
              <StarRatingProductMain star={sAvgRating?.avgRating} />
              <span>
                ({sAvgRating?.avgRating.toFixed(1)}){" "}
                {sAvgRating?.avgRating > 4.5
                  ? "Very Good"
                  : sAvgRating?.avgRating > 3 && sAvgRating?.avgRating <= 4
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
            <figcaption className="pro-img-lrt-b text-n-ab">Agra</figcaption>
          </figure>

          {/* ///////////////////////////////////////////////////////////////////////////// */}
          {/* //////////////----------- days of open and close -----------///////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////// */}
          <figure className="pro-img-lrt">
            <div className="pro-img-svg-w">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="25"
                viewBox="0 0 30.1 30.1"
                style={{ transform: "translateX(-4px)" }}
              >
                <path
                  id="Icon_awesome-thumbs-up"
                  data-name="Icon awesome-thumbs-up"
                  d="M10.847,11.86h3.311v3.311H10.847Zm4.966,0h3.311v3.311H15.813Zm4.966,0h3.311v3.311H20.779Zm-14.9,9.932H9.192V25.1H5.881Zm4.966,0h3.311V25.1H10.847Zm4.966,0h3.311V25.1H15.813Zm-4.966-4.966h3.311v3.311H10.847Zm4.966,0h3.311v3.311H15.813Zm4.966,0h3.311v3.311H20.779Zm-14.9,0H9.192v3.311H5.881Zm18.208-14.9V3.583H20.779V1.928H9.192V3.583H5.881V1.928H2.571V28.413H27.4V1.928H24.089Zm1.655,24.83H4.226V8.549H25.745Z"
                  fill="#037ca9"
                />
              </svg>
            </div>
            <figcaption className="pro-img-lrt-b text-n-ab">
              Open Monday to Saturday,{" "}
              <span className="ms-2">( Sunday - Closed )</span>
            </figcaption>
          </figure>

          {/* ///////////////////////////////////////////////////////////////////////////// */}
          {/* //////////////----------- Timing of opening -----------///////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////// */}
          <figure className="pro-img-lrt">
            <div className="pro-img-svg-w">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="23"
                viewBox="0 0 35.1 35.1"
                style={{ transform: "translateX(-4px)" }}
              >
                <path
                  id="Icon_awesome-thumbs-up"
                  data-name="Icon awesome-thumbs-up"
                  d="M17.546,3A14.561,14.561,0,1,0,32.121,17.561,14.553,14.553,0,0,0,17.546,3Zm.015,26.209A11.648,11.648,0,1,1,29.209,17.561,11.645,11.645,0,0,1,17.561,29.209Zm.728-18.929H16.1v8.736L23.749,23.6l1.092-1.791-6.552-3.888Z"
                  fill="#037ca9"
                />
              </svg>
            </div>
            <figcaption className="pro-img-lrt-b text-n-ab">
              10 AM to 05 PM
            </figcaption>
          </figure>

          {/* ///////////////////////////////////////////////////////////////////////////// */}
          {/* ///////////////////----------- Website linkes -----------//////////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////// */}
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
              www.uptourism.com
            </figcaption>
          </figure>

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
            {text.length >= 150 ? (
              <>
                {showLess ? (
                  <p className="">
                    {text.slice(0, 150)} ...{" "}
                    <button
                      className="btn btn-white py-0"
                      onClick={() => setShowLess(false)}
                    >
                      Show more
                    </button>
                  </p>
                ) : (
                  <p className="">
                    {text}
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
              <p className="">{text}</p>
            )}
          </div>

          {/* ///////////////////////////////////////////////////////////////////////////// */}
          {/* /////////////////----------- Profile listed By -------------///////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////// */}
          <div className="profile-dacription profile-listed mt-3">
            <h3>Profile listed by -</h3>
            <figure className="d-flex align-items-center ">
              <span>
                <img src={akImg} alt="" />
              </span>
              <figcaption>
                {brandLoading ? (
                  <PulseLoader
                    color="rgb(0 40 86 / 80%)"
                    loading={brandLoading}
                    size={6}
                    cssOverride={{ width: "37px" }}
                  />
                ) : (
                  brandProfile?.brandName
                )}
              </figcaption>
            </figure>
          </div>

          {/* ///////////////////////////////////////////////////////////////////////////// */}
          {/* ////////----------- like, recommend and feedback -------------////////////// */}
          {/* ///////////////////////////////////////////////////////////////////////////// */}
          <div className="follow-recom mt-4 mb-5">
            <div className="">
              {likes?.find(
                (currLike) => currLike.user === userInfo?.user?._id
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
      </section>
      <section className="product-d-detail ">
        <Outlet />
      </section>
    </>
  );
};

export default ProductMain;
