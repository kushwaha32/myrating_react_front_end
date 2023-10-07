import ReactStars from "react-rating-stars-component";
import ImgWithSideCaption from "./ImgWithSideCaption";
import "../assets/css/ratingAndReviewModel.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { ratingAndReviewSchema } from "../schemaValidation/ratingAndReviewValidation";
import { useUpdateRatingMutation } from "../slices/ratingApiSlice";
import { toast } from "react-toastify";
import { setRatings } from "../slices/ratingSlice";

import { useLocation } from "react-router-dom";
import useRatingDistributionWithSocket from "../utils/ownHooks/useDistributedRatingWithSocket";
import useAvgRatingWithSocket from "../utils/ownHooks/useAvgRatingWithSocket";
import useGetImageSecureUrl from "../utils/ownHooks/useGetImageScureUrl";
import { PulseLoader } from "react-spinners";

const initialValues = {
  review: "",
  rating: "",
  product: "",
  reviewId: "",
  reviewImg: [],
};

const RatingAndReviewUpdate = ({ handleClose, product, currentRating }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [updateRating, { isLoading }] = useUpdateRatingMutation();
  const [loading, setLoading] = useState(false);
  const location = useLocation()?.pathname?.split("/");
  const productSlug = location[location?.length - 1];

  const reviewImgRef = useRef(null);

  /////////////////////////////////////////////////////////////////////////////////////
  /////--- Handle and upload image to s3 bucket in update to user profile ---/////////
  ///////////////////////////////////////////////////////////////////////////////////
  const handleSecureUrl = useGetImageSecureUrl();

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// --- update the average Rating  ----- ////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  const handleAvgRating = useAvgRatingWithSocket(product?.productNameSlug);

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// --- update the Rating distribution  ----- ////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  const handleRatingDistribution = useRatingDistributionWithSocket(
    product?.productNameSlug
  );

  const dispatch = useDispatch();

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: ratingAndReviewSchema,
    onSubmit: async (value) => {
      try {
        setLoading(true);
        let reviewImgUrl;

        if (value.reviewImg.length > 0) {
          reviewImgUrl = await Promise.all(
            value.reviewImg.map(async (img) => {
              if (typeof img === "object") {
                let newImg = await handleSecureUrl(img);
                return newImg;
              } else {
                return img;
              }
            })
          );
        }

        const data = {
          ...value,
          reviewImg: reviewImgUrl ? reviewImgUrl : [],
        };
        console.log(data);
        // parallel api call
        const res = await updateRating(data).unwrap();
        if (res.status === "success") {
          // reset the form field
          resetForm();
          dispatch(setRatings(res?.data?.review));
          handleAvgRating();
          handleRatingDistribution();
          toast.success("Review Updated Successfully.");
          setLoading(false);
          handleClose();
        } else {
          setLoading(false);
          toast.error(res.message);
        }
      } catch (err) {
        setLoading(false);
        toast.error(err.message);
      }
    },
  });

  useEffect(() => {
    setFieldValue("product", product?._id);
    setFieldValue("review", currentRating?.review);
    setFieldValue("rating", currentRating?.rating);
    setFieldValue("reviewId", currentRating?._id);
    setFieldValue(
      "reviewImg",
      currentRating?.reviewImg ? JSON.parse(currentRating?.reviewImg) : []
    );
  }, []);

  /////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////---- handling the review images image change -----///////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  const handleReviewImg = () => {
    reviewImgRef.current.click();
  };

  /////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////---- handling the review images image change -----///////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  const removeImg = (index) => {
    const images = [...values.reviewImg];
    images?.splice(index, 1);
    setFieldValue("reviewImg", images);
  };
  return (
    <div className="rr-model">
      <div className="rr-model-a">Edit Review</div>
      <span className="rr-model-b" onClick={handleClose}>
        Close
      </span>{" "}
      <form onSubmit={handleSubmit} className="rr-model-ca">
        <div className="rr-model-c">
          <ImgWithSideCaption
            img={product?.proifleImg}
            title={product?.productName}
          >
            <span>{product?.subCategory?.name}</span>
          </ImgWithSideCaption>
          {/* give Rating */}
          <ReactStars
            count={5}
            value={currentRating?.rating}
            onChange={(rating) => setFieldValue("rating", rating)}
            size={30}
            isHalf={false}
            activeColor="#02ca19"
          />
          {errors.rating && touched.rating ? (
            <div className="field-eror">{errors.rating}</div>
          ) : null}
          {/* Reviews */}
          <div className="form-group mt-3">
            <textarea
              className="form-control review-box-pro"
              value={values.review}
              rows={5}
              name="review"
              id="comment"
              onChange={handleChange}
            />
            {errors.review && touched.review ? (
              <div className="field-eror">{errors.review}</div>
            ) : null}
          </div>
          {/* /////////////////////////////////////////////// */}
          {/* /////////---- Review image Attchment ----/////// */}
          {/* /////////////////////////////////////////////// */}
          <div className="add-review-img d-flex align-items-center mt-3 mb-2">
            <button
              type="button"
              className="btn btn-white review-img-btn"
              onClick={handleReviewImg}
            >
              <input
                type="file"
                ref={reviewImgRef}
                multiple={true}
                style={{ display: "none" }}
                name="reviewImg"
                onChange={(e) =>
                  [...Array.from(e.target.files), ...values?.reviewImg].length >
                  5
                    ? alert("Maximum 5 attachments are allowed!")
                    : setFieldValue("reviewImg", [
                        ...values?.reviewImg,
                        ...Array.from(e.target.files),
                      ])
                }
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="30"
                viewBox="0 0 30 30"
              >
                <path
                  id="Icon_material-add-to-photos"
                  data-name="Icon material-add-to-photos"
                  d="M6,9H3V30a3.009,3.009,0,0,0,3,3H27V30H6ZM30,3H12A3.009,3.009,0,0,0,9,6V24a3.009,3.009,0,0,0,3,3H30a3.009,3.009,0,0,0,3-3V6A3.009,3.009,0,0,0,30,3ZM28.5,16.5h-6v6h-3v-6h-6v-3h6v-6h3v6h6Z"
                  transform="translate(-3 -3)"
                />
              </svg>
            </button>
            {values?.reviewImg?.length > 0 ? (
              <div className="review-update-attachment">
                {values?.reviewImg?.map((img, index) => (
                  <span className="position-relative" key={index}>
                    <i
                      className="fa fa-trash"
                      onClick={() => removeImg(index)}
                    ></i>
                    <img
                      src={
                        typeof img === "object" ? URL.createObjectURL(img) : img
                      }
                      alt=""
                    />
                  </span>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
          {errors.reviewImg && touched.reviewImg ? (
            <div className="field-eror">{errors.reviewImg}</div>
          ) : null}
        </div>
        <div className="text-center my-3 mb-3">
          <button
            className={`btn btn-form ${loading && "disabled"}`}
            type="submit"
            style={buttonStyle}
          >
            {loading ? (
              <PulseLoader
                color="rgb(219, 237, 255)"
                loading={loading}
                size={6}
                cssOverride={{
                  width: "37px",
                }}
              />
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

const style = {
  padding: "7px 44px",
  color: "#fff",
  marginBottom: "12px",
};

const buttonStyle = {
  fontSize: "15px",
  borderRadius: "10px",
  width: "216px",
  padding: "8px 0px",
  color: "#DBEDFF",
};

export default RatingAndReviewUpdate;
