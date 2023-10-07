import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import starModified from "../../img/start-modified.png";
import ShadowLayout from "../ShadowLayout";
import Modal from "react-bootstrap/Modal";
import aktumb from "../../img/akbar-tomb.jpg";
import ImgWithSideCaption from "../ImgWithSideCaption";
import ReviewAgreeAndDisagree from "../ReviewAgreeAndDisagree";
import StarRatingProductMain from "../StarRatingProductMain";
import useRemoveReview from "../../utils/ownHooks/useRemoveReview";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UseComponentLoading from "../../utils/ownHooks/useComponentLoading";
import ProductImageGallery from "../ProductImageGallery";
import ReviewImageGallery from "./reviewImageGallery";
import { PulseLoader } from "react-spinners";
import RatingAndReviewUpdate from "../RatingAndReviewModelUpdate";
import useGetCurrentProduct from "../../utils/ownHooks/useGetCurrentProduct";
import { useGetFilteredRatingMutation } from "../../slices/ratingApiSlice";
import { setRatings } from "../../slices/ratingSlice";
import LoaderFade from "../loader/loaderFade";

const PositiveRatingReview = () => {
  const [currentRating, setCurrentRating] = useState();
  const [show, setShow] = useState(false);
  const [showLess, setShowLess] = useState(true);
  const location = useLocation().pathname.split("/")[2];
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  ///////////////////////////////////////////////////////////////////
  ////----- get all the review and rating of current product ---////
  /////////////////////////////////////////////////////////////////
  const { ratings } = useSelector((state) => state.ratings);
  const { userInfo } = useSelector((state) => state.auth);

  //////////////////////////////////////////////////
  ////////----- get the current product ---////////
  ////////////////////////////////////////////////
  const currentProduct = useGetCurrentProduct(location);

  //////////////////////////////////////////////////
  /////////----- remove review method ---//////////
  ////////////////////////////////////////////////
  const deleteRating = useRemoveReview(location, setDeleteLoading);

  //////////////////////////////////////////////////
  ///----- update model show and hide state ---////
  ////////////////////////////////////////////////
  const handleClose = () => setShow(false);
  const handleShow = (rat) => {
    setCurrentRating(rat);
    setShow(true);
  };

  //////////////////////////////////////////////////
  ///----- Get filtered rating mutation ---////////
  ////////////////////////////////////////////////
  const [getFilteredRating, { isLoading: filteredLoading }] =
    useGetFilteredRatingMutation();

  useEffect(() => {
    handleReviewFilter();
  }, []);
  const handleReviewFilter = async () => {
    try {
      setLoading(true);
      let query = `page=0&&limit=10&&productSlug=${location}&&sort=-rating`;

      const res = await getFilteredRating({ query }).unwrap();
      if (res.status === "success") {
        dispatch(setRatings(res.data.reviews));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  if (loading) {
    return <LoaderFade />;
  } else {
    return (
      <>
        <Modal show={show} onHide={handleClose} className="model-width">
          <RatingAndReviewUpdate
            handleClose={handleClose}
            product={currentProduct}
            currentRating={currentRating}
          />
        </Modal>
        {/* user Reviews */}
        {ratings.length > 0 ? (
          <>
            {ratings?.map((rating) => (
              <div className="container pro-reviw-now" key={rating?._id}>
                <ShadowLayout horizontal={true}>
                  <div className="rating-main-bbcMIs">
                    {/* //////////////////////////////////////////////////////////// */}
                    {/* /////////////--------- Brand Lavel  --------//////////////// */}
                    {/* //////////////////////////////////////////////////////////// */}
                    <ImgWithSideCaption
                      img={`${rating?.user?.userProfile?.userImg || "man.png"}`}
                      styImg={styImg}
                      link={`/user/${rating?.user?._id}/about`}
                      title={rating?.user?.userProfile?.name}
                    >
                      {/* //////////////////////////////////////////////////////////// */}
                      {/* /////////////--------- Brand Lavel  --------//////////////// */}
                      {/* //////////////////////////////////////////////////////////// */}
                      <ul className="brand-lavel">
                        <li>
                          <img src={starModified} alt="" />
                        </li>
                        <li>Lavel - 1.1 </li>
                        <li> Novice</li>
                      </ul>
                    </ImgWithSideCaption>
                  </div>
                  {/* ////////////////////////////////////////////////////////////////////// */}
                  {/* /////////////--------- Given rating and Date  --------//////////////// */}
                  {/* ////////////////////////////////////////////////////////////////////// */}
                  <div className=" product-d-menu-aa-bbc d-flex align-items-center justify-content-between">
                    {/* ////////////////////////////////////////////////////////////////////// */}
                    {/* /////////////////--------- Given rating   --------//////////////////// */}
                    {/* ////////////////////////////////////////////////////////////////////// */}
                    <div className="d-flex align-items-center">
                      <span className="d-flex">
                        <StarRatingProductMain star={rating?.rating} />
                      </span>

                      <span
                        className="ms-3"
                        style={{ position: "relative", top: "1px" }}
                      >
                        ({rating?.rating})
                      </span>
                    </div>

                    {/* ////////////////////////////////////////////////////////////////////// */}
                    {/* /////////////--------- Rating Date Or timing  --------//////////////// */}
                    {/* ////////////////////////////////////////////////////////////////////// */}
                    <span className="rating-main-bbb">
                      <span className="text-capitalize">
                        {moment(rating?.createdAt).startOf("minutes").fromNow()}
                        {/* {moment(rating?.createdAt).calendar()} */}
                      </span>
                    </span>
                  </div>
                  {/* ////////////////////////////////////////////////////////////////////// */}
                  {/* ////////////////////--------- User Review  --------/////////////////// */}
                  {/* ////////////////////////////////////////////////////////////////////// */}
                  {rating?.review?.length >= 150 ? (
                    <>
                      {showLess ? (
                        <p className="product-d-menu-aa-bbd ">
                          {rating?.review?.slice(0, 150)} ...{" "}
                          <button
                            className="btn btn-white py-0"
                            onClick={() => setShowLess(false)}
                          >
                            Show more
                          </button>
                        </p>
                      ) : (
                        <p className="product-d-menu-aa-bbd ">
                          {rating?.review}
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
                    <p className="product-d-menu-aa-bbd ">{rating?.review}</p>
                  )}

                  {/* ////////////////////////////////////////////////////////////////////// */}
                  {/* ////////////////////--------- Attachment  --------//////////////////// */}
                  {/* ////////////////////////////////////////////////////////////////////// */}
                  <div className="attachment-show-img">
                    {rating?.reviewImg ? (
                      <ReviewImageGallery
                        images={JSON.parse(rating?.reviewImg)}
                      />
                    ) : (
                      ""
                    )}
                  </div>

                  {/* ////////////////////////////////////////////////////////////////////// */}
                  {/* /////////--------- Agree, disagree, edit and delete  --------///////// */}
                  {/* ////////////////////////////////////////////////////////////////////// */}
                  <div className="product-d-menu-aa-bbea">
                    {/* ////////////////////////////////////////////////////////////////////// */}
                    {/* //////////////////--------- Agree and disagree --------/////////////// */}
                    {/* ////////////////////////////////////////////////////////////////////// */}
                    <ReviewAgreeAndDisagree rating={rating} />

                    <div className="product-d-menu-aa-bbeb">
                      {userInfo?.user?._id === rating?.user?._id && (
                        <>
                          {/* ////////////////////////////////////////////////////////////////////// */}
                          {/* //////////////////////////--------- Edit --------///////////////////// */}
                          {/* ////////////////////////////////////////////////////////////////////// */}
                          <button
                            className="product-d-menu-aa-bbeba"
                            onClick={() => handleShow(rating)}
                          >
                            Edit
                          </button>

                          {/* ////////////////////////////////////////////////////////////////////// */}
                          {/* /////////////////////----------- Delete -----------/////////////////// */}
                          {/* ////////////////////////////////////////////////////////////////////// */}
                          <button
                            onClick={() =>
                              deleteLoading ? "" : deleteRating(rating)
                            }
                          >
                            {deleteLoading ? (
                              <PulseLoader
                                color="rgb(0 40 86 / 80%)"
                                loading={deleteLoading}
                                size={6}
                                cssOverride={{
                                  width: "37px",
                                }}
                              />
                            ) : (
                              "Delete"
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </ShadowLayout>
              </div>
            ))}
          </>
        ) : (
          <div>There is no review</div>
        )}
      </>
    );
  }
};

const styImg = {
  width: "52px",
  height: "52px",
};
const styleLay = {
  padding: "0 18px",
  paddingTop: "10px",
  minHeight: "195px",
  position: "relative",
};
export default PositiveRatingReview;
